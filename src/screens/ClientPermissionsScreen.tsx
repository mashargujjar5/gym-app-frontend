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
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from 'lucide-react-native';

export const ClientPermissionsScreen = ({ navigation }: any) => {
  const [permissions, setPermissions] = useState({
    editNutrition: false,
    addExercises: true,
    logPastWorkouts: true,
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeCount = Object.values(permissions).filter(Boolean).length;

  const PermissionRow = ({ title, sublabel, value, onValueChange }: any) => (
    <View style={styles.permissionRow}>
      <View style={styles.permissionContent}>
        <Text style={styles.permissionTitle}>{title}</Text>
        <Text style={styles.permissionSublabel}>{sublabel}</Text>
        <View style={[styles.statusBadge, value ? styles.statusBadgeEnabled : styles.statusBadgeDisabled]}>
          <View style={[styles.statusDot, value ? styles.statusDotEnabled : styles.statusDotDisabled]} />
          <Text style={[styles.statusText, value ? styles.statusTextEnabled : styles.statusTextDisabled]}>
            {value ? 'Enabled' : 'Disabled'}
          </Text>
        </View>
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
          <Text style={styles.title}>Client Permissions</Text>
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
              <ShieldCheck size={20} color="#06B6D4" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Control What Clients Can Do</Text>
              <Text style={styles.infoSubtitle}>
                These settings apply to all your clients and help maintain data integrity. Changes take effect immediately.
              </Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statsLabel}>ACTIVE PERMISSIONS</Text>
              <Text style={styles.statsValue}>{activeCount} of 6</Text>
            </View>
            <View style={styles.appliesToContainer}>
              <Text style={styles.appliesToLabel}>Applies to</Text>
              <Text style={styles.appliesToCount}>8 Clients</Text>
            </View>
          </View>

          {/* Toggles */}
          <View style={styles.permissionsList}>
            <PermissionRow
              title="Allow Clients to Edit Nutrition Targets"
              sublabel="Clients can modify their daily calorie and macro targets within their plan"
              value={permissions.editNutrition}
              onValueChange={() => togglePermission('editNutrition')}
            />
            <PermissionRow
              title="Allow Clients to Add Custom Exercises"
              sublabel="Clients can create and add their own exercises to workout logs"
              value={permissions.addExercises}
              onValueChange={() => togglePermission('addExercises')}
            />
            <PermissionRow
              title="Allow Clients to Log Past Workouts"
              sublabel="Clients can backdate workout entries to maintain accurate history"
              value={permissions.logPastWorkouts}
              onValueChange={() => togglePermission('logPastWorkouts')}
            />
          </View>

          <TouchableOpacity 
            style={styles.saveFullBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.saveFullBtnText}>Save Changes</Text>
          </TouchableOpacity>
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
  appliesToContainer: {
    alignItems: 'flex-end',
  },
  appliesToLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  appliesToCount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#06B6D4',
  },
  permissionsList: {
    gap: 24,
    marginBottom: 40,
  },
  permissionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  permissionSublabel: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  statusBadgeEnabled: {
    backgroundColor: '#DCFCE7',
  },
  statusBadgeDisabled: {
    backgroundColor: '#F1F5F9',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotEnabled: {
    backgroundColor: '#22C55E',
  },
  statusDotDisabled: {
    backgroundColor: '#94A3B8',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextEnabled: {
    color: '#16A34A',
  },
  statusTextDisabled: {
    color: '#64748B',
  },
  saveFullBtn: {
    backgroundColor: '#06B6D4',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveFullBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
