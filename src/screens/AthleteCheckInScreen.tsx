import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, Typography, BorderRadius } from '../theme';
import { Card, Input, Button } from '../components';
import { ChevronLeft, Camera, Calendar, Scale, Ruler, Activity, MessageSquare } from 'lucide-react-native';

const checkInHistory = [
  { date: 'Apr 28', weight: 165, bodyFat: 18.2, mood: 'Excellent', energy: 5 },
  { date: 'Apr 14', weight: 167, bodyFat: 18.8, mood: 'Good', energy: 4 },
  { date: 'Mar 31', weight: 169, bodyFat: 19.5, mood: 'Good', energy: 3 },
  { date: 'Mar 17', weight: 171, bodyFat: 20.1, mood: 'Fair', energy: 3 },
];

const measurements = [
  { label: 'Chest', value: '38"', icon: Ruler },
  { label: 'Waist', value: '32"', icon: Ruler },
  { label: 'Hips', value: '38"', icon: Ruler },
  { label: 'Arms', value: '13"', icon: Activity },
  { label: 'Thighs', value: '22"', icon: Activity },
];

const moodOptions = ['😴 Poor', '😐 Fair', '🙂 Good', '😄 Excellent'];
const energyLevels = [1, 2, 3, 4, 5];

export const AthleteCheckInScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'log' | 'history'>('log');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedMood, setSelectedMood] = useState(3);
  const [selectedEnergy, setSelectedEnergy] = useState(4);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Check-In</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Date Selector */}
        <View style={styles.dateSelector}>
          <Calendar size={18} color={Colors.textSecondary} />
          <Text style={styles.dateText}>{new Date().toDateString()}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab('log')}
            style={[styles.tab, activeTab === 'log' && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === 'log' && styles.tabTextActive]}>Log Check-In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('history')}
            style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>History</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'log' ? (
          <View style={styles.form}>
            {/* Weight */}
            <Card style={styles.formCard}>
              <View style={styles.cardHeader}>
                <Scale size={20} color={Colors.primary} />
                <Text style={styles.cardTitle}>Body Weight</Text>
              </View>
              <Input
                value={weight}
                onChangeText={setWeight}
                placeholder="e.g. 165.2"
                keyboardType="decimal-pad"
                label="Current Weight (lbs)"
              />
            </Card>

            {/* Measurements */}
            <Card style={styles.formCard}>
              <View style={styles.cardHeader}>
                <Ruler size={20} color={Colors.primary} />
                <Text style={styles.cardTitle}>Measurements</Text>
              </View>
              <View style={styles.measureGrid}>
                {measurements.map((m, i) => (
                  <View key={i} style={styles.measureItem}>
                    <Text style={styles.measureValue}>{m.value}</Text>
                    <Text style={styles.measureLabel}>{m.label}</Text>
                  </View>
                ))}
              </View>
            </Card>

            {/* Mood */}
            <Card style={styles.formCard}>
              <View style={styles.cardHeader}>
                <Activity size={20} color={Colors.primary} />
                <Text style={styles.cardTitle}>Daily Mood</Text>
              </View>
              <View style={styles.moodRow}>
                {moodOptions.map((m, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setSelectedMood(i)}
                    style={[styles.moodBtn, selectedMood === i && styles.moodBtnActive]}
                  >
                    <Text style={[styles.moodText, selectedMood === i && styles.moodTextActive]}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>

            {/* Energy */}
            <Card style={styles.formCard}>
              <View style={styles.cardHeader}>
                <Activity size={20} color={Colors.primary} />
                <Text style={styles.cardTitle}>Energy Level</Text>
              </View>
              <View style={styles.energyRow}>
                {energyLevels.map((e) => (
                  <TouchableOpacity
                    key={e}
                    onPress={() => setSelectedEnergy(e)}
                    style={[styles.energyBtn, selectedEnergy >= e && styles.energyBtnActive]}
                  >
                    <Text style={[styles.energyNum, selectedEnergy >= e && styles.energyNumActive]}>{e}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>

            {/* Photos */}
            <Card style={styles.formCard}>
              <View style={styles.cardHeader}>
                <Camera size={20} color={Colors.primary} />
                <Text style={styles.cardTitle}>Progress Photos</Text>
              </View>
              <View style={styles.photoRow}>
                {['Front', 'Side', 'Back'].map((p) => (
                  <TouchableOpacity key={p} style={styles.photoPlaceholder}>
                    <Camera size={24} color={Colors.textMuted} />
                    <Text style={styles.photoLabel}>{p}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>

            {/* Notes */}
            <Card style={styles.formCard}>
              <View style={styles.cardHeader}>
                <MessageSquare size={20} color={Colors.primary} />
                <Text style={styles.cardTitle}>Notes for Coach</Text>
              </View>
              <Input
                value={notes}
                onChangeText={setNotes}
                placeholder="How was your week? Any pain or wins?"
                multiline
                numberOfLines={3}
              />
            </Card>

            <Button title="Submit Check-In" onPress={() => navigation.goBack()} />
          </View>
        ) : (
          <View style={styles.historyList}>
            {/* Stats Summary */}
            <View style={styles.statsRow}>
              <Card style={styles.statCard}>
                <Text style={styles.statVal}>{checkInHistory.length}</Text>
                <Text style={styles.statLbl}>Check-ins</Text>
              </Card>
              <Card style={styles.statCard}>
                <Text style={[styles.statVal, { color: Colors.success }]}>-6 lbs</Text>
                <Text style={styles.statLbl}>Weight</Text>
              </Card>
              <Card style={styles.statCard}>
                <Text style={[styles.statVal, { color: Colors.protein }]}>-1.9%</Text>
                <Text style={styles.statLbl}>Fat %</Text>
              </Card>
            </View>

            {checkInHistory.map((c, i) => (
              <Card key={i} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyDateText}>{c.date}</Text>
                  <Text style={styles.historyMood}>{c.mood}</Text>
                </View>
                <View style={styles.historyStats}>
                  <View style={styles.historyStatItem}>
                    <Text style={styles.historyStatVal}>{c.weight} lbs</Text>
                    <Text style={styles.historyStatLbl}>Weight</Text>
                  </View>
                  <View style={styles.historyStatItem}>
                    <Text style={[styles.historyStatVal, { color: Colors.protein }]}>{c.bodyFat}%</Text>
                    <Text style={styles.historyStatLbl}>Body Fat</Text>
                  </View>
                  <View style={styles.historyStatItem}>
                    <Text style={styles.historyStatVal}>{c.energy}/5</Text>
                    <Text style={styles.historyStatLbl}>Energy</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background 
  },
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.surface,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: Colors.textPrimary 
  },
  headerRight: { width: 40 },
  scroll: { 
    padding: 24, 
    paddingBottom: 100 
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  tabs: { 
    flexDirection: 'row', 
    gap: 12,
    marginBottom: 24,
  },
  tab: { 
    flex: 1, 
    paddingVertical: 12, 
    borderRadius: 16, 
    backgroundColor: Colors.surface, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: Colors.cardBorder 
  },
  tabActive: { 
    backgroundColor: Colors.primary, 
    borderColor: Colors.primary 
  },
  tabText: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: Colors.textSecondary 
  },
  tabTextActive: { 
    color: Colors.white 
  },
  form: { 
    gap: 16 
  },
  formCard: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: Colors.textPrimary 
  },
  measureGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10 
  },
  measureItem: { 
    flex: 1, 
    minWidth: 80, 
    backgroundColor: Colors.background, 
    borderRadius: 12, 
    padding: 12, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: Colors.cardBorder 
  },
  measureValue: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: Colors.textPrimary 
  },
  measureLabel: { 
    fontSize: 11, 
    color: Colors.textMuted, 
    marginTop: 2 
  },
  moodRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8 
  },
  moodBtn: { 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 12, 
    backgroundColor: Colors.background, 
    borderWidth: 1, 
    borderColor: Colors.cardBorder 
  },
  moodBtnActive: { 
    backgroundColor: Colors.primary, 
    borderColor: Colors.primary 
  },
  moodText: { 
    fontSize: 12, 
    color: Colors.textSecondary, 
    fontWeight: '600' 
  },
  moodTextActive: {
    color: Colors.white,
  },
  energyRow: { 
    flexDirection: 'row', 
    gap: 8 
  },
  energyBtn: { 
    flex: 1, 
    aspectRatio: 1, 
    borderRadius: 12, 
    backgroundColor: Colors.background, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: Colors.cardBorder 
  },
  energyBtnActive: { 
    backgroundColor: Colors.primary, 
    borderColor: Colors.primary 
  },
  energyNum: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: Colors.textPrimary 
  },
  energyNumActive: {
    color: Colors.white,
  },
  photoRow: { 
    flexDirection: 'row', 
    gap: 10 
  },
  photoPlaceholder: { 
    flex: 1, 
    aspectRatio: 3 / 4, 
    backgroundColor: Colors.background, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    borderWidth: 1, 
    borderColor: Colors.cardBorder, 
    borderStyle: 'dashed' 
  },
  photoLabel: { 
    fontSize: 12, 
    color: Colors.textMuted, 
    fontWeight: '600' 
  },
  historyList: { 
    gap: 16 
  },
  statsRow: { 
    flexDirection: 'row', 
    gap: 10 
  },
  statCard: { 
    flex: 1, 
    padding: 14, 
    alignItems: 'center' 
  },
  statVal: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: Colors.textPrimary 
  },
  statLbl: { 
    fontSize: 11, 
    color: Colors.textMuted, 
    marginTop: 4 
  },
  historyCard: {
    padding: 16,
  },
  historyHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  historyDateText: { 
    fontSize: 14, 
    color: Colors.textPrimary, 
    fontWeight: '700' 
  },
  historyMood: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  historyStats: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  historyStatItem: {
    alignItems: 'center',
  },
  historyStatVal: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: Colors.textPrimary 
  },
  historyStatLbl: { 
    fontSize: 10, 
    color: Colors.textMuted, 
    marginTop: 2 
  },
});
