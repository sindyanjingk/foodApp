import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {themeColors} from '../theme';
import RestaurantCard from './restaurantCard';

export default function featuredRow({title, description, restaurants}: any) {
  return (
    <View>
      <View style={styles.card}>
        <View>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textDescription}>{description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.bottonText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {restaurants.map((restaurant: any, index: number) => {
          return <RestaurantCard item={restaurant} key={index} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  textDescription: {
    color: '#6B7280',
    fontSize: 12,
  },
  bottonText: {
    color: themeColors.text,
    fontWeight: '600',
  },
  contentContainerStyle: {
    paddingHorizontal: 15,
    overflow: 'visible',
    paddingBottom: 20,
    paddingTop: 20,
  },
});
