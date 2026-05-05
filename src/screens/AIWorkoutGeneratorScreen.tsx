import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Platform, Switch } from 'react-native';
import { ChevronLeft, Sparkles, ChevronDown, Check } from 'lucide-react-native';
import { templateService } from '../services/templateService';
import { Colors } from '../theme';

export const AIWorkoutGeneratorScreen = ({ navigation }: any) => {
  const [workoutName, setWorkoutName] = useState('');
  const [includePrehab, setIncludePrehab] = useState(true);
  const [focusArea, setFocusArea] = useState('Full Body');
  const [duration, setDuration] = useState('60 min');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!workoutName) return;

    try {
      setLoading(true);
      const params = {
        style: 'Bodybuilding', // Dynamic based on style card
        focusArea,
        duration: parseInt(duration),
        difficulty
      };

      const response = await templateService.generateAITemplate(params);
      if (response.success) {
        // Pre-fill the name if provided
        const aiData = {
          ...response.data,
          name: workoutName
        };
        navigation.navigate('CreateTemplate', { aiData });
      }
    } catch (error) {
      console.error('Generate AI workout error:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <View style={styles.chipRow}>
            {['Full Body', 'Upper Body', 'Lower Body', 'Push', 'Pull'].map(area => (
              <TouchableOpacity 
                key={area} 
                style={[styles.chip, focusArea === area && styles.chipActive]}
                onPress={() => setFocusArea(area)}
              >
                <Text style={[styles.chipText, focusArea === area && styles.chipTextActive]}>{area}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>WORKOUT DURATION</Text>
          <View style={styles.chipRow}>
            {['30 min', '45 min', '60 min', '75 min', '90 min'].map(time => (
              <TouchableOpacity 
                key={time} 
                style={[styles.chip, duration === time && styles.chipActive]}
                onPress={() => setDuration(time)}
              >
                <Text style={[styles.chipText, duration === time && styles.chipTextActive]}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>DIFFICULTY LEVEL</Text>
          <View style={styles.chipRow}>
            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
              <TouchableOpacity 
                key={level} 
                style={[styles.chip, difficulty === level && styles.chipActive]}
                onPress={() => setDifficulty(level)}
              >
                <Text style={[styles.chipText, difficulty === level && styles.chipTextActive]}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
        <TouchableOpacity 
          style={[styles.generateBtn, (workoutName && !loading) && styles.generateBtnActive]} 
          onPress={handleGenerate}
          disabled={!workoutName || loading}
        >
          <Sparkles size={20} color={workoutName ? Colors.white : "#94A3B8"} style={{marginRight: 8}} />
          <Text style={[styles.generateBtnText, workoutName && styles.generateBtnTextActive]}>
            {loading ? 'Generating...' : 'Generate Workout'}
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
  generateBtnActive: {
    backgroundColor: '#0F172A',
  },
  generateBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#94A3B8',
  },
  generateBtnTextActive: {
    color: Colors.white,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: '#06B6D4',
    borderColor: '#06B6D4',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  chipTextActive: {
    color: Colors.white,
  }
});
