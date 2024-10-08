import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Tab = {
  name: string;
  content?: React.JSX.Element | string;
};

type TabProps = {
  tabs: Tab[];
};

export function DashboardTabs({ tabs }: TabProps) {
  return (
    <Tabs defaultValue="account" className="w-fit">
      <TabsList className="grid w-full grid-cols-4 text-base">
        {tabs.map((tab, index) => (
          <TabsTrigger key={index} value={tab.name.toLowerCase()}>{tab.name}</TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="account"></TabsContent>
    </Tabs>
  );
}
