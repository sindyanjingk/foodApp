import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/Feather';
import HistoryScreen from './history-screen';
import ProfileScreen from './profile-screen';
import ChatScreen from './ChatScreen';
import CartScreen from './CartScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4a3aff',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { paddingBottom: 6, height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'History':
              iconName = 'clock';
              break;
            case 'Cart':
              iconName = 'shopping-cart';
              break;
            case 'Profile':
              iconName = 'user';
              break;
          }
          // @ts-ignore
          return <Icon name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
