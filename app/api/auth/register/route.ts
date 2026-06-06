import { NextResponse } from "next/server";
import { createUser } from "@/app/lib/queries";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        // ── Validation ────────────────────────────────────────────────
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required." },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { message: "Password must be at least 8 characters." },
                { status: 400 }
            );
        }

        // ── Create user ────────────────────────────────────────────────
        const user = await createUser({ name, email, password });

        return NextResponse.json(
            { message: "Account created successfully.", user },
            { status: 201 }
        );
    } catch (error) {
        console.error("[register] unexpected error:", error);
        
        // Handle specific errors from createUser
        if (error instanceof Error && error.message === "An account with this email already exists.") {
            return NextResponse.json(
                { message: error.message },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}