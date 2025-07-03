// utils/storage.ts
import { User } from '@/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

const FAVORITES_KEY = 'FAVORITES_LIST';
export const FAVORITES_HOUR_COUNT = 'FAVORITES_HOUR_COUNT';

export const exportFavoritesToFile = async () => {
  try {
    const favorites = await getFavorites();
    const content = JSON.stringify(favorites, null, 2);
    const fileName = 'favorites.txt'; // <- changed to .txt
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    console.log('Exporting favorites to:', fileUri);

    // Step 1: Save the file locally
    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Step 3: Save file locally
    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    console.log('File saved at:', fileUri);

    // Step 4: Share the file
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert('Sharing not available');
      return;
    }

    await Sharing.shareAsync(fileUri);

    console.log('✅ Favorites successfully exported to Downloads folder as .txt!');
  } catch (error) {
    console.error('❌ Error exporting favorites:', error);
  }
};



export const getFavorites = async (): Promise<User[]> => {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const addFavorite = async (user: User) => {
  const existing = await getFavorites();
  const now = new Date();
  const timestamp = now.toISOString();
  const hour = now.getHours().toString(); // current hour as string key

  // Add favorited timestamp to user
  const withTimestamp = { ...user, favoritedAt: timestamp };
  const updated = [...existing.filter((u) => u.email !== user.email), withTimestamp];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

  // Increment per-hour favorite count
  const raw = await AsyncStorage.getItem(FAVORITES_HOUR_COUNT);
  const hourMap = raw ? JSON.parse(raw) : {};
  hourMap[hour] = (hourMap[hour] || 0) + 1;
  await AsyncStorage.setItem(FAVORITES_HOUR_COUNT, JSON.stringify(hourMap));
};


export const removeFavorite = async (email: string) => {
  const existing = await getFavorites();
  const updated = existing.filter(u => u.email !== email);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const isFavorite = async (email: string): Promise<boolean> => {
  const existing = await getFavorites();
  return existing.some(u => u.email === email);
};

export const clearFavorites = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
    console.log('Favorites cleared successfully');
  } catch (error) {
    console.error('Failed to clear favorites:', error);
  }
};
