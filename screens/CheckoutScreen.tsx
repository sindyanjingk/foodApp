import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { RootStackParamList } from '../types/types';
import { formatIdr } from '../helpers/formatIdr';

type CheckoutScreenProp = RouteProp<RootStackParamList, 'CheckoutScreen'>;

const CheckoutScreen = () => {
  const profile = useSelector((state: RootState) => state.profile)

  const route = useRoute<CheckoutScreenProp>();
  const { cart } = route.params
  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  const ongkir = 5000

  const [name, setName] = useState(profile.name);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('cod');

  const navigation = useNavigation();

  const handlePlaceOrder = () => {
    if (!name) {
      return Alert.alert('Error', 'Form harus lengkap.');
    }
    if(!profile.address){
      return Alert.alert('Error', 'Silaahkan isi alamat terlebih dahulu.');
    }
    Alert.alert('Success', 'Your order has been placed!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* @ts-ignore */}
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={cart || []}
        renderItem={({ item, index }) => (
          <View style={{ width: '90%', alignSelf: 'center', marginBottom: 12 }} key={index}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              {
                item.productId.images ?
                  <Image
                    source={{ uri: item.productId.images.url }}
                    style={styles.foodImage}
                  /> :
                  <Image
                    source={require('../assets/foods/kwetiau.png')}
                    style={styles.foodImage}
                  />
              }
              <View>
                <Text style={styles.paymentDetail}>{`${item.productId.name} X ${item.quantity}`}</Text>
                <Text style={styles.paymentDetail}>{formatIdr(+item.productId.price * +item.quantity)}</Text>
              </View>
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={{ width: '90%', alignSelf: 'center', marginBottom: 20 }}>
            <Text style={styles.label}>Nama Penerima</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 }}>
              {/* @ts-ignore */}
              <Icon name="location-on" size={16} color="#888" />
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Alamat Pengiriman</Text>
            </View>
            {
              profile.address?.id ?
                <Text style={styles.label}>Kabupaten</Text> :
                <TouchableOpacity onPress={()=>navigation.navigate("AddressScreen" as never)} style={styles.orderButton}>
                  <Text style={styles.orderText}>Tambah Alamat</Text>
                </TouchableOpacity>
            }
            <Text >{profile.address?.kabupaten || ""}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ width: '90%', alignSelf: 'center', marginBottom: 20 }}>
            <Text style={styles.paymentDetail}>{`Total Product: ${formatIdr(+total)}`}</Text>
            <Text style={styles.paymentDetail}>{`Ongkos Kirim : ${formatIdr(ongkir)}`}</Text>
            <Text style={styles.paymentDetail}>{`Total Pembayaran: ${formatIdr(+total + ongkir)}`}</Text>

            <Text style={styles.label}>Metode Pembayaran</Text>
            <View style={styles.paymentOptions}>
              <TouchableOpacity
                style={[
                  styles.paymentButton,
                  paymentMethod === 'cod' && styles.paymentSelected,
                ]}
                onPress={() => setPaymentMethod('cod')}
              >
                <Text
                  style={
                    paymentMethod === 'cod'
                      ? styles.paymentTextSelected
                      : styles.paymentText
                  }
                >
                  Cash on Delivery
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.orderButton]} onPress={handlePlaceOrder}>
              <Text style={styles.orderText}>Pesan Sekarang</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </SafeAreaView>
  );
};

export default CheckoutScreen;

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
  paymentDetail: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  paymentOptions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  paymentButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  paymentSelected: {
    borderColor: '#5D3BEE',
    backgroundColor: '#ECE9FF',
  },
  paymentText: {
    fontSize: 14,
    color: '#555',
  },
  paymentTextSelected: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5D3BEE',
  },
  orderButton: {
    backgroundColor: '#5D3BEE',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  orderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 8,
  },
});
