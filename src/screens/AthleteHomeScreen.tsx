import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
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
import { workoutService } from '../services/workoutService';

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
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      // We'll use workoutService or a dedicated athleteService
      const res = await workoutService.getDashboardData(); 
      if (res.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const dashboardData = data || {
    user: { firstName: 'Athlete', profileImage: null },
    nutrition: null,
    todayWorkout: null,
    weeklySummary: { workoutsCompleted: '0/5', activeDays: 0, avgCalories: 0, avgSteps: 0 },
    recentWorkouts: [],
    prehabStatus: []
  };

  // Transform backend nutrition to UI rings format
  const getNutritionRings = () => {
    if (!dashboardData.nutrition) return mockNutrition.rings;
    
    const { consumedCalories, targetCalories, macros } = dashboardData.nutrition;
    return [
      { progress: consumedCalories / targetCalories, color: Colors.calories, label: 'Calories', current: consumedCalories.toString(), target: targetCalories.toString() },
      { progress: macros.protein.current / macros.protein.target, color: Colors.protein, label: 'Protein', current: macros.protein.current.toString(), target: `${macros.protein.target}g` },
      { progress: macros.carbs.current / macros.carbs.target, color: Colors.carbs, label: 'Carbs', current: macros.carbs.current.toString(), target: `${macros.carbs.target}g` },
      { progress: macros.fat.current / macros.fat.target, color: Colors.fat, label: 'Fats', current: macros.fat.current.toString(), target: `${macros.fat.target}g` },
      { progress: macros.fiber.current / macros.fiber.target, color: Colors.fiber, label: 'Fiber', current: macros.fiber.current.toString(), target: `${macros.fiber.target}g` },
      { progress: macros.iron.current / macros.iron.target, color: Colors.iron, label: 'Iron', current: macros.iron.current.toString(), target: `${macros.iron.target}mg` },
    ];
  };

  const nutritionRings = getNutritionRings();
  const currentCalories = dashboardData.nutrition?.consumedCalories || 0;
  const targetCalories = dashboardData.nutrition?.targetCalories || 2000;

  const weeklyStats = [
    { label: 'Completed', value: dashboardData.weeklySummary.workoutsCompleted, subtext: 'sessions', icon: CheckCircle2, color: Colors.success },
    { label: 'Active Days', value: `${dashboardData.weeklySummary.activeDays}`, subtext: 'this week', icon: Flame, color: '#F59E0B' },
    { label: 'Avg Burn', value: `${dashboardData.weeklySummary.avgCalories}`, subtext: 'kcal/day', icon: Activity, color: '#EF4444' },
    { label: 'Avg Steps', value: `${dashboardData.weeklySummary.avgSteps}`, subtext: 'daily steps', icon: Clock, color: Colors.protein },
  ];

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
            <Text style={styles.userName}>{dashboardData.user.firstName}</Text>
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
               {dashboardData.user.profileImage ? (
                 <Image source={{ uri: dashboardData.user.profileImage }} style={{ width: '100%', height: '100%' }} />
               ) : (
                 <View style={styles.avatarFallback}>
                   <Text style={styles.avatarText}>{dashboardData.user.firstName[0]}</Text>
                 </View>
               )}
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
              rings={nutritionRings.map((r: any) => ({ progress: r.progress, color: r.color }))}
              centerTopText={currentCalories}
              centerBottomText={`/ ${targetCalories}`}
            />
          </View>

          <View style={styles.legendGrid}>
            {nutritionRings.map((item: any, index: number) => (
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
              <Text style={styles.workoutTitle}>{dashboardData.todayWorkout?.workoutTitle || 'Rest Day'}</Text>
              <View style={styles.workoutIconBtn}>
                <Link2 size={20} color={Colors.textSecondary} />
              </View>
            </View>
            
            {dashboardData.todayWorkout ? (
              <>
                <View style={styles.workoutMetaRow}>
                  <Text style={styles.workoutMetaText}>{dashboardData.todayWorkout.exerciseCount} exercises</Text>
                  <Text style={styles.workoutMetaDot}>•</Text>
                  <Text style={styles.workoutMetaText}>{dashboardData.todayWorkout.estimatedDuration}</Text>
                </View>

                <TouchableOpacity 
                  style={styles.startWorkoutBtn}
                  onPress={() => navigation.navigate('ActiveWorkout', { workoutId: dashboardData.todayWorkout.id })}
                >
                  <Play size={16} color={Colors.white} fill={Colors.white} style={{ marginRight: 8 }} />
                  <Text style={styles.startWorkoutText}>Start Workout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.restDayBox}>
                <Text style={styles.restDayText}>No workout scheduled for today. Enjoy your recovery!</Text>
              </View>
            )}
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
              <AlertTriangle size={16} color={dashboardData.prehabStatus.length > 0 ? Colors.error : Colors.success} />
              <Text style={[styles.alertText, dashboardData.prehabStatus.length === 0 && { color: Colors.success }]}>
                {dashboardData.prehabStatus.length > 0 ? `${dashboardData.prehabStatus.length} Areas Need Attention` : 'All Systems Good'}
              </Text>
            </View>

            <View style={styles.preHabStatsRow}>
              {dashboardData.prehabStatus.length > 0 ? (
                dashboardData.prehabStatus.map((item: any, idx: number) => (
                  <View key={idx} style={styles.preHabStatBox}>
                    <Text style={styles.preHabStatLabel}>{item.category || 'Focus Area'}</Text>
                    <Text style={[styles.preHabStatValue, { color: item.riskLevel === 'High' ? Colors.error : Colors.fat }]}>
                      {item.area || item.riskLevel}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={styles.preHabStatBox}>
                  <Text style={styles.preHabStatLabel}>Recovery Score</Text>
                  <Text style={[styles.preHabStatValue, { color: Colors.success }]}>Optimal</Text>
                </View>
              )}
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
            {weeklyStats.map((stat, index) => (
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
            {dashboardData.recentWorkouts.length === 0 ? (
              <Text style={styles.emptyRecentText}>No recent workouts logged yet.</Text>
            ) : (
              dashboardData.recentWorkouts.map((workout: any, index: number) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => navigation.navigate('CompletedWorkoutDetail', { workoutId: workout.id })}
                >
                  <Card style={styles.recentCard}>
                    <View style={styles.recentCardTop}>
                      <View style={styles.recentCardLeft}>
                        <View style={styles.completedIconBox}>
                          <CheckCircle2 size={16} color={Colors.success} />
                        </View>
                        <View>
                          <Text style={styles.recentTitle}>{workout.workoutTitle}</Text>
                          <View style={styles.recentMetaRow}>
                            <Calendar size={12} color={Colors.textMuted} />
                            <Text style={styles.recentMetaText}>{format(new Date(workout.date), 'MMM d, h:mm a')}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.recentCardRight}>
                        <Text style={styles.recentDuration}>{workout.duration} min</Text>
                        <Text style={styles.recentCals}>{workout.caloriesBurned} kcal</Text>
                      </View>
                    </View>
                    <View style={styles.recentCardBottom}>
                      <Dumbbell size={12} color={Colors.textMuted} />
                      <Text style={styles.recentMetaText}>{workout.exerciseCount} exercises completed</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))
            )}
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
  restDayBox: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  restDayText: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  emptyRecentText: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingVertical: 20,
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
