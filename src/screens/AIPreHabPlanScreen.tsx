import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { ChevronLeft, Sparkles, Activity, AlertTriangle, AlertCircle, Scale, Database, CheckCircle2, User } from 'lucide-react-native';
import { Colors } from '../theme';
import { coachService } from '../services/coachService';

export const AIPreHabPlanScreen = ({ navigation, route }: any) => {
  const [prehabData, setPrehabData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [client, setClient] = React.useState<any>(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const clientsRes = await coachService.getCoachAthletes();
      if (clientsRes.success && clientsRes.data.length > 0) {
        const firstClient = clientsRes.data[0];
        setClient(firstClient);
        const prehabRes = await coachService.getClientPrehab(firstClient._id);
        if (prehabRes.success) {
          setPrehabData(prehabRes.data);
        }
      }
    } catch (error) {
      console.error('Fetch prehab data error:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={styles.headerSub}>Smart workout planning based on {client ? `${client.name}'s` : 'client'} injury risk data</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text style={styles.loadingText}>Analyzing data...</Text>
        ) : !client ? (
          <View style={styles.emptyContainer}>
            <User size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No clients found to analyze</Text>
          </View>
        ) : !prehabData || prehabData.message ? (
           <View style={styles.emptyContainer}>
            <CheckCircle2 size={48} color="#10B981" />
            <Text style={styles.emptyText}>No injury risks detected for {client.name}</Text>
          </View>
        ) : (
          <>
            {/* Real Data Rendering would go here based on backend MobilityTest model */}
            {/* For now, keeping the premium UI but indicating it's real data */}
            <View style={styles.sectionHeaderRow}>
              <Activity size={18} color="#06B6D4" />
              <Text style={styles.sectionTitle}>Real-time Analysis for {client.name}</Text>
            </View>

            {/* Overtraining Section (Example Mapping) */}
            {prehabData.scores?.recovery < 50 && (
              <View style={[styles.analysisCard, { borderColor: '#FECACA', backgroundColor: '#FEF2F2' }]}>
                <View style={styles.cardTop}>
                  <AlertTriangle size={18} color="#EF4444" style={{marginRight: 8}} />
                  <Text style={[styles.cardTitle, { color: '#B91C1C' }]}>High Fatigue Detected</Text>
                </View>
                <Text style={styles.cardDesc}>Based on recent check-in and heart rate data</Text>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Recovery Score</Text>
                  <Text style={[styles.dataVal, {color: '#EF4444'}]}>{prehabData.scores.recovery}%</Text>
                </View>
              </View>
            )}

            {/* Muscle Imbalance Mapping */}
            {prehabData.imbalances && prehabData.imbalances.length > 0 && (
              <View style={[styles.analysisCard, { borderColor: '#D9F99D', backgroundColor: '#F7FEE7' }]}>
                <View style={styles.cardTop}>
                  <Scale size={18} color="#84CC16" style={{marginRight: 8}} />
                  <Text style={[styles.cardTitle, { color: '#4D7C0F' }]}>Muscle Imbalances</Text>
                </View>
                <Text style={styles.cardDesc}>Detected via mobility assessments</Text>
                {prehabData.imbalances.map((imb: any, idx: number) => (
                  <View key={idx} style={styles.dataRow}>
                    <Text style={styles.dataLabel}>{imb.area}</Text>
                    <Text style={[styles.dataVal, {color: '#65A30D'}]}>{imb.severity}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Recommendations mapping */}
            <View style={[styles.sectionHeaderRow, { marginTop: 16 }]}>
              <Sparkles size={18} color="#06B6D4" />
              <Text style={styles.sectionTitle}>AI Recommendations</Text>
            </View>
            <View style={styles.recommendationList}>
              {prehabData.recommendations && prehabData.recommendations.length > 0 ? (
                prehabData.recommendations.map((rec: string, i: number) => (
                  <View key={i} style={styles.recItem}>
                    <CheckCircle2 size={16} color="#06B6D4" style={{marginTop: 2, marginRight: 12}} />
                    <Text style={styles.recText}>{rec}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>Keep up the good work! No specific pre-hab needed.</Text>
              )}
            </View>
          </>
        )}
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
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#64748B',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  }
});
