import { NextResponse } from "next/server";
import { handleErrorPrisma } from "@/utils/prisma-error-handler";
import TargetService from "@/services/target-services";
import { sessions } from "@/lib/session";

export async function GET() {
  try {
    const { userId } = await sessions();
    const target = await TargetService.findMany({
      where: {
        userId: userId!,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (target.length === 0) {
      return NextResponse.json({ error: "Target is empty" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Success",
        data: target,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleErrorPrisma(error);
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await sessions();
    const { title, icon, goals } = await request.json();

    if (!title || !goals) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 409 }
      );
    }

    const target = await TargetService.findFirst({ where: { title: title } });
    if (target) {
      return NextResponse.json(
        {
          message: `A Target named '${title}' already exists.`,
        },
        { status: 409 }
      );
    }

    await TargetService.createOne({
      data: {
        userId: userId!,
        title: title,
        icon: icon,
        goals: parseInt(goals),
        amount: 0,
      },
    });

    return NextResponse.json(
      {
        message: `Target ${title} created`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return handleErrorPrisma(error);
  }
}
