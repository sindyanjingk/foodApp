import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FoodCard = ({ name, image }: { name: string; image: string }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate(`ProductDetail` as never)} style={styles.card}>
      <TouchableOpacity style={styles.heartIcon}>
        <Icon name="favorite-border" size={20} color="#000" />
      </TouchableOpacity>

      <Image
        source={require('../assets/foods/kwetiau.png')}
        style={styles.foodImage}
      />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.time}>20min</Text>
        <Icon name="star" size={16} color="#FFD700" />
        <Text style={styles.rating}>4.5</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.price}>$20.50</Text>
        <TouchableOpacity style={styles.addButton}>
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
