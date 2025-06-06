
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from './AuthModal';
import { LogOut, User, Settings, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    }
  };

  return (
    <header className="border-b border-white/20 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">LP</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Learning Platform
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-indigo-200 dark:ring-purple-500/30 hover:ring-indigo-300 dark:hover:ring-purple-400/50 transition-all">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold">
                      {profile.full_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border border-white/20 dark:border-slate-700/50" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-3">
                  <p className="text-sm font-medium leading-none text-slate-900 dark:text-slate-100">{profile.full_name}</p>
                  <p className="text-xs leading-none text-slate-600 dark:text-slate-400">{profile.email}</p>
                  {isAdmin && (
                    <div className="flex items-center space-x-1 mt-2">
                      <Shield className="h-3 w-3 text-amber-500" />
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Admin</span>
                    </div>
                  )}
                </div>
                <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                <DropdownMenuItem className="cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-purple-900/50">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-purple-900/50">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem className="cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-purple-900/50">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Portal</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setAuthModalOpen(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all">
              Sign In
            </Button>
          )}
        </div>
      </div>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </header>
  );
};
