import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../theme';
import { ChevronLeft, User, UserCheck, CheckCircle2 } from 'lucide-react-native';

export const RoleSelectScreen = ({ navigation }: any) => {
  const [selectedRole, setSelectedRole] = useState<'athlete' | 'coach' | null>('coach');

  const handleContinue = () => {
    if (selectedRole) {
      navigation.navigate('Register', { role: selectedRole });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Choose how you want to continue</Text>
          <Text style={styles.subtitle}>Are you signing in as an Athlete or a Coach?</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Athlete Card */}
          <TouchableOpacity 
            style={[
              styles.card, 
              selectedRole === 'athlete' && styles.cardSelectedAthlete
            ]}
            onPress={() => setSelectedRole('athlete')}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrap, { backgroundColor: '#FFEDD5' }]}>
                <User size={24} color="#EA580C" />
              </View>
              {selectedRole === 'athlete' && <CheckCircle2 size={24} color="#EA580C" style={styles.checkIcon} />}
            </View>
            <Text style={styles.cardTitle}>I am an Athlete</Text>
            <Text style={styles.cardDesc}>Track workouts, log nutrition, and follow your training plan.</Text>
            
            <View style={styles.bulletList}>
              <View style={styles.bulletRow}>
                <View style={[styles.bulletDot, { backgroundColor: '#EA580C' }]} />
                <Text style={styles.bulletText}>Track workouts & progress</Text>
              </View>
              <View style={styles.bulletRow}>
                <View style={[styles.bulletDot, { backgroundColor: '#EA580C' }]} />
                <Text style={styles.bulletText}>Log meals and nutrition</Text>
              </View>
              <View style={styles.bulletRow}>
                <View style={[styles.bulletDot, { backgroundColor: '#EA580C' }]} />
                <Text style={styles.bulletText}>Follow personalized programs</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Coach Card */}
          <TouchableOpacity 
            style={[
              styles.card, 
              selectedRole === 'coach' && styles.cardSelectedCoach
            ]}
            onPress={() => setSelectedRole('coach')}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrap, { backgroundColor: '#CCFBF1' }]}>
                <UserCheck size={24} color="#06B6D4" />
              </View>
              {selectedRole === 'coach' && <CheckCircle2 size={24} color="#06B6D4" style={styles.checkIcon} />}
            </View>
            <Text style={styles.cardTitle}>I am a Coach</Text>
            <Text style={styles.cardDesc}>Manage your clients and deliver personalized training programs.</Text>
            
            <View style={styles.bulletList}>
              <View style={styles.bulletRow}>
                <View style={[styles.bulletDot, { backgroundColor: '#06B6D4' }]} />
                <Text style={styles.bulletText}>Manage and track client profiles and progress</Text>
              </View>
              <View style={styles.bulletRow}>
                <View style={[styles.bulletDot, { backgroundColor: '#06B6D4' }]} />
                <Text style={styles.bulletText}>Manage and build custom workouts and nutrition plans.</Text>
              </View>
              <View style={styles.bulletRow}>
                <View style={[styles.bulletDot, { backgroundColor: '#06B6D4' }]} />
                <Text style={styles.bulletText}>Coach Pro includes your own Athlete account at no extra cost.</Text>
              </View>
            </View>
          </TouchableOpacity>

        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerNote}>Choose the app that matches your role. You can't switch between apps after login.</Text>
          <TouchableOpacity 
            style={[styles.continueBtn, !selectedRole && styles.continueBtnDisabled]}
            onPress={handleContinue}
            disabled={!selectedRole}
          >
            <Text style={styles.continueBtnText}>Continue to Login</Text>
          </TouchableOpacity>
        </View>

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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backBtn: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  cardSelectedAthlete: {
    borderColor: '#EA580C',
    backgroundColor: '#FFF7ED',
  },
  cardSelectedCoach: {
    borderColor: '#06B6D4',
    backgroundColor: '#F0FDFA',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    marginRight: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 16,
  },
  bulletList: {
    gap: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '600',
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  footerNote: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 16,
  },
  continueBtn: {
    backgroundColor: '#06B6D4',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  continueBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  continueBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
