
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Sound {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
}

const sounds: Sound[] = [
  { id: 'ocean', name: 'Ocean Waves', icon: '🌊', color: 'blue', gradient: 'from-blue-400 to-cyan-500' },
  { id: 'rain', name: 'Rain Sounds', icon: '🌧️', color: 'gray', gradient: 'from-gray-400 to-blue-500' },
  { id: 'forest', name: 'Forest Ambience', icon: '🌲', color: 'green', gradient: 'from-green-400 to-emerald-500' },
  { id: 'fire', name: 'Crackling Fire', icon: '🔥', color: 'orange', gradient: 'from-orange-400 to-red-500' },
  { id: 'birds', name: 'Bird Songs', icon: '🐦', color: 'yellow', gradient: 'from-yellow-400 to-orange-500' },
  { id: 'thunder', name: 'Thunder Storm', icon: '⛈️', color: 'purple', gradient: 'from-purple-400 to-gray-600' },
  { id: 'wind', name: 'Wind Chimes', icon: '🎋', color: 'teal', gradient: 'from-teal-400 to-cyan-500' },
  { id: 'cafe', name: 'Coffee Shop', icon: '☕', color: 'brown', gradient: 'from-amber-600 to-orange-700' },
  { id: 'white', name: 'White Noise', icon: '📻', color: 'gray', gradient: 'from-gray-300 to-gray-500' },
];

const RelaxationSounds: React.FC = () => {
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [volume, setVolume] = useState([75]);
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = (soundId: string) => {
    if (playingSound === soundId) {
      setPlayingSound(null);
    } else {
      setPlayingSound(soundId);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border-0 backdrop-blur-sm animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-card-foreground flex items-center">
          <div className="w-1 h-6 bg-sage-500 rounded-full mr-3" />
          🎵 Relaxation Therapy
        </h3>
        <div className="flex items-center space-x-3">
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="sm"
            className="hover:bg-sage-100 dark:hover:bg-sage-800"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <div className="flex items-center space-x-2 min-w-[120px]">
            <VolumeX className="h-3 w-3 text-muted-foreground" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
            />
            <Volume2 className="h-3 w-3 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sounds.map((sound, index) => (
          <div
            key={sound.id}
            className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Button
              onClick={() => toggleSound(sound.id)}
              variant="outline"
              className={`w-full h-24 p-4 border-0 bg-gradient-to-br ${sound.gradient} text-white hover:opacity-90 transition-all duration-300 ${
                playingSound === sound.id ? 'ring-2 ring-white shadow-2xl' : ''
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl animate-float">{sound.icon}</span>
                  {playingSound === sound.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </div>
                <span className="text-sm font-medium">{sound.name}</span>
              </div>
            </Button>
            
            {playingSound === sound.id && (
              <div className="absolute inset-0 border-2 border-white rounded-xl animate-pulse" />
            )}
            
            {playingSound === sound.id && (
              <div className="absolute bottom-2 left-2 right-2">
                <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full animate-shimmer" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {playingSound && (
        <div className="mt-6 p-4 bg-sage-50 dark:bg-sage-900/50 rounded-xl animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-sage-700 dark:text-sage-300">
                Now Playing: {sounds.find(s => s.id === playingSound)?.name}
              </span>
            </div>
            <Button
              onClick={() => setPlayingSound(null)}
              variant="ghost"
              size="sm"
              className="text-sage-600 hover:text-sage-800 dark:text-sage-400 dark:hover:text-sage-200"
            >
              Stop All
            </Button>
          </div>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        🎧 Use headphones for the best relaxation experience
      </p>
    </div>
  );
};

export default RelaxationSounds;
