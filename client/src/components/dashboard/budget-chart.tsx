import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { ChartContainer } from "./chart-container";
import { BudgetAllocationData } from "@shared/schema";

interface BudgetChartProps {
  data: BudgetAllocationData[];
  isLoading: boolean;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-sm text-gray-700">
          Budget: <span className="font-mono">${payload[0].value}M</span>
        </p>
      </div>
    );
  }

  return null;
};

export function BudgetChart({ data, isLoading }: BudgetChartProps) {
  return (
    <ChartContainer 
      title="Budget Allocation by Department" 
      isLoading={isLoading}
      onInfo={() => alert("Budget allocation information")}
      onMoreOptions={() => console.log("More options clicked")}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis
            tickFormatter={(value) => `$${value}M`}
            label={{ value: 'Budget (Millions $)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="budget" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
