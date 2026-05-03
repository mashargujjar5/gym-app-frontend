import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Colors } from '../theme';
import { ChevronLeft, User, Sparkles, CheckCircle2 } from 'lucide-react-native';

export const CreateWorkoutOptionScreen = ({ navigation }: any) => {
  const [selectedOption, setSelectedOption] = useState<'user' | 'ai'>('ai');

  const handleContinue = () => {
    if (selectedOption === 'ai') {
      navigation.navigate('AIWorkoutGenerator');
    } else {
      navigation.navigate('CreateTemplate');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Workout</Text>
        <View style={{ width: 40 }} /> {/* Placeholder for balance */}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Choose how you'd like to create your workout template</Text>

        {/* User Created Option */}
        <TouchableOpacity 
          style={[styles.optionCard, selectedOption === 'user' && styles.optionCardActive]}
          onPress={() => setSelectedOption('user')}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconWrap, { backgroundColor: '#F1F5F9' }]}>
              <User size={24} color="#64748B" />
            </View>
            <View style={styles.titleWrap}>
              <Text style={styles.cardTitle}>User Created</Text>
            </View>
          </View>
          
          <Text style={styles.cardDesc}>
            Manually build your workout by selecting exercises, sets, reps, and rest periods.
          </Text>

          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>Full control over exercise selection</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>Customize sets, reps, rest, and RPE</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>Perfect for experienced trainers</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* AI Generated Option */}
        <TouchableOpacity 
          style={[
            styles.optionCard, 
            selectedOption === 'ai' && styles.optionCardActive,
            { borderColor: selectedOption === 'ai' ? '#06B6D4' : '#E2E8F0' }
          ]}
          onPress={() => setSelectedOption('ai')}
          activeOpacity={0.8}
        >
          {/* Subtle gradient-like background indication could go here, for now solid color */}
          {selectedOption === 'ai' && <View style={styles.aiGlow} />}
          
          <View style={styles.cardHeader}>
            <View style={[styles.iconWrap, { backgroundColor: '#06B6D4' }]}>
              <Sparkles size={24} color={Colors.white} />
            </View>
            <View style={styles.titleWrapRow}>
              <Text style={styles.cardTitle}>AI Generated</Text>
              <View style={styles.smartBadge}>
                <Text style={styles.smartBadgeText}>SMART</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.cardDesc}>
            Let AI auto-generate a personalized workout based on your training style, goals, and preferences.
          </Text>

          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <CheckCircle2 size={14} color="#06B6D4" style={{marginRight: 8, marginTop: 2}} />
              <Text style={styles.bulletText}>Tailored to your training style</Text>
            </View>
            <View style={styles.bulletItem}>
              <CheckCircle2 size={14} color="#06B6D4" style={{marginRight: 8, marginTop: 2}} />
              <Text style={styles.bulletText}>Includes pre-hab & injury prevention</Text>
            </View>
            <View style={styles.bulletItem}>
              <CheckCircle2 size={14} color="#06B6D4" style={{marginRight: 8, marginTop: 2}} />
              <Text style={styles.bulletText}>Optimized rep ranges & progressions</Text>
            </View>
            <View style={styles.bulletItem}>
              <CheckCircle2 size={14} color="#06B6D4" style={{marginRight: 8, marginTop: 2}} />
              <Text style={styles.bulletText}>Quick & efficient workout planning</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.tipBox}>
          <Text style={styles.tipText}>
            <Text style={{fontWeight: '800'}}>💡 Tip: </Text>
            AI generated workouts consider your preferred training style (Bodybuilding, Powerlifting, Calisthenics, etc.) and automatically optimize for your goals.
          </Text>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueBtnText}>
            {selectedOption === 'ai' ? 'Continue with AI' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#F8FAFC',
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
  },
  optionCardActive: {
    borderColor: '#0F172A',
  },
  aiGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#CFFAFE',
    opacity: 0.3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  titleWrap: {
    flex: 1,
  },
  titleWrapRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  smartBadge: {
    backgroundColor: '#06B6D4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 12,
  },
  smartBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.white,
  },
  cardDesc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 20,
  },
  bulletList: {
    gap: 12,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94A3B8',
    marginTop: 6,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
    lineHeight: 18,
  },
  tipBox: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  tipText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  footer: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 32 : 24,
    backgroundColor: '#F8FAFC',
  },
  continueBtn: {
    backgroundColor: '#06B6D4',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#06B6D4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 4 }
    })
  },
  continueBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
  }
});
