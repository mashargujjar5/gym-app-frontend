import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, BorderRadius } from '../theme';
import { Home, Dumbbell, Apple, LineChart, User, Users, ClipboardList, MessageCircle, Settings } from 'lucide-react-native';

// Screens
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { RoleSelectScreen } from '../screens/RoleSelectScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { AthleteHomeScreen } from '../screens/AthleteHomeScreen';
import { AthleteWorkoutsScreen } from '../screens/AthleteWorkoutsScreen';
import { ActiveWorkoutScreen } from '../screens/ActiveWorkoutScreen';
import { WorkoutCompleteScreen } from '../screens/WorkoutCompleteScreen';
import { AthleteNutritionScreen } from '../screens/AthleteNutritionScreen';
import { AthleteCheckInScreen } from '../screens/AthleteCheckInScreen';
import { AthleteProfileScreen } from '../screens/AthleteProfileScreen';
import { CoachClientsScreen } from '../screens/CoachClientsScreen';
import { ClientDetailScreen } from '../screens/ClientDetailScreen';
import { CoachProfileScreen } from '../screens/CoachProfileScreen';
import { AssignPlanScreen } from '../screens/AssignPlanScreen';
import { AssignNutritionScreen } from '../screens/AssignNutritionScreen';
import { ProgressCompareScreen } from '../screens/ProgressCompareScreen';
import { AthleteQuestionnaireScreen } from '../screens/AthleteQuestionnaireScreen';
import { CompletedWorkoutDetailScreen } from '../screens/CompletedWorkoutDetailScreen';
import { AthleteMessagesScreen } from '../screens/AthleteMessagesScreen';
import { AthleteChatDetailScreen } from '../screens/AthleteChatDetailScreen';
import { CoachProfileSetupScreen } from '../screens/CoachProfileSetupScreen';
import { CoachCodeScreen } from '../screens/CoachCodeScreen';
import { CoachDashboardScreen } from '../screens/CoachDashboardScreen';
import { InviteClientScreen } from '../screens/InviteClientScreen';
import { CheckInHistoryScreen } from '../screens/CheckInHistoryScreen';
import { CoachTemplatesScreen } from '../screens/CoachTemplatesScreen';
import { CoachMessagesScreen } from '../screens/CoachMessagesScreen';
import { CreateWorkoutOptionScreen } from '../screens/CreateWorkoutOptionScreen';
import { CreateTemplateScreen } from '../screens/CreateTemplateScreen';
import { AIPreHabPlanScreen } from '../screens/AIPreHabPlanScreen';
import { AIWorkoutGeneratorScreen } from '../screens/AIWorkoutGeneratorScreen';
import { CoachSettingsScreen } from '../screens/CoachSettingsScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { ClientPermissionsScreen } from '../screens/ClientPermissionsScreen';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen';
import { OTPScreen } from '../screens/OTPScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';

import { AthleteEditProfileScreen } from '../screens/AthleteEditProfileScreen';
import { AthleteSubscriptionScreen } from '../screens/AthleteSubscriptionScreen';

import { AuthProvider, useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab icon map
const getIcon = (routeName: string, isFocused: boolean) => {
  const color = isFocused ? Colors.primary : Colors.textMuted;
  const size = 22;

  switch (routeName) {
    case 'AthleteHome': return <Home size={size} color={color} />;
    case 'AthleteWorkouts': return <Dumbbell size={size} color={color} />;
    case 'AthleteNutrition': return <Apple size={size} color={color} />;
    case 'AthleteCheckIn': return <LineChart size={size} color={color} />;
    case 'AthleteSettings': return <Settings size={size} color={color} />;
    case 'CoachHome': return <Home size={size} color={color} />;
    case 'CoachClients': return <Users size={size} color={color} />;
    case 'CoachTemplates': return <ClipboardList size={size} color={color} />;
    case 'CoachMessages': return <MessageCircle size={size} color={color} />;
    case 'CoachSettings': return <Settings size={size} color={color} />;
    default: return <Home size={size} color={color} />;
  }
};

// Custom Tab Bar
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => {
              if (!isFocused) navigation.navigate(route.name);
            }}
            activeOpacity={0.7}
            style={styles.tabItem}
          >
            <View style={[styles.tabIconWrap, isFocused && styles.tabIconWrapActive]}>
              {getIcon(route.name, isFocused)}
            </View>
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {options.tabBarLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


// Athlete Tabs
const AthleteTabs = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar state={props.state} descriptors={props.descriptors} navigation={props.navigation} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="AthleteHome" component={AthleteHomeScreen} options={{ tabBarLabel: 'Home' }} />
    <Tab.Screen name="AthleteWorkouts" component={AthleteWorkoutsScreen} options={{ tabBarLabel: 'Training' }} />
    <Tab.Screen name="AthleteNutrition" component={AthleteNutritionScreen} options={{ tabBarLabel: 'Nutrition' }} />
    <Tab.Screen name="AthleteCheckIn" component={AthleteCheckInScreen} options={{ tabBarLabel: 'Progress' }} />
    <Tab.Screen name="AthleteSettings" component={AthleteProfileScreen} options={{ tabBarLabel: 'Settings' }} />
  </Tab.Navigator>
);

// Coach Tabs
const CoachTabs = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar state={props.state} descriptors={props.descriptors} navigation={props.navigation} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="CoachHome" component={CoachDashboardScreen} options={{ tabBarLabel: 'Home' }} />
    <Tab.Screen name="CoachClients" component={CoachClientsScreen} options={{ tabBarLabel: 'Clients' }} />
    <Tab.Screen name="CoachTemplates" component={CoachTemplatesScreen} options={{ tabBarLabel: 'Templates' }} />
    <Tab.Screen name="CoachMessages" component={CoachMessagesScreen} options={{ tabBarLabel: 'Messages' }} />
    <Tab.Screen name="CoachSettings" component={CoachSettingsScreen} options={{ tabBarLabel: 'Settings' }} />
  </Tab.Navigator>
);

const Navigation = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {user ? (
        // Authenticated Flow
        user.role === 'coach' ? (
          <>
            <Stack.Screen name="CoachTabs" component={CoachTabs} />
            <Stack.Screen name="ClientDetail" component={ClientDetailScreen} />
            <Stack.Screen name="AssignPlan" component={AssignPlanScreen} />
            <Stack.Screen name="AssignNutrition" component={AssignNutritionScreen} />
            <Stack.Screen name="ProgressCompare" component={ProgressCompareScreen} />
            <Stack.Screen name="InviteClient" component={InviteClientScreen} />
            <Stack.Screen name="CheckInHistory" component={CheckInHistoryScreen} />
            <Stack.Screen name="CreateWorkoutOption" component={CreateWorkoutOptionScreen} />
            <Stack.Screen name="CreateTemplate" component={CreateTemplateScreen} />
            <Stack.Screen name="AIPreHabPlan" component={AIPreHabPlanScreen} />
            <Stack.Screen name="AIWorkoutGenerator" component={AIWorkoutGeneratorScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="ClientPermissions" component={ClientPermissionsScreen} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
            <Stack.Screen name="CoachMessages" component={CoachMessagesScreen} />
            <Stack.Screen name="AthleteChatDetail" component={AthleteChatDetailScreen} />
            <Stack.Screen name="CoachProfileSetup" component={CoachProfileSetupScreen} />
            <Stack.Screen name="CoachCode" component={CoachCodeScreen} />
          </>

        ) : (
          <>
            <Stack.Screen name="AthleteTabs" component={AthleteTabs} />
            <Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="WorkoutComplete" component={WorkoutCompleteScreen} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="CompletedWorkoutDetail" component={CompletedWorkoutDetailScreen} />
            <Stack.Screen name="AthleteMessages" component={AthleteMessagesScreen} />
            <Stack.Screen name="AthleteChatDetail" component={AthleteChatDetailScreen} />
            <Stack.Screen name="AthleteQuestionnaire" component={AthleteQuestionnaireScreen} />
            <Stack.Screen name="AthleteEditProfile" component={AthleteEditProfileScreen} />
            <Stack.Screen name="AthleteSubscription" component={AthleteSubscriptionScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          </>
        )
      ) : (
        // Auth Flow
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

// Root Navigator
export const AppNavigator = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};


const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingBottom: 24,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  tabIconWrap: {
    width: 44,
    height: 32,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapActive: {
    backgroundColor: Colors.primary + '15',
  },
  tabLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: Colors.primary,
  },
});
