'use client';

import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { useToast } from '@/components/ui/toast';

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  memberSince: string;
}

const PROFILE_STORAGE_KEY = 'furnixo_user_profile';

const defaultProfile: UserProfile = {
  fullName: 'MD RUHUL AMIN',
  email: 'ruhul@furnixo.com',
  phone: '+880 1700-123456',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  memberSince: 'January 2026',
};

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const { addToast } = useToast();

  useEffect(() => {
    const stored = storage.get<UserProfile>(PROFILE_STORAGE_KEY, defaultProfile);
    setProfile(stored);
  }, []);

  const updateProfile = (updated: Partial<UserProfile>) => {
    const next = { ...profile, ...updated };
    setProfile(next);
    storage.set(PROFILE_STORAGE_KEY, next);
    addToast({
      title: 'Profile Updated',
      description: 'Your personal account details have been saved.',
      variant: 'success',
    });
  };

  return {
    profile,
    updateProfile,
  };
}

export default useProfile;
