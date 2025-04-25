import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');

  const navigation = useNavigation();

  const handlePlaceOrder = () => {
    if (!name || !address) {
      return Alert.alert('Error', 'Please fill in all fields.');
    }
    Alert.alert('Success', 'Your order has been placed!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Shipping Address</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter your address"
          multiline
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Payment Method</Text>
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[
              styles.paymentButton,
              paymentMethod === 'card' && styles.paymentSelected,
            ]}
            onPress={() => setPaymentMethod('card')}
          >
            <Text
              style={
                paymentMethod === 'card'
                  ? styles.paymentTextSelected
                  : styles.paymentText
              }
            >
              Credit/Debit Card
            </Text>
          </TouchableOpacity>

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

        <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
          <Text style={styles.orderText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
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
});
