import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatIdr } from '../helpers/formatIdr';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

const FoodCard = ({ name, image, price, rating, time, id }: { name: string; image: string, price: number, rating: number, time: string, id: string }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(`ProductDetail`, {
      name,
      image,
      price,
      rating,
      time,
      id
    })} style={styles.card}>
      <TouchableOpacity style={styles.heartIcon}>
        {/* @ts-ignore */}
        <Icon name="favorite-border" size={20} color="#000" />
      </TouchableOpacity>

      {
        image ?
          <Image
            source={{ uri: image }}
            style={styles.foodImage}
          /> :
          <Image
            source={require('../assets/foods/kwetiau.png')}
            style={styles.foodImage}
          />
      }
      <Text style={styles.name}>{name}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.time}>{time || ""}</Text>
        {/* @ts-ignore */}
        <Icon name="star" size={16} color="#FFD700" />
        <Text style={styles.rating}>{rating || ""}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.price}>{formatIdr(price || 0)}</Text>
        <TouchableOpacity style={styles.addButton}>
          {/* @ts-ignore */}
          <Icon name="add" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8F8FF',
    borderRadius: 16,
    padding: 12,
    width: '48%',
    marginVertical: 8,
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  rating: {
    fontSize: 12,
    marginLeft: 2,
  },
  cardFooter: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#5D3BEE',
    padding: 6,
    borderRadius: 12,
  },
});
