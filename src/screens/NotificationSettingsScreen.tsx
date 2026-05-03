import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../theme';
import { 
  ArrowLeft, 
  Bell,
  CheckCircle2,
  Mail,
  Smartphone,
} from 'lucide-react-native';

export const NotificationSettingsScreen = ({ navigation }: any) => {
  const [settings, setSettings] = useState({
    newClient: true,
    checkIn: true,
    adherence: true,
    workoutComplete: false,
    nutritionGoals: false,
    milestones: true,
    messages: true,
    payments: true,
    subscription: true,
    pushEnabled: true,
    emailEnabled: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeAlerts = Object.values(settings).filter((v, i) => i < 9 && v).length;

  const NotificationRow = ({ label, sublabel, value, onValueChange }: any) => (
    <View style={styles.row}>
      <View style={styles.rowContent}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowSublabel}>{sublabel}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D5DB', true: '#D1D5DB' }}
        thumbColor={value ? '#06B6D4' : '#F3F4F6'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity 
            style={styles.saveHeaderBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.saveHeaderBtnText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Info Box */}
          <View style={styles.infoBox}>
            <View style={styles.infoIconContainer}>
              <Bell size={20} color="#06B6D4" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Stay Connected with Your Clients</Text>
              <Text style={styles.infoSubtitle}>
                Customize how you want to be notified about client activities and important updates.
              </Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statsLabel}>ACTIVE ALERTS</Text>
              <Text style={styles.statsValue}>{activeAlerts} of 9</Text>
            </View>
            <View style={styles.pushBadge}>
              <View style={styles.pushDot} />
              <Text style={styles.pushBadgeText}>Push Enabled</Text>
            </View>
          </View>

          {/* Client Activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CLIENT ACTIVITY</Text>
            <NotificationRow
              label="New Client Request"
              sublabel="Get notified when someone uses your coach code to join CoachMate"
              value={settings.newClient}
              onValueChange={() => toggleSetting('newClient')}
            />
            <NotificationRow
              label="Weekly Check-in Submitted"
              sublabel="Know when clients complete their weekly progress check-ins"
              value={settings.checkIn}
              onValueChange={() => toggleSetting('checkIn')}
            />
            <NotificationRow
              label="Client Adherence Alerts"
              sublabel="Get notified when a client misses workouts or falls behind on goals"
              value={settings.adherence}
              onValueChange={() => toggleSetting('adherence')}
            />
            <NotificationRow
              label="Workout Completed"
              sublabel="Receive updates when clients finish their training sessions"
              value={settings.workoutComplete}
              onValueChange={() => toggleSetting('workoutComplete')}
            />
            <NotificationRow
              label="Nutrition Goals Met"
              sublabel="Get alerted when clients hit their daily nutrition targets"
              value={settings.nutritionGoals}
              onValueChange={() => toggleSetting('nutritionGoals')}
            />
            <NotificationRow
              label="Milestone Achievements"
              sublabel="Celebrate with clients when they reach important fitness milestones"
              value={settings.milestones}
              onValueChange={() => toggleSetting('milestones')}
            />
          </View>

          {/* Messages */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>MESSAGES</Text>
            <NotificationRow
              label="Direct Messages"
              sublabel="Receive alerts for new messages from your clients"
              value={settings.messages}
              onValueChange={() => toggleSetting('messages')}
            />
          </View>

          {/* System & Billing */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SYSTEM & BILLING</Text>
            <NotificationRow
              label="Payment Received"
              sublabel="Confirmation when client payments are successfully processed"
              value={settings.payments}
              onValueChange={() => toggleSetting('payments')}
            />
            <NotificationRow
              label="Subscription Changes"
              sublabel="Updates about your CoachMate Pro subscription status"
              value={settings.subscription}
              onValueChange={() => toggleSetting('subscription')}
            />
          </View>

          {/* Delivery Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Methods</Text>
            <View style={styles.methodCard}>
              <View style={styles.methodIconContainer}>
                <Smartphone size={18} color="#06B6D4" />
              </View>
              <View style={styles.methodContent}>
                <Text style={styles.methodTitle}>Push Notifications</Text>
                <Text style={styles.methodSubtitle}>Real-time alerts</Text>
              </View>
              <Switch
                value={settings.pushEnabled}
                onValueChange={() => toggleSetting('pushEnabled')}
                trackColor={{ false: '#D1D5DB', true: '#D1D5DB' }}
                thumbColor={settings.pushEnabled ? '#06B6D4' : '#F3F4F6'}
              />
            </View>

            <View style={styles.methodCard}>
              <View style={[styles.methodIconContainer, { backgroundColor: '#F1F5F9' }]}>
                <Mail size={18} color="#64748B" />
              </View>
              <View style={styles.methodContent}>
                <Text style={styles.methodTitle}>Email Digest</Text>
                <Text style={styles.methodSubtitle}>Daily summary at 8 AM</Text>
              </View>
              <Switch
                value={settings.emailEnabled}
                onValueChange={() => toggleSetting('emailEnabled')}
                trackColor={{ false: '#D1D5DB', true: '#D1D5DB' }}
                thumbColor={settings.emailEnabled ? '#06B6D4' : '#F3F4F6'}
              />
            </View>
          </View>

          {/* Bulk Actions */}
          <View style={styles.bulkActions}>
            <TouchableOpacity style={styles.enableAllBtn}>
              <Text style={styles.enableAllText}>Enable All Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.disableAllBtn}>
              <Text style={styles.disableAllText}>Disable All Notifications</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  saveHeaderBtn: {
    backgroundColor: '#06B6D4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveHeaderBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E0F7FA',
    padding: 16,
    borderRadius: 16,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: '#B2EBF2',
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  statsLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  pushBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  pushDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  pushBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  rowSublabel: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  methodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodContent: {
    flex: 1,
    marginLeft: 12,
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  methodSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  bulkActions: {
    gap: 12,
    marginTop: 8,
  },
  enableAllBtn: {
    backgroundColor: '#E0F7FA',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  enableAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#06B6D4',
  },
  disableAllBtn: {
    backgroundColor: Colors.white,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  disableAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
});
