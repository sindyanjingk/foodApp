import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { TCartItems, TProduct } from '../types/product';
import { formatIdr } from '../helpers/formatIdr';
import { Checkbox } from 'react-native-paper';
import CartSkeleton from '../components/skeleton/CartSekelton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<TCartItems[]>([]);
  const [selectedItems, setSelectedItems] = useState<
    { productId: TProduct; quantity: number }[]
  >([]);

  const toggleSelectItem = (item: TCartItems) => {
    const exists = selectedItems.find(
      (selected) => selected.productId.id === item.product.id
    );

    if (exists) {
      setSelectedItems((prev) =>
        prev.filter((selected) => selected.productId.id !== item.product.id)
      );
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { productId: item.product, quantity: item.quantity },
      ]);
    }
  };


  const total = selectedItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );


  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token)

  const fetchCart = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://omjeki.vercel.app/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        setCartItems(response.data?.items)
      }
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false)
  };



  useEffect(() => {
    fetchCart()
  }, [])

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Alert.alert("Error", "Pilih barang yang ingin dibeli")
      return
    }
    navigation.navigate('CheckoutScreen', { cart: selectedItems })
  };


  const CartItem = ({ item }: { item: TCartItems }) => {
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLoadingAdd, setIsLoadingAdd] = useState(false);
    const [isLoadingMinus, setIsLoadingMinus] = useState(false);
    const deleteCart = async (id: string) => {
      setIsLoadingDelete(true)
      try {
        const response = await axios.delete(`https://omjeki.vercel.app/api/cart/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status === 200) {
          console.log({ response });
          fetchCart()
        }
      } catch (error) {
        console.log({ error });
      }
      setIsLoadingDelete(false)
    };
    const addQuantity = async (id: string) => {
      setIsLoadingAdd(true)
      try {
        const response = await axios.put(`https://omjeki.vercel.app/api/cart/${id}`, {
          quantity: item.quantity + 1
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status === 200) {
          console.log({ response });
          fetchCart()
        }
      } catch (error) {
        console.log({ error });
        Alert.alert("Error", "Terjadi kesalahan");
      }
      setIsLoadingAdd(false)
    }

    const deleteQuantity = async (id: string) => {
      setIsLoadingMinus(true)
      try {
        if (item.quantity === 1) {
          Alert.alert("Error", "Minimal pembelian 1")
          return
        }
        const response = await axios.put(`https://omjeki.vercel.app/api/cart/${id}`, {
          quantity: item.quantity - 1
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status === 200) {
          console.log({ response });
          fetchCart()
        }
      } catch (error) {
        console.log({ error });
        Alert.alert("Error", "Terjadi kesalahan");
      }
      setIsLoadingMinus(false)
    }
    return (
      <View style={styles.itemContainer}>
        {/* Checkbox */}
        <Checkbox
          status={
            selectedItems.find((selected) => selected.productId.id === item.product.id)
              ? 'checked'
              : 'unchecked'
          }
          onPress={() => toggleSelectItem(item)}
          color="#5D3BEE"
        />

        {/* Gambar Produk */}
        <Image
          source={
            item.product.images.url ? { uri: item.product.images.url } :
              require('../assets/foods/nasgor.png')
          }
          style={styles.itemImage}
        />

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.itemName}>{item.product.name}</Text>
          <Text style={styles.itemPrice}>{formatIdr(item.product.price || 0)}</Text>

          {/* Tombol kuantitas */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => deleteQuantity(item.id)} style={styles.qtyButton}>
              {
                isLoadingMinus ?
                  <ActivityIndicator color={'#5D3BEE'} size={"small"} /> :
                  // @ts-ignore
                  <Icon name="remove" size={18} color="#5D3BEE" />
              }
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => addQuantity(item.id)} style={styles.qtyButton}>
              {
                isLoadingAdd ?
                  <ActivityIndicator color={'#5D3BEE'} size={"small"} /> :
                  // @ts-ignore 
                  <Icon name="add" size={18} color="#5D3BEE" />
              }
            </TouchableOpacity>
          </View>
        </View>

        {/* Tombol Delete */}
        <TouchableOpacity onPress={() => deleteCart(item.id)}>
          {
            isLoadingDelete ?
              <ActivityIndicator color={'red'} size={"small"} /> :
              //@ts-ignore
              <Icon name="delete" size={24} color="red" />
          }
        </TouchableOpacity>
      </View>
    )
  }

  const renderItem = ({ item }: { item: TCartItems }) => <CartItem item={item} />;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* @ts-ignore */}
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Keranjang</Text>
        <View style={{ width: 24 }} />
      </View>
      {
        isLoading ?
          <CartSkeleton /> :
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
            ListEmptyComponent={() => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>Keranjang kamu masih kosong nih</Text>
                <Image source={require('../assets/empty-cart.png')} style={{ width: 200, height: 200, marginTop: 20 }} />
                <TouchableOpacity onPress={() => navigation.navigate('Home' as never)} style={{ marginTop: 20, padding: 12, borderRadius: 12, backgroundColor: '#5D3BEE' }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Belanja Sekarang</Text>
                </TouchableOpacity>
              </View>
            )}
          />
      }
      {
        isLoading || cartItems.length === 0 ?
          <View></View> :
          <View style={styles.checkoutBar}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>{formatIdr(total)}</Text>
            </View>
            <TouchableOpacity disabled={setSelectedItems.length === 0} onPress={handleCheckout} style={[styles.checkoutButton, { backgroundColor: selectedItems.length === 0 ? '#999' : '#5D3BEE', }]}>
              <Text style={styles.checkoutText}>Pesan Sekarang</Text>
            </TouchableOpacity>
          </View>
      }
    </SafeAreaView>
  );
};

export default CartScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'flex-start', gap: 12
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    borderWidth: 1,
    borderColor: '#5D3BEE',
    borderRadius: 8,
    padding: 4,
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#888',
    fontSize: 14,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#5D3BEE',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
