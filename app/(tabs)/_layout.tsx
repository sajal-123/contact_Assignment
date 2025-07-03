import CustomHeader from '@/components/Header';
import { showToast } from '@/services/ToastUtil';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';

export default function TabLayout() {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  const COLORS = useMemo(() => ({
    active: '#25D366',
    inactive: '#aaa',
    background: isDark ? '#25292e' : '#f5f5f5',
    ripple: isDark ? '#444' : '#ddd',
  }), [theme]);

  const header = () => (
    <CustomHeader
      onMenuPress={() => console.log('Menu pressed')}
      onProfilePress={() => console.log('Profile pressed')}
      onToggleTheme={() => {
        showToast({
          message: `React Native with Expo does not provide a direct hook to toggle themes. To implement dynamic theme switching, use a custom Context API (e.g., GlobalContext) to manage and toggle the theme manually. The useColorScheme hook only reflects the system's theme setting.`,
          type: 'success',
          duration: 5000,
          position: 'top',
        });
      }}

      currentTheme={theme}
    />
  );

  const customTabBarButton = (props: any) => (
    <Pressable
      android_ripple={{ color: COLORS.ripple }}
      style={({ pressed }) => [
        styles.tabButton,
        { opacity: pressed ? 0.6 : 1 },
      ]}
      {...props}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: { backgroundColor: COLORS.background, borderTopWidth: 0 },
        tabBarLabelStyle: { fontSize: 12 },
        header,
        tabBarButton: customTabBarButton,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person-circle' : 'person-circle-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'star' : 'star-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'bar-chart' : 'bar-chart-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
