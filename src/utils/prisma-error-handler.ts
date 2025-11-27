import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const handleErrorPrisma = (
  error: unknown,
  message?: string,
  status?: number
): NextResponse => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      // Melanggar batasan unik
      case "P2002":
        return NextResponse.json(
          { error: "Unique constraint failed. Data already exists." },
          { status: 409 }
        );

      // Record tidak ditemukan
      case "P2025":
        return NextResponse.json(
          {
            error: `The requested record could not be found. (Code: ${error.code}).`,
          },
          { status: 404 } // Not Found
        );

      // Kesalahan Known lainnya
      default:
        return NextResponse.json(
          { error: `Database request failed (Code: ${error.code}).` },
          { status: 500 }
        );
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(
      { error: "Invalid data provided for the database query." },
      { status: 400 } // Bad Request
    );
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    // Kesalahan Inisialisasi (Database Down?)
    console.error(
      "Prisma Initialization Error (Database Down?):",
      error.message
    );

    if (error.errorCode === "P1001") {
      return NextResponse.json(
        {
          error:
            "Database connection failed. Please check the connection details or if the server is running.",
        },
        { status: 503 } // Service Unavailable
      );
    }

    return NextResponse.json(
      { error: "Database connection failed or is unavailable." },
      { status: 503 } // Service Unavailable
    );
  }

  return NextResponse.json(
    {
      error: true,
      success: false,
      message: message,
    },
    { status: status }
  );
};
