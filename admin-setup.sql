
-- To make a user an admin, replace 'user-email-here' with the actual email address
-- Run this in your Supabase SQL Editor after the user has signed up

UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- To verify the admin role was set:
SELECT id, email, full_name, role, created_at 
FROM public.profiles 
WHERE role = 'admin';
