import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {themeColors} from '../theme';

export default function DishRow({item}: any) {
  return (
    <View style={styles.dishRow}>
      <Image style={styles.dishImage} source={item.image} />
      <View style={styles.dishTextContent}>
        <View style={styles.dishNameAndDescriptionText}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.dishDescription}>{item.description}</Text>
        </View>
        <View style={styles.priceAndCountRow}>
          <Text style={styles.dishPrice}>${item.price}</Text>
          <View style={styles.bottonsRow}>
            <TouchableOpacity style={styles.addBotton}>
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.countText}>{2}</Text>
            <TouchableOpacity style={styles.addBotton}>
              <Icon name="minus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 24,
    marginBottom: 12,
    marginHorizontal: 8,
    shadowColor: 'rgb(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 12,
  },
  dishImage: {
    height: 100,
    width: 100,
    borderRadius: 24,
  },
  dishTextContent: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginTop: 12,
  },
  dishNameAndDescriptionText: {
    paddingLeft: 12,
  },
  dishName: {
    fontSize: 20,
  },
  dishDescription: {
    color: '#374151',
  },
  dishPrice: {
    color: '#374151',
    fontSize: 18,
    fontWeight: '700',
  },
  priceAndCountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    alignItems: 'center',
  },
  bottonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    paddingHorizontal: 12,
  },
  addBotton: {
    padding: 4,
    borderRadius: 999,
    backgroundColor: themeColors.bgColors(1),
  },
});
