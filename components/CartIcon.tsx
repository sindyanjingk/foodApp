import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeColors} from '../theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation';

export default function CartIcon() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={styles.opacity}>
        <View style={styles.items}>
          <Text style={styles.txtItems}>3</Text>
        </View>
        <Text style={styles.cartTxt}>View Cart</Text>
        <Text style={styles.price}>${23}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    zIndex: 50,
  },
  opacity: {
    backgroundColor: themeColors.bgColors(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 9999,
    padding: 16,
    paddingVertical: 12,
    shadowColor: 'rgb(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 12,
  },
  items: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  txtItems: {
    fontWeight: '800',
    color: 'white',
    fontSize: 18,
  },
  cartTxt: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
    fontWeight: '800',
    color: 'white',
    fontSize: 18,
  },
  price: {
    fontWeight: '800',
    color: 'white',
    fontSize: 18,
  },
});
