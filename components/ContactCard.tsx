import { Colors } from '@/constants/Colors'; // ✅ import theme
import { addFavorite, isFavorite, removeFavorite } from '@/services/storage';
import { showToast } from '@/services/ToastUtil';
import { User } from '@/types/types';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';


interface Props {
  user: User;
  onUnfavorite?: () => void;
}

const ContactCard: React.FC<Props> = ({ user, onUnfavorite }) => {
  const [favorite, setFavorite] = useState(false);
  const theme = useColorScheme();
  const router = useRouter();
  const colorPalette = Colors[theme ?? 'light'];

  const handlePress = () => {
    router.push({
      pathname: '/contact/[email]',
      params: {
        email: user.email,
        user: JSON.stringify(user), // 👈 must be stringified
      },
    });
  };

  useEffect(() => {
    const checkFavorite = async () => {
      const fav = await isFavorite(user.email);
      setFavorite(fav);
    };
    checkFavorite();
  }, []);

  const handleFavoriteToggle = async () => {
    if (favorite) {
      await removeFavorite(user.email);
      showToast({
        message: 'User removed from favourite!',
        type: 'success',
        duration: 2000,
        position: 'top',
      });
      onUnfavorite?.();
    } else {
      await addFavorite(user);
      showToast({
        message: 'Added to favourite!',
        type: 'success',
        duration: 2000,
        position: 'top',
      });
    }
    setFavorite(!favorite);
  };

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colorPalette.cardBackground }]}
        onPress={handlePress}
      >
        <Image source={{ uri: user.picture.thumbnail }} style={styles.image} />
        <View style={styles.info}>
          <Text style={[styles.name, { color: colorPalette.text }]} numberOfLines={1}>
            {user.name.title} {user.name.first} {user.name.last}
          </Text>
          <Text style={[styles.email, { color: colorPalette.textSecondary }]} numberOfLines={1}>
            {user.email}
          </Text>
        </View>
        <TouchableOpacity onPress={handleFavoriteToggle}>
          <FontAwesome
            name={favorite ? 'star' : 'star-o'}
            size={20}
            color={favorite ? '#f1c40f' : colorPalette.icon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  email: {
    fontSize: 13,
  },
});

export default ContactCard;
