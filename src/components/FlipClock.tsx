
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FlipClockProps {
  isFullscreen: boolean;
  onClose: () => void;
}

const FlipClock: React.FC<FlipClockProps> = ({ isFullscreen, onClose }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return {
      hours: date.getHours().toString().padStart(2, '0'),
      minutes: date.getMinutes().toString().padStart(2, '0'),
      seconds: date.getSeconds().toString().padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = formatTime(time);

  const FlipDigit = ({ digit, label }: { digit: string; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className={`flip-card ${isFullscreen ? 'w-32 h-48' : 'w-16 h-24'}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front bg-gradient-to-b from-zen-800 to-zen-900 dark:from-zen-100 dark:to-zen-200 flex items-center justify-center rounded-lg shadow-2xl">
              <span className={`font-mono font-bold text-white dark:text-zen-800 ${
                isFullscreen ? 'text-8xl' : 'text-4xl'
              }`}>
                {digit}
              </span>
            </div>
            <div className="flip-card-back bg-gradient-to-b from-ocean-500 to-ocean-600 flex items-center justify-center rounded-lg shadow-2xl">
              <span className={`font-mono font-bold text-white ${
                isFullscreen ? 'text-8xl' : 'text-4xl'
              }`}>
                {digit}
              </span>
            </div>
          </div>
        </div>
      </div>
      <span className={`mt-2 text-zen-600 dark:text-zen-400 font-medium ${
        isFullscreen ? 'text-xl' : 'text-sm'
      }`}>
        {label}
      </span>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="flex items-center space-x-12">
          <FlipDigit digit={hours[0]} label="H" />
          <FlipDigit digit={hours[1]} label="H" />
          <div className="text-6xl text-white font-bold animate-pulse">:</div>
          <FlipDigit digit={minutes[0]} label="M" />
          <FlipDigit digit={minutes[1]} label="M" />
          <div className="text-6xl text-white font-bold animate-pulse">:</div>
          <FlipDigit digit={seconds[0]} label="S" />
          <FlipDigit digit={seconds[1]} label="S" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <FlipDigit digit={hours[0]} label="H" />
      <FlipDigit digit={hours[1]} label="H" />
      <div className="text-2xl text-zen-600 dark:text-zen-400 font-bold animate-pulse">:</div>
      <FlipDigit digit={minutes[0]} label="M" />
      <FlipDigit digit={minutes[1]} label="M" />
      <div className="text-2xl text-zen-600 dark:text-zen-400 font-bold animate-pulse">:</div>
      <FlipDigit digit={seconds[0]} label="S" />
      <FlipDigit digit={seconds[1]} label="S" />
    </div>
  );
};

export default FlipClock;
