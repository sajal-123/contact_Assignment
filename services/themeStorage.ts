// services/themeStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'APP_THEME';

export const setStoredTheme = async (theme: Theme) => {
  await AsyncStorage.setItem(THEME_KEY, theme);
};

export const getStoredTheme = async (): Promise<Theme | null> => {
  const stored = await AsyncStorage.getItem(THEME_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
};
