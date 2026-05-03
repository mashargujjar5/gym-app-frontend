import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Colors } from '../theme';
import { ChevronLeft, Sparkles, Activity, AlertTriangle, AlertCircle, Scale, Database, CheckCircle2 } from 'lucide-react-native';

export const AIPreHabPlanScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Area */}
      <View style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleRow}>
            <Sparkles size={20} color="#06B6D4" style={{marginRight: 8}} />
            <Text style={styles.headerTitle}>AI PreHab Plan</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
        <Text style={styles.headerSub}>Smart workout planning based on your injury risk data</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* PreHab Analysis Section */}
        <View style={styles.sectionHeaderRow}>
          <Activity size={18} color="#06B6D4" />
          <Text style={styles.sectionTitle}>PreHab Analysis</Text>
        </View>

        {/* Overtraining Detected */}
        <View style={[styles.analysisCard, { borderColor: '#FECACA', backgroundColor: '#FEF2F2' }]}>
          <View style={styles.cardTop}>
            <AlertTriangle size={18} color="#EF4444" style={{marginRight: 8}} />
            <Text style={[styles.cardTitle, { color: '#B91C1C' }]}>Overtraining Detected</Text>
          </View>
          <Text style={styles.cardDesc}>Elevated resting heart rate and reported fatigue</Text>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Right Shoulder</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.dataVal, {color: '#EF4444'}]}>22 sets</Text>
              <Text style={styles.dataSub}>(7 days)</Text>
            </View>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Left Shoulder</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.dataVal, {color: '#EF4444'}]}>22 sets</Text>
              <Text style={styles.dataSub}>(7 days)</Text>
            </View>
          </View>
        </View>

        {/* Mobility Risk Detected */}
        <View style={[styles.analysisCard, { borderColor: '#FED7AA', backgroundColor: '#FFF7ED' }]}>
          <View style={styles.cardTop}>
            <AlertCircle size={18} color="#F97316" style={{marginRight: 8}} />
            <Text style={[styles.cardTitle, { color: '#C2410C' }]}>Mobility Risk Detected</Text>
          </View>
          <Text style={styles.cardDesc}>High frequency in certain movement patterns</Text>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Pressing Movements</Text>
            <Text style={[styles.dataVal, {color: '#F97316'}]}>9 sessions</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Squat Pattern</Text>
            <Text style={[styles.dataVal, {color: '#F97316'}]}>6 sessions</Text>
          </View>
        </View>

        {/* Pain Feedback Recorded */}
        <View style={[styles.analysisCard, { borderColor: '#FDE047', backgroundColor: '#FEFCE8' }]}>
          <View style={styles.cardTop}>
            <Activity size={18} color="#EAB308" style={{marginRight: 8}} />
            <Text style={[styles.cardTitle, { color: '#A16207' }]}>Pain Feedback Recorded</Text>
          </View>
          <Text style={styles.cardDesc}>Recent discomfort during training</Text>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Right Shoulder</Text>
            <Text style={[styles.dataVal, {color: '#EAB308'}]}>2 sessions</Text>
          </View>
        </View>

        {/* Muscle Imbalances */}
        <View style={[styles.analysisCard, { borderColor: '#D9F99D', backgroundColor: '#F7FEE7' }]}>
          <View style={styles.cardTop}>
            <Scale size={18} color="#84CC16" style={{marginRight: 8}} />
            <Text style={[styles.cardTitle, { color: '#4D7C0F' }]}>Muscle Imbalances</Text>
          </View>
          <Text style={styles.cardDesc}>Uneven training volumes detected</Text>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Chest vs Back</Text>
            <Text style={[styles.dataVal, {color: '#65A30D'}]}>Ratio: 2:1</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Quads vs Hamstrings</Text>
            <Text style={[styles.dataVal, {color: '#65A30D'}]}>Ratio: 2.5:1</Text>
          </View>
        </View>

        {/* Underused Muscle Groups */}
        <View style={[styles.analysisCard, { borderColor: '#BAE6FD', backgroundColor: '#F0F9FF' }]}>
          <View style={styles.cardTop}>
            <Database size={18} color="#3B82F6" style={{marginRight: 8}} />
            <Text style={[styles.cardTitle, { color: '#1D4ED8' }]}>Underused Muscle Groups</Text>
          </View>
          <Text style={styles.cardDesc}>These areas need more attention</Text>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Core</Text>
            <Text style={[styles.dataVal, {color: '#3B82F6'}]}>4/10 sets</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Hamstrings</Text>
            <Text style={[styles.dataVal, {color: '#3B82F6'}]}>6/14 sets</Text>
          </View>
        </View>


        {/* AI Recommendations Section */}
        <View style={[styles.sectionHeaderRow, { marginTop: 16 }]}>
          <Sparkles size={18} color="#06B6D4" />
          <Text style={styles.sectionTitle}>AI Recommendations</Text>
        </View>

        <View style={styles.recommendationList}>
          {[
            'Reduce shoulder volume by 40% for next 7 days',
            'Add mobility work and stretching for shoulders',
            'Increase back training volume to balance chest work',
            'Focus on hamstring exercises to balance quads',
            'Add 2-3 core exercises per workout',
            'Replace high-risk shoulder exercises with alternatives'
          ].map((rec, i) => (
            <View key={i} style={styles.recItem}>
              <CheckCircle2 size={16} color="#06B6D4" style={{marginTop: 2, marginRight: 12}} />
              <Text style={styles.recText}>{rec}</Text>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.generateBtn} onPress={() => navigation.navigate('CreateWorkoutOption')}>
          <Sparkles size={20} color={Colors.white} style={{marginRight: 8}} />
          <Text style={styles.generateBtnText}>Generate AI PreHab Plan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerWrap: {
    backgroundColor: '#E0F2FE', // Light cyan gradient look
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginLeft: 8,
  },
  analysisCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  cardDesc: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dataLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  dataVal: {
    fontSize: 12,
    fontWeight: '800',
  },
  dataSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginLeft: 4,
  },
  recommendationList: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recText: {
    flex: 1,
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  footer: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 32 : 24,
    backgroundColor: '#F8FAFC',
  },
  generateBtn: {
    flexDirection: 'row',
    backgroundColor: '#06B6D4',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#06B6D4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 4 }
    })
  },
  generateBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
  }
});
