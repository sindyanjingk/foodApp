import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const dummyOrder = {
  id: '1',
  date: '2025-04-20',
  total: 320000,
  items: [
    {
      id: 'p1',
      name: 'Product 1',
      price: 120000,
      qty: 1,
    },
    {
      id: 'p2',
      name: 'Product 2',
      price: 100000,
      qty: 1,
    },
    {
      id: 'p3',
      name: 'Product 3',
      price: 100000,
      qty: 1,
    },
  ],
};

const OrderDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // const { orderId } = route.params; // Use if fetching real data

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Order Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>Order Date: {dummyOrder.date}</Text>
        <Text style={styles.summaryText}>
          Total: Rp{dummyOrder.total.toLocaleString()}
        </Text>
      </View>

      <FlatList
        data={dummyOrder.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetail}>Qty: {item.qty}</Text>
            <Text style={styles.productDetail}>
              Price: Rp{item.price.toLocaleString()}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default OrderDetailScreen;

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
  summaryBox: {
    backgroundColor: '#ECE9FF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    padding: 16,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#F4F4F4',
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDetail: {
    fontSize: 14,
    color: '#333',
  },
});