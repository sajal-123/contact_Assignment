const tintColorLight = '#0a7ea4';
const tintColorDark = '#ffffff';

export const Colors = {
  light: {
    // Primary UI
    background: '#FFFFFF',
    cardBackground: '#F9FAFB',
    surface: '#F1F5F9',
    border: '#E5E7EB',

    // Text
    text: '#11181C',
    textSecondary: '#4B5563',
    textDisabled: '#9CA3AF',
    heading: '#0F172A',

    // Icon
    icon: '#4B5563',
    iconActive: '#0A7EA4',

    // Buttons
    buttonBackground: '#0A7EA4',
    buttonText: '#FFFFFF',
    buttonSecondary: '#E0F2FE',

    // Tabs / Navigation
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    tabBarBackground: '#F9FAFB',

    // Accents
    tint: tintColorLight,
    highlight: '#E0F2FE',
    error: '#DC2626',
    success: '#16A34A',
    warning: '#F59E0B',
  },

  dark: {
    // Primary UI
    background: '#151718',
    cardBackground: '#1F1F1F',
    surface: '#222222',
    border: '#2D2D2D',

    // Text
    text: '#ECEDEE',
    textSecondary: '#A1A1AA',
    textDisabled: '#52525B',
    heading: '#F3F4F6',

    // Icon
    icon: '#9BA1A6',
    iconActive: '#FFFFFF',

    // Buttons
    buttonBackground: '#FFFFFF',
    buttonText: '#0A7EA4',
    buttonSecondary: '#334155',

    // Tabs / Navigation
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    tabBarBackground: '#1F1F1F',

    // Accents
    tint: tintColorDark,
    highlight: '#334155',
    error: '#F87171',
    success: '#4ADE80',
    warning: '#FACC15',
  },
};
