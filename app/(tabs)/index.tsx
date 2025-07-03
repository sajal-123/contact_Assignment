import ContactCard from '@/components/ContactCard';
import { useContacts } from '@/hooks/useContact'; // assuming your hook path
import { User } from '@/types/types';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
const ContactsScreen = () => {
  const { contacts, error, loading } = useContacts();
  const [search, setSearch] = useState('');
  const theme = useColorScheme(); // 'light' or 'dark'

  const filteredContacts = contacts.filter((contact: User) =>
    `${contact.name.title} ${contact.name.first} ${contact.name.last}`.toLowerCase().includes(search.toLowerCase())
  );

  const isDark = theme === 'dark';

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: isDark ? '#000' : '#fff' }}>
      <TextInput
        placeholder="Search by name..."
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={search}
        onChangeText={setSearch}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#1c1c1e' : '#f0f0f0',
            color: isDark ? '#fff' : '#000',
          },
        ]}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => <ContactCard user={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default ContactsScreen;

/**
 * import ContactCard from '@/components/ContactCard';
import { useContacts } from '@/hooks/useContact';
import { User } from '@/types/types';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ContactsScreen = () => {
  const { contacts, error, loading } = useContacts();
  const [search, setSearch] = useState('');
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const filteredContacts = contacts.filter((contact: User) =>
    `${contact.name.title} ${contact.name.first} ${contact.name.last}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const renderSkeletons = () => (
    <SkeletonPlaceholder
      backgroundColor={isDark ? '#2A2A2C' : '#E1E9EE'}
      highlightColor={isDark ? '#3A3A3C' : '#F2F8FC'}
    >
      {[...Array(6)].map((_, i) => (
        <View key={i} style={styles.skeletonCard}>
          <View style={styles.skeletonAvatar} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={styles.skeletonLine} />
            <View style={[styles.skeletonLine, { width: '50%', marginTop: 6 }]} />
          </View>
        </View>
      ))}
    </SkeletonPlaceholder>
  );

  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: isDark ? '#000' : '#fff' }}>
      <TextInput
        placeholder="Search by name..."
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={search}
        onChangeText={setSearch}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#1c1c1e' : '#f0f0f0',
            color: isDark ? '#fff' : '#000',
          },
        ]}
      />

      {loading ? (
        renderSkeletons()
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => <ContactCard user={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  skeletonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 10,
  },
  skeletonAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  skeletonLine: {
    height: 14,
    borderRadius: 4,
    width: '80%',
  },
});

export default ContactsScreen;

 */