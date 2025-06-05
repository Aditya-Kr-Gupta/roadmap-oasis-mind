
import React, { useState, useEffect } from 'react';
import { RefreshCw, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quotes = [
  "The expert in anything was once a beginner. — Helen Hayes",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
  "Code is like humor. When you have to explain it, it's bad. — Cory House",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Programming isn't about what you know; it's about what you can figure out. — Chris Pine",
  "The best way to learn to program is to write programs. — Brian Kernighan",
  "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it. — Patrick McKenzie"
];

const MotivationalQuotes: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    // Change quote every 30 seconds
    const interval = setInterval(getRandomQuote, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-ocean-50 to-zen-100 dark:from-ocean-900 dark:to-zen-800 rounded-xl p-6 shadow-lg border animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-card-foreground">Daily Motivation</h3>
        </div>
        <Button
          onClick={getRandomQuote}
          variant="ghost"
          size="sm"
          className="hover:bg-white/50 dark:hover:bg-black/50"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <blockquote 
        className={`text-lg italic text-zen-700 dark:text-zen-300 transition-all duration-300 ${
          isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}
      >
        "{currentQuote}"
      </blockquote>
    </div>
  );
};

export default MotivationalQuotes;
