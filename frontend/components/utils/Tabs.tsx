import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Tab = {
  name: string;
  content?: React.JSX.Element | null;
};

type TabProps = {
  tabs: Tab[];
  addClass?: string
};

export function DashboardTabs({ tabs, addClass }: TabProps) {
  return (
    <Tabs defaultValue="overview" className="h-full">
      <TabsList className={`grid max-w-[500px] w-fit ${addClass} text-base`}>
        {tabs.map((tab, index) => (
          <TabsTrigger key={index} value={tab.name.toLowerCase()}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={index} value={tab.name.toLowerCase()}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}


 