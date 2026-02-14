import React from 'react';
import { motion } from 'framer-motion';
import { DayData } from '../types';
import PlantIcon from './PlantIcon';

interface GardenGridProps {
  days: DayData[];
  onDayClick: (dayIndex: number) => void;
}

const GardenGrid: React.FC<GardenGridProps> = ({ days, onDayClick }) => {
  const getMonthLabel = (dayIndex: number): string | null => {
    const date = new Date(new Date().getFullYear(), 0, dayIndex);
    if (date.getDate() === 1) {
      return date.toLocaleString('default', { month: 'short' });
    }
    return null;
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Month labels for desktop */}
      <div className="hidden md:flex justify-between mb-4 px-2 text-xs text-[#8B7D6B] font-body">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
          <span key={month} className="w-12 text-center">{month}</span>
        ))}
      </div>

      {/* Grid container */}
      <div className="bg-[#FAF5EF] rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-[#EDE6DC]">
        <div
          className="grid gap-[3px] md:gap-1"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(16px, 1fr))',
          }}
        >
          {days.map((day, index) => {
            const monthLabel = getMonthLabel(day.dayIndex);

            return (
              <motion.button
                key={day.dayIndex}
                onClick={() => onDayClick(day.dayIndex)}
                className={`
                  relative aspect-square rounded-full flex items-center justify-center
                  transition-all duration-300 ease-out
                  focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:ring-offset-2 focus:ring-offset-[#FAF5EF]
                  ${day.isToday ? 'ring-2 ring-[#E8A87C] ring-offset-1 ring-offset-[#FAF5EF]' : ''}
                  ${day.hasEntry ? 'bg-transparent' : day.isPast ? 'bg-[#E5DDD3] hover:bg-[#D9CFC2]' : day.isToday ? 'bg-[#FDF0E6] hover:bg-[#F9E4D4]' : 'bg-[#EDEAE5] hover:bg-[#E5E2DD]'}
                  ${!day.hasEntry ? 'hover:scale-125' : 'hover:scale-110'}
                  min-w-[16px] min-h-[16px] md:min-w-[20px] md:min-h-[20px]
                `}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: index * 0.001,
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                whileHover={{ scale: day.hasEntry ? 1.15 : 1.3 }}
                whileTap={{ scale: 0.95 }}
                title={`Day ${day.dayIndex}${day.isToday ? ' (Today)' : ''}`}
                aria-label={`Day ${day.dayIndex}${day.hasEntry ? ' - has memory' : ''}${day.isToday ? ' - today' : ''}`}
              >
                {day.hasEntry && day.plantType && (
                  <PlantIcon type={day.plantType} size="sm" />
                )}
                {!day.hasEntry && day.isToday && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#E8A87C]/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default GardenGrid;
