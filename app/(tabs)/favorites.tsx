import ContactCard from '@/components/ContactCard';
import { Colors } from '@/constants/Colors'; // ✅ import theme colors
import { clearFavorites, exportFavoritesToFile, getFavorites } from '@/services/storage';
import { User } from '@/types/types';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useColorScheme();
  const colorPalette = Colors[theme ?? 'light'];

  const fetchFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
    setLoading(false);
  };

  const handleExport = async () => {
    await exportFavoritesToFile();
  };

  const handleClear = async () => {
    await clearFavorites();
    fetchFavorites();
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: colorPalette.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: colorPalette.heading }]}>Favorite Contacts</Text>
        <View style={styles.iconButtons}>
          <TouchableOpacity
            onPress={handleExport}
            style={[styles.iconButton, { backgroundColor: colorPalette.buttonBackground }]}
          >
            <Feather name="download" size={22} color={colorPalette.buttonText} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleClear}
            style={[
              styles.iconButton,
              { backgroundColor: colorPalette.buttonBackground, marginLeft: 8 },
            ]}
          >
            <Feather name="trash-2" size={22} color={colorPalette.buttonText} />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <Text style={[styles.statusText, { color: colorPalette.textSecondary }]}>Loading...</Text>
      ) : favorites.length === 0 ? (
        <Text style={[styles.statusText, { color: colorPalette.textSecondary }]}>
          No favorites found.
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => (
            <ContactCard user={item} onUnfavorite={fetchFavorites} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 6,
  },
  statusText: {
    textAlign: 'center',
    marginTop: 24,
  },
});

export default FavoritesScreen;
