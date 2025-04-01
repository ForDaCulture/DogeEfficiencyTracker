import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts";
import { ChartContainer } from "./chart-container";
import { EfficiencyTrendData } from "@shared/schema";

interface EfficiencyChartProps {
  data: EfficiencyTrendData[];
  isLoading: boolean;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
        <p className="font-medium text-sm">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-mono">{entry.value}%</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function EfficiencyChart({ data, isLoading }: EfficiencyChartProps) {
  return (
    <ChartContainer 
      title="Spending Efficiency Trend" 
      isLoading={isLoading}
      onInfo={() => alert("Efficiency trend information")}
      onMoreOptions={() => console.log("More options clicked")}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            domain={[70, 100]}
            tickFormatter={(value) => `${value}%`}
            label={{ value: 'Efficiency (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="treasury" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line 
            type="monotone" 
            dataKey="defense" 
            stroke="#EF4444" 
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line 
            type="monotone" 
            dataKey="education" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
