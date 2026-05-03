import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';
import { Colors } from '../theme';
import { 
  ChevronLeft, 
  MessageCircle, 
  Calendar, 
  Utensils, 
  Clock, 
  ShieldAlert, 
  Activity,
  Apple,
  CheckCircle2
} from 'lucide-react-native';

const adherenceData = [
  { day: 'Mon', status: 'done', height: 40 },
  { day: 'Tue', status: 'done', height: 40 },
  { day: 'Wed', status: 'missed', height: 40 },
  { day: 'Thu', status: 'done', height: 40 },
  { day: 'Fri', status: 'done', height: 40 },
  { day: 'Sat', status: 'done', height: 40 },
  { day: 'Sun', status: 'future', height: 10 },
];

export const ClientDetailScreen = ({ navigation, route }: any) => {
  const client = route?.params?.client || {
    name: 'Jessica Lee',
    email: 'jessica.lee@email.com',
    initials: 'JL',
    color: '#991B1B'
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageBtn}>
            <MessageCircle size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={[styles.avatar, { backgroundColor: client.color }]}>
              <Text style={styles.avatarText}>{client.initials}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.clientName}>{client.name}</Text>
              <Text style={styles.clientEmail}>{client.email}</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>12</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>48</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValCyan}>Weight Loss</Text>
              <Text style={styles.statLabel}>Goal</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsGrid}>
            <View style={styles.actionRow}>
              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#06B6D4' }]}
                onPress={() => navigation.navigate('AssignPlan', { client })}
              >
                <Calendar size={14} color={Colors.white} style={{marginRight: 6}} />
                <Text style={[styles.actionLabel, { color: Colors.white }]}>Assign New Plan</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#D1FAE5' }]}
                onPress={() => navigation.navigate('AssignNutrition', { client })}
              >
                <Utensils size={14} color="#059669" style={{marginRight: 6}} />
                <Text style={[styles.actionLabel, { color: '#059669' }]}>Assign Nutrition</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0', borderWidth: 1 }]}
                onPress={() => navigation.navigate('CheckInHistory', { client })}
              >
                <Clock size={14} color="#475569" style={{marginRight: 6}} />
                <Text style={[styles.actionLabel, { color: '#0F172A' }]}>Check In History</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#CFFAFE' }]}
              >
                <ShieldAlert size={14} color="#0891B2" style={{marginRight: 6}} />
                <Text style={[styles.actionLabel, { color: '#0891B2' }]}>Pre-Hab Status</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Workout Adherence */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <View style={styles.cyanIconWrap}>
                  <Activity size={16} color="#06B6D4" />
                </View>
                <View>
                  <Text style={styles.cardTitle}>Workout Adherence</Text>
                  <Text style={styles.cardSub}>Last 7 Days</Text>
                </View>
              </View>
              <View style={styles.cardHeaderRight}>
                <Text style={styles.percentText}>83%</Text>
                <Text style={styles.percentSub}>Completion</Text>
              </View>
            </View>

            {/* Bar Chart */}
            <View style={styles.chartContainer}>
              {adherenceData.map((item, index) => (
                <View key={index} style={styles.barCol}>
                  <View style={[
                    styles.bar,
                    { height: item.height },
                    item.status === 'done' && { backgroundColor: '#10B981' }, // Green
                    item.status === 'missed' && { backgroundColor: '#EF4444' }, // Red
                    item.status === 'future' && { backgroundColor: '#E2E8F0', borderTopLeftRadius: 40, borderTopRightRadius: 40 }, // Grey, round top
                  ]} />
                  <Text style={styles.barLabel}>{item.day}</Text>
                </View>
              ))}
            </View>

            {/* Legend */}
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.legendText}>Completed</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.legendText}>Missed</Text>
              </View>
            </View>
          </View>

          {/* Nutrition Targets */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <View style={[styles.cyanIconWrap, { backgroundColor: '#ECFDF5' }]}>
                  <Apple size={16} color="#10B981" />
                </View>
                <View>
                  <Text style={styles.cardTitle}>Nutrition Targets</Text>
                  <Text style={styles.cardSub}>Daily Averages (7 Days)</Text>
                </View>
              </View>
            </View>

            {/* Concentric Rings Visual Proxy */}
            <View style={styles.ringsContainer}>
              {/* Outer Ring */}
              <View style={[styles.ring, { width: 200, height: 200, borderColor: '#E2E8F0', borderRightColor: '#BE185D', borderBottomColor: '#BE185D', transform: [{rotate: '45deg'}] }]} />
              <View style={[styles.ring, { width: 170, height: 170, borderColor: '#E2E8F0', borderRightColor: '#1E3A8A', borderBottomColor: '#1E3A8A', borderLeftColor: '#1E3A8A', transform: [{rotate: '-45deg'}] }]} />
              <View style={[styles.ring, { width: 140, height: 140, borderColor: '#E2E8F0', borderTopColor: '#06B6D4', borderRightColor: '#06B6D4', borderBottomColor: '#06B6D4', transform: [{rotate: '90deg'}] }]} />
              <View style={[styles.ring, { width: 110, height: 110, borderColor: '#E2E8F0', borderRightColor: '#EAB308', borderBottomColor: '#EAB308', transform: [{rotate: '180deg'}] }]} />
              
              <View style={styles.centerTextWrap}>
                <Text style={styles.centerTextVal}>1450</Text>
                <Text style={styles.centerTextLbl}>kcal</Text>
              </View>
            </View>

            <View style={styles.nutritionLegendGrid}>
              <View style={styles.nlItem}><View style={[styles.nlDot, {backgroundColor: '#1E293B'}]}/><Text style={styles.nlLbl}>Calories 1450/2000</Text></View>
              <View style={styles.nlItem}><View style={[styles.nlDot, {backgroundColor: '#3B82F6'}]}/><Text style={[styles.nlLbl, {color: '#3B82F6'}]}>Protein 95/180g</Text></View>
              <View style={styles.nlItem}><View style={[styles.nlDot, {backgroundColor: '#10B981'}]}/><Text style={[styles.nlLbl, {color: '#10B981'}]}>Carbs 185/280g</Text></View>
              <View style={styles.nlItem}><View style={[styles.nlDot, {backgroundColor: '#F59E0B'}]}/><Text style={[styles.nlLbl, {color: '#F59E0B'}]}>Fats 48/75g</Text></View>
              <View style={styles.nlItem}><View style={[styles.nlDot, {backgroundColor: '#EC4899'}]}/><Text style={[styles.nlLbl, {color: '#EC4899'}]}>Sugar 1450/2000</Text></View>
              <View style={styles.nlItem}><View style={[styles.nlDot, {backgroundColor: '#8B5CF6'}]}/><Text style={[styles.nlLbl, {color: '#8B5CF6'}]}>Fibre 95/180g</Text></View>
              <View style={styles.nlItem}><View style={[styles.nlDot, {backgroundColor: '#EAB308'}]}/><Text style={[styles.nlLbl, {color: '#EAB308'}]}>Iron 185/280g</Text></View>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={[styles.card, { borderColor: '#CFFAFE', backgroundColor: Colors.white }]}>
            <View style={[styles.cardHeader, { marginBottom: 16 }]}>
              <CheckCircle2 size={16} color="#06B6D4" style={{marginRight: 8}} />
              <Text style={styles.cardTitle}>Recent Activity</Text>
            </View>
            
            <View style={styles.raRow}>
              <Text style={styles.raLbl}>Last Workout</Text>
              <Text style={styles.raVal}>Today, 7:30 AM</Text>
            </View>
            <View style={styles.raRow}>
              <Text style={styles.raLbl}>Last Check-in</Text>
              <Text style={styles.raVal}>Yesterday</Text>
            </View>
            <View style={styles.raRow}>
              <Text style={styles.raLbl}>Plan Start Date</Text>
              <Text style={styles.raVal}>Jan 15, 2026</Text>
            </View>
          </View>

        </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  messageBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#06B6D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  clientEmail: {
    fontSize: 12,
    color: '#64748B',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  statValCyan: {
    fontSize: 16,
    fontWeight: '900',
    color: '#06B6D4',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  actionsGrid: {
    gap: 12,
    marginBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '800',
  },
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cyanIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFEFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardSub: {
    fontSize: 10,
    color: '#94A3B8',
  },
  cardHeaderRight: {
    alignItems: 'flex-end',
  },
  percentText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#06B6D4',
  },
  percentSub: {
    fontSize: 10,
    color: '#94A3B8',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  barCol: {
    alignItems: 'center',
  },
  bar: {
    width: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 10,
    color: '#64748B',
  },
  ringsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    marginBottom: 24,
  },
  ring: {
    position: 'absolute',
    borderWidth: 12,
    borderRadius: 1000,
  },
  centerTextWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  centerTextVal: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  centerTextLbl: {
    fontSize: 10,
    color: '#94A3B8',
  },
  nutritionLegendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    rowGap: 12,
  },
  nlItem: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nlDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  nlLbl: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '700',
  },
  raRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  raLbl: {
    fontSize: 12,
    color: '#64748B',
  },
  raVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
});
