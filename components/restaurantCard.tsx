import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {themeColors} from '../theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RestaurantProps} from '../constants';
import {RootStackParamList} from '../navigation';

export default function RestaurantCard({item}: {item: RestaurantProps}) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Restaurant', {...item})}>
      <View style={styles.bottonView}>
        <Image style={styles.image} source={item.image} />
        <View style={styles.details}>
          <Text style={styles.nameText}>{item.name}</Text>
          <View style={styles.reviewRow}>
            <Icon name="star" size={16} color="#ffd700" />
            <Text style={styles.reviewRowText}>
              <Text style={styles.starText}>{item.stars}</Text>
              <Text>
                ({item.reviews} review) ·{' '}
                <Text style={styles.reviewsRowCategory}>{item.category}</Text>
              </Text>
            </Text>
          </View>
          <View style={styles.locationRow}>
            <Icon name="location-on" size={16} color="gray" />
            <Text style={styles.locationRowText}>Nearby · {item.address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bottonView: {
    marginRight: 12,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: themeColors.bgColors(0.2),
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 12,
  },
  image: {
    height: 144,
    width: 256,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  details: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    marginTop: 8,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '800',
    paddingTop: 8,
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
    color: '#374151',
    fontSize: 12,
  },
});
