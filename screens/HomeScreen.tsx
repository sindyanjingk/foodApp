/* eslint-disable react-native/no-inline-styles */
import {View, Text, StatusBar, TextInput, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {themeColors} from '../theme';
import Categories from '../components/categories';
import {featured} from '../constants';
import FeaturedRow from '../components/featuredRow';

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'white',
    paddingTop: 12,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
    padding: 12,
  },
  roundedBar: {
    flexDirection: 'row',
    borderRadius: 50,
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,

    borderColor: '#D1D5DB',
    borderWidth: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  textInput: {
    marginLeft: 8,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    borderLeftWidth: 2,
    borderColor: '#D1D5DB',
    paddingLeft: 8,
    borderWidth: 0,
  },
  textSecondary: {
    color: '#4B5563',
    marginLeft: 4,
  },
  sliders: {
    padding: 12,
    backgroundColor: themeColors.bgColors(1),
    borderRadius: 50,
    marginLeft: 6,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      {/* bar content */}
      <View style={styles.barRow}>
        <View style={styles.roundedBar}>
          <Icon name="search" size={24} />
          <TextInput placeholder="Restaurant" style={styles.textInput} />
          <View style={styles.locationBar}>
            <Icon name="map-pin" size={24} />
            <Text style={styles.textSecondary}>New York, NYC</Text>
          </View>
        </View>
        <View style={styles.sliders}>
          <Icon name="sliders" size={20} color="white" />
        </View>
      </View>
      {/* MAIN */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* CATEGORIES */}
        <Categories />
        {/*Featured */}
        <View style={{marginTop: 20}}>
          {[featured, featured, featured].map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.title}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
