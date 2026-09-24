import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Monitor, Smartphone, Tablet, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

type DeviceType = 'Desktop' | 'Mobile' | 'Tablet';
type TimeContext = 'Morning' | 'Afternoon' | 'Evening' | 'Night';

export function VisitorGreeting() {
  const [greeting, setGreeting] = useState('');
  const [device, setDevice] = useState<DeviceType>('Desktop');
  const [timeContext, setTimeContext] = useState<TimeContext>('Morning');

  useEffect(() => {
    // Determine Time Context
    const hour = new Date().getHours();
    let timeLabel: TimeContext = 'Morning';
    let msg = 'Good Morning';

    if (hour >= 12 && hour < 17) {
      timeLabel = 'Afternoon';
      msg = 'Good Afternoon';
    } else if (hour >= 17 && hour < 22) {
      timeLabel = 'Evening';
      msg = 'Good Evening';
    } else if (hour >= 22 || hour < 5) {
      timeLabel = 'Night';
      msg = 'Good Night';
    }

    // Determine Device
    const width = window.innerWidth;
    let deviceLabel: DeviceType = 'Desktop';
    if (width < 768) deviceLabel = 'Mobile';
    else if (width < 1024) deviceLabel = 'Tablet';

    setTimeContext(timeLabel);
    setDevice(deviceLabel);

    const roles = ['Innovator', 'Visionary', 'Creator', 'Architect', 'Thinker'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    
    setGreeting(`${msg}, ${randomRole}`);
  }, []);

  const getDeviceIcon = () => {
    switch (device) {
      case 'Mobile': return <Smartphone size={10} />;
      case 'Tablet': return <Tablet size={10} />;
      default: return <Monitor size={10} />;
    }
  };

  const getTimeStyles = () => {
    switch (timeContext) {
      case 'Morning': return 'from-orange-400/20 to-yellow-400/10 text-orange-400';
      case 'Afternoon': return 'from-blue-400/20 to-cyan-400/10 text-blue-400';
      case 'Evening': return 'from-purple-400/20 to-pink-400/10 text-purple-400';
      case 'Night': return 'from-indigo-400/20 to-blue-900/10 text-indigo-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-6"
    >
      <div className={cn(
        "flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r",
        getTimeStyles()
      )}>
        <Clock size={10} />
        {timeContext}
      </div>
      
      <span className="text-[10px] font-medium text-white/50 tracking-wide border-r border-white/10 pr-3">
        {greeting}
      </span>

      <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/30 uppercase tracking-widest">
        {getDeviceIcon()}
        {device}
      </div>
    </motion.div>
  );
}
