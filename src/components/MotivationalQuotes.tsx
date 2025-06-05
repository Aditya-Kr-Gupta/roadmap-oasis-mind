
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
    <div className="group relative overflow-hidden bg-gradient-to-br from-coral-50 to-coral-100 dark:from-coral-900/30 dark:to-coral-800/30 rounded-2xl p-8 shadow-lg border-0 backdrop-blur-sm transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-coral-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg animate-glow">
              <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Daily Motivation</h3>
          </div>
          <Button
            onClick={getRandomQuote}
            variant="ghost"
            size="sm"
            className="hover:bg-white/50 dark:hover:bg-black/50 hover:scale-110 transition-all duration-300"
          >
            <RefreshCw className={`h-5 w-5 ${isAnimating ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <div className="relative">
          <blockquote 
            className={`text-lg italic text-coral-700 dark:text-coral-300 transition-all duration-500 leading-relaxed ${
              isAnimating ? 'opacity-0 transform translate-y-8 scale-95' : 'opacity-100 transform translate-y-0 scale-100'
            }`}
          >
            <span className="text-3xl text-coral-500 dark:text-coral-400">"</span>
            {currentQuote}
            <span className="text-3xl text-coral-500 dark:text-coral-400">"</span>
          </blockquote>
          
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-coral-500 via-coral-400 to-transparent rounded-full opacity-60" />
        </div>
        
        <div className="mt-6 flex items-center justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-coral-400 dark:bg-coral-500 rounded-full animate-bounce-gentle"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuotes;
