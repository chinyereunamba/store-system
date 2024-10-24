import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon } from "lucide-react";

type Card = {
  title: string;
  value: number;
};

export function DashCard({ title, value }: Card) {
  return (
    <Card className="w-[320px] max-md:w-full shadow-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="font-normal text-primary">{title}</p>
          <span>
            <DollarSignIcon size={18} color="grey" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="text-3xl font-semibold">$ {value.toLocaleString()}</h1>
      </CardContent>
    </Card>
  );
}
