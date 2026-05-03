import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Colors } from '../theme';
import { Plus, ChevronRight, Play, Heart, Coffee, Dumbbell, Activity, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const mockDates = [
  { day: 'Mon', date: '1' },
  { day: 'Tue', date: '2' },
  { day: 'Wed', date: '3', selected: true },
  { day: 'Thu', date: '4' },
  { day: 'Fri', date: '5' },
  { day: 'Sat', date: '6' },
  { day: 'Sun', date: '7' },
];

const mockHistory = [
  { id: '1', date: 'Nov 2', title: 'Push Day', meta: '55 min • 7 exercises', tag: 'Coach Created', icon: Dumbbell, status: 'completed' },
  { id: '2', date: 'Nov 3', title: 'Pull Day', meta: '50 min • 6 exercises', tag: 'Coach Created', icon: Dumbbell, status: 'completed' },
  { id: '3', date: 'Nov 4', title: 'Rest Day', meta: '', tag: 'Active Recovery', icon: Heart, status: 'completed' },
  { id: '4', date: 'Nov 5', title: 'Leg Day', meta: '60 min • 8 exercises', tag: 'Coach Created', icon: Dumbbell, status: 'upcoming', showStartBtn: true },
  { id: '5', date: 'Nov 6', title: 'Upper Body Power', meta: '60 min • 8 exercises', tag: 'Coach Created', icon: Dumbbell, status: 'upcoming' },
  { id: '6', date: 'Nov 7', title: 'Active Recovery', meta: '30 min • 4 exercises', tag: 'My Workout', icon: Activity, status: 'upcoming' },
  { id: '7', date: 'Nov 8', title: 'Rest Day', meta: 'Rest & Recovery is important', tag: '', icon: Coffee, status: 'upcoming' },
];

const mockLibrary = [
  { id: '1', title: 'Strength Training', subtitle: '12 Templates • Pro', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80' },
  { id: '2', title: 'Yoga & Mobility', subtitle: '8 Templates', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80' },
  { id: '3', title: 'HIIT Sessions', subtitle: '15 Templates • High Intensity', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80' },
];

export const AthleteWorkoutsScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'history' | 'library'>('history');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Workouts</Text>
        <Text style={styles.headerSubtitle}>Week of Nov 1-7</Text>

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
            {mockDates.map((item, index) => (
              <View key={index} style={styles.calendarDay}>
                <Text style={styles.calDayText}>{item.day}</Text>
                <View style={[styles.calDateBox, item.selected && styles.calDateBoxSelected]}>
                  <Text style={[styles.calDateText, item.selected && styles.calDateTextSelected]}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.createBtn}>
              <Plus size={16} color={Colors.white} />
              <Text style={styles.createBtnText}>Create Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logBtn}>
              <Text style={styles.logBtnText}>Log Rest Day</Text>
              <ChevronRight size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Timeline */}
          <View style={styles.timelineContainer}>
            {mockHistory.map((item, index) => {
              const isLast = index === mockHistory.length - 1;
              return (
                <View key={item.id} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <Text style={styles.timelineDate}>{item.date}</Text>
                    <View style={styles.timelineLineContainer}>
                      <View style={[
                        styles.timelineDot, 
                        item.status === 'completed' ? styles.dotCompleted : styles.dotUpcoming
                      ]}>
                        {item.status === 'completed' ? (
                           <CheckCircle2 size={12} color={Colors.white} />
                        ) : (
                           <View style={styles.dotInner} />
                        )}
                      </View>
                      {!isLast && <View style={styles.timelineLine} />}
                    </View>
                  </View>

                  <View style={styles.timelineCard}>
                    <View style={styles.cardHeader}>
                       <Text style={styles.cardTitle}>{item.title}</Text>
                       <item.icon size={18} color={Colors.textMuted} />
                    </View>
                    
                    {item.meta ? (
                      <Text style={styles.cardMeta}>{item.meta}</Text>
                    ) : null}

                    {item.tag ? (
                      <View style={styles.tagBox}>
                        <Text style={styles.tagText}>{item.tag}</Text>
                      </View>
                    ) : null}

                    {item.showStartBtn && (
                      <TouchableOpacity 
                        style={styles.startBtn}
                        onPress={() => navigation.navigate('ActiveWorkout')}
                      >
                        <Text style={styles.startBtnText}>Start Workout</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.libraryScrollContent}>
          {mockLibrary.map((item) => (
            <TouchableOpacity key={item.id} style={styles.libraryCard}>
              <ImageBackground 
                source={{ uri: item.image }} 
                style={styles.libraryImage}
                imageStyle={{ borderRadius: 16 }}
              >
                <View style={styles.libraryOverlay}>
                  <View>
                    <Text style={styles.libraryTitle}>{item.title}</Text>
                    <Text style={styles.librarySubtitle}>{item.subtitle}</Text>
                  </View>
                  <View style={styles.playBtn}>
                    <Play size={20} color={Colors.white} fill={Colors.white} />
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: Colors.surface,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.white,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingBottom: 100,
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  calendarDay: {
    alignItems: 'center',
  },
  calDayText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
    marginBottom: 8,
  },
  calDateBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calDateBoxSelected: {
    backgroundColor: Colors.primary,
  },
  calDateText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  createBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  logBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 8,
  },
  logBtnText: {
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  timelineContainer: {
    paddingHorizontal: 24,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    width: 60,
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDate: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  timelineLineContainer: {
    flex: 1,
    alignItems: 'center',
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  dotCompleted: {
    backgroundColor: '#0EA5E9',
  },
  dotUpcoming: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    position: 'absolute',
    top: 20,
    bottom: -30,
  },
  timelineCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  cardMeta: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  tagBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  tagText: {
    color: '#0EA5E9',
    fontSize: 10,
    fontWeight: '700',
  },
  startBtn: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  startBtnText: {
    color: '#0EA5E9',
    fontWeight: '700',
    fontSize: 12,
  },
  libraryScrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  libraryCard: {
    width: '100%',
    height: 180,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  libraryImage: {
    width: '100%',
    height: '100%',
  },
  libraryOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  libraryTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  librarySubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
