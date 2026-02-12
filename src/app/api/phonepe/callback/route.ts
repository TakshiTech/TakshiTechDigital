
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const text = await req.text();
        const params = new URLSearchParams(text);

        // Handle User Redirect (POST form data)
        let bodyData: any = {};
        const contentType = req.headers.get("content-type");

        if (contentType?.includes("application/x-www-form-urlencoded")) {
            params.forEach((value, key) => {
                bodyData[key] = value;
            });
        } else if (contentType?.includes("application/json")) {
            // If it happens to be JSON (S2S or configured differently)
            try {
                bodyData = JSON.parse(text);
            } catch (e) {
                console.error("Failed to parse JSON body", e);
            }
        }

        console.log("Payment Callback Received:", bodyData);

        // Check Status Code
        if (bodyData.code === "PAYMENT_SUCCESS") {
            // Redirect to a success page
            const url = new URL("/payment/success", req.url);
            // Optionally pass transaction ID or other params
            if (bodyData.transactionId) {
                url.searchParams.set("tid", bodyData.transactionId);
            }
            return NextResponse.redirect(url);
        } else if (
            bodyData.code === "PAYMENT_ERROR" ||
            bodyData.code === "PAYMENT_DECLINED" ||
            bodyData.code === "PAYMENT_CANCELLED"
        ) {
            // Redirect to the Offer/Cancel page
            const url = new URL("/payment/offer", req.url);
            return NextResponse.redirect(url);
        } else {
            // Fallback for unknown states
            const url = new URL("/payment/offer", req.url); // Default to offer/retry
            return NextResponse.redirect(url);
        }

    } catch (error) {
        console.error("Callback Error:", error);
        // Fallback to offer page on system error
        return NextResponse.redirect(new URL("/payment/offer", req.url));
    }
}

export async function GET(req: NextRequest) {
    // Just in case they use GET redirect
    // Redirect to pricing or offer page
    return NextResponse.redirect(new URL("/pricing", req.url));
}
