import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { View, Platform } from 'react-native';

export default function App() {
  const Container = Platform.OS === 'web' ? View : SafeAreaProvider;
  const containerProps = Platform.OS === 'web' ? { style: { flex: 1 } } : { initialWindowMetrics };

  return (
    <Container {...containerProps}>
      <NavigationContainer>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </Container>
  );
}
