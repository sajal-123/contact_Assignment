import { User } from '@/types/types';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ZoomIn,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const ContactDetailScreen = () => {
  const { user } = useLocalSearchParams();
  const parsedUser: User = user ? JSON.parse(user as string) : null;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const themeColors = {
    background: isDark ? '#0D0D0D' : '#FDFDFD',
    text: isDark ? '#FFFFFF' : '#1C1C1C',
    secondaryText: isDark ? '#BBBBBB' : '#555555',
    card: isDark ? '#1F1F1F' : '#F2F2F2',
    border: isDark ? '#2C2C2C' : '#DDDDDD',
  };

  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(x.value) },
      { translateY: withSpring(y.value) },
    ],
  }));

  if (!parsedUser) {
    return (
      <View style={[styles.centered, { backgroundColor: themeColors.background }]}>
        <Text style={{ color: 'red' }}>User not found.</Text>
      </View>
    );
  }

  const Line = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.line}>
      <Text
        style={[styles.lineLabel, { color: themeColors.text }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
      <Text
        style={[styles.lineValue, { color: themeColors.secondaryText }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: themeColors.background }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={ZoomIn} style={styles.avatarContainer}>
          <Image source={{ uri: parsedUser.picture.large }} style={styles.avatar} />
          <Text style={[styles.name, { color: themeColors.text }]}>
            {parsedUser.name.title} {parsedUser.name.first} {parsedUser.name.last}
          </Text>
          <Text style={[styles.email, { color: themeColors.secondaryText }]}>
            {parsedUser.email}
          </Text>
        </Animated.View>

        {/* Draggable Card */}
        <PanGestureHandler
          onGestureEvent={(event) => {
            x.value = event.nativeEvent.translationX;
            y.value = event.nativeEvent.translationY;
          }}
          onEnded={() => {
            x.value = 0;
            y.value = 0;
          }}
        >
          <Animated.View
            style={[
              styles.card,
              animatedStyle,
              {
                backgroundColor: themeColors.card,
                borderColor: themeColors.border,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              📞 Contact
            </Text>
            <Line label="Phone" value={parsedUser.phone} />
            <Line label="Cell" value={parsedUser.cell} />
          </Animated.View>
        </PanGestureHandler>

        <Animated.View
          entering={FadeIn.delay(200)}
          style={[
            styles.card,
            { backgroundColor: themeColors.card, borderColor: themeColors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            🌍 Location
          </Text>
          <Line
            label="Street"
            value={`${parsedUser.location.street.number} ${parsedUser.location.street.name}`}
          />
          <Line label="City" value={parsedUser.location.city} />
          <Line label="State" value={parsedUser.location.state} />
          <Line label="Country" value={parsedUser.location.country} />
          <Line label="Postcode" value={parsedUser.location.postcode.toString()} />
          <Line
            label="Coordinates"
            value={`${parsedUser.location.coordinates.latitude}, ${parsedUser.location.coordinates.longitude}`}
          />
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(400)}
          style={[
            styles.card,
            { backgroundColor: themeColors.card, borderColor: themeColors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            👤 Personal Info
          </Text>
          <Line label="Gender" value={parsedUser.gender} />
          <Line
            label="DOB"
            value={new Date(parsedUser.dob.date).toLocaleDateString()}
          />
          <Line label="Age" value={parsedUser.dob.age.toString()} />
          <Line label="Nationality" value={parsedUser.nat} />
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(600)}
          style={[
            styles.card,
            { backgroundColor: themeColors.card, borderColor: themeColors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            🔐 Login Info
          </Text>
          <Line label="Username" value={parsedUser.login.username} />
          <Line label="Password" value={parsedUser.login.password} />
          <Line label="UUID" value={parsedUser.login.uuid} />
        </Animated.View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  email: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 4,
  },
  lineLabel: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    paddingRight: 6,
  },
  lineValue: {
    fontSize: 14,
    flex: 2,
    textAlign: 'right',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactDetailScreen;
