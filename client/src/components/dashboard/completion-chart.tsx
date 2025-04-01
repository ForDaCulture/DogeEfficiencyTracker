import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts";
import { ChartContainer } from "./chart-container";
import { ProjectCompletionData } from "@shared/schema";

interface CompletionChartProps {
  data: ProjectCompletionData[];
  isLoading: boolean;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
        <p className="font-medium text-sm">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-mono">{entry.value} projects</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function CompletionChart({ data, isLoading }: CompletionChartProps) {
  return (
    <ChartContainer 
      title="Project Completion Timeline" 
      isLoading={isLoading}
      onInfo={() => alert("Project completion information")}
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
          <XAxis dataKey="quarter" />
          <YAxis
            label={{ value: 'Number of Projects', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="completed" 
            name="Completed Projects"
            stroke="#10B981" 
            strokeWidth={2}
            fill="#10B981"
            fillOpacity={0.1}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            name="Target Projects"
            stroke="#3B82F6" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
