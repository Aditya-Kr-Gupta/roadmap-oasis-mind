
import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(0);

  const phases = {
    inhale: { duration: 4, next: 'hold', instruction: 'Breathe In' },
    hold: { duration: 7, next: 'exhale', instruction: 'Hold' },
    exhale: { duration: 8, next: 'inhale', instruction: 'Breathe Out' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const currentPhase = phases[phase];
      const nextPhase = currentPhase.next as keyof typeof phases;
      
      setPhase(nextPhase);
      setTimeLeft(phases[nextPhase].duration);
      
      if (phase === 'exhale') {
        setCycle(c => c + 1);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, phase]);

  const toggleExercise = () => {
    if (!isActive) {
      setPhase('inhale');
      setTimeLeft(4);
    }
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(4);
    setCycle(0);
  };

  const circleScale = phase === 'inhale' ? 'scale-150' : phase === 'hold' ? 'scale-150' : 'scale-75';
  const circleColor = phase === 'inhale' ? 'bg-green-400' : phase === 'hold' ? 'bg-yellow-400' : 'bg-blue-400';

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border animate-fade-in">
      <h3 className="text-lg font-semibold mb-6 text-center text-card-foreground">
        🧘 Breathing Exercise (4-7-8)
      </h3>
      
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div 
            className={`w-24 h-24 rounded-full transition-all duration-[4000ms] ease-in-out ${circleColor} ${
              isActive ? circleScale : 'scale-100'
            } opacity-70`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white mix-blend-difference">
              {timeLeft}
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xl font-medium text-card-foreground mb-2">
            {phases[phase].instruction}
          </p>
          <p className="text-sm text-muted-foreground">
            Cycle: {cycle} completed
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={toggleExercise}
            size="lg"
            className="bg-ocean-500 hover:bg-ocean-600 text-white"
          >
            {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button onClick={reset} variant="outline" size="lg">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;
