/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {categories} from '../constants';

const styles = StyleSheet.create({
  generalScrollView: {
    overflow: 'visible',
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 22,
    paddingTop: 16,
  },
  viewCategory: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  imageCategory: {width: 45, height: 45},
});

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.generalScrollView}
        contentContainerStyle={styles.contentContainer}>
        {categories.map((category, index) => {
          let isActive = category.id === activeCategory;
          let btnClass = isActive ? '#6B7280' : '#E5E7EB';
          let textClassFontWeight = isActive ? '600' : '400';
          let textClassTextColor = isActive ? '#1F2937' : '#6B7280';
          return (
            <View key={index} style={styles.viewCategory}>
              <TouchableOpacity
                onPress={() => setActiveCategory(category.id)}
                style={{
                  padding: 4,
                  borderRadius: 9999,
                  backgroundColor: btnClass,
                  shadowColor: 'rgb(0, 0, 0, 0.1)',
                  shadowOffset: {
                    width: 4,
                    height: 2,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
                  elevation: 12,
                }}>
                <Image style={styles.imageCategory} source={category.image} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: textClassFontWeight as '400' | '600',
                  lineHeight: 20,
                  color: textClassTextColor,
                }}>
                {category.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
