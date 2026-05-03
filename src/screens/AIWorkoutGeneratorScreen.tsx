import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Platform, Switch } from 'react-native';
import { Colors } from '../theme';
import { ChevronLeft, Sparkles, ChevronDown } from 'lucide-react-native';

export const AIWorkoutGeneratorScreen = ({ navigation }: any) => {
  const [workoutName, setWorkoutName] = useState('');
  const [includePrehab, setIncludePrehab] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Area */}
      <View style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleRow}>
            <Sparkles size={20} color="#06B6D4" style={{marginRight: 8}} />
            <Text style={styles.headerTitle}>AI Workout Generator</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
        <Text style={styles.headerSub}>Let AI create a personalized workout based on your training style</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Training Style Info Card */}
        <View style={styles.styleCard}>
          <View style={styles.styleCardTop}>
            <View style={styles.iconBox}>
              <Sparkles size={16} color="#06B6D4" />
            </View>
            <Text style={styles.styleCardTitle}>Your Training Style: Bodybuilding</Text>
          </View>
          <Text style={styles.styleCardSub}>Hypertrophy-focused training</Text>
          
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>Hypertrophy rep ranges (8-12)</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>Muscle group isolation</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>Volume-based training</Text>
            </View>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>WORKOUT NAME *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Upper Body Hypertrophy"
            placeholderTextColor="#94A3B8"
            value={workoutName}
            onChangeText={setWorkoutName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>FOCUS AREA *</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownTextPlaceholder}>Select focus area</Text>
            <ChevronDown size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>WORKOUT DURATION</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownTextValue}>60 min</Text>
            <ChevronDown size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>DIFFICULTY LEVEL</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownTextValue}>Intermediate</Text>
            <ChevronDown size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Pre-hab Toggle */}
        <View style={styles.toggleRow}>
          <View style={styles.toggleTextCol}>
            <Text style={styles.toggleTitle}>Include Pre-hab Exercises</Text>
            <Text style={styles.toggleDesc}>Add warm-up and injury prevention exercises at the beginning of your workout</Text>
          </View>
          <Switch
            trackColor={{ false: '#E2E8F0', true: '#06B6D4' }}
            thumbColor={Colors.white}
            ios_backgroundColor="#E2E8F0"
            onValueChange={setIncludePrehab}
            value={includePrehab}
          />
        </View>

        <Text style={styles.bottomTip}>
          AI will create exercises optimized for bodybuilding
        </Text>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.generateBtn} onPress={() => navigation.navigate('CreateTemplate')}>
          <Sparkles size={20} color="#94A3B8" style={{marginRight: 8}} />
          <Text style={styles.generateBtnText}>Generate Workout</Text>
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
  headerWrap: {
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  styleCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  styleCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  styleCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  styleCardSub: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
    marginLeft: 40,
  },
  bulletList: {
    marginLeft: 40,
    gap: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#64748B',
    marginTop: 6,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: '#475569',
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#0F172A',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
  },
  dropdownTextPlaceholder: {
    fontSize: 14,
    color: '#94A3B8',
  },
  dropdownTextValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 8,
    marginBottom: 24,
  },
  toggleTextCol: {
    flex: 1,
    paddingRight: 16,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  toggleDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  bottomTip: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 32 : 24,
    backgroundColor: '#F8FAFC',
  },
  generateBtn: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9', // Deactivated state until valid
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#94A3B8',
  }
});
