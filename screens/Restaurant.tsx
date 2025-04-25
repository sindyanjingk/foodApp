import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {themeColors} from '../theme';
import {RestaurantProps} from '../constants';
import DishRow from '../components/dishRow';
import CartIcon from '../components/CartIcon';

type RestaurantRouteProp = RouteProp<{params: RestaurantProps}, 'params'>;

export default function Restaurant() {
  const {params} = useRoute<RestaurantRouteProp>();
  const navigation = useNavigation();
  let item = params;
  return (
    <View>
      <CartIcon />
      <ScrollView>
        <View>
          <Image style={styles.restaurantImage} source={item?.image} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackButton}>
            {/* <Icon name="arrow-left" size={26} color={themeColors.bgColors(1)} /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.restaurantInformationCard}>
          <View style={styles.itemsInsideCard}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <View style={styles.reviewRow}>
              {/* <Icon name="star" size={16} color="#ffd700" /> */}
              <Text style={styles.reviewRowText}>
                <Text style={styles.starText}>{item.stars}</Text>
                <Text>
                  ({item.reviews} review) ·{' '}
                  <Text style={styles.reviewsRowCategory}>{item.category}</Text>
                </Text>
              </Text>
              <View style={styles.locationRow}>
                {/* <Icon name="map-pin" size={16} color="gray" /> */}
                <Text style={styles.locationRowText}>
                  Nearby · {item.address}
                </Text>
              </View>
            </View>
            <Text style={styles.restaurantDescription}>{item.description}</Text>
          </View>
        </View>
        <View style={styles.restaurantMenu}>
          <Text style={styles.menuText}>Menu</Text>
          {/* dishes */}
          {item.dishes.map((dish, index) => (
            <DishRow item={{...dish}} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  restaurantImage: {
    width: '100%',
    height: 288,
  },
  goBackButton: {
    position: 'absolute',
    top: 56,
    left: 16,
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 9999,
    shadowColor: 'rgb(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 12,
  },
  restaurantInformationCard: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#ffffff',
    marginTop: -48,
    paddingTop: 22,
  },
  itemsInsideCard: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: '700',
    color: 'black',
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
  },
  reviewRowText: {
    fontSize: 12,
  },
  starText: {
    color: '#047857',
  },
  reviews: {
    color: '#374151',
  },
  reviewsRowCategory: {
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
  },
  locationRowText: {
    marginLeft: 2,
    color: '#374151',
    fontSize: 12,
  },
  restaurantDescription: {
    marginTop: 8,
    color: '#6B7280',
  },
  restaurantMenu: {
    paddingBottom: 144,
    backgroundColor: 'white',
  },
  menuText: {
    padding: 16,
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
});
