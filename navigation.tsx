import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import Restaurant from './screens/Restaurant';
import { RestaurantProps } from './constants';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HistoryScreen from './screens/history-screen';
import ProfileScreen from './screens/profile-screen';
import BottomTabs from './screens/BottomTabs';
import { Provider as PaperProvider } from 'react-native-paper';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import AddressScreen from './screens/AddressScreen';

export type RootStackParamList = {
  Home: any;
  Restaurant: RestaurantProps;
  Cart: any;
  Login: any;
  Register: any;
  History: any;
  Profile: any;
  BottomScreen: any;
  ProductDetail: any;
  CheckoutScreen: any;
  OrderDetail: any;
  AddressScreen : any;
  // otras rutas
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const token = useSelector((state: RootState) => state.auth.token);
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {
            token ?
              <>

                <Stack.Screen name="BottomScreen" component={BottomTabs} />
                <Stack.Screen  name="Home" component={HomeScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
                <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />

                <Stack.Screen name="Restaurant" component={Restaurant} />
                <Stack.Screen
                  name="Cart"
                  component={CartScreen}
                />
                <Stack.Screen name="History" component={HistoryScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name ="AddressScreen" component={AddressScreen}/>
              </> :
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name ="AddressScreen" component={AddressScreen}/>
              </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
