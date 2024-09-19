import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppMap from '../normal/AppMap';
import QRScanScreen from '../normal/QRScanScreen'; // Assuming you want to use QRScanScreen instead of ScanQrScreen
import RideStartScreenMap from '../normal/RideStartScreenMap';
import RideEndScreen from '../normal/RideEndScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AppMap" component={AppMap} options={{ title: 'Map' }} />
      <Stack.Screen name="QRScanScreen" component={QRScanScreen} options={{ title: 'Scan QR' }} />
      <Stack.Screen name="RideStartScreenMap" component={RideStartScreenMap} options={{ title: 'Ride Start' }} />
      <Stack.Screen name="RideEndScreen" component={RideEndScreen} options={{ title: 'Ride End' }} />
    </Stack.Navigator>
  );
};

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <HomeStack />
    </View>
  );
};

export default Home;
