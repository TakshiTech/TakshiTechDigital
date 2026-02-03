
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { amount, mobileNumber } = await req.json();

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;
    const env = process.env.PHONEPE_ENV || "PROD";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!merchantId || !saltKey) {
      return NextResponse.json(
        { error: "PhonePe credentials not configured" },
        { status: 500 }
      );
    }

    const transactionId = "TXN" + uuidv4().replace(/-/g, "").substring(0, 20);
    const userId = "USER" + uuidv4().replace(/-/g, "").substring(0, 20);

    const data = {
      merchantId: merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: userId,
      amount: parseInt(amount) * 100, // Amount in paise
      redirectUrl: `${baseUrl}/api/phonepe/callback?id=${transactionId}`,
      redirectMode: "POST",
      callbackUrl: `${baseUrl}/api/phonepe/callback`,
      mobileNumber: mobileNumber || "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = saltIndex;
    const stringToSign = payloadMain + "/pg/v1/pay" + saltKey;
    const sha256 = crypto.createHash("sha256").update(stringToSign).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const phonePeUrl =
      env === "PROD"
        ? "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const response = await axios.post(
      phonePeUrl,
      {
        request: payloadMain,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          Accept: "application/json",
        },
      }
    );

    const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;

    return NextResponse.json({ url: redirectUrl, transactionId });
  } catch (error: any) {
    console.error("PhonePe Initiation Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.message || "Payment initiation failed" },
      { status: 500 }
    );
  }
}
