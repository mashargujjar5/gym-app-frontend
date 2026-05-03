import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Colors } from '../theme';
import { 
  Users, Activity, MessageCircle, UserPlus, ClipboardList, 
  AlertTriangle, ShieldAlert, ChevronRight, TrendingUp,
  Medal, Weight, Calendar, Award
} from 'lucide-react-native';

export const CoachDashboardScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Gradient Background */}
        <View style={styles.headerBg} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.appIconBadge}>
                <SparklesIcon />
              </View>
              <View>
                <Text style={styles.welcomeText}>Welcome back, Megan</Text>
                <Text style={styles.welcomeSub}>Your athletes are making progress.</Text>
              </View>
            </View>
            <View style={styles.cmLogo}>
              <Text style={styles.cmLogoText}>CM</Text>
            </View>
          </View>

          {/* Quick Summary Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Quick Summary</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <View style={styles.summaryIconWrap}><Users size={20} color="#06B6D4" /></View>
                <Text style={styles.summaryVal}>18</Text>
                <Text style={styles.summaryLabel}>Clients</Text>
              </View>
              <View style={styles.summaryItem}>
                <View style={styles.summaryIconWrap}><Activity size={20} color="#06B6D4" /></View>
                <Text style={styles.summaryVal}>7</Text>
                <Text style={styles.summaryLabel}>Workouts Today</Text>
              </View>
              <TouchableOpacity 
                style={styles.summaryItem}
                onPress={() => navigation.navigate('CoachMessages')}
              >
                <View style={styles.summaryIconWrap}><MessageCircle size={20} color="#06B6D4" /></View>
                <Text style={styles.summaryVal}>3</Text>
                <Text style={styles.summaryLabel}>Unread</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* New Join Requests */}
          <View style={[styles.card, styles.cyanBorderCard]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <View style={[styles.cardIcon, { backgroundColor: '#06B6D4' }]}>
                  <UserPlus size={16} color={Colors.white} />
                </View>
                <View>
                  <Text style={styles.cardTitle}>New Join Requests</Text>
                  <Text style={styles.cardSub}>Athletes want to train with you</Text>
                </View>
              </View>
              <View style={styles.badgeCyan}><Text style={styles.badgeText}>2</Text></View>
            </View>

            <TouchableOpacity style={styles.cyanBtn}>
              <UserPlus size={16} color={Colors.white} style={{marginRight: 8}} />
              <Text style={styles.cyanBtnText}>View All 2 Requests</Text>
            </TouchableOpacity>

            <View style={styles.listItem}>
              <View>
                <View style={styles.rowCenter}>
                  <Text style={styles.listTitle}>Mike Johnson</Text>
                  <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>
                </View>
                <Text style={styles.listSub}>Looking for strength training guidance</Text>
                <Text style={styles.listTimePink}>2 hours ago</Text>
              </View>
              <ChevronRight size={16} color="#D946EF" />
            </View>
            <View style={styles.listDivider} />
            <View style={styles.listItem}>
              <View>
                <View style={styles.rowCenter}>
                  <Text style={styles.listTitle}>Lisa Chen</Text>
                  <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>
                </View>
                <Text style={styles.listSub}>Need help with marathon prep</Text>
                <Text style={styles.listTimePink}>5 hours ago</Text>
              </View>
              <ChevronRight size={16} color="#D946EF" />
            </View>
          </View>

          {/* Pending Check-Ins */}
          <View style={[styles.card, styles.blueBorderCard]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <View style={[styles.cardIcon, { backgroundColor: '#0EA5E9' }]}>
                  <ClipboardList size={16} color={Colors.white} />
                </View>
                <View>
                  <Text style={styles.cardTitle}>Pending Check-Ins</Text>
                  <Text style={styles.cardSub}>Client updates awaiting review</Text>
                </View>
              </View>
              <View style={[styles.badgeCyan, {backgroundColor: '#0EA5E9'}]}><Text style={styles.badgeText}>2</Text></View>
            </View>

            <View style={[styles.listItemBox, { borderColor: '#FECDD3' }]}>
              <View style={{flex: 1}}>
                <View style={styles.rowCenter}>
                  <Text style={styles.listTitle}>Emma</Text>
                  <View style={styles.urgentBadge}><AlertTriangle size={10} color="#EF4444" style={{marginRight:4}}/><Text style={styles.urgentText}>URGENT</Text></View>
                </View>
                <Text style={styles.listSubDark}>Weekly Progress</Text>
                <Text style={styles.dueTodayText}>Due: Today</Text>
              </View>
              <ChevronRight size={16} color="#EF4444" />
            </View>

            <View style={[styles.listItemBox, { borderColor: '#FECDD3' }]}>
              <View style={{flex: 1}}>
                <View style={styles.rowCenter}>
                  <Text style={styles.listTitle}>Tom</Text>
                  <View style={styles.urgentBadge}><AlertTriangle size={10} color="#EF4444" style={{marginRight:4}}/><Text style={styles.urgentText}>URGENT</Text></View>
                </View>
                <Text style={styles.listSubDark}>Injury Update</Text>
                <Text style={styles.dueTodayText}>Due: Today</Text>
              </View>
              <ChevronRight size={16} color="#EF4444" />
            </View>

            <View style={[styles.listItemBox, { borderColor: '#E0F2FE' }]}>
              <View style={{flex: 1}}>
                <Text style={styles.listTitle}>Sarah</Text>
                <Text style={styles.listSubDark}>Nutrition Review</Text>
                <Text style={styles.dueTomText}>Due: Tomorrow</Text>
              </View>
              <ChevronRight size={16} color="#0EA5E9" />
            </View>
          </View>

          {/* Clients Needing Attention */}
          <Text style={styles.sectionTitle}>Clients Needing Attention</Text>
          <View style={[styles.attentionBox, { backgroundColor: '#FFF1F2' }]}>
            <View style={{flex: 1}}>
              <Text style={styles.listTitle}>Michael Torres</Text>
              <Text style={styles.listSub}>Missed 2 workouts this week</Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </View>
          <View style={[styles.attentionBox, { backgroundColor: '#FFF7ED' }]}>
            <View style={{flex: 1}}>
              <Text style={styles.listTitle}>Sarah</Text>
              <Text style={styles.listSub}>Reported shoulder discomfort</Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </View>
          <View style={[styles.attentionBox, { backgroundColor: '#F0F9FF' }]}>
            <View style={{flex: 1}}>
              <Text style={styles.listTitle}>Jake</Text>
              <Text style={styles.listSub}>New progress update</Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </View>

          {/* Pre-hab Alerts */}
          <View style={styles.rowCenterBetween}>
            <View style={styles.rowCenter}>
              <ShieldAlert size={16} color="#06B6D4" style={{marginRight: 8}} />
              <Text style={styles.sectionTitle}>Pre-hab Alerts</Text>
            </View>
          </View>
          <View style={[styles.attentionBox, { backgroundColor: '#FFF1F2' }]}>
            <AlertTriangle size={16} color="#EF4444" style={{marginRight: 12}} />
            <View style={{flex: 1}}>
              <Text style={styles.listTitle}>Tom</Text>
              <Text style={styles.listSub}>High shoulder workload</Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </View>
          <View style={[styles.attentionBox, { backgroundColor: '#FEFCE8' }]}>
            <AlertTriangle size={16} color="#EAB308" style={{marginRight: 12}} />
            <View style={{flex: 1}}>
              <Text style={styles.listTitle}>Sarah</Text>
              <Text style={styles.listSub}>Training imbalance detected</Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </View>

          {/* Recent Client Activity */}
          <View style={styles.rowCenterBetween}>
            <Text style={styles.sectionTitle}>Recent Client Activity</Text>
            <Text style={styles.viewAllText}>View All</Text>
          </View>
          <View style={styles.activityCard}>
            <ActivityRow icon={<Activity size={14} color="#06B6D4"/>} name="Emma" action="completed Push Day" time="15 mins ago" />
            <ActivityRow icon={<Weight size={14} color="#10B981"/>} name="Tom" action="logged a new weight: 82kg" time="1 hour ago" />
            <ActivityRow icon={<Activity size={14} color="#F97316"/>} name="Sarah" action="logged nutrition for today" time="2 hours ago" />
            <ActivityRow icon={<Activity size={14} color="#06B6D4"/>} name="Jake" action="completed Pull Workout" time="3 hours ago" />
          </View>

          {/* Client Progress This Week */}
          <View style={styles.rowCenter}>
            <TrendingUp size={16} color="#06B6D4" style={{marginRight: 8}} />
            <Text style={styles.sectionTitle}>Client Progress This Week</Text>
          </View>
          <View style={styles.progressCard}>
            <View style={styles.progressGrid}>
              <View style={styles.progressGridItem}>
                <View style={styles.rowCenter}>
                  <Medal size={14} color="#06B6D4" style={{marginRight:6}} />
                  <Text style={styles.progLabel}>Personal Bests</Text>
                </View>
                <Text style={styles.progVal}>8</Text>
              </View>
              <View style={styles.progressGridItem}>
                <View style={styles.rowCenter}>
                  <Weight size={14} color="#06B6D4" style={{marginRight:6}} />
                  <Text style={styles.progLabel}>Weight Changes</Text>
                </View>
                <Text style={styles.progVal}>4</Text>
              </View>
              <View style={styles.progressGridItem}>
                <View style={styles.rowCenter}>
                  <Activity size={14} color="#06B6D4" style={{marginRight:6}} />
                  <Text style={styles.progLabel}>Workouts</Text>
                </View>
                <Text style={styles.progVal}>23</Text>
              </View>
              <View style={styles.progressGridItem}>
                <View style={styles.rowCenter}>
                  <Calendar size={14} color="#06B6D4" style={{marginRight:6}} />
                  <Text style={styles.progLabel}>This Week</Text>
                </View>
                <Text style={styles.progVal}>7d</Text>
              </View>
            </View>

            <View style={styles.topPerformerBox}>
              <View style={styles.tpIconWrap}><Award size={16} color={Colors.white} /></View>
              <View>
                <Text style={styles.tpLabel}>Top Performer</Text>
                <Text style={styles.tpVal}>Jake - 5 workouts completed</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Helper Components
const SparklesIcon = () => (
  <View style={{transform: [{rotate: '45deg'}]}}>
    <View style={{width: 14, height: 14, backgroundColor: Colors.white, borderRadius: 2}} />
  </View>
);

const ActivityRow = ({ icon, name, action, time }: any) => (
  <View style={styles.actRow}>
    <View style={styles.actIconBox}>{icon}</View>
    <View style={{flex: 1}}>
      <Text style={styles.actText}><Text style={{fontWeight: '700', color: '#0F172A'}}>{name}</Text> {action}</Text>
      <Text style={styles.actTime}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: '#CCFBF1',
    opacity: 0.4,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#06B6D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  welcomeSub: {
    fontSize: 12,
    color: '#64748B',
  },
  cmLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cmLogoText: {
    color: Colors.white,
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: -1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
    marginTop: 8,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFEFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  summaryVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  cyanBorderCard: { borderColor: '#A5F3FC' },
  blueBorderCard: { borderColor: '#BAE6FD', backgroundColor: '#F0F9FF' },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    color: '#64748B',
  },
  badgeCyan: {
    backgroundColor: '#06B6D4',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  cyanBtn: {
    backgroundColor: '#06B6D4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  cyanBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#06B6D4',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  newBadge: {
    backgroundColor: '#FCE7F3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  newBadgeText: {
    color: '#D946EF',
    fontSize: 8,
    fontWeight: '800',
  },
  listSub: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  listSubDark: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  listTimePink: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D946EF',
  },
  listDivider: {
    height: 1,
    backgroundColor: '#F8FAFC',
    marginVertical: 4,
  },
  listItemBox: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  urgentText: {
    color: '#EF4444',
    fontSize: 8,
    fontWeight: '800',
  },
  dueTodayText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EF4444',
  },
  dueTomText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0EA5E9',
  },
  attentionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  actRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  actIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actText: {
    fontSize: 12,
    color: '#475569',
  },
  actTime: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  progressCard: {
    backgroundColor: '#E0F2FE',
    borderRadius: 20,
    padding: 20,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  progressGridItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
  },
  progLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  progVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 8,
  },
  topPerformerBox: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tpIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#06B6D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tpLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  tpVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
});
