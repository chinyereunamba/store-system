import * as React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSignIcon } from "lucide-react";

export function DashCard() {
  return (
    <Card className="w-[320px] max-md:w-full shadow-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="font-normal">Total revenue</p>
          <span>
            <DollarSignIcon size={18} color="grey"/>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="text-3xl font-semibold">$45,231.89</h1>
      </CardContent>
    </Card>
  );
}
