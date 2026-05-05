import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Colors } from '../theme';
import { useAuth } from '../context/AuthContext';
import { 
  ChevronLeft,
  ChevronRight,
  User, 
  CreditCard,
  Users,
  Target,
  Calculator,
  Bell,
  Ruler,
  Shield,
  Lightbulb,
  LogOut,
} from 'lucide-react-native';

const SettingsItem = ({ 
  icon: Icon, 
  label, 
  subtitle, 
  onPress, 
  toggle, 
  toggleValue, 
  onToggle,
  iconBg = '#F1F5F9',
  iconColor = '#64748B'
}: any) => (
  <TouchableOpacity 
    style={styles.settingsItem} 
    onPress={onPress}
    disabled={toggle}
  >
    <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
      <Icon size={20} color={iconColor} />
    </View>
    <View style={styles.itemTextContent}>
      <Text style={styles.itemLabel}>{label}</Text>
      {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
    </View>
    {toggle ? (
      <Switch 
        value={toggleValue} 
        onValueChange={onToggle}
        trackColor={{ false: '#E2E8F0', true: '#010E1F' }}
        thumbColor={Colors.white}
      />
    ) : (
      <ChevronRight size={20} color="#94A3B8" />
    )}
  </TouchableOpacity>
);

export const AthleteProfileScreen = ({ navigation }: any) => {
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [units, setUnits] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", onPress: () => logout(), style: "destructive" }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT</Text>
            <View style={styles.card}>
              <SettingsItem 
                icon={User} 
                label="Edit Profile" 
                iconBg="#E0F2FE"
                iconColor="#0EA5E9"
                onPress={() => navigation.navigate('AthleteEditProfile')} 
              />
              <SettingsItem 
                icon={CreditCard} 
                label="Subscription & Billing" 
                subtitle="Solo Plan - $9.99/mo"
                iconBg="#F1F5F9"
                iconColor="#64748B"
                onPress={() => navigation.navigate('AthleteSubscription')} 
              />
              <SettingsItem 
                icon={Users} 
                label="Connect to a Coach" 
                subtitle="Optional - Free with coach membership!"
                iconBg="#DCFCE7"
                iconColor="#10B981"
                onPress={() => {}} 
              />
            </View>
          </View>

          {/* Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PREFERENCES</Text>
            <View style={styles.card}>
              <SettingsItem 
                icon={Target} 
                label="Update Goals" 
                iconBg="#F1F5F9"
                iconColor="#64748B"
                onPress={() => {}} 
              />
              <SettingsItem 
                icon={Calculator} 
                label="Recalculate Calories" 
                subtitle="Update your nutrition targets"
                iconBg="#E0F7FA"
                iconColor="#06B6D4"
                onPress={() => {}} 
              />
              <View style={styles.toggleItemRow}>
                <SettingsItem 
                  icon={Bell} 
                  label="Notifications" 
                  toggle 
                  toggleValue={notifications} 
                  onToggle={setNotifications}
                  iconBg="#F1F5F9"
                  iconColor="#64748B"
                />
              </View>
              <View style={styles.toggleItemRow}>
                <SettingsItem 
                  icon={Ruler} 
                  label="Units" 
                  subtitle="Imperial (lbs, in)"
                  toggle 
                  toggleValue={units} 
                  onToggle={setUnits}
                  iconBg="#F1F5F9"
                  iconColor="#64748B"
                />
              </View>
            </View>
          </View>

          {/* Security Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SECURITY</Text>
            <View style={styles.card}>
              <SettingsItem 
                icon={Shield} 
                label="Change Password" 
                iconBg="#F1F5F9"
                iconColor="#64748B"
                onPress={() => navigation.navigate('ChangePassword')} 
              />
            </View>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SUPPORT</Text>
            <View style={styles.card}>
              <SettingsItem 
                icon={Lightbulb} 
                label="Submit Feature Request" 
                subtitle="Help us improve CoachMate"
                iconBg="#F1F5F9"
                iconColor="#64748B"
                onPress={() => {}} 
              />
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <LogOut size={20} color="#F43F5E" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 8,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemTextContent: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
    fontWeight: '500',
  },
  toggleItemRow: {
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FECDD3',
    height: 60,
    borderRadius: 16,
    marginTop: 12,
    gap: 10,
  },
  logoutText: {
    color: '#F43F5E',
    fontSize: 16,
    fontWeight: '800',
  },
});

