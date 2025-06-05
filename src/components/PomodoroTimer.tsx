
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const { toast } = useToast();

  const workTime = 25 * 60;
  const breakTime = 5 * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(breakTime);
        toast({
          title: "Work session complete!",
          description: "Time for a 5-minute break.",
        });
      } else {
        setMode('work');
        setTimeLeft(workTime);
        toast({
          title: "Break time over!",
          description: "Ready for another focused work session?",
        });
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, toast]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? workTime : breakTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressValue = ((mode === 'work' ? workTime : breakTime) - timeLeft) / (mode === 'work' ? workTime : breakTime) * 100;

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border animate-fade-in">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">
          {mode === 'work' ? '🍅 Focus Time' : '☕ Break Time'}
        </h3>
        
        <div className="text-6xl font-mono font-bold mb-4 text-primary">
          {formatTime(timeLeft)}
        </div>
        
        <Progress value={progressValue} className="mb-6" />
        
        <div className="flex justify-center space-x-3">
          <Button
            onClick={toggleTimer}
            size="lg"
            className="bg-ocean-500 hover:bg-ocean-600 text-white"
          >
            {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
