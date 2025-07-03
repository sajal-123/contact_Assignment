import Graph from '@/components/Graph';
import { getFavoritesHourCount } from '@/services/timestampTracker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const StatsScreen = () => {
  const [data, setData] = useState<{ hour: string; count: number }[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  const COLORS = {
    background: isDark ? '#1C1C1E' : '#F9FAFB',
    text: isDark ? '#FFFFFF' : '#1F2937',
    subtitle: isDark ? '#A1A1AA' : '#4B5563',
    bar: isDark ? '#60A5FA' : '#3B82F6',
    grid: isDark ? '#2C2C2E' : '#E5E7EB',
    axis: isDark ? '#9CA3AF' : '#374151',
    card: isDark ? '#2A2A2C' : '#FFFFFF',
    skeleton: isDark ? '#333' : '#e0e0e0',
  };

  useFocusEffect(
    useCallback(() => {
      prepareChartData();
    }, [])
  );

  const prepareChartData = async () => {
    setIsLoading(true);
    const hourMap = await getFavoritesHourCount();
    const now = new Date();
    const currentHour = now.getHours();
    const finalData: { hour: string; count: number }[] = [];
    let totalCount = 0;

    for (let i = 5; i >= 0; i--) {
      const hour = (currentHour - i + 24) % 24;
      const count = hourMap[hour] || 0;
      totalCount += count;
      finalData.push({ hour: `${hour}:00`, count });
    }

    setData(finalData);
    setTotal(totalCount);
    setIsLoading(false);
  };

  // Skeleton pulse animation
  const pulse = useSharedValue(1);
  pulse.value = withRepeat(withTiming(0.5, { duration: 800 }), -1, true);

  const animatedSkeletonStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: COLORS.background }]}>
      <Animated.Text entering={FadeInUp.duration(600)} style={[styles.title, { color: COLORS.text }]}>
        <MaterialCommunityIcons name="chart-bar" size={22} /> Favorite Activity (Last 6 Hours)
      </Animated.Text>

      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <Animated.View style={[styles.skeletonBar, { backgroundColor: COLORS.skeleton }, animatedSkeletonStyle]} />
          <Animated.View style={[styles.skeletonSummaryCard, { backgroundColor: COLORS.card }, animatedSkeletonStyle]}>
            <View style={[styles.skeletonCircle, { backgroundColor: COLORS.skeleton }]} />
            <View style={[styles.skeletonLine, { backgroundColor: COLORS.skeleton }]} />
          </Animated.View>
        </View>
      ) : data.some((d) => d.count > 0) ? (
        <Graph data={data} COLORS={COLORS} />
      ) : (
        <View style={styles.noDataContainer}>
          <MaterialCommunityIcons name="calendar-remove" size={48} color={COLORS.subtitle} />
          <Text style={[styles.noDataText, { color: COLORS.subtitle }]}>
            No favorites activity yet.
          </Text>
        </View>
      )}

      {!isLoading && (
        <Animated.View
          entering={FadeIn.delay(200).duration(500)}
          style={[styles.summaryCard, { backgroundColor: COLORS.card }]}
        >
          <MaterialCommunityIcons name="account-heart" size={20} color={COLORS.bar} />
          <Text style={[styles.summaryText, { color: COLORS.text }]}>
            Total favorites in last 6 hours: <Text style={{ fontWeight: 'bold' }}>{total}</Text>
          </Text>
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  noDataContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    marginTop: 12,
  },
  summaryCard: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryText: {
    fontSize: 16,
    flexShrink: 1,
  },
  skeletonContainer: {
    marginTop: 30,
  },
  skeletonBar: {
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  skeletonSummaryCard: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 12,
  },
  skeletonCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  skeletonLine: {
    height: 16,
    borderRadius: 4,
    flex: 1,
  },
});

export default StatsScreen;
