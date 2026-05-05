import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { workoutService } from '../services/workoutService';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../theme';
import { ChevronLeft, CheckCircle2, Info, TrendingUp, Medal, ShieldAlert } from 'lucide-react-native';

const mockCompletedExercises = [
  {
    id: '1',
    name: 'Barbell Bench Press',
    sets: [
      { set: 1, weight: '80 kg', reps: 12 },
      { set: 2, weight: '90 kg', reps: 10 },
      { set: 3, weight: '95 kg', reps: 8 },
      { set: 4, weight: '95 kg', reps: 8 },
    ]
  },
  {
    id: '2',
    name: 'Tricep Pushdowns',
    sets: [
      { set: 1, weight: '80 kg', reps: 12 },
      { set: 2, weight: '90 kg', reps: 10 },
      { set: 3, weight: '95 kg', reps: 8 },
      { set: 4, weight: '95 kg', reps: 8 },
    ]
  },
  {
    id: '3',
    name: 'Bicep Curls',
    sets: [
      { set: 1, weight: '80 kg', reps: 12 },
      { set: 2, weight: '90 kg', reps: 10 },
      { set: 3, weight: '95 kg', reps: 8 },
      { set: 4, weight: '95 kg', reps: 8 },
    ]
  },
];

export const CompletedWorkoutDetailScreen = ({ navigation, route }: any) => {
  const { workoutId } = route.params || {};
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (workoutId) {
      fetchWorkoutLog();
    }
  }, [workoutId]);

  const fetchWorkoutLog = async () => {
    try {
      setLoading(true);
      // This endpoint gets the logged workout details
      const res = await workoutService.getWorkoutDetail(workoutId); 
      if (res.success) {
        setWorkout(res.data);
      }
    } catch (err) {
      console.error('Fetch workout log error:', err);
    } finally {
      setLoading(false);
    }
  };

  const workoutData = workout || {
    name: 'Workout',
    date: new Date().toISOString(),
    duration: 0,
    calories: 0,
    exercises: [],
    exerciseCount: 0
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        
        <View style={styles.completedBadge}>
          <CheckCircle2 size={16} color={Colors.success} />
          <Text style={styles.completedText}>COMPLETED</Text>
        </View>
        
        <Text style={styles.title}>{workoutData.name}</Text>
        <View style={styles.dateRow}>
          <Text style={styles.dateIcon}>📅</Text>
          <Text style={styles.dateText}>{format(new Date(workoutData.date), 'EEEE, MMMM d, yyyy')}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}><Text style={styles.statIconText}>⏱</Text></View>
            <Text style={styles.statValue}>{workoutData.duration} min</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}><Text style={styles.statIconText}>🔥</Text></View>
            <Text style={styles.statValue}>{workoutData.calories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}><Text style={styles.statIconText}>🔗</Text></View>
            <Text style={styles.statValue}>{workoutData.exerciseCount}</Text>
            <Text style={styles.statLabel}>Exercises</Text>
          </View>
        </View>

        {/* Exercises Section */}
        <Text style={styles.sectionTitle}>Exercises</Text>
        
        {workoutData.exercises.map((exercise: any, index: number) => (
          <View key={index} style={styles.exerciseCard}>
            <View style={styles.exHeader}>
              <View style={styles.exLeft}>
                <View style={styles.exNumberBox}>
                  <Text style={styles.exNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.exName}>{exercise.name}</Text>
              </View>
            </View>

            {/* Table */}
            <View style={styles.tableHeader}>
              <Text style={[styles.thText, { flex: 0.5 }]}>Set</Text>
              <Text style={[styles.thText, { flex: 1, textAlign: 'center' }]}>Weight</Text>
              <Text style={[styles.thText, { flex: 1, textAlign: 'center' }]}>Reps</Text>
              <Text style={[styles.thText, { flex: 0.5, textAlign: 'right' }]}>Done</Text>
            </View>

            {(exercise.sets || []).map((set: any, i: number) => (
              <View key={i} style={styles.tableRow}>
                <Text style={[styles.tdText, { flex: 0.5, fontWeight: '700' }]}>{set.setNumber}</Text>
                <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>{set.weight} kg</Text>
                <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>{set.reps}</Text>
                <View style={[styles.tdTextWrap, { flex: 0.5, alignItems: 'flex-end' }]}>
                  <CheckCircle2 size={20} color={Colors.success} />
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.dashboardBtn} onPress={() => navigation.navigate('AthleteTabs')}>
          <Text style={styles.dashboardBtnText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    marginBottom: 20,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  completedText: {
    color: Colors.success,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateIcon: {
    fontSize: 14,
  },
  dateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIconWrap: {
    marginBottom: 8,
  },
  statIconText: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  exerciseCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  exHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  exLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    paddingRight: 16,
  },
  exNumberBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  exName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    flex: 1,
  },
  exIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpaced: {
    marginRight: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  thText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tdText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  tdTextWrap: {
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  dashboardBtn: {
    backgroundColor: '#010E1F',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  dashboardBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
