
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
    <div className="group relative overflow-hidden bg-gradient-to-br from-sage-50 to-sage-100 dark:from-sage-900/30 dark:to-sage-800/30 rounded-2xl p-8 shadow-lg border-0 backdrop-blur-sm transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-sage-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <h3 className="text-xl font-semibold mb-8 text-center text-card-foreground flex items-center justify-center">
          <div className="w-1 h-6 bg-sage-500 rounded-full mr-3" />
          🧘 Breathing Exercise (4-7-8)
        </h3>
        
        <div className="flex flex-col items-center space-y-8">
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Outer glow ring */}
            <div 
              className={`absolute w-36 h-36 rounded-full transition-all duration-[4000ms] ease-in-out ${
                isActive ? 'ring-4 ring-sage-300/50 dark:ring-sage-600/50' : ''
              }`}
            />
            
            {/* Main breathing circle */}
            <div 
              className={`relative w-28 h-28 rounded-full transition-all duration-[4000ms] ease-in-out ${circleColor} ${
                isActive ? circleScale : 'scale-100'
              } opacity-80 shadow-2xl`}
            >
              {/* Inner pulse effect */}
              <div className="absolute inset-2 bg-white/30 rounded-full animate-pulse" />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
              
              {/* Timer display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-white mix-blend-difference drop-shadow-lg">
                  {timeLeft}
                </span>
              </div>
            </div>
            
            {/* Breathing instruction ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-32 h-32 border-2 border-dashed rounded-full transition-all duration-1000 ${
                phase === 'inhale' ? 'border-green-400 scale-110' : 
                phase === 'hold' ? 'border-yellow-400 scale-110' : 
                'border-blue-400 scale-90'
              }`} />
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <div className="relative">
              <p className="text-2xl font-semibold text-card-foreground mb-2 transition-all duration-300">
                {phases[phase].instruction}
              </p>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full" />
            </div>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-sage-500 rounded-full animate-pulse" />
                <span>Cycle: {cycle}</span>
              </div>
              <div className="w-1 h-4 bg-muted-foreground/30 rounded-full" />
              <span className="capitalize">{phase} Phase</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button
              onClick={toggleExercise}
              size="lg"
              className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {isActive ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button 
              onClick={reset} 
              variant="outline" 
              size="lg"
              className="hover:scale-105 transition-all duration-300"
            >
              Reset
            </Button>
          </div>
          
          {cycle > 0 && (
            <div className="w-full p-4 bg-sage-100 dark:bg-sage-900/50 rounded-xl animate-slide-up">
              <p className="text-center text-sage-700 dark:text-sage-300 text-sm">
                Great progress! You've completed {cycle} breathing cycle{cycle !== 1 ? 's' : ''}. 
                <br />
                <span className="font-medium">Keep focusing on your breath.</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;
