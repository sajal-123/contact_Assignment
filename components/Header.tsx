import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomHeaderProps {
  onMenuPress: () => void;
  onToggleTheme: () => void;
  onProfilePress: () => void;
  currentTheme: 'light' | 'dark' | undefined | null;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  onMenuPress,
  onToggleTheme,
  onProfilePress,
  currentTheme,
}) => {
  const insets = useSafeAreaInsets();
  const colors = Colors[ currentTheme || 'light' ];
  const themeIcon = currentTheme === 'dark' ? 'sunny-outline' : 'moon-outline';

  // Animation for theme icon rotation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleThemeToggle = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
    ]).start();

    onToggleTheme();
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: insets.top + 5,
          backgroundColor: colors.cardBackground,
          borderBottomColor: colors.text + '33',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        },
      ]}
    >
      {/* Left Icon */}
      <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
        <Ionicons name="menu" size={26} color={colors.text} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={[styles.headerTitle, { color: colors.text }]}>Contacts Dashboard</Text>

      {/* Right Icons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity
          onPress={handleThemeToggle}
          style={[
            styles.iconButton,
            {
              backgroundColor:
                currentTheme === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(0,0,0,0.05)',
              borderRadius: 8,
            },
          ]}
        >
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Ionicons name={themeIcon} size={22} color={colors.text} />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onProfilePress} style={styles.iconButton}>
          <Ionicons name="person-circle-outline" size={26} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginLeft: -26, // Shift left to balance center due to right icons
  },
  iconButton: {
    padding: 6,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default CustomHeader;
