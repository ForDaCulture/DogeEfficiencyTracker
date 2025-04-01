import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts";
import { ChartContainer } from "./chart-container";
import { ProjectCompletionData } from "@shared/schema";
import { cn } from "@/lib/utils";

interface CompletionChartProps {
  data: ProjectCompletionData[];
  isLoading: boolean;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 shadow-md rounded-lg">
        <p className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
            {entry.name}: <span className="font-mono font-medium">{entry.value} projects</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function CompletionChart({ data, isLoading, className }: CompletionChartProps) {
  return (
    <ChartContainer 
      title="Project Completion Timeline" 
      isLoading={isLoading}
      onInfo={() => alert("Project completion information")}
      onMoreOptions={() => console.log("More options clicked")}
      className={cn(className)}
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
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis 
            dataKey="quarter" 
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis
            label={{ 
              value: 'Number of Projects', 
              angle: -90, 
              position: 'insideLeft', 
              style: { textAnchor: 'middle', fill: '#6B7280' } 
            }}
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            iconType="circle" 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Line 
            type="monotone" 
            dataKey="completed" 
            name="Completed Projects"
            stroke="#10B981" 
            strokeWidth={2.5}
            fill="#10B981"
            fillOpacity={0.1}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#10B981' }}
            animationDuration={1500}
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            name="Target Projects"
            stroke="#3B82F6" 
            strokeWidth={2.5}
            strokeDasharray="5 5"
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#3B82F6' }}
            animationDuration={1500}
            animationBegin={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
