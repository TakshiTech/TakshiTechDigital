
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const text = await req.text();
        const params = new URLSearchParams(text);

        // Sometimes PhonePe sends data as form-urlencoded with 'response' key
        // Other times it might be JSON if configured differently, but documentation says POST body.
        // However, for redirectMode: "POST", it sends a POST request to the redirectUrl.

        // Let's handle both standard S2S callback (JSON body usually) and Redirect (Form Data)

        // Check if it's the S2S callback or the user redirect
        // The implementation plan uses the same route for both redirectUrl and callbackUrl for simplicity,
        // but they handle things slightly differently.

        // If it is the user redirect (POST), it comes as form-data: `code`, `merchantId`, `transactionId`, `amount`, `providerReferenceId`, `checksum`

        // If it is S2S, it comes with X-VERIFY header and a base64 encoded JSON body.

        const contentType = req.headers.get("content-type");

        if (contentType?.includes("application/json")) {
            // S2S Webhook logic would go here
            // This is where you'd verify the signature and update the order status
            return NextResponse.json({ status: "success" });
        }

        // Handle User Redirect (POST form data)
        let bodyData: any = {};
        if (contentType?.includes("application/x-www-form-urlencoded")) {
            params.forEach((value, key) => {
                bodyData[key] = value;
            });
        }

        // If we have a transaction ID and status
        if (bodyData.code === "PAYMENT_SUCCESS") {
            // Redirect to a success page on frontend
            return NextResponse.redirect(new URL("/payment/success", req.url));
        } else if (bodyData.code) {
            return NextResponse.redirect(new URL("/payment/failure", req.url));
        }

        // Initial fallback if something isn't right
        return NextResponse.redirect(new URL("/payment", req.url));

    } catch (error) {
        console.error("Callback Error:", error);
        return NextResponse.redirect(new URL("/payment/failure", req.url));
    }
}

export async function GET(req: NextRequest) {
    // Just in case they use GET redirect which is default mode if not specified as POST
    // But we specified POST in initiation.
    return NextResponse.redirect(new URL("/payment", req.url));
}
