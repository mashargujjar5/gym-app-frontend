import React, { useState } from 'react';
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
  X,
  TrendingDown,
  Plus,
  ChevronUp,
  ChevronDown,
  ImageIcon,
  User as UserIcon
} from 'lucide-react-native';

const timelineData = [
  { id: '1', month: 'Feb', day: '8' },
  { id: '2', month: 'Feb', day: '24', dot: true },
  { id: '3', month: 'Feb', day: '20' },
  { id: '4', month: 'Feb', day: '17' },
  { id: '5', month: 'Feb', day: '10', dot: true },
  { id: '6', month: 'Feb', day: '1', dot: true },
];

export const CheckInHistoryScreen = ({ navigation, route }: any) => {
  const client = route?.params?.client || {
    name: 'Jessica Lee',
    initials: 'JL',
    color: '#991B1B'
  };

  const [expandedId, setExpandedId] = useState('1');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <View style={[styles.headerAvatar, { backgroundColor: client.color }]}>
              <Text style={styles.headerAvatarText}>{client.initials}</Text>
            </View>
            <View>
              <Text style={styles.headerName}>{client.name}</Text>
              <Text style={styles.headerSub}>Check-In History</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.messageBtn}>
            <MessageCircle size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Top Stats */}
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { flex: 0.8 }]}>
              <Text style={styles.statLabel}>Total Check-ins</Text>
              <Text style={styles.statVal}>8</Text>
            </View>
            <View style={styles.statBox}>
              <View style={styles.rowCenter}>
                <Text style={styles.statLabel}>Weight </Text>
                <TrendingDown size={12} color="#10B981" />
              </View>
              <Text style={[styles.statVal, { color: '#10B981' }]}>-6.8 lb</Text>
            </View>
            <View style={styles.statBox}>
              <View style={styles.rowCenter}>
                <Text style={styles.statLabel}>Body Fat </Text>
                <TrendingDown size={12} color="#10B981" />
              </View>
              <Text style={[styles.statVal, { color: '#10B981' }]}>-3.0%</Text>
            </View>
          </View>

          {/* Selection Bar */}
          <View style={styles.selectionBar}>
            <Text style={styles.selectionText}>2 photos selected</Text>
            <View style={styles.rowCenter}>
              <TouchableOpacity style={styles.compareBtn}>
                <Text style={styles.compareBtnText}>Compare</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.clearSelectBtn}>
                <X size={14} color="#64748B" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Timeline */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Check-in Timeline</Text>
            <Text style={styles.sectionSub}>8 total</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timelineScroll}>
            {timelineData.map((item) => (
              <View key={item.id} style={styles.timelineBubble}>
                <Text style={styles.tlMonth}>{item.month}</Text>
                <Text style={styles.tlDay}>{item.day}</Text>
                {item.dot && <View style={styles.tlDot} />}
              </View>
            ))}
          </ScrollView>

          {/* Progress Photos Header */}
          <View style={styles.progressHeaderRow}>
            <View>
              <Text style={styles.progressTitle}>Progress Photos</Text>
              <Text style={styles.progressSub}>10 photos • 6 check-ins</Text>
            </View>
            <TouchableOpacity style={styles.addBtnDark}>
              <Plus size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* Sub Stats */}
          <View style={styles.subStatsRow}>
            <View style={styles.subStatBox}>
              <Text style={styles.subStatLabel}>Total Check-ins</Text>
              <Text style={styles.subStatVal}>6</Text>
            </View>
            <View style={[styles.subStatBox, { backgroundColor: '#ECFDF5' }]}>
              <View style={styles.rowCenter}>
                <TrendingDown size={12} color="#10B981" />
                <Text style={[styles.subStatLabel, { color: '#10B981', marginLeft: 4 }]}>Weight</Text>
              </View>
              <Text style={[styles.subStatVal, { color: '#10B981' }]}>-6.8 lb</Text>
            </View>
            <View style={[styles.subStatBox, { backgroundColor: '#EFF6FF' }]}>
              <View style={styles.rowCenter}>
                <TrendingDown size={12} color="#3B82F6" />
                <Text style={[styles.subStatLabel, { color: '#3B82F6', marginLeft: 4 }]}>Body Fat</Text>
              </View>
              <Text style={[styles.subStatVal, { color: '#3B82F6' }]}>-2.5%</Text>
            </View>
          </View>

          {/* Check-In Card: Expanded */}
          <View style={[styles.card, expandedId === '1' && styles.cardExpanded]}>
            <TouchableOpacity style={styles.cardTop} onPress={() => setExpandedId('1')}>
              <View style={styles.cardTopLeft}>
                <CalendarIcon size={14} color="#64748B" style={{marginRight: 6}} />
                <Text style={styles.cardDate}>Mar 7, 2026</Text>
                <View style={styles.latestBadge}><Text style={styles.latestBadgeText}>Latest</Text></View>
                <View style={styles.photoBadge}><ImageIcon size={10} color="#3B82F6" style={{marginRight:4}}/><Text style={styles.photoBadgeText}>3</Text></View>
              </View>
              <ChevronUp size={20} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.cardPrimaryStats}>
              <View>
                <Text style={styles.cardStatLbl}>Weight</Text>
                <View style={styles.rowCenter}>
                  <Text style={styles.cardStatVal}>165.2 lb</Text>
                  <TrendingDown size={12} color="#10B981" style={{marginLeft: 8}} />
                  <Text style={styles.cardStatDiff}>-0.8 lb</Text>
                </View>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.cardStatLbl}>Body Fat</Text>
                <Text style={styles.cardStatVal}>22.5%</Text>
              </View>
            </View>

            <View style={styles.photosSection}>
              <View style={styles.photosHeader}>
                <Text style={styles.photosLbl}>Progress Photos</Text>
                <Text style={styles.photosInstruction}>Tap to select & compare</Text>
              </View>
              <View style={styles.photosGrid}>
                {/* Simulated photo blocks */}
                <View style={styles.photoBlock}>
                  <View style={styles.photoTag}><UserIcon size={10} color="#06B6D4" style={{marginRight: 4}}/><Text style={styles.photoTagText}>front</Text></View>
                </View>
                <View style={styles.photoBlock}>
                  <View style={styles.photoTag}><UserIcon size={10} color="#F59E0B" style={{marginRight: 4}}/><Text style={styles.photoTagText}>side</Text></View>
                </View>
                <View style={styles.photoBlock}>
                  <View style={styles.photoTag}><UserIcon size={10} color="#06B6D4" style={{marginRight: 4}}/><Text style={styles.photoTagText}>front</Text></View>
                </View>
              </View>
              <Text style={styles.photosInstructionCenter}>Tap to select & compare</Text>
            </View>

            <View style={styles.wellnessRow}>
              <View>
                <Text style={styles.cardStatLbl}>Mood</Text>
                <View style={styles.moodBadge}><Text style={styles.moodBadgeText}>Excellent</Text></View>
              </View>
              <View>
                <Text style={styles.cardStatLbl}>Energy Level</Text>
                <View style={styles.energyBars}>
                  <View style={styles.eBar} /><View style={styles.eBar} /><View style={styles.eBar} /><View style={styles.eBar} /><View style={styles.eBar} />
                </View>
              </View>
            </View>

            <Text style={styles.measurementsLbl}>Measurements</Text>
            <View style={styles.measureGrid}>
              <View style={styles.mBox}><Text style={styles.mLbl}>Chest</Text><Text style={styles.mVal}>38"</Text></View>
              <View style={styles.mBox}><Text style={styles.mLbl}>Waist</Text><Text style={styles.mVal}>32"</Text></View>
              <View style={styles.mBox}><Text style={styles.mLbl}>Hips</Text><Text style={styles.mVal}>38"</Text></View>
              <View style={styles.mBox}><Text style={styles.mLbl}>Arms</Text><Text style={styles.mVal}>13"</Text></View>
              <View style={styles.mBox}><Text style={styles.mLbl}>Thighs</Text><Text style={styles.mVal}>22"</Text></View>
            </View>

            <Text style={styles.measurementsLbl}>Notes</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>Feeling great! Energy levels are high and really noticing strength improvements.</Text>
            </View>
          </View>

          {/* Check-In Card: Collapsed */}
          <View style={styles.card}>
            <TouchableOpacity style={styles.cardTop} onPress={() => setExpandedId('2')}>
              <View style={styles.cardTopLeft}>
                <CalendarIcon size={14} color="#64748B" style={{marginRight: 6}} />
                <Text style={styles.cardDate}>Mar 3, 2026</Text>
                <View style={styles.photoBadge}><ImageIcon size={10} color="#3B82F6" style={{marginRight:4}}/><Text style={styles.photoBadgeText}>2</Text></View>
              </View>
              <ChevronDown size={20} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.cardPrimaryStats}>
              <View>
                <Text style={styles.cardStatLbl}>Weight</Text>
                <View style={styles.rowCenter}>
                  <Text style={styles.cardStatVal}>166 lb</Text>
                  <TrendingDown size={12} color="#10B981" style={{marginLeft: 8}} />
                  <Text style={styles.cardStatDiff}>-0.8 lb</Text>
                </View>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.cardStatLbl}>Body Fat</Text>
                <Text style={styles.cardStatVal}>23%</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <TouchableOpacity style={styles.cardTop} onPress={() => setExpandedId('3')}>
              <View style={styles.cardTopLeft}>
                <CalendarIcon size={14} color="#64748B" style={{marginRight: 6}} />
                <Text style={styles.cardDate}>Feb 28, 2026</Text>
              </View>
              <ChevronDown size={20} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.cardPrimaryStats}>
              <View>
                <Text style={styles.cardStatLbl}>Weight</Text>
                <View style={styles.rowCenter}>
                  <Text style={styles.cardStatVal}>166.8 lb</Text>
                  <TrendingDown size={12} color="#10B981" style={{marginLeft: 8}} />
                  <Text style={styles.cardStatDiff}>-0.7 lb</Text>
                </View>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.cardStatLbl}>Body Fat</Text>
                <Text style={styles.cardStatVal}>23.2%</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Proxy for Calendar icon to avoid import collision
const CalendarIcon = ({ size, color, style }: any) => (
  <Text style={[{ fontSize: size, color }, style]}>📅</Text>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.white },
  container: { flex: 1 },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitleBox: { flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 8 },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerAvatarText: { color: Colors.white, fontSize: 16, fontWeight: '800' },
  headerName: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  headerSub: { fontSize: 12, color: '#64748B' },
  messageBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#06B6D4', alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: '#F8FAFC', borderRadius: 16, padding: 16, alignItems: 'center' },
  statLabel: { fontSize: 10, color: '#64748B', fontWeight: '600', marginBottom: 4 },
  statVal: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  selectionBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#E2E8F0', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, marginBottom: 24 },
  selectionText: { fontSize: 12, fontWeight: '800', color: '#0F172A' },
  compareBtn: { backgroundColor: '#06B6D4', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 12, marginRight: 12 },
  compareBtnText: { color: Colors.white, fontSize: 10, fontWeight: '800' },
  clearSelectBtn: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '900', color: '#0F172A' },
  sectionSub: { fontSize: 10, color: '#94A3B8' },
  timelineScroll: { marginBottom: 32, gap: 12 },
  timelineBubble: { width: 56, height: 72, borderRadius: 28, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  tlMonth: { fontSize: 10, color: '#64748B', marginBottom: 4 },
  tlDay: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  tlDot: { position: 'absolute', bottom: 10, width: 4, height: 4, borderRadius: 2, backgroundColor: '#0F172A' },
  progressHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  progressTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  progressSub: { fontSize: 12, color: '#64748B' },
  addBtnDark: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  subStatsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  subStatBox: { flex: 1, backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, alignItems: 'center' },
  subStatLabel: { fontSize: 10, color: '#64748B', fontWeight: '600', marginBottom: 4 },
  subStatVal: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  card: { backgroundColor: Colors.white, borderWidth: 1, borderColor: '#F1F5F9', borderRadius: 16, padding: 20, marginBottom: 16 },
  cardExpanded: { borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTopLeft: { flexDirection: 'row', alignItems: 'center' },
  cardDate: { fontSize: 14, fontWeight: '900', color: '#0F172A', marginRight: 8 },
  latestBadge: { backgroundColor: '#E2E8F0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 8 },
  latestBadgeText: { fontSize: 10, fontWeight: '800', color: '#475569' },
  photoBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  photoBadgeText: { fontSize: 10, fontWeight: '800', color: '#3B82F6' },
  cardPrimaryStats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardStatLbl: { fontSize: 10, color: '#64748B', marginBottom: 4 },
  cardStatVal: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  cardStatDiff: { fontSize: 10, fontWeight: '800', color: '#10B981', marginLeft: 4 },
  photosSection: { marginTop: 24, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 24 },
  photosHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  photosLbl: { fontSize: 12, color: '#64748B' },
  photosInstruction: { fontSize: 10, fontWeight: '800', color: '#0F172A' },
  photosGrid: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  photoBlock: { flex: 1, height: 100, backgroundColor: '#D97706', borderRadius: 12, position: 'relative' },
  photoTag: { position: 'absolute', top: 8, left: 8, backgroundColor: 'rgba(0,0,0,0.6)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 8 },
  photoTagText: { color: Colors.white, fontSize: 10, fontWeight: '800' },
  photosInstructionCenter: { textAlign: 'center', fontSize: 10, color: '#64748B', marginBottom: 24 },
  wellnessRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  moodBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  moodBadgeText: { color: '#10B981', fontSize: 12, fontWeight: '800' },
  energyBars: { flexDirection: 'row', gap: 4 },
  eBar: { width: 24, height: 6, borderRadius: 3, backgroundColor: '#0F172A' },
  measurementsLbl: { fontSize: 10, color: '#64748B', marginBottom: 8 },
  measureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  mBox: { width: '30%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, alignItems: 'center' },
  mLbl: { fontSize: 10, color: '#94A3B8', marginBottom: 4 },
  mVal: { fontSize: 14, fontWeight: '900', color: '#0F172A' },
  notesBox: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16 },
  notesText: { fontSize: 12, color: '#0F172A', lineHeight: 18 },
});
