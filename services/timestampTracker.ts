// utils/timestampTracker.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITES_HOUR_COUNT } from './storage';
export const getFavoritesHourCount = async (): Promise<Record<string, number>> => {
  const raw = await AsyncStorage.getItem(FAVORITES_HOUR_COUNT);
  return raw ? JSON.parse(raw) : {};
};