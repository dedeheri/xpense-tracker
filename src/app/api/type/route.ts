import { NextResponse } from "next/server";
import { handleErrorPrisma } from "@/utils/prisma-error-handler";
import typeServices from "@/services/type-services";

export async function GET() {
  try {
    const types = await typeServices.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (types.length === 0) {
      return NextResponse.json({ error: "Types is empty" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Success",
        data: types,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleErrorPrisma(error);
  }
}
