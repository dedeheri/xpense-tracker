import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleErrorPrisma } from "@/utils/prisma-error-handler";

export async function GET() {
  try {
    const response = await prisma.type.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleErrorPrisma(error);
  }
}
