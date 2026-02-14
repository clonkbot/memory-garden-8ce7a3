import React from 'react';
import { motion } from 'framer-motion';

interface PlantIconProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

const PlantIcon: React.FC<PlantIconProps> = ({ type, size = 'sm' }) => {
  const sizeMap = {
    sm: 20,
    md: 40,
    lg: 80
  };

  const s = sizeMap[size];

  const plants: Record<string, React.ReactNode> = {
    sprout: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 22V12"
          stroke="#5C6B4D"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M12 12C12 12 8 10 6 6C10 6 12 8 12 12Z"
          fill="#8B9A7C"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
        <motion.path
          d="M12 14C12 14 16 12 18 8C14 8 12 10 12 14Z"
          fill="#6B8B5C"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />
      </svg>
    ),
    flower: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 22V14"
          stroke="#5C6B4D"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.circle
          cx="12"
          cy="9"
          r="3"
          fill="#E8A87C"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.ellipse
            key={angle}
            cx={12 + Math.cos((angle * Math.PI) / 180) * 5}
            cy={9 + Math.sin((angle * Math.PI) / 180) * 5}
            rx="2.5"
            ry="4"
            fill="#C9A9A6"
            transform={`rotate(${angle + 90} ${12 + Math.cos((angle * Math.PI) / 180) * 5} ${9 + Math.sin((angle * Math.PI) / 180) * 5})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.05 }}
          />
        ))}
      </svg>
    ),
    fern: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 22V6"
          stroke="#5C6B4D"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        {[6, 9, 12, 15, 18].map((y, i) => (
          <React.Fragment key={y}>
            <motion.path
              d={`M12 ${y}C${10 - i * 0.3} ${y - 1} ${8 - i * 0.2} ${y - 2} ${7 - i * 0.3} ${y - 3}`}
              stroke="#8B9A7C"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            />
            <motion.path
              d={`M12 ${y}C${14 + i * 0.3} ${y - 1} ${16 + i * 0.2} ${y - 2} ${17 + i * 0.3} ${y - 3}`}
              stroke="#6B8B5C"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.35 + i * 0.1 }}
            />
          </React.Fragment>
        ))}
      </svg>
    ),
    tulip: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 22V10"
          stroke="#5C6B4D"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.path
          d="M12 10C12 10 8 8 8 4C8 4 12 6 12 10Z"
          fill="#C17F59"
          initial={{ scale: 0, originY: 1 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        />
        <motion.path
          d="M12 10C12 10 16 8 16 4C16 4 12 6 12 10Z"
          fill="#D4927A"
          initial={{ scale: 0, originY: 1 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        />
        <motion.path
          d="M12 10C12 10 12 6 12 3"
          stroke="#E8A87C"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5 }}
        />
      </svg>
    ),
    daisy: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 22V12"
          stroke="#5C6B4D"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4 }}
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.ellipse
            key={angle}
            cx={12 + Math.cos((angle * Math.PI) / 180) * 5}
            cy={8 + Math.sin((angle * Math.PI) / 180) * 5}
            rx="2"
            ry="4"
            fill="#FDF8F3"
            stroke="#E5DDD3"
            strokeWidth="0.5"
            transform={`rotate(${angle + 90} ${12 + Math.cos((angle * Math.PI) / 180) * 5} ${8 + Math.sin((angle * Math.PI) / 180) * 5})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.04 }}
          />
        ))}
        <motion.circle
          cx="12"
          cy="8"
          r="3"
          fill="#E8A87C"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
        />
      </svg>
    ),
    succulent: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <motion.ellipse
          cx="12"
          cy="18"
          rx="6"
          ry="3"
          fill="#5C6B4D"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.ellipse
          cx="12"
          cy="15"
          rx="5"
          ry="4"
          fill="#6B8B5C"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        />
        <motion.ellipse
          cx="12"
          cy="12"
          rx="4"
          ry="3.5"
          fill="#8B9A7C"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />
        <motion.ellipse
          cx="12"
          cy="9"
          rx="3"
          ry="3"
          fill="#9AAB8B"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        />
        <motion.ellipse
          cx="12"
          cy="7"
          rx="2"
          ry="2"
          fill="#AABB9B"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        />
      </svg>
    ),
    lavender: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 22V8"
          stroke="#5C6B4D"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4 }}
        />
        {[3, 5, 7, 9, 11].map((y, i) => (
          <React.Fragment key={y}>
            <motion.ellipse
              cx={10}
              cy={y}
              rx="1.5"
              ry="2"
              fill="#9B8AA5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            />
            <motion.ellipse
              cx={14}
              cy={y + 1}
              rx="1.5"
              ry="2"
              fill="#A999B3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35 + i * 0.08 }}
            />
          </React.Fragment>
        ))}
      </svg>
    ),
    mushroom: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M10 22V14H14V22"
          fill="#E5DDD3"
          stroke="#D4C9BA"
          strokeWidth="1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          style={{ originY: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M4 14C4 14 4 6 12 6C20 6 20 14 20 14H4Z"
          fill="#C17F59"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        />
        <motion.circle cx="8" cy="10" r="1.5" fill="#FDF8F3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
        <motion.circle cx="14" cy="9" r="1" fill="#FDF8F3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
        <motion.circle cx="11" cy="12" r="1.2" fill="#FDF8F3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
        <motion.circle cx="16" cy="12" r="0.8" fill="#FDF8F3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />
      </svg>
    ),
  };

  return (
    <div className="flex items-center justify-center">
      {plants[type] || plants.sprout}
    </div>
  );
};

export default PlantIcon;
