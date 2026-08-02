import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, website, category, description, features, pricing, email } = await request.json();

    if (!name || !website || !category || !description) {
      return NextResponse.json(
        { error: "Name, website, category, and description are required" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(website);
    } catch {
      return NextResponse.json(
        { error: "Invalid website URL" },
        { status: 400 }
      );
    }

    // TODO: Integrate with database or email service
    // For now, log the submission
    console.log(`Tool submission: ${name} (${website}) in ${category} at ${new Date().toISOString()}`);
    console.log(`Description: ${description}`);
    if (features) console.log(`Features: ${features}`);
    if (pricing) console.log(`Pricing: ${pricing}`);
    if (email) console.log(`Contact email: ${email}`);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      { message: "Submission received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Submit form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
