import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { motion } from 'motion/react';

const data = [
  { name: 'AI Development', value: 45, color: '#00f3ff' },
  { name: 'Web Apps', value: 32, color: '#ff2d95' },
  { name: 'AI Automation', value: 28, color: '#7000ff' },
  { name: 'SaaS', value: 22, color: '#00ff95' },
  { name: 'UI/UX Design', value: 18, color: '#ffb800' },
];

export function ServiceDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full h-[300px] bg-white/5 border border-white/10 rounded-3xl p-6 mt-12 overflow-hidden backdrop-blur-sm"
    >
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xs font-bold uppercase tracking-widest text-white/60">Service Demand Overview</h4>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-[10px] text-brand-accent font-bold uppercase tracking-tighter">Live Stats</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
            interval={0}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ 
              backgroundColor: '#111', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '12px',
              fontSize: '12px'
            }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]} 
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <p className="text-[9px] text-white/20 mt-4 text-center italic font-light tracking-wide">
        *Based on historical inquiry volume over the last 12 months.
      </p>
    </motion.div>
  );
}
