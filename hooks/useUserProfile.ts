'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/userProfile';
import { UserProfileManager } from '@/lib/userProfile';
import { ProfileStorage } from '@/lib/aiAdaptationEngine';
import { UserEventTracker } from '@/lib/trackingEvents';

/**
 * Hook for managing user profile and tracking
 */
export function useUserProfile(userId: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        let userProfile = await ProfileStorage.loadProfile(userId);
        
        // Create default profile if none exists
        if (!userProfile) {
          console.log('🆕 Creating new profile for user:', userId);
          userProfile = UserProfileManager.createNewProfile(userId);
          await ProfileStorage.saveProfile(userProfile);
        }
        
        setProfile(userProfile);
        setError(null);
      } catch (err) {
        console.error('❌ Error loading profile:', err);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadProfile();
    }
  }, [userId]);

  /**
   * Update profile and save to storage
   */
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      ...updates,
      lastActive: new Date().toISOString()
    };

    setProfile(updatedProfile);
    await ProfileStorage.saveProfile(updatedProfile);
  };

  /**
   * Track word selection and update profile
   */
  const trackWordSelection = async (
    selectedWords: any[],
    availableWords: any[],
    sessionContext: any
  ) => {
    if (!profile) return;

    const event = await UserEventTracker.trackWordSelection(
      userId,
      selectedWords,
      availableWords,
      sessionContext
    );

    // Update profile based on event
    const updatedProfile = await UserEventTracker.updateUserProfile(userId, profile, event);
    setProfile(updatedProfile);
    await ProfileStorage.saveProfile(updatedProfile);
  };

  /**
   * Track session completion and update profile
   */
  const trackSessionCompletion = async (sessionData: {
    wordsCompleted: number;
    totalWords: number;
    duration: number;
    modes: string[];
    avgTimePerInteraction: number;
    skippedInteractions: number;
    totalInteractions: number;
    userInputLength: number;
  }) => {
    if (!profile) return;

    const event = await UserEventTracker.trackMiniSessionCompletion(
      userId,
      sessionData
    );

    // Update profile based on event
    const updatedProfile = await UserEventTracker.updateUserProfile(userId, profile, event);
    setProfile(updatedProfile);
    await ProfileStorage.saveProfile(updatedProfile);
  };

  /**
   * Track individual interaction
   */
  const trackInteraction = async (interactionData: {
    word: string;
    mode: string;
    displayType: string;
    timeSpent: number;
    completed: boolean;
    userResponse: any;
  }) => {
    await UserEventTracker.trackInteraction(userId, interactionData);
  };

  /**
   * Reset profile to default
   */
  const resetProfile = async () => {
    const newProfile = UserProfileManager.createNewProfile(userId);
    setProfile(newProfile);
    await ProfileStorage.saveProfile(newProfile);
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    trackWordSelection,
    trackSessionCompletion,
    trackInteraction,
    resetProfile
  };
}

/**
 * Get or create a user ID
 */
export function getOrCreateUserId(): string {
  const storageKey = 'aureus_user_id';
  
  let userId = localStorage.getItem(storageKey);
  
  if (!userId) {
    // Generate a simple user ID
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(storageKey, userId);
    console.log('🆔 Created new user ID:', userId);
  }
  
  return userId;
}
