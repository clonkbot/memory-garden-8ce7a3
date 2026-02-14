import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GardenGrid from './components/GardenGrid';
import JournalModal from './components/JournalModal';
import { JournalEntry, DayData } from './types';

function App() {
  const [entries, setEntries] = useState<Record<number, JournalEntry>>(() => {
    const saved = localStorage.getItem('garden-journal-entries');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    localStorage.setItem('garden-journal-entries', JSON.stringify(entries));
  }, [entries]);

  const getDayOfYear = (date: Date = new Date()): number => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const today = getDayOfYear();

  const handleSaveEntry = (dayIndex: number, content: string) => {
    if (content.trim()) {
      const plantTypes = ['sprout', 'flower', 'fern', 'tulip', 'daisy', 'succulent', 'lavender', 'mushroom'];
      const plantType = plantTypes[Math.floor(Math.random() * plantTypes.length)];
      setEntries(prev => ({
        ...prev,
        [dayIndex]: {
          content,
          date: new Date().toISOString(),
          plantType
        }
      }));
    } else {
      const newEntries = { ...entries };
      delete newEntries[dayIndex];
      setEntries(newEntries);
    }
    setSelectedDay(null);
  };

  const getDaysData = (): DayData[] => {
    const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
    const totalDays = isLeapYear ? 366 : 365;

    return Array.from({ length: totalDays }, (_, i) => {
      const dayIndex = i + 1;
      const entry = entries[dayIndex];
      return {
        dayIndex,
        hasEntry: !!entry,
        plantType: entry?.plantType,
        isToday: dayIndex === today,
        isPast: dayIndex < today,
        isFuture: dayIndex > today
      };
    });
  };

  const entriesCount = Object.keys(entries).length;

  return (
    <div className="min-h-screen bg-[#FDF8F3] relative overflow-x-hidden">
      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm gradient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[#E8A87C]/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 px-4 py-8 md:py-12 lg:py-16 max-w-5xl mx-auto">
        {/* Header */}
        <motion.header
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" className="mx-auto">
              <motion.path
                d="M24 44c0-12-8-20-8-28s4-12 8-12 8 4 8 12-8 16-8 28z"
                fill="#8B9A7C"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.path
                d="M24 20c-6-2-12 2-12 8s6 4 12-8z"
                fill="#5C6B4D"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              />
              <motion.path
                d="M24 14c6-2 10 4 10 10s-4 6-10-10z"
                fill="#5C6B4D"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              />
            </svg>
          </motion.div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#3D3229] mb-2 tracking-tight">
            Memory Garden
          </h1>
          <p className="font-body text-[#6B5D4D] text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Plant a memory each day. Watch your garden bloom over the year.
          </p>

          <motion.div
            className="mt-4 md:mt-6 flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-[#8B7D6B]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="font-body">{currentYear}</span>
            <span className="w-1 h-1 rounded-full bg-[#C9A9A6]" />
            <span className="font-body">{entriesCount} {entriesCount === 1 ? 'memory' : 'memories'} planted</span>
          </motion.div>
        </motion.header>

        {/* Garden Grid */}
        <GardenGrid
          days={getDaysData()}
          onDayClick={setSelectedDay}
        />

        {/* Today indicator */}
        <motion.div
          className="mt-6 md:mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="font-body text-xs md:text-sm text-[#8B7D6B]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E8A87C] mr-2 animate-pulse" />
            Today is day {today} of {getDaysData().length}
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs text-[#8B7D6B]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E5DDD3]" />
            <span className="font-body">Unwritten</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#8B9A7C]" />
            <span className="font-body">Memory planted</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full border-2 border-[#E8A87C] bg-transparent" />
            <span className="font-body">Today</span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-12 md:mt-16 pt-6 border-t border-[#E5DDD3]/50 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="font-body text-[10px] md:text-xs text-[#B5A99A] tracking-wide">
            Requested by <span className="text-[#9A8B7A]">@nicoismade</span> · Built by <span className="text-[#9A8B7A]">@clonkbot</span>
          </p>
        </motion.footer>
      </div>

      {/* Journal Modal */}
      <AnimatePresence>
        {selectedDay !== null && (
          <JournalModal
            dayIndex={selectedDay}
            entry={entries[selectedDay]}
            onClose={() => setSelectedDay(null)}
            onSave={handleSaveEntry}
            isToday={selectedDay === today}
            isPast={selectedDay < today}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
