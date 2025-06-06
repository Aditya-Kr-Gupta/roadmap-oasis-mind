
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import UserProfile from "@/components/UserProfile";
import DailyRoadmap from "@/components/DailyRoadmap";
import ProgressAnalytics from "@/components/ProgressAnalytics";
import AdminPortal from "@/components/AdminPortal";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { Shield, User, Calendar, BarChart3 } from "lucide-react";

const Index = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-purple-950 dark:to-indigo-950">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-muted rounded-lg"></div>
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-purple-950 dark:to-indigo-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
            Learning Platform
          </h1>
          <p className="text-lg text-muted-foreground">
            Master full-stack development with our comprehensive 90-day roadmap
          </p>
        </div>

        <Tabs defaultValue="roadmap" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:flex bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/50">
            <TabsTrigger value="roadmap" className="flex items-center space-x-2 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-purple-900/50 dark:data-[state=active]:text-purple-300">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Roadmap</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-purple-900/50 dark:data-[state=active]:text-purple-300">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-purple-900/50 dark:data-[state=active]:text-purple-300">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="admin" className="flex items-center space-x-2 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-purple-900/50 dark:data-[state=active]:text-purple-300">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </TabsTrigger>
            )}
          </TabsList>

          <div className="mt-8">
            <TabsContent value="roadmap" className="space-y-6">
              <DailyRoadmap />
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <UserProfile />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <ProgressAnalytics />
            </TabsContent>

            {isAdmin && (
              <TabsContent value="admin" className="space-y-6">
                <AdminPortal />
              </TabsContent>
            )}
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
