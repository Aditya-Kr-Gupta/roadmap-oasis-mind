
import React, { useState } from 'react';
import { Brain, Target, Clock, BarChart3, Maximize2, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import DailyRoadmap from '@/components/DailyRoadmap';
import MotivationalQuotes from '@/components/MotivationalQuotes';
import BreathingExercise from '@/components/BreathingExercise';
import PomodoroTimer from '@/components/PomodoroTimer';
import ProgressAnalytics from '@/components/ProgressAnalytics';
import FlipClock from '@/components/FlipClock';
import RelaxationSounds from '@/components/RelaxationSounds';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const [isClockFullscreen, setIsClockFullscreen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-zen-50 via-pixel-50 to-sage-50 dark:from-zen-900 dark:via-pixel-900 dark:to-sage-900 transition-all duration-700">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pixel-200/20 dark:bg-pixel-800/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sage-200/20 dark:bg-sage-800/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-coral-200/20 dark:bg-coral-800/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        {/* Header */}
        <header className="relative bg-white/90 dark:bg-zen-800/90 backdrop-blur-xl border-b border-zen-200/50 dark:border-zen-700/50 sticky top-0 z-40 shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 animate-slide-in-left">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-pixel-500 to-sage-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-coral-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-pixel-600 via-sage-600 to-coral-600 bg-clip-text text-transparent">
                    ManasMitra
                  </h1>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Your mindful learning companion
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 animate-slide-in-right">
                <Button
                  onClick={() => setIsClockFullscreen(true)}
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center space-x-2 glass-morphism hover:scale-105 transition-all duration-300"
                >
                  <Maximize2 className="h-4 w-4" />
                  <span>Full Clock</span>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative container mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-12 text-center animate-fade-in">
            <h2 className="text-5xl font-bold text-zen-800 dark:text-zen-100 mb-6 leading-tight">
              Welcome to Your
              <span className="block bg-gradient-to-r from-pixel-600 via-sage-600 to-coral-600 bg-clip-text text-transparent">
                Learning Journey 🚀
              </span>
            </h2>
            <p className="text-xl text-zen-600 dark:text-zen-400 max-w-3xl mx-auto leading-relaxed">
              Master full-stack development with daily guided tasks, mindful breaks, and focused productivity techniques.
              <br />
              <span className="text-pixel-600 dark:text-pixel-400 font-medium">Transform your potential into expertise.</span>
            </p>
          </div>

          {/* Current Time Display */}
          <div className="mb-12 flex justify-center animate-scale-in">
            <div className="glass-morphism rounded-3xl p-8 shadow-2xl border-0 hover:scale-105 transition-all duration-300">
              <FlipClock isFullscreen={false} onClose={() => {}} />
            </div>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="roadmap" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-2 glass-morphism border-0 shadow-lg">
              <TabsTrigger 
                value="roadmap" 
                className="flex items-center space-x-3 py-4 px-6 data-[state=active]:bg-pixel-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
              >
                <Target className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Roadmap</span>
              </TabsTrigger>
              <TabsTrigger 
                value="productivity" 
                className="flex items-center space-x-3 py-4 px-6 data-[state=active]:bg-sage-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
              >
                <Clock className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Focus</span>
              </TabsTrigger>
              <TabsTrigger 
                value="wellness" 
                className="flex items-center space-x-3 py-4 px-6 data-[state=active]:bg-coral-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
              >
                <Brain className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Wellness</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex items-center space-x-3 py-4 px-6 data-[state=active]:bg-zen-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
              >
                <BarChart3 className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Analytics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="flex items-center space-x-3 py-4 px-6 data-[state=active]:bg-indigo-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Profile</span>
              </TabsTrigger>
            </TabsList>

            {/* Roadmap Tab */}
            <TabsContent value="roadmap" className="space-y-8">
              <DailyRoadmap />
            </TabsContent>

            {/* Productivity Tab */}
            <TabsContent value="productivity" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PomodoroTimer />
                <div className="bg-card rounded-2xl p-8 shadow-lg border-0 backdrop-blur-sm animate-slide-in-right">
                  <h3 className="text-xl font-semibold mb-6 text-card-foreground flex items-center">
                    <div className="w-1 h-6 bg-coral-500 rounded-full mr-3" />
                    🚫 Focus Enhancement
                  </h3>
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-pixel-50 to-sage-50 dark:from-pixel-900/50 dark:to-sage-900/50 rounded-xl border border-pixel-200 dark:border-pixel-700">
                      <h4 className="font-semibold mb-3 text-pixel-700 dark:text-pixel-300">💡 Productivity Tips</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-pixel-500 rounded-full mr-3" />
                          Turn off non-essential notifications
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-sage-500 rounded-full mr-3" />
                          Use website blockers during study time
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-coral-500 rounded-full mr-3" />
                          Keep your phone in another room
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-zen-500 rounded-full mr-3" />
                          Use the Pomodoro technique consistently
                        </li>
                      </ul>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Block Distractions (Coming Soon)
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Wellness Tab */}
            <TabsContent value="wellness" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MotivationalQuotes />
                <BreathingExercise />
              </div>
              
              {/* Relaxation Section */}
              <RelaxationSounds />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-8">
              <ProgressAnalytics />
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-8">
              <UserProfile />
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="relative bg-white/50 dark:bg-zen-800/50 backdrop-blur-sm border-t border-zen-200/50 dark:border-zen-700/50 mt-20">
          <div className="container mx-auto px-6 py-12">
            <div className="text-center">
              <p className="text-zen-800 dark:text-zen-200 text-lg mb-2">
                Built with 💙 for mindful learning and productivity
              </p>
              <p className="text-sm text-zen-600 dark:text-zen-400">
                Stay focused, stay motivated, achieve your goals with <span className="font-semibold text-pixel-600 dark:text-pixel-400">ManasMitra</span>
              </p>
            </div>
          </div>
        </footer>

        {/* Fullscreen Clock Modal */}
        {isClockFullscreen && (
          <FlipClock
            isFullscreen={true}
            onClose={() => setIsClockFullscreen(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
