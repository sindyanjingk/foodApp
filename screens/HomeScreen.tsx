import React, { useCallback, useEffect, useState } from 'react';
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
import HomeSkeleton from '../components/skeleton/HomeSkeleton';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setProfile } from '../store/slice/profileSlice';
import { useNavigation } from '@react-navigation/native';
import { TProduct } from '../types/product';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const renderItem: ListRenderItem<TProduct> = ({ item }) => (
    <FoodCard id={item.id || ""} name={item.name} image={item?.images?.url || ""} price={item.price} rating={4.5} time={"10 - 20 min"} />
  );

  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token)
  const dispatch = useDispatch()
  const profile = useSelector((state: RootState) => state.profile)
  const [product, setProduct] = useState<TProduct[]>([])

  const getUserProfile = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://omjeki.vercel.app/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log({ response: response.data?.userProfile });
      if (response.status === 200) {
        dispatch(setProfile(response.data?.userProfile))
      }
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false)
  }

  const getProduct = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://omjeki.vercel.app/api/product`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProduct(response.data)
    } catch (error) {
      console.log({ error });
      setProduct([])
    }
    setIsLoading(false)
  }

  const ListHeaderComponent = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        {
          profile.avatar ?
            <Image
              source={{ uri: profile.avatar }}
              style={styles.avatar}
            /> :
            <Image
              source={require('../assets/avatar-placeholder.png')}
              style={styles.avatar}
            />
        }
        <View>
          <Text style={styles.greeting}>{`Hi ${profile.name}`}</Text>
          <View style={styles.locationRow}>
            {/* @ts-ignore */}
            <Icon name="location-on" size={16} color="#888" />
            {
              profile?.address ?
                <Text style={styles.locationText}>{profile.address.kelurahan || ""}</Text> :
                <TouchableOpacity style={{ padding: 12 }} onPress={() => { console.log("Hello") }}>
                  <Text>Tambah Alamat</Text>
                </TouchableOpacity>
            }
          </View>
        </View>
        {/* <Icon name="menu" size={28} style={styles.menuIcon} /> */}
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        {/* @ts-ignore */}
        <Icon name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search salads"
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
        {/* @ts-ignore */}
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetch
    setTimeout(() => {
      getProduct()
      getUserProfile()
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    getUserProfile()
    getProduct()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {
        isLoading ?
          <HomeSkeleton />
          :
          <FlatList
            data={product}
            renderItem={renderItem || []}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListHeaderComponent={ListHeaderComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
      }
      {/* <HomeSkeleton/> */}
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
