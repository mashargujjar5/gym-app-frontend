import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors, Typography, BorderRadius } from '../theme';
import { Button, Card, Badge } from '../components';
import { 
  ArrowLeft, 
  ChevronRight, 
  Info,
  Scale,
  Flame,
  Dumbbell,
  Zap,
  Target,
  User,
  CheckCircle2
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const GOALS = [
  { id: '1', title: 'Lose Fat', desc: 'Burn fat and get leaner', icon: Flame, color: Colors.fat },
  { id: '2', title: 'Build Muscle', desc: 'Increase size and strength', icon: Dumbbell, color: Colors.protein },
  { id: '3', title: 'Improve Fitness', desc: 'Better health and endurance', icon: Zap, color: Colors.carbs },
];

const ACTIVITY_LEVELS = [
  { id: '1', title: 'Sedentary', multiplier: '1.2x', desc: 'Office job, little to no exercise' },
  { id: '2', title: 'Moderately Active', multiplier: '1.55x', desc: 'Exercise 3-5 days per week' },
  { id: '3', title: 'Very Active', multiplier: '1.72x', desc: 'Physical job or exercise 6-7 days/week' },
];

const EXPERIENCE = [
  { id: '1', title: 'Beginner', desc: '0 - 1 years of training' },
  { id: '2', title: 'Intermediate', desc: '1 - 3 years of training' },
  { id: '3', title: 'Advanced', desc: '3+ years of training' },
];

export const AthleteQuestionnaireScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [selections, setSelections] = useState({
    goal: '',
    activity: '',
    experience: '',
  });

  const progress = (step / 5) * 100;

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
    else navigation.replace('AthleteTabs');
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigation.goBack();
  };

  const isNextDisabled = () => {
    if (step === 1 && selections.goal === '') return true;
    if (step === 2 && weight === '') return true;
    if (step === 3 && selections.activity === '') return true;
    if (step === 4 && selections.experience === '') return true;
    return false;
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.questionTitle}>What is your primary goal?</Text>
      <Text style={styles.questionSub}>This helps us tailor your program and calorie targets.</Text>
      
      <View style={styles.optionsGrid}>
        {GOALS.map((g) => (
          <TouchableOpacity
            key={g.id}
            onPress={() => setSelections({ ...selections, goal: g.id })}
            activeOpacity={0.8}
            style={[
              styles.goalCard,
              selections.goal === g.id && styles.selectedGoalCard
            ]}
          >
            <View style={[styles.goalIconBox, { backgroundColor: g.color + '15' }]}>
              <g.icon size={28} color={g.color} />
            </View>
            <Text style={styles.goalTitle}>{g.title}</Text>
            <Text style={styles.goalDesc}>{g.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.questionTitle}>What's your current weight?</Text>
      <Text style={styles.questionSub}>Accurate weight is key for calculating your macros.</Text>
      
      <View style={styles.weightInputContainer}>
        <TextInput
          style={styles.weightInput}
          placeholder="0.0"
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
          autoFocus
        />
        <View style={styles.unitToggle}>
          <TouchableOpacity 
            style={[styles.unitBtn, weightUnit === 'kg' && styles.activeUnitBtn]}
            onPress={() => setWeightUnit('kg')}
          >
            <Text style={[styles.unitBtnText, weightUnit === 'kg' && styles.activeUnitBtnText]}>KG</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.unitBtn, weightUnit === 'lbs' && styles.activeUnitBtn]}
            onPress={() => setWeightUnit('lbs')}
          >
            <Text style={[styles.unitBtnText, weightUnit === 'lbs' && styles.activeUnitBtnText]}>LBS</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Card style={styles.infoBox}>
        <Info size={20} color={Colors.primary} />
        <Text style={styles.infoText}>
          Don't worry, you can update this anytime in your profile settings.
        </Text>
      </Card>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.questionTitle}>What's your activity level?</Text>
      <Text style={styles.questionSub}>Select the option that best describes your daily life.</Text>
      
      <View style={styles.optionsList}>
        {ACTIVITY_LEVELS.map((a) => (
          <TouchableOpacity
            key={a.id}
            onPress={() => setSelections({ ...selections, activity: a.id })}
            activeOpacity={0.8}
            style={[
              styles.activityCard,
              selections.activity === a.id && styles.selectedActivityCard
            ]}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityTitle}>{a.title}</Text>
                <Badge label={a.multiplier} bgColor={Colors.primary + '10'} color={Colors.primary} />
              </View>
              <Text style={styles.activityDesc}>{a.desc}</Text>
            </View>
            <View style={[styles.radio, selections.activity === a.id && styles.radioActive]}>
              {selections.activity === a.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.questionTitle}>Your training experience?</Text>
      <Text style={styles.questionSub}>This helps us determine your initial training volume.</Text>
      
      <View style={styles.optionsList}>
        {EXPERIENCE.map((e) => (
          <TouchableOpacity
            key={e.id}
            onPress={() => setSelections({ ...selections, experience: e.id })}
            activeOpacity={0.8}
            style={[
              styles.activityCard,
              selections.experience === e.id && styles.selectedActivityCard
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>{e.title}</Text>
              <Text style={styles.activityDesc}>{e.desc}</Text>
            </View>
            <View style={[styles.radio, selections.experience === e.id && styles.radioActive]}>
              {selections.experience === e.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.successContainer}>
        <View style={styles.checkIcon}>
          <CheckCircle2 size={64} color={Colors.success} />
        </View>
        <Text style={styles.successTitle}>All Set!</Text>
        <Text style={styles.successSub}>
          We've calculated your targets based on your profile.
        </Text>
      </View>

      <Card style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Target size={20} color={Colors.white} />
          <Text style={styles.summaryTitleLabel}>Your Daily Targets</Text>
        </View>
        <View style={styles.summaryContent}>
          <View style={styles.targetItem}>
            <Text style={styles.targetValue}>2,640</Text>
            <Text style={styles.targetLabel}>Calories (Kcal)</Text>
          </View>
          <View style={styles.targetDivider} />
          <View style={styles.targetItem}>
            <Text style={styles.targetValue}>180g</Text>
            <Text style={styles.targetLabel}>Protein</Text>
          </View>
        </View>
        <Text style={styles.summaryNote}>
          This is your maintenance calorie level. Your program will be adjusted once you start your first phase.
        </Text>
      </Card>

      <View style={styles.profileSummary}>
        <View style={styles.profileItem}>
          <User size={18} color={Colors.textSecondary} />
          <Text style={styles.profileLabel}>Goal:</Text>
          <Text style={styles.profileValue}>Lose Fat</Text>
        </View>
        <View style={styles.profileItem}>
          <Scale size={18} color={Colors.textSecondary} />
          <Text style={styles.profileLabel}>Weight:</Text>
          <Text style={styles.profileValue}>{weight} {weightUnit}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={prevStep} style={styles.backBtn}>
            <ArrowLeft size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>{step}/5</Text>
          </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scroll}
        >
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueBtn, isNextDisabled() && styles.disabledBtn]}
            onPress={nextStep}
            disabled={isNextDisabled()}
          >
            <Text style={styles.continueBtnText}>
              {step === 5 ? "Go to Dashboard" : "Continue"}
            </Text>
            <ChevronRight size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.surface 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.cardBorder,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  stepIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  stepText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  scroll: { 
    paddingHorizontal: 24, 
    paddingBottom: 40,
    paddingTop: 10,
  },
  stepContainer: { 
    flex: 1 
  },
  questionTitle: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: Colors.textPrimary,
    lineHeight: 34,
  },
  questionSub: { 
    fontSize: 15, 
    color: Colors.textSecondary, 
    marginTop: 8,
    marginBottom: 32,
    lineHeight: 22,
  },
  optionsGrid: {
    gap: 16,
  },
  goalCard: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.cardBorder,
  },
  selectedGoalCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  goalIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  goalDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  weightInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  weightInput: {
    flex: 1,
    fontSize: 40,
    fontWeight: '800',
    color: Colors.textPrimary,
    padding: 10,
  },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBorder,
    borderRadius: 12,
    padding: 4,
  },
  unitBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeUnitBtn: {
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  activeUnitBtnText: {
    color: Colors.textPrimary,
  },
  infoBox: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: Colors.primary + '08',
    borderColor: Colors.primary + '20',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  optionsList: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  selectedActivityCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '05',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  activityDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  radioActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  checkIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.success + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  successSub: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  summaryCard: {
    backgroundColor: Colors.primary,
    padding: 24,
    borderRadius: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  summaryTitleLabel: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  targetItem: {
    flex: 1,
  },
  targetValue: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
  },
  targetLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    marginTop: 4,
  },
  targetDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 24,
  },
  summaryNote: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 18,
  },
  profileSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  profileValue: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  footer: { 
    padding: 24, 
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  continueBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  continueBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
