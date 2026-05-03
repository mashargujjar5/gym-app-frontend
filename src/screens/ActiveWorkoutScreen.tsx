import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import { Colors } from '../theme';
import { Card } from '../components';
import { ChevronLeft, ChevronDown, CheckSquare, Square, Info, TrendingUp, Medal, ShieldAlert, X, AlertTriangle, CheckCircle2 } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const mockExercises = [
  {
    id: '1',
    name: 'Barbell Bench Press',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop',
    completedSets: 0,
    totalSets: 2,
    sets: [
      { id: '1', setNum: 1, kg: 100, rep: 8, rpe: '-', done: false },
      { id: '2', setNum: 2, kg: 100, rep: 8, rpe: '-', done: false },
    ]
  },
  {
    id: '2',
    name: 'Incline Dumbbell Press',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&h=200&fit=crop',
    completedSets: 0,
    totalSets: 3,
    sets: [
      { id: '1', setNum: 1, kg: 35, rep: 10, rpe: '8', done: false },
      { id: '2', setNum: 2, kg: 35, rep: 10, rpe: '8', done: false },
      { id: '3', setNum: 3, kg: 35, rep: 10, rpe: '8.5', done: false },
    ]
  },
];

type ModalType = 'about' | 'progress' | 'records' | 'prehab' | null;

export const ActiveWorkoutScreen = ({ navigation }: any) => {
  const [exercises, setExercises] = useState(mockExercises);
  const [activeExercise, setActiveExercise] = useState('1');
  const [showRestModal, setShowRestModal] = useState(false);
  const [restTime, setRestTime] = useState(117);
  const [showCustomTime, setShowCustomTime] = useState(false);
  const [customTimeInput, setCustomTimeInput] = useState('01:30');
  const [feelState, setFeelState] = useState<'good' | 'discomfort' | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleSetDone = (exerciseId: string, setId: string) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === exerciseId) {
        const newSets = ex.sets.map(set => {
          if (set.id === setId) {
            const wasDone = set.done;
            if (!wasDone) setShowRestModal(true);
            return { ...set, done: !wasDone };
          }
          return set;
        });
        return { ...ex, sets: newSets, completedSets: newSets.filter(s => s.done).length };
      }
      return ex;
    }));
  };

  const renderModalContent = () => {
    const exName = exercises.find(e => e.id === activeExercise)?.name || 'Exercise';

    switch (activeModal) {
      case 'about':
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>{exName}</Text>
            <View style={styles.aboutContent}>
              <Text style={styles.aboutSub}>How to Perform</Text>
              <View style={styles.stepItem}><Text style={styles.stepNum}>1</Text><Text style={styles.stepText}>Lie flat on the bench with your eyes under the bar.</Text></View>
              <View style={styles.stepItem}><Text style={styles.stepNum}>2</Text><Text style={styles.stepText}>Grip the bar slightly wider than shoulder width.</Text></View>
              <View style={styles.stepItem}><Text style={styles.stepNum}>3</Text><Text style={styles.stepText}>Unrack the bar, take a deep breath and brace.</Text></View>
              <View style={styles.stepItem}><Text style={styles.stepNum}>4</Text><Text style={styles.stepText}>Lower the bar to mid-chest with control.</Text></View>
              <View style={styles.stepItem}><Text style={styles.stepNum}>5</Text><Text style={styles.stepText}>Press back up to starting position.</Text></View>
              
              <View style={styles.proTipsBox}>
                <Text style={styles.proTipsTitle}>✨ Pro Tips</Text>
                <Text style={styles.proTipItem}>• Keep your feet flat on the floor</Text>
                <Text style={styles.proTipItem}>• Maintain a slight arch in your lower back</Text>
                <Text style={styles.proTipItem}>• Don't bounce the bar off your chest</Text>
              </View>
            </View>
          </ScrollView>
        );
      
      case 'progress':
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>{exName}</Text>
            <Text style={styles.sectionHeader}>Progress Charts</Text>
            
            <Card style={styles.chartCard}>
              <Text style={styles.chartTitle}>Total Volume Over Time</Text>
              <View style={styles.barChartContainer}>
                 {[40, 60, 50, 80, 70, 90, 85].map((h, i) => (
                   <View key={i} style={styles.barColumn}>
                     <View style={[styles.barFill, { height: `${h}%` }]} />
                     <Text style={styles.barLabel}>W{i+1}</Text>
                   </View>
                 ))}
              </View>
            </Card>

            <Card style={styles.chartCard}>
              <Text style={styles.chartTitle}>Heaviest Weight Over Time</Text>
              {/* Mock Line Chart with dots */}
              <View style={styles.lineChartContainer}>
                <View style={styles.linePath} />
                {[20, 30, 40, 60, 50, 70, 80].map((h, i) => (
                  <View key={i} style={[styles.lineDot, { bottom: `${h}%`, left: `${(i/6)*100}%` }]} />
                ))}
              </View>
            </Card>

            <View style={styles.progressionRow}>
              <View style={styles.progStatBox}>
                <Text style={styles.progStatTitle}>1 Rep Max Progression</Text>
                <View style={styles.progStatInner}>
                  <Text style={styles.progStatLabel}>Current 1RM</Text>
                  <Text style={styles.progStatVal}>105 kg</Text>
                </View>
                <View style={styles.progStatInner}>
                  <Text style={styles.progStatLabel}>Previous 1RM</Text>
                  <Text style={styles.progStatVal}>100 kg</Text>
                </View>
                <View style={styles.progStatInner}>
                  <Text style={styles.progStatLabel}>Improvement</Text>
                  <Text style={[styles.progStatVal, { color: Colors.success }]}>+5 kg (5%)</Text>
                </View>
              </View>

              <View style={[styles.progStatBox, { backgroundColor: '#E0F8F5' }]}>
                <Text style={styles.progStatTitle}>Max Consecutive Reps</Text>
                <Text style={styles.maxRepsVal}>18</Text>
                <Text style={styles.maxRepsSub}>Personal Record 80 kg</Text>
                <Text style={styles.maxRepsSub2}>Achieved Mar 1, 2026</Text>
              </View>
            </View>
          </ScrollView>
        );

      case 'records':
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>{exName}</Text>
            <Text style={styles.sectionHeader}>Personal Records</Text>

            <Card style={[styles.recordCard, { borderColor: '#FDE047', backgroundColor: '#FEF9C3' }]}>
              <View style={styles.recordHeader}>
                <Text style={styles.recordLabel}>🏆 1 Rep Max</Text>
                <Text style={styles.recordValue}>105 kg</Text>
              </View>
              <Text style={styles.recordSub}>Achieved on March 5, 2026</Text>
            </Card>

            <Card style={[styles.recordCard, { borderColor: '#E9D5FF', backgroundColor: '#FAF5FF' }]}>
              <View style={styles.recordHeader}>
                <Text style={styles.recordLabel}>⚡ Max Volume (Single Workout)</Text>
                <Text style={styles.recordValue}>3,840 kg</Text>
              </View>
              <Text style={styles.recordSub}>Achieved by doing 4 sets of 12 reps at 80 kg</Text>
            </Card>

            <Card style={[styles.recordCard, { borderColor: '#BAE6FD', backgroundColor: '#F0F9FF' }]}>
              <View style={styles.recordHeader}>
                <Text style={styles.recordLabel}>Heaviest Logged Weight</Text>
                <Text style={styles.recordValue}>95 kg</Text>
              </View>
              <Text style={styles.recordSub}>Most weight ever used for a working set, regardless of reps</Text>
            </Card>
          </ScrollView>
        );

      case 'prehab':
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>{exName}</Text>
            <Text style={styles.sectionHeader}>Injury Prevention Alert</Text>

            <View style={styles.alertCardRed}>
              <View style={styles.alertHeaderRow}>
                <AlertTriangle size={20} color="#DC2626" />
                <Text style={styles.alertTitleRed}>High Training Volume Detected!</Text>
              </View>
              <Text style={styles.alertText}>
                You've trained chest/triceps 4 times in the last 7 days with high intensity. Your recovery score is compromised.
              </Text>
              <View style={styles.recommendationBox}>
                <Text style={styles.recTitle}>Recommendations:</Text>
                <Text style={styles.recText}>• Consider taking 48-72 hours off for chest.</Text>
                <Text style={styles.recText}>• Reduce training intensity by 30-40%.</Text>
              </View>
            </View>

            <View style={styles.alertCardGreen}>
              <View style={styles.alertHeaderRow}>
                <CheckCircle2 size={20} color="#059669" />
                <Text style={styles.alertTitleGreen}>Recovery Activities</Text>
              </View>
              <View style={styles.recItem}><Text>✔️ Chest Stretching Routine</Text></View>
              <View style={styles.recItem}><Text>✔️ Foam Rolling Protocol</Text></View>
            </View>

            <Text style={styles.recentHistoryTitle}>Recent Training History</Text>
            <View style={styles.historyRow}>
              <Text style={styles.historyTime}>1 day ago</Text>
              <Text style={styles.historyEvent}>Pull Day (High)</Text>
            </View>
            <View style={styles.historyRow}>
              <Text style={styles.historyTime}>3 days ago</Text>
              <Text style={styles.historyEvent}>Push Day (Moderate)</Text>
            </View>
            <View style={styles.historyRow}>
              <Text style={styles.historyTime}>4 days ago</Text>
              <Text style={styles.historyEvent}>Upper Body (High)</Text>
            </View>
          </ScrollView>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Dark Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronLeft size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Active Workout</Text>
          <View style={styles.totalTimeBox}>
            <Text style={styles.totalTimeLabel}>TOTAL TIME</Text>
            <Text style={styles.totalTimeValue}>0:32:14</Text>
          </View>
        </View>

        <View style={styles.restingStatusBox}>
          <View style={styles.restingLeft}>
             <View style={styles.restingIndicator} />
             <View>
               <Text style={styles.restingLabel}>RESTING</Text>
               <Text style={styles.restingValue}>0:03</Text>
             </View>
          </View>
          <TouchableOpacity style={styles.stopBtn}>
            <Text style={styles.stopBtnText}>Stop</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sessionBox}>
          <Text style={styles.sessionLabel}>Today's Session</Text>
          <Text style={styles.sessionTitle}>Chest & Triceps</Text>
          <Text style={styles.sessionMeta}>3 exercises   •   45-60 min</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {exercises.map((exercise) => {
          const isActive = activeExercise === exercise.id;
          
          return (
            <Card key={exercise.id} style={[styles.exerciseCard, isActive && styles.exerciseCardActive]}>
              <TouchableOpacity 
                style={styles.exerciseHeader}
                onPress={() => setActiveExercise(isActive ? '' : exercise.id)}
              >
                <Image source={{ uri: exercise.image }} style={styles.exerciseImg} />
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseSetsMeta}>{exercise.completedSets}/{exercise.totalSets} sets completed</Text>
                </View>
                <ChevronDown size={20} color={Colors.textMuted} style={{ transform: [{ rotate: isActive ? '180deg' : '0deg' }] }} />
              </TouchableOpacity>

              {isActive && (
                <View style={styles.exerciseBody}>
                  {/* Action Buttons */}
                  <View style={styles.actionButtonsRow}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveModal('about')}>
                      <Info size={20} color={Colors.textSecondary} />
                      <Text style={styles.actionBtnText}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveModal('progress')}>
                      <TrendingUp size={20} color={Colors.textSecondary} />
                      <Text style={styles.actionBtnText}>Progress</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveModal('records')}>
                      <Medal size={20} color={Colors.textSecondary} />
                      <Text style={styles.actionBtnText}>Records</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#E0F8F5' }]} onPress={() => setActiveModal('prehab')}>
                      <ShieldAlert size={20} color="#0D9488" />
                      <Text style={[styles.actionBtnText, { color: '#0D9488' }]}>PreHab</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Sets Table */}
                  <View style={styles.tableHeader}>
                    <Text style={[styles.thText, { width: 30 }]}>Set</Text>
                    <Text style={[styles.thText, { flex: 1 }]}>KG</Text>
                    <Text style={[styles.thText, { flex: 1 }]}>REP</Text>
                    <Text style={[styles.thText, { flex: 1 }]}>RPE</Text>
                    <Text style={[styles.thText, { width: 50, textAlign: 'center' }]}>Done</Text>
                  </View>

                  {exercise.sets.map((set) => (
                    <View key={set.id} style={[styles.tr, set.done && styles.trDone]}>
                      <Text style={[styles.tdText, { width: 30, fontWeight: '700' }]}>{set.setNum}</Text>
                      <View style={styles.inputBox}><Text style={styles.inputText}>{set.kg}</Text></View>
                      <View style={styles.inputBox}><Text style={styles.inputText}>{set.rep}</Text></View>
                      <View style={styles.inputBox}><Text style={styles.inputText}>{set.rpe}</Text></View>
                      <TouchableOpacity 
                        style={styles.checkboxContainer}
                        onPress={() => toggleSetDone(exercise.id, set.id)}
                      >
                        {set.done ? (
                          <CheckSquare size={24} color={Colors.primary} fill={Colors.primary} />
                        ) : (
                          <Square size={24} color={Colors.cardBorder} />
                        )}
                      </TouchableOpacity>
                    </View>
                  ))}

                  {/* Pre-Hab Check */}
                  <View style={styles.preHabCheckContainer}>
                    <Text style={styles.preHabCheckTitle}>Pre-Hab Check: How did this exercise feel?</Text>
                    <View style={styles.preHabBtnRow}>
                      <TouchableOpacity 
                        style={[styles.feelBtn, feelState === 'good' && styles.feelBtnActive]}
                        onPress={() => setFeelState('good')}
                      >
                        <Text style={styles.feelBtnEmoji}>🙂</Text>
                        <Text style={[styles.feelBtnText, feelState === 'good' && styles.feelBtnTextActive]}>Felt Good</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.feelBtn, feelState === 'discomfort' && styles.feelBtnActive]}
                        onPress={() => setFeelState('discomfort')}
                      >
                        <Text style={styles.feelBtnEmoji}>😬</Text>
                        <Text style={[styles.feelBtnText, feelState === 'discomfort' && styles.feelBtnTextActive]}>Discomfort</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </Card>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.completeBtn} onPress={() => navigation.navigate('WorkoutComplete', { duration: '45:12', calories: '342 kcal' })}>
          <Text style={styles.completeBtnText}>Complete Workout</Text>
        </TouchableOpacity>
      </View>

      {/* Info Modals */}
      <Modal visible={activeModal !== null} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.dragHandle} />
            <TouchableOpacity style={styles.closeSheetBtn} onPress={() => setActiveModal(null)}>
              <X size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            {renderModalContent()}
          </View>
        </View>
      </Modal>

      {/* Rest Timer Modal */}
      <Modal visible={showRestModal} transparent animationType="fade">
        <View style={styles.modalOverlayCenter}>
          <View style={styles.restModalContent}>
            <Text style={styles.restModalTitle}>Resting</Text>
            
            <View style={styles.restCircleContainer}>
              <View style={styles.restCircle}>
                <Text style={styles.restCircleText}>{formatTime(restTime)}</Text>
              </View>
            </View>

            <View style={styles.restOptionsRow}>
              <TouchableOpacity style={styles.restOptionBtn} onPress={() => setRestTime(60)}>
                <Text style={styles.restOptionText}>1 Min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.restOptionBtn} onPress={() => setRestTime(120)}>
                <Text style={styles.restOptionText}>2 Min</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.skipRestBtn}
              onPress={() => setShowRestModal(false)}
            >
              <Text style={styles.skipRestText}>Skip Rest</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setShowRestModal(false); setShowCustomTime(true); }}>
              <Text style={styles.customTimeLink}>Custom Time</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerContainer: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: Colors.white, fontSize: 18, fontWeight: '700' },
  totalTimeBox: { alignItems: 'flex-end' },
  totalTimeLabel: { color: Colors.textMuted, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  totalTimeValue: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  restingStatusBox: {
    backgroundColor: '#1E293B', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
  },
  restingLeft: { flexDirection: 'row', alignItems: 'center' },
  restingIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#0EA5E9', marginRight: 12 },
  restingLabel: { color: Colors.textMuted, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  restingValue: { color: '#0EA5E9', fontSize: 18, fontWeight: '800' },
  stopBtn: { backgroundColor: '#EF4444', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  stopBtnText: { color: Colors.white, fontWeight: '700', fontSize: 12 },
  sessionBox: { backgroundColor: '#1E293B', borderRadius: 16, padding: 16 },
  sessionLabel: { color: Colors.textMuted, fontSize: 12, marginBottom: 4 },
  sessionTitle: { color: Colors.white, fontSize: 18, fontWeight: '700', marginBottom: 8 },
  sessionMeta: { color: Colors.textMuted, fontSize: 12 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  exerciseCard: { marginBottom: 16, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: Colors.cardBorder },
  exerciseCardActive: { borderColor: Colors.primary },
  exerciseHeader: { flexDirection: 'row', alignItems: 'center' },
  exerciseImg: { width: 48, height: 48, borderRadius: 8, backgroundColor: Colors.cardBorder },
  exerciseInfo: { flex: 1, marginLeft: 12 },
  exerciseName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  exerciseSetsMeta: { fontSize: 12, color: Colors.textMuted },
  exerciseBody: { marginTop: 20 },
  actionButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  actionBtn: { alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.surfaceLight, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 16, width: '23%' },
  actionBtnText: { fontSize: 10, fontWeight: '700', marginTop: 8, color: Colors.textPrimary },
  tableHeader: { flexDirection: 'row', marginBottom: 12, paddingHorizontal: 8 },
  thText: { fontSize: 10, color: Colors.textMuted, fontWeight: '700', textTransform: 'uppercase' },
  tr: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingHorizontal: 8 },
  trDone: { opacity: 0.5 },
  tdText: { fontSize: 14, color: Colors.textPrimary, fontWeight: '600' },
  inputBox: { flex: 1, backgroundColor: Colors.surfaceLight, paddingVertical: 10, marginHorizontal: 4, borderRadius: 8, alignItems: 'center' },
  inputText: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  checkboxContainer: { width: 50, alignItems: 'center', justifyContent: 'center' },
  preHabCheckContainer: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, marginTop: 16 },
  preHabCheckTitle: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center', marginBottom: 12 },
  preHabBtnRow: { flexDirection: 'row', gap: 12 },
  feelBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#BAE6FD' },
  feelBtnActive: { backgroundColor: Colors.white, borderColor: '#0EA5E9' },
  feelBtnEmoji: { fontSize: 16, marginRight: 8 },
  feelBtnText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  feelBtnTextActive: { color: '#0EA5E9' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.cardBorder },
  completeBtn: { backgroundColor: Colors.primary, borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  completeBtnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },

  // Modals specific styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalOverlayCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  bottomSheet: {
    backgroundColor: Colors.white, borderTopLeftRadius: 32, borderTopRightRadius: 32,
    padding: 24, height: height * 0.75,
  },
  dragHandle: { width: 40, height: 4, backgroundColor: Colors.cardBorder, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  closeSheetBtn: { position: 'absolute', top: 24, right: 24, zIndex: 10 },
  modalTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, marginBottom: 24, paddingRight: 40 },
  
  // About
  aboutSub: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  stepItem: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  stepNum: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#F0F9FF', color: '#0EA5E9', textAlign: 'center', lineHeight: 24, fontWeight: '700', fontSize: 12, marginRight: 12 },
  stepText: { flex: 1, fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  proTipsBox: { backgroundColor: '#FEF9C3', padding: 16, borderRadius: 16, marginTop: 16 },
  proTipsTitle: { fontSize: 14, fontWeight: '800', color: '#854D0E', marginBottom: 8 },
  proTipItem: { fontSize: 13, color: '#A16207', marginBottom: 4 },

  // Progress
  sectionHeader: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary, marginBottom: 16 },
  chartCard: { padding: 16, borderRadius: 16, borderWidth: 1, borderColor: Colors.cardBorder, marginBottom: 16 },
  chartTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },
  barChartContainer: { height: 120, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 10 },
  barColumn: { alignItems: 'center', width: '10%' },
  barFill: { width: '100%', backgroundColor: '#FBBF24', borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  barLabel: { fontSize: 10, color: Colors.textMuted, marginTop: 4 },
  lineChartContainer: { height: 120, position: 'relative', marginTop: 10, paddingHorizontal: 10 },
  linePath: { position: 'absolute', left: 10, right: 10, top: '50%', height: 2, backgroundColor: Colors.primary + '20' },
  lineDot: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, transform: [{ translateX: -4 }, { translateY: 4 }] },
  progressionRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  progStatBox: { flex: 1, backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: Colors.cardBorder },
  progStatTitle: { fontSize: 12, fontWeight: '800', color: Colors.textSecondary, marginBottom: 12 },
  progStatInner: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progStatLabel: { fontSize: 12, color: Colors.textMuted },
  progStatVal: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  maxRepsVal: { fontSize: 32, fontWeight: '800', color: '#0D9488', marginBottom: 4 },
  maxRepsSub: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  maxRepsSub2: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },

  // Records
  recordCard: { padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 12 },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  recordLabel: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary },
  recordValue: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  recordSub: { fontSize: 12, color: Colors.textSecondary },

  // PreHab
  alertCardRed: { backgroundColor: '#FEF2F2', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#FECACA', marginBottom: 16 },
  alertHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  alertTitleRed: { fontSize: 14, fontWeight: '800', color: '#DC2626' },
  alertText: { fontSize: 13, color: '#991B1B', lineHeight: 20, marginBottom: 16 },
  recommendationBox: { backgroundColor: '#FFF', padding: 12, borderRadius: 12 },
  recTitle: { fontSize: 12, fontWeight: '800', color: Colors.textPrimary, marginBottom: 8 },
  recText: { fontSize: 12, color: Colors.textSecondary, marginBottom: 4 },
  alertCardGreen: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#A7F3D0', marginBottom: 24 },
  alertTitleGreen: { fontSize: 14, fontWeight: '800', color: '#059669' },
  recItem: { marginTop: 8 },
  recentHistoryTitle: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.cardBorder },
  historyTime: { fontSize: 14, color: '#0EA5E9', fontWeight: '600' },
  historyEvent: { fontSize: 14, color: Colors.textPrimary, fontWeight: '600' },

  // Old Modal bits
  restModalContent: { backgroundColor: Colors.white, borderRadius: 24, padding: 32, width: '85%', alignItems: 'center' },
  restModalTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary, marginBottom: 32 },
  restCircleContainer: { alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  restCircle: { width: 140, height: 140, borderRadius: 70, borderWidth: 8, borderColor: '#0EA5E9', alignItems: 'center', justifyContent: 'center' },
  restCircleText: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  restOptionsRow: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  restOptionBtn: { backgroundColor: Colors.surfaceLight, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  restOptionText: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  skipRestBtn: { backgroundColor: Colors.primary, width: '100%', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
  skipRestText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  customTimeLink: { color: '#0EA5E9', fontSize: 14, fontWeight: '600' },
});
