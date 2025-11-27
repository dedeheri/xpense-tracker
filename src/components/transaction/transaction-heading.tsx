"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ChartColumnIcon, PlusIcon, Table } from "lucide-react";
import FilterCategory from "../filter/filter-category";
import FilterType from "../filter/filter-type";
import { usePathname, useSearchParams } from "next/navigation";
import Tooltips from "../tooltips";

const TransactionHeading = () => {
  const pathName = usePathname();
  const params = useSearchParams();
  const typeParams = params.get("type");
  const categoryParams = params.get("category");

  const queryObj = {
    type: "",
    category: "",
  };

  if (typeParams) {
    queryObj.type = typeParams;
  }

  if (categoryParams) {
    queryObj.category = categoryParams;
  }

  const hasQueryParams = Object.keys(queryObj).length > 0;

  return (
    <section className="flex !items-center justify-between">
      <div className="flex items-center gap-2">
        <Tooltips label="Table">
          <Link
            href={{
              pathname: "/",
              ...(hasQueryParams ? { query: queryObj } : {}),
            }}
          >
            <Button
              className="rounded-full cursor-pointer h-9"
              variant={pathName === "/" ? "default" : "secondary"}
            >
              <Table className="size-4" />
              <p className="font-semibold">Table</p>
            </Button>
          </Link>
        </Tooltips>

        <Tooltips label="Chart">
          <Link
            href={{
              pathname: "/chart",
              ...(hasQueryParams ? { query: queryObj } : {}),
            }}
          >
            <Button
              className="rounded-full cursor-pointer h-9"
              variant={pathName === `/chart` ? "default" : "secondary"}
            >
              <ChartColumnIcon className="size-4" />
              <p className="font-semibold">Chart</p>
            </Button>
          </Link>
        </Tooltips>
      </div>

      <div className="flex items-center gap-2">
        <FilterType />
        <FilterCategory />

        <Tooltips label="Add">
          <Link href="/add">
            <Button className="rounded-full cursor-pointer h-9 w-9 md:w-auto">
              <PlusIcon />
              <p className="hidden md:block">Add</p>
            </Button>
          </Link>
        </Tooltips>
      </div>
    </section>
  );
};

export default TransactionHeading;
