import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Colors, BorderRadius } from '../theme';
import { Card, NutritionRings } from '../components';
import { 
  Bell, 
  ChevronRight, 
  Flame, 
  Clock,
  Dumbbell,
  AlertTriangle,
  Play,
  CheckCircle2,
  Calendar,
  Activity,
  ArrowRight,
  ShieldAlert,
  Link2,
  Home,
  Utensils,
  LineChart,
  Settings,
  MessageCircle
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const mockNutrition = {
  currentCalories: 1450,
  targetCalories: 2600,
  rings: [
    { progress: 1450 / 2600, color: Colors.calories, label: 'Calories', current: '1450', target: '2600' },
    { progress: 95 / 150, color: Colors.protein, label: 'Protein', current: '95', target: '150g' },
    { progress: 195 / 280, color: Colors.carbs, label: 'Carbs', current: '195', target: '280g' },
    { progress: 48 / 75, color: Colors.fat, label: 'Fats', current: '48', target: '75g' },
    { progress: 1430 / 2800, color: Colors.sugar, label: 'Sugar', current: '1430', target: '2800' },
    { progress: 65 / 180, color: Colors.fiber, label: 'Fiber', current: '65', target: '180g' },
    { progress: 1.43 / 2.50, color: Colors.iron, label: 'Iron', current: '1.43', target: '2.50g' },
  ]
};

const mockWeekly = [
  { label: 'Completed', value: '4/5', subtext: 'sessions', icon: CheckCircle2, color: Colors.success },
  { label: 'Streak', value: '5 days', subtext: 'Keep it up!', icon: Flame, color: Colors.textSecondary },
  { label: 'Time', value: '185', subtext: 'minutes', icon: Clock, color: Colors.protein },
  { label: 'Calories', value: '1360', subtext: 'kcal burned', icon: Activity, color: Colors.textSecondary },
];

const mockRecent = [
  { title: 'Lower Body Strength', date: 'Today • 08:30 AM', exercises: 6, duration: '52 min', cals: '320 kcal', completed: true },
  { title: 'Upper Body Hypertrophy', date: 'Yesterday • 07:15 AM', exercises: 7, duration: '68 min', cals: '382 kcal', completed: true },
];

export const AthleteHomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>Alex</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.notifBtn}
              onPress={() => navigation.navigate('AthleteMessages')}
            >
              <MessageCircle size={22} color={Colors.textPrimary} />
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatarContainer}>
               <View style={styles.avatarFallback}>
                 <Text style={styles.avatarText}>A</Text>
               </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nutrition Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Nutrition</Text>
          
          <View style={styles.ringsContainer}>
            <NutritionRings 
              size={width * 0.75}
              strokeWidth={10}
              gap={4}
              rings={mockNutrition.rings.map(r => ({ progress: r.progress, color: r.color }))}
              centerTopText={mockNutrition.currentCalories}
              centerBottomText={`/ ${mockNutrition.targetCalories}`}
            />
          </View>

          <View style={styles.legendGrid}>
            {mockNutrition.rings.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={[styles.legendLabel, { color: item.color }]}>{item.label}</Text>
                <Text style={styles.legendValue}>{item.current}/{item.target}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Today's Workout */}
        <View style={styles.section}>
          <Card style={styles.workoutCard}>
            <Text style={styles.workoutSubtext}>TODAY'S WORKOUT</Text>
            <View style={styles.workoutHeaderRow}>
              <Text style={styles.workoutTitle}>Upper Body Hypertrophy</Text>
              <View style={styles.workoutIconBtn}>
                <Link2 size={20} color={Colors.textSecondary} />
              </View>
            </View>
            
            <View style={styles.workoutMetaRow}>
              <Text style={styles.workoutMetaText}>7 exercises</Text>
              <Text style={styles.workoutMetaDot}>•</Text>
              <Text style={styles.workoutMetaText}>68 min</Text>
            </View>

            <TouchableOpacity 
              style={styles.startWorkoutBtn}
              onPress={() => navigation.navigate('ActiveWorkout')}
            >
              <Play size={16} color={Colors.white} fill={Colors.white} style={{ marginRight: 8 }} />
              <Text style={styles.startWorkoutText}>Start Workout</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Injury Prevention */}
        <View style={styles.section}>
          <Card style={[styles.preHabCard, { backgroundColor: '#E0F8F5' }]}>
            <View style={styles.preHabHeader}>
               <View>
                 <Text style={styles.preHabSubtext}>INJURY PREVENTION</Text>
                 <Text style={styles.preHabTitle}>Pre-hab Monitor</Text>
               </View>
               <View style={styles.shieldIconBox}>
                 <ShieldAlert size={20} color={'#0D9488'} />
               </View>
            </View>

            <View style={styles.alertBox}>
              <AlertTriangle size={16} color={Colors.error} />
              <Text style={styles.alertText}>2 Areas Need Attention</Text>
            </View>

            <View style={styles.preHabStatsRow}>
              <View style={styles.preHabStatBox}>
                <Text style={styles.preHabStatLabel}>Overtraining</Text>
                <Text style={[styles.preHabStatValue, { color: Colors.error }]}>Shoulders</Text>
              </View>
              <View style={styles.preHabStatBox}>
                <Text style={styles.preHabStatLabel}>Mobility Risk</Text>
                <Text style={[styles.preHabStatValue, { color: Colors.fat }]}>High</Text>
              </View>
            </View>

            <View style={styles.preHabFooter}>
              <TouchableOpacity style={styles.viewReportBtn}>
                <Text style={styles.viewReportText}>View Full Report</Text>
                <ArrowRight size={14} color={'#0D9488'} />
              </TouchableOpacity>
              <Text style={styles.updatedText}>Updated today</Text>
            </View>
          </Card>
        </View>

        {/* This Week */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsGrid}>
            {mockWeekly.map((stat, index) => (
              <Card key={index} style={styles.statCard}>
                <View style={styles.statCardHeader}>
                  <stat.icon size={16} color={stat.color} />
                  <Text style={styles.statCardLabel}>{stat.label}</Text>
                </View>
                <Text style={styles.statCardValue}>{stat.value}</Text>
                <Text style={styles.statCardSubtext}>{stat.subtext}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          <View style={styles.recentList}>
            {mockRecent.map((workout, index) => (
              <Card key={index} style={styles.recentCard}>
                <View style={styles.recentCardTop}>
                  <View style={styles.recentCardLeft}>
                    <View style={styles.completedIconBox}>
                      <CheckCircle2 size={16} color={Colors.success} />
                    </View>
                    <View>
                      <Text style={styles.recentTitle}>{workout.title}</Text>
                      <View style={styles.recentMetaRow}>
                        <Calendar size={12} color={Colors.textMuted} />
                        <Text style={styles.recentMetaText}>{workout.date}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.recentCardRight}>
                    <Text style={styles.recentDuration}>{workout.duration}</Text>
                    <Text style={styles.recentCals}>{workout.cals}</Text>
                  </View>
                </View>
                <View style={styles.recentCardBottom}>
                  <Dumbbell size={12} color={Colors.textMuted} />
                  <Text style={styles.recentMetaText}>{workout.exercises} exercises completed</Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.surface 
  },
  scroll: { 
    paddingBottom: 100,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notifBtn: {
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: Colors.cardBorder,
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.textPrimary,
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
  },
  ringsContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  legendItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '700',
    width: 50,
  },
  legendValue: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  workoutCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  workoutSubtext: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  workoutHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    flex: 1,
  },
  workoutIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  workoutMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  workoutMetaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  workoutMetaDot: {
    marginHorizontal: 8,
    color: Colors.textMuted,
  },
  startWorkoutBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startWorkoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  preHabCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 0,
  },
  preHabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  preHabSubtext: {
    fontSize: 10,
    color: '#0D9488',
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  preHabTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  shieldIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4E6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  alertText: {
    color: Colors.error,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  preHabStatsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  preHabStatBox: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
  },
  preHabStatLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  preHabStatValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  preHabFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(13, 148, 136, 0.1)',
    paddingTop: 16,
  },
  viewReportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewReportText: {
    color: '#0D9488',
    fontSize: 14,
    fontWeight: '700',
    marginRight: 4,
  },
  updatedText: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 48 - 12) / 2,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.white,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statCardLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginLeft: 6,
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  statCardSubtext: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  recentList: {
    gap: 12,
  },
  recentCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.white,
  },
  recentCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recentCardLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  completedIconBox: {
    marginTop: 2,
    marginRight: 12,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  recentMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recentMetaText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  recentCardRight: {
    alignItems: 'flex-end',
  },
  recentDuration: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  recentCals: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  recentCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
    color: Colors.textMuted,
  },
});
