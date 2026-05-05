import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme';
import { Plus, ChevronRight, Play, Heart, Coffee, Dumbbell, Activity, Calendar as CalendarIcon, CheckCircle2, Clock, X } from 'lucide-react-native';
import { workoutService } from '../services/workoutService';
import { useFocusEffect } from '@react-navigation/native';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

const { width } = Dimensions.get('window');

export const AthleteWorkoutsScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'history' | 'library'>('history');
  const [schedule, setSchedule] = useState<any[]>([]);
  const [library, setLibrary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const start = weekDates[0].toISOString();
      const end = weekDates[6].toISOString();
      const res = await workoutService.getWeeklySchedule(start, end);
      if (res.success) {
        setSchedule(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLibrary = async () => {
    try {
      const res = await workoutService.getWorkoutLibrary();
      if (res.success) {
        setLibrary(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSchedule();
      fetchLibrary();
    }, [])
  );

  const getWorkoutIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'strength': return Dumbbell;
      case 'cardio': return Activity;
      case 'yoga':
      case 'mobility': return Heart;
      default: return Dumbbell;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Workouts</Text>
        <Text style={styles.headerSubtitle}>
          Week of {format(weekDates[0], 'MMMM d')}-{format(weekDates[6], 'd')}
        </Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'history' && styles.tabActive]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>My History</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'library' && styles.tabActive]}
            onPress={() => setActiveTab('library')}
          >
            <Text style={[styles.tabText, activeTab === 'library' && styles.tabTextActive]}>Workout Library</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'history' ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Calendar Strip */}
          <View style={styles.calendarStrip}>
            {weekDates.map((date, index) => {
              const isSame = isSameDay(date, selectedDate);
              return (
                <TouchableOpacity 
                  key={index} 
                  style={styles.calendarDay}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={styles.calDayText}>{format(date, 'EEE')}</Text>
                  <View style={[styles.calDateBox, isSame && styles.calDateBoxSelected]}>
                    <Text style={[styles.calDateText, isSame && styles.calDateTextSelected]}>
                      {format(date, 'd')}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.logBtn, { flex: 1 }]}>
              <Activity size={20} color={Colors.textPrimary} />
              <Text style={styles.logBtnText}>Log Rest Day</Text>
            </TouchableOpacity>
          </View>

          {/* Workout Cards */}
          <View style={styles.listContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Loading workouts...</Text>
              </View>
            ) : schedule.length === 0 ? (
              <View style={styles.emptyState}>
                <Heart size={40} color="#10B981" />
                <Text style={styles.emptyStateText}>Rest Day</Text>
                <Text style={styles.emptyStateSub}>Recovery & Regeneration</Text>
              </View>
            ) : (
              schedule
                .filter(item => isSameDay(new Date(item.scheduledDate), selectedDate))
                .map((item) => {
                  return (
                    <TouchableOpacity 
                      key={item._id} 
                      style={styles.workoutCard}
                      onPress={() => navigation.navigate('ActiveWorkout', { workoutId: item._id })}
                    >
                      <View style={styles.cardHeader}>
                        <View>
                          <Text style={styles.cardTitle}>{item.name}</Text>
                          <Text style={styles.cardDate}>{format(new Date(item.scheduledDate), 'MMM d')}</Text>
                        </View>
                        <View style={styles.cardIconCircle}>
                          <Dumbbell size={20} color="#475569" />
                        </View>
                      </View>

                      <View style={styles.cardStatsRow}>
                        <View style={styles.cardStatItem}>
                          <Clock size={14} color={Colors.textMuted} />
                          <Text style={styles.cardStatText}>{item.duration} mins</Text>
                        </View>
                        <View style={styles.cardStatItem}>
                          <Activity size={14} color={Colors.textMuted} />
                          <Text style={styles.cardStatText}>{item.exercises?.length || 0} exercises</Text>
                        </View>
                        <View style={styles.cardStatItem}>
                          <CheckCircle2 size={14} color={Colors.textMuted} />
                          <Text style={styles.cardStatText}>{item.setsCount || 3} sets</Text>
                        </View>
                      </View>

                      <View style={[
                        styles.statusBadge, 
                        { backgroundColor: '#E0F2FE' }
                      ]}>
                        <Text style={[
                          styles.statusBadgeText,
                          { color: '#0EA5E9' }
                        ]}>
                          Coach Created
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
            )}

            {/* Manual Rest Day Example */}
            <View style={styles.restDayCard}>
              <View style={styles.restIconCircle}>
                <Heart size={20} color="#10B981" />
              </View>
              <View>
                <Text style={styles.restTitle}>Rest Day</Text>
                <Text style={styles.restSub}>Mar 4</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.libraryScrollContent}>
          {(() => {
            // Extract all exercises from the selected date's workouts
            const dailyWorkouts = schedule.filter(item => 
              isSameDay(new Date(item.scheduledDate), selectedDate)
            );
            
            const allExercises: any[] = [];
            dailyWorkouts.forEach(workout => {
              if (workout.exercises) {
                workout.exercises.forEach((ex: any) => {
                  allExercises.push({
                    ...ex,
                    workoutName: workout.name
                  });
                });
              }
            });

            if (allExercises.length === 0) {
              return (
                <View style={styles.emptyState}>
                  <Play size={40} color={Colors.textMuted} />
                  <Text style={styles.emptyStateText}>No exercise videos for this date.</Text>
                  <Text style={styles.emptyStateSub}>Workout videos appear here when a coach assigns a plan.</Text>
                </View>
              );
            }

            return allExercises.map((item, idx) => (
              <TouchableOpacity 
                key={`${item.id || item._id}-${idx}`} 
                style={styles.libraryCard}
                onPress={() => setSelectedVideo(item)}
              >
                <ImageBackground 
                  source={{ uri: item.videoThumbnail || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80' }} 
                  style={styles.libraryImage}
                  imageStyle={{ borderRadius: 24 }}
                >
                  <LinearGradient
                    colors={['transparent', 'rgba(1, 14, 31, 0.9)']}
                    style={styles.libraryOverlay}
                  >
                    <View style={styles.libraryTextContent}>
                      <Text style={styles.libraryTitle}>{item.name}</Text>
                      <View style={styles.libraryMetaRow}>
                        <Text style={styles.librarySubtitle}>{item.workoutName}</Text>
                        <View style={styles.dotSeparator} />
                        <Text style={styles.librarySubtitle}>{item.sets} Sets</Text>
                        <View style={styles.dotSeparator} />
                        <Text style={styles.librarySubtitle}>{item.reps} Reps</Text>
                      </View>
                    </View>
                    <View style={styles.libraryPlayBtn}>
                      <Play size={18} color={Colors.white} fill={Colors.white} />
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            ));
          })()}
        </ScrollView>
      )}

      {/* Video Player Modal */}
      <Modal visible={!!selectedVideo} transparent animationType="slide">
        <View style={styles.videoModalOverlay}>
          <View style={styles.videoModalContent}>
            <View style={styles.videoHeader}>
              <Text style={styles.videoHeaderTitle}>{selectedVideo?.name}</Text>
              <TouchableOpacity onPress={() => setSelectedVideo(null)}>
                <X size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <View style={styles.videoPlayerPlaceholder}>
              <Image 
                source={{ uri: selectedVideo?.videoThumbnail || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' }} 
                style={styles.videoThumbnailFull}
              />
              <View style={styles.playIconLarge}>
                <Play size={40} color={Colors.white} fill={Colors.white} />
              </View>
              <View style={styles.videoControls}>
                 <Text style={styles.videoTime}>00:00 / 01:24</Text>
                 <View style={styles.videoProgressBar}>
                    <View style={styles.videoProgressFill} />
                 </View>
              </View>
            </View>

            <View style={styles.videoInfo}>
              <Text style={styles.videoInfoTitle}>Exercise Details</Text>
              <Text style={styles.videoInfoText}>
                This video shows the proper form for {selectedVideo?.name}. 
                Follow the instructions carefully to maximize efficiency and minimize risk of injury.
              </Text>
              
              <View style={styles.videoMetaGrid}>
                <View style={styles.videoMetaItem}>
                  <Text style={styles.videoMetaLabel}>Sets</Text>
                  <Text style={styles.videoMetaValue}>{selectedVideo?.sets}</Text>
                </View>
                <View style={styles.videoMetaItem}>
                  <Text style={styles.videoMetaLabel}>Reps</Text>
                  <Text style={styles.videoMetaValue}>{selectedVideo?.reps}</Text>
                </View>
                <View style={styles.videoMetaItem}>
                  <Text style={styles.videoMetaLabel}>Target</Text>
                  <Text style={styles.videoMetaValue}>{selectedVideo?.muscleGroup || 'General'}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.closeVideoBtn}
              onPress={() => setSelectedVideo(null)}
            >
              <Text style={styles.closeVideoBtnText}>Close Video</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#010E1F',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 24,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: '#010E1F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: Colors.white,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 32,
  },
  calendarDay: {
    alignItems: 'center',
    width: (width - 40) / 7,
  },
  calDayText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
    marginBottom: 12,
  },
  calDateBox: {
    width: 38,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calDateBoxSelected: {
    backgroundColor: '#010E1F',
    shadowColor: '#010E1F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  calDateText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  calDateTextSelected: {
    color: Colors.white,
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  createBtn: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#010E1F',
    paddingVertical: 16,
    borderRadius: 18,
    gap: 8,
    shadowColor: '#010E1F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  createBtnText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 14,
  },
  logBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 8,
  },
  logBtnText: {
    color: '#0F172A',
    fontWeight: '800',
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  workoutCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
  },
  cardIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  cardStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardStatText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  restDayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 16,
    marginBottom: 16,
  },
  restIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  restSub: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  libraryScrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  libraryCard: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  libraryImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  libraryOverlay: {
    flex: 1,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  libraryTextContent: {
    flex: 1,
    marginRight: 12,
  },
  libraryTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  libraryMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  librarySubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    fontWeight: '700',
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  libraryPlayBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSub: {
    color: Colors.textMuted,
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  loadingContainer: {
    paddingVertical: 100,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  timelineDayName: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  completedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  cardCompleted: {
    backgroundColor: '#F0FDF4',
    borderColor: '#A7F3D0',
  },
  videoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(1, 14, 31, 0.95)',
    justifyContent: 'center',
    padding: 20,
  },
  videoModalContent: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 24,
    maxHeight: '90%',
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  videoHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#010E1F',
    flex: 1,
  },
  videoPlayerPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  videoThumbnailFull: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  playIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(14, 165, 233, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  videoTime: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 6,
  },
  videoProgressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
  videoProgressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: 2,
  },
  videoInfo: {
    marginBottom: 32,
  },
  videoInfoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#010E1F',
    marginBottom: 8,
  },
  videoInfoText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 20,
  },
  videoMetaGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  videoMetaItem: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  videoMetaLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  videoMetaValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeVideoBtn: {
    backgroundColor: '#010E1F',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  closeVideoBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
