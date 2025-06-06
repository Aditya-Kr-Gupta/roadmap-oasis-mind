
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Shield, Users, BookOpen, BarChart3, Plus, Edit, Trash2 } from 'lucide-react';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface TaskStats {
  totalTasks: number;
  totalUsers: number;
  totalProgress: number;
  completionRate: number;
}

const AdminPortal: React.FC = () => {
  const { profile, isAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<TaskStats>({
    totalTasks: 0,
    totalUsers: 0,
    totalProgress: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchStats();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error fetching users",
        description: "Failed to load user data.",
        variant: "destructive",
      });
    }
  };

  const fetchStats = async () => {
    try {
      // Get total tasks
      const { data: tasks, error: tasksError } = await supabase
        .from('roadmap_tasks')
        .select('id');

      if (tasksError) throw tasksError;

      // Get total users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id');

      if (profilesError) throw profilesError;

      // Get total progress records
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('id, completed');

      if (progressError) throw progressError;

      const totalTasks = tasks?.length || 0;
      const totalUsers = profiles?.length || 0;
      const totalProgress = progress?.length || 0;
      const completedProgress = progress?.filter(p => p.completed).length || 0;
      const completionRate = totalProgress > 0 ? (completedProgress / totalProgress) * 100 : 0;

      setStats({
        totalTasks,
        totalUsers,
        totalProgress,
        completionRate,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));

      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}.`,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error updating role",
        description: "Failed to update user role.",
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return (
      <Card className="text-center py-12">
        <CardHeader>
          <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to access the admin portal.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription>Manage users, content, and monitor platform analytics</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-card-foreground">{stats.totalUsers}</h3>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-card-foreground">{stats.totalTasks}</h3>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-card-foreground">{stats.totalProgress}</h3>
            <p className="text-sm text-muted-foreground">Progress Records</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-2xl font-bold text-card-foreground">{stats.completionRate.toFixed(1)}%</h3>
            <p className="text-sm text-muted-foreground">Avg Completion</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{user.full_name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined: {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                      {user.id !== profile?.id && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateUserRole(
                            user.id, 
                            user.role === 'admin' ? 'user' : 'admin'
                          )}
                        >
                          {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>
                Manage roadmap tasks and categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Content Management</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced content management features coming soon
                </p>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <CardDescription>
                Monitor platform usage and user engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">User Engagement</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Active Users</span>
                      <span className="text-sm font-medium">{stats.totalUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Completion Rate</span>
                      <span className="text-sm font-medium">{stats.completionRate.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Content Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Tasks</span>
                      <span className="text-sm font-medium">{stats.totalTasks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Progress Records</span>
                      <span className="text-sm font-medium">{stats.totalProgress}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPortal;
