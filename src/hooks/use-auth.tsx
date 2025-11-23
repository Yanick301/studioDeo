'use client';

import React, { createContext, useContext, useMemo, useCallback } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { useFirebase, useUser } from '@/firebase';
import { useToast } from './use-toast';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  isUserLoading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { auth } = useFirebase();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      router.push('/');
    } catch (error) {
      console.error('Google login failed:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Could not sign you in with Google. Please try again.',
      });
    }
  }, [auth, toast, router]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'Could not log you out. Please try again.',
      });
    }
  }, [auth, toast, router]);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const value = useMemo(
    () => ({
      user,
      isUserLoading,
      isAuthenticated,
      loginWithGoogle,
      logout,
    }),
    [user, isUserLoading, isAuthenticated, loginWithGoogle, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
