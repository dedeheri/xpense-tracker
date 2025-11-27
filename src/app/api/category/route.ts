import { NextResponse } from "next/server";
import { sessions } from "@/lib/session";
import { handleErrorPrisma } from "@/utils/prisma-error-handler";
import categoryServices from "@/services/category-services";

export async function GET() {
  try {
    const { userId } = await sessions();

    const category = await categoryServices.findMany({
      where: {
        userId: userId!,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (category.length === 0) {
      return NextResponse.json({ error: "Category is empty" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Success", data: category },
      { status: 200 }
    );
  } catch (error) {
    return handleErrorPrisma(error);
  }
}

export async function POST(request: Request) {
  const { userId } = await sessions();
  try {
    const { title, icon } = await request.json();

    if (typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const category = await categoryServices.findFirst({
      where: {
        title: title.trim(),
      },
    });

    if (category) {
      return NextResponse.json(
        {
          message: `A category named '${title}' already exists.`,
        },
        { status: 409 }
      );
    }

    const addCategory = await categoryServices.create({
      data: {
        userId: userId!,
        title,
        icon,
      },
    });

    return NextResponse.json(
      {
        message: "Category created",
        data: addCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleErrorPrisma(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const response = await categoryServices.destroy({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      {
        message: `Category "${response.title}" successfully deleted`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return handleErrorPrisma(error);
  }
}
