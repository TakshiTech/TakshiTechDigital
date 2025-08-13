import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, sms, service, message } = await request.json();

    console.log("Backend Received Payload:", { email, firstName, lastName, sms, service, message });

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Brevo API key is missing" }, { status: 500 });
    }

    // 💡 Decide listId based on `service`
    let listId = 2; // Default list (e.g., Contact Us)
    if (service === "Sales Associate Application") {
      listId = 11;
    }

    const contactData: { [key: string]: any } = {
      email,
      listIds: [listId],
      attributes: {},
    };

    if (firstName) contactData.attributes.FIRSTNAME = firstName;
    if (lastName) contactData.attributes.LASTNAME = lastName;
    if (service) contactData.attributes.SERVICE = service;
    if (message) contactData.attributes.MESSAGE = message;

    if (sms) {
      const phoneRegex = /^\+\d{10,15}$/;
      if (phoneRegex.test(sms)) {
        contactData.attributes.SMS = sms;
      } else {
        console.warn("Skipping SMS attribute: Invalid phone number format", sms);
      }
    }

    console.log("Data Sent to Brevo:", contactData);

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API error:", errorData);
      return NextResponse.json(
        { error: "Failed to save contact to Brevo: " + (errorData.message || "Unknown error") },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Contact saved successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error saving contact to Brevo:", error.message || error);
    return NextResponse.json(
      { error: "Failed to save contact: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
