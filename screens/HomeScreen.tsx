import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ListRenderItem
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import FoodCard from '../components/FoodCard';

interface FoodItem {
  id: string;
  name: string;
  image: string;
}

const dummyData: FoodItem[] = [
  { id: '1', name: 'Chicken Masala', image: 'https://source.unsplash.com/random/100x100?dish1' },
  { id: '2', name: 'Chicken Masala', image: 'https://source.unsplash.com/random/100x100?dish2' },
  { id: '3', name: 'Chicken Masala', image: 'https://source.unsplash.com/random/100x100?dish3' },
  { id: '4', name: 'Chicken Masala', image: 'https://source.unsplash.com/random/100x100?dish4' },
];

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<FoodItem[]>(dummyData);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetch
    setTimeout(() => {
      setData([...dummyData]); // Replace with fresh data if from API
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderItem: ListRenderItem<FoodItem> = ({ item }) => (
    <FoodCard name={item.name} image={item.image} />
  );

  const ListHeaderComponent = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/12.jpg' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.greeting}>Hi Ime, mau nyari apa nih?</Text>
          <View style={styles.locationRow}>
            <Icon name="location-on" size={16} color="#888" />
            <Text style={styles.locationText}>23 Lubge, Abuja</Text>
          </View>
        </View>
        {/* <Icon name="menu" size={28} style={styles.menuIcon} /> */}
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search salads"
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
        <Icon name="tune" size={20} color="#5D3BEE" />
      </View>

      {/* Explore */}
      <Text style={styles.sectionTitle}>Rekomendasi</Text>
      <FlatList
        data={[1, 2, 3, 4]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Image
            source={require('../assets/foods/nasgor.png')}
            style={styles.exploreImage}
          />
        )}
      />

      {/* Popular */}
      <View style={styles.popularHeader}>
        <Text style={styles.sectionTitle}>Popular</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

// ... styles sama seperti sebelumnya
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#888',
    marginLeft: 4,
  },
  menuIcon: {
    marginLeft: 'auto',
  },
  searchContainer: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#5D3BEE',
    borderRadius: 24,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  exploreImage: {
    width: 140,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  seeAll: {
    color: '#5D3BEE',
    fontWeight: '600',
  },
});
