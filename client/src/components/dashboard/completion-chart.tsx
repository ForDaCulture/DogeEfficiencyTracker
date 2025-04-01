import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps, ReferenceLine, Area, ComposedChart } from "recharts";
import { ChartContainer } from "./chart-container";
import { ProjectCompletionData } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface CompletionChartProps {
  data: ProjectCompletionData[];
  isLoading: boolean;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const completed = payload.find(p => p.dataKey === 'completed')?.value as number;
    const target = payload.find(p => p.dataKey === 'target')?.value as number;
    const difference = completed - target;
    const performanceStatus = difference >= 0 ? 'ahead' : 'behind';
    
    return (
      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg">
        <p className="font-medium text-base text-gray-900 dark:text-gray-100 mb-2">{label}</p>
        
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="text-gray-600 dark:text-gray-400">{entry.name}:</span>
              <span className="font-medium" style={{ color: entry.color }}>{entry.value} projects</span>
            </div>
          ))}
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Performance:</span>
            <Badge className={
              difference >= 0 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
            }>
              {Math.abs(difference)} projects {performanceStatus}
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const ChartLegend = () => {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
        <span className="text-gray-700 dark:text-gray-300">Completed</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
        <span className="text-gray-700 dark:text-gray-300">Target</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700"></span>
        <span className="text-gray-700 dark:text-gray-300">Variance</span>
      </div>
    </div>
  );
};

export function CompletionChart({ data, isLoading, className }: CompletionChartProps) {
  // Calculate overall performance trend
  const performance = data.reduce((acc, item) => {
    return acc + (item.completed - item.target);
  }, 0);
  
  // Is the overall trend positive, negative, or neutral?
  const trend = performance > 0 ? 'positive' : (performance < 0 ? 'negative' : 'neutral');
  
  // Prepare data for the chart with variance added
  const enhancedData = data.map(item => ({
    ...item,
    variance: Math.abs(item.completed - item.target)
  }));
  
  return (
    <ChartContainer 
      title="Project Completion Tracking" 
      description="Quarterly target vs. actual project completion metrics"
      dataSource="DOGE Quarterly Reports"
      isLoading={isLoading}
      onInfo={() => alert("Project completion tracking shows the number of projects completed versus the quarterly targets.")}
      onMoreOptions={() => console.log("More options clicked")}
      className={cn(className)}
      legendContent={<ChartLegend />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={enhancedData}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(148, 163, 184, 0.2)" 
            vertical={false}
          />
          <XAxis 
            dataKey="quarter" 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tickCount={5}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Add a reference line for context */}
          <ReferenceLine 
            y={data.reduce((acc, item) => acc + item.target, 0) / data.length} 
            stroke="#94A3B8" 
            strokeDasharray="3 3"
            label={{ 
              value: 'Avg Target', 
              position: 'right', 
              fill: '#94A3B8',
              fontSize: 12 
            }} 
          />
          
          {/* Variance area - shows the difference between target and completed */}
          <Area 
            type="monotone"
            dataKey="variance"
            fill="#F1F5F9"
            stroke="none"
            fillOpacity={0.3}
          />
          
          {/* Target line */}
          <Line 
            type="monotone" 
            dataKey="target" 
            name="Target Projects"
            stroke="#3B82F6" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#3B82F6' }}
            animationDuration={1500}
            animationBegin={300}
          />
          
          {/* Completed line */}
          <Line 
            type="monotone" 
            dataKey="completed" 
            name="Completed Projects"
            stroke="#10B981" 
            strokeWidth={2.5}
            dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#10B981' }}
            animationDuration={1500}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
