import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeSkeleton = () => {
  return (
    <ScrollView style={styles.container}>
      <SkeletonPlaceholder borderRadius={10}>
        <View>
          <View style={styles.profileContainer}>
            <View style={styles.avatar} />
            <View style={{ marginLeft: 10 }}>
              <View style={styles.username} />
              <View style={styles.location} />
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar} />

          {/* Explore Section */}
          <View style={styles.sectionTitle} />
          <View style={styles.exploreContainer}>
            <View style={styles.exploreItem} />
            <View style={styles.exploreItem} />
          </View>

          {/* Popular Section */}
          <View style={styles.sectionTitle} />
          <View style={styles.popularContainer}>
            <View style={styles.popularCard} />
            <View style={styles.popularCard} />
          </View>

          <View style={styles.popularContainer}>
            <View style={styles.popularCard} />
            <View style={styles.popularCard} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  username: {
    width: 120,
    height: 20,
    marginBottom: 6,
  },
  location: {
    width: 80,
    height: 14,
  },
  searchBar: {
    marginTop: 20,
    width: '100%',
    height: 45,
    borderRadius: 22,
  },
  sectionTitle: {
    marginTop: 30,
    width: 180,
    height: 20,
  },
  exploreContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  exploreItem: {
    width: '48%',
    height: 120,
    borderRadius: 10,
  },
  popularContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  popularCard: {
    width: '48%',
    height: 200,
    borderRadius: 10,
  },
});

export default HomeSkeleton;
