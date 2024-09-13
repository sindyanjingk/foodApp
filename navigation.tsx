import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import Restaurant from './screens/Restaurant';
import {RestaurantProps} from './constants';
import CartScreen from './screens/CartScreen';

export type RootStackParamList = {
  Home: any;
  Restaurant: RestaurantProps;
  Cart: any;
  // otras rutas
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen
          name="Cart"
          options={{presentation: 'modal'}}
          component={CartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
