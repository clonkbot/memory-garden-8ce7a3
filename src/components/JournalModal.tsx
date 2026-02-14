import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { JournalEntry } from '../types';
import PlantIcon from './PlantIcon';

interface JournalModalProps {
  dayIndex: number;
  entry?: JournalEntry;
  onClose: () => void;
  onSave: (dayIndex: number, content: string) => void;
  isToday: boolean;
  isPast: boolean;
}

const JournalModal: React.FC<JournalModalProps> = ({
  dayIndex,
  entry,
  onClose,
  onSave,
  isToday,
  isPast
}) => {
  const [content, setContent] = useState(entry?.content || '');
  const [isEditing, setIsEditing] = useState(!entry);

  useEffect(() => {
    setContent(entry?.content || '');
    setIsEditing(!entry);
  }, [entry]);

  const getDateFromDayIndex = (day: number): Date => {
    const year = new Date().getFullYear();
    const date = new Date(year, 0, day);
    return date;
  };

  const date = getDateFromDayIndex(dayIndex);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const handleSave = () => {
    onSave(dayIndex, content);
  };

  const canEdit = isToday || isPast;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#3D3229]/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-lg bg-[#FDF8F3] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Paper texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Header */}
        <div className="relative px-5 md:px-8 pt-6 md:pt-8 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <motion.p
                className="text-xs md:text-sm text-[#8B7D6B] font-body mb-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Day {dayIndex}
                {isToday && <span className="ml-2 text-[#E8A87C]">· Today</span>}
              </motion.p>
              <motion.h2
                className="font-display text-xl md:text-2xl text-[#3D3229]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                {formattedDate}
              </motion.h2>
            </div>

            {entry && entry.plantType && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <PlantIcon type={entry.plantType} size="lg" />
              </motion.div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E5DDD3] transition-colors text-[#8B7D6B] hover:text-[#3D3229]"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="relative px-5 md:px-8 pb-6 md:pb-8">
          {!canEdit ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-body text-[#8B7D6B]">
                This day hasn't arrived yet.
              </p>
              <p className="font-body text-sm text-[#B5A99A] mt-2">
                Come back to plant a memory when the time comes.
              </p>
            </motion.div>
          ) : isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What would you like to remember about this day?"
                className="w-full h-40 md:h-48 p-4 bg-[#FAF5EF] border border-[#EDE6DC] rounded-xl font-body text-[#3D3229] placeholder-[#B5A99A] resize-none focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:border-transparent transition-shadow text-sm md:text-base"
                autoFocus
              />

              <div className="flex flex-col-reverse sm:flex-row gap-3 mt-4">
                {entry && (
                  <button
                    onClick={() => {
                      setContent(entry.content);
                      setIsEditing(false);
                    }}
                    className="flex-1 px-4 py-3 font-body text-sm text-[#8B7D6B] hover:text-[#3D3229] transition-colors rounded-xl hover:bg-[#E5DDD3]"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-3 bg-[#8B9A7C] hover:bg-[#7A8A6C] text-white font-body text-sm rounded-xl transition-colors shadow-sm hover:shadow-md"
                >
                  {content.trim() ? 'Plant this memory' : 'Remove memory'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-[#FAF5EF] border border-[#EDE6DC] rounded-xl p-4 md:p-5 min-h-[120px]">
                <p className="font-body text-[#3D3229] whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                  {entry?.content}
                </p>
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 mt-4">
                <button
                  onClick={() => onSave(dayIndex, '')}
                  className="flex-1 px-4 py-3 font-body text-sm text-[#C17F59] hover:text-[#A56B48] transition-colors rounded-xl hover:bg-[#FAF0EA]"
                >
                  Remove memory
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-4 py-3 bg-[#E5DDD3] hover:bg-[#D9CFC2] text-[#3D3229] font-body text-sm rounded-xl transition-colors"
                >
                  Edit memory
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Decorative bottom border */}
        <div className="h-1 bg-gradient-to-r from-[#8B9A7C] via-[#E8A87C] to-[#C9A9A6]" />
      </motion.div>
    </motion.div>
  );
};

export default JournalModal;
