import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../theme';
import { 
  ArrowLeft, 
  Lock,
  CheckCircle2,
} from 'lucide-react-native';
import { Input } from '../components/Input';

export const ChangePasswordScreen = ({ navigation }: any) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const requirements = [
    'At least 8 characters long',
    'Contains an uppercase letter',
    'Contains a number',
    'Contains a special character',
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.title}>Account Settings</Text>
          <TouchableOpacity 
            style={styles.doneBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Security Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Lock size={20} color="#EF4444" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Security</Text>
              <Text style={styles.infoSubtitle}>Update your password</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              isPassword
            />

            <Input
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password (min. 8 characters)"
              isPassword
            />

            <Input
              label="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter new password"
              isPassword
            />
          </View>

          {/* Requirements */}
          <View style={styles.requirementsBox}>
            <Text style={styles.requirementsTitle}>PASSWORD REQUIREMENTS</Text>
            {requirements.map((req, index) => (
              <View key={index} style={styles.requirementRow}>
                <View style={styles.dot} />
                <Text style={styles.requirementText}>{req}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.updateBtn}
            onPress={() => navigation.goBack()}
          >
            <Lock size={20} color={Colors.white} />
            <Text style={styles.updateBtnText}>Update Security</Text>
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
  doneBtn: {
    backgroundColor: '#06B6D4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  doneBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F2',
    padding: 16,
    borderRadius: 16,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: '#FFE4E6',
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContent: {
    marginLeft: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  form: {
    marginBottom: 24,
  },
  requirementsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  requirementsTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#94A3B8',
  },
  requirementText: {
    fontSize: 12,
    color: '#64748B',
  },
  updateBtn: {
    backgroundColor: '#06B6D4',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  updateBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
