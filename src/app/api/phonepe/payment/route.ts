import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { amount, mobileNumber } = await req.json();

    const clientId = process.env.PHONEPE_CLIENT_ID;
    const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
    const clientVersion = process.env.PHONEPE_CLIENT_VERSION || "1";
    const env = process.env.PHONEPE_ENV || "SANDBOX";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!clientId || !clientSecret || !baseUrl) {
      console.error("Missing PhonePe configuration:", {
        clientId: !!clientId,
        clientSecret: !!clientSecret,
        baseUrl: !!baseUrl,
      });
      return NextResponse.json(
        { error: "PhonePe credentials or Base URL not configured" },
        { status: 500 }
      );
    }

    // 1. Generate Auth Token
    const authUrl =
      env === "PROD"
        ? "https://api.phonepe.com/apis/hermes/v1/oauth/token" // Production Auth URL
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token"; // Sandbox Auth URL

    const authData = new URLSearchParams();
    authData.append("client_id", clientId);
    authData.append("client_secret", clientSecret);
    authData.append("grant_type", "client_credentials");
    authData.append("client_version", clientVersion);

    console.log("Generating Auth Token from:", authUrl);

    const authResponse = await axios.post(authUrl, authData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const accessToken = authResponse.data.access_token;
    if (!accessToken) {
      throw new Error("Failed to retrieve access token");
    }

    console.log("Auth Token Generated Successfully");

    // 2. Create Payment Request
    const transactionId = "TXN" + uuidv4().replace(/-/g, "").substring(0, 20);
    const userId = "USER" + uuidv4().replace(/-/g, "").substring(0, 20);

    const paymentUrl =
      env === "PROD"
        ? "https://api.phonepe.com/apis/hermes/pg/checkout/v2/pay" // Production Payment URL
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay"; // Sandbox Payment URL

    const paymentData = {
      merchantOrderId: transactionId,
      amount: Math.round(parseFloat(amount) * 100), // Amount in paise
      paymentFlow: {
        type: "PG_CHECKOUT",
        message: "Payment for Order",
        merchantUrls: {
          redirectUrl: `${baseUrl}/api/phonepe/callback?id=${transactionId}`,
        },
      },
      merchantUserId: userId,
      mobileNumber: mobileNumber || "9999999999",
    };

    console.log("Initiating PhonePe V2 Payment:", {
      url: paymentUrl,
      transactionId,
      amount: paymentData.amount,
    });

    const paymentResponse = await axios.post(paymentUrl, paymentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${accessToken}`,
      },
    });

    if (paymentResponse.data && paymentResponse.data.model && paymentResponse.data.model.redirectUrl) {
      const redirectUrl = paymentResponse.data.model.redirectUrl;
      return NextResponse.json({ url: redirectUrl, transactionId });
    } else {
      // Handle cases where redirectUrl might be in a different structure or checking state
      if (paymentResponse.data.state === "PENDING" || paymentResponse.data.state === "COMPLETED") {
        // Depending on response structure, sometimes redirectUrl is top level or in data
        // Adjust based on actual V2 response if needed.
        // Standard checkout usually returns a redirectUrl to the payment page.
        // Let's log it to be sure.
        console.log("Payment Response Data:", JSON.stringify(paymentResponse.data, null, 2));

        // Fallback or specific check
        const url = paymentResponse.data.redirectUrl || paymentResponse.data.data?.redirectUrl;
        if (url) {
          return NextResponse.json({ url, transactionId });
        }
      }

      console.error("PhonePe V2 API Error Response:", paymentResponse.data);
      throw new Error(paymentResponse.data.message || "PhonePe API returned failure");
    }
  } catch (error: any) {
    console.error("PhonePe Initiation Error:", error.message);
    if (error.response) {
      console.error("Response Data:", JSON.stringify(error.response.data, null, 2));
      console.error("Response Status:", error.response.status);
    }
    return NextResponse.json(
      {
        error: error.response?.data?.message || error.message || "Payment initiation failed",
        details: error.response?.data,
      },
      { status: 500 }
    );
  }
}
