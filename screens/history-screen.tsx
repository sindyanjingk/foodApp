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
import { useNavigation } from '@react-navigation/native';

const orderHistory = [
  {
    id: '1',
    date: '2025-04-20',
    total: 320000,
    items: 3,
  },
  {
    id: '2',
    date: '2025-04-15',
    total: 150000,
    items: 1,
  },
  {
    id: '3',
    date: '2025-04-10',
    total: 270000,
    items: 2,
  },
];

const OrderHistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Order History</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>Order Date: {item.date}</Text>
            <Text style={styles.info}>Items: {item.items}</Text>
            <Text style={styles.info}>Total: Rp{item.total.toLocaleString()}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate(`OrderDetail` as never)} style={styles.detailButton}>
              <Text style={styles.detailText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;

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
  card: {
    backgroundColor: '#F4F4F4',
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  detailButton: {
    marginTop: 12,
    backgroundColor: '#5D3BEE',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  detailText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});