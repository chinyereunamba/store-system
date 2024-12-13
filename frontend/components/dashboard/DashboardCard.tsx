import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon } from "lucide-react";

type Card = {
  title: string;
  value: number;
};

export function DashCard({ title, value }: Card) {
  return (
    <Card className="w-[320px] max-md:w-full shadow-none p-4">
      <CardHeader className="p-0 pb-3">
        <CardTitle className="flex justify-between items-center">
          <p className="font-bold text-primary capitalize">{title}</p>
          <span>
            <DollarSignIcon size={18} color="grey" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <h1 className="text-3xl font-semibold">
          &#8358; {value.toLocaleString()}
        </h1>
      </CardContent>
    </Card>
  );
}
