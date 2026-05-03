import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors, Typography, BorderRadius } from '../theme';
import { Card } from '../components';
import { ChevronLeft, Scale, Camera, ArrowRightLeft, TrendingDown, TrendingUp } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const checkInHistory = [
  { id: '1', date: 'Apr 28, 2026', weight: '165.2 lbs', fat: '18.2%', neck: '15.5"', waist: '32.1"', photo: '📷' },
  { id: '2', date: 'Apr 14, 2026', weight: '167.8 lbs', fat: '18.8%', neck: '15.4"', waist: '32.5"', photo: '📷' },
  { id: '3', date: 'Mar 31, 2026', weight: '169.5 lbs', fat: '19.5%', neck: '15.4"', waist: '33.0"', photo: '📷' },
];

export const ProgressCompareScreen = ({ navigation, route }: any) => {
  const client = route?.params?.client || { name: 'Jessica Lee' };
  const [selectedIds, setSelectedIds] = useState<string[]>(['1', '2']);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((i) => i !== id));
      }
    } else {
      if (selectedIds.length < 2) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([selectedIds[1], id]);
      }
    }
  };

  const selectedItems = checkInHistory.filter((i) => selectedIds.includes(i.id));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Progress Analysis</Text>
          <Text style={styles.headerSubtitle}>{client.name}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Comparison Header */}
        <View style={styles.sectionHeader}>
          <ArrowRightLeft size={20} color={Colors.primary} />
          <Text style={styles.sectionTitle}>Data Comparison</Text>
        </View>

        {selectedItems.length === 2 && (
          <Card style={styles.compareCard}>
            <View style={styles.tableRow}>
              <View style={styles.labelCol} />
              <View style={styles.dataCol}><Text style={styles.dateLabel}>{selectedItems[1].date}</Text></View>
              <View style={styles.dataCol}><Text style={styles.dateLabel}>{selectedItems[0].date}</Text></View>
              <View style={styles.diffCol}><Text style={styles.dateLabel}>Diff</Text></View>
            </View>

            {[
              { label: 'Weight', key: 'weight' },
              { label: 'Body Fat', key: 'fat' },
              { label: 'Waist', key: 'waist' },
              { label: 'Neck', key: 'neck' },
            ].map((row) => {
              const val1 = parseFloat(selectedItems[0][row.key as keyof typeof selectedItems[0]] || '0');
              const val2 = parseFloat(selectedItems[1][row.key as keyof typeof selectedItems[1]] || '0');
              const diffNum = val1 - val2;
              const diffStr = diffNum.toFixed(1);
              const isImprovement = diffNum < 0; // Assuming weight loss is improvement

              return (
                <View key={row.label} style={styles.tableRow}>
                  <View style={styles.labelCol}><Text style={styles.rowLabel}>{row.label}</Text></View>
                  <View style={styles.dataCol}><Text style={styles.rowVal}>{selectedItems[1][row.key as keyof typeof selectedItems[1]]}</Text></View>
                  <View style={styles.dataCol}><Text style={styles.rowVal}>{selectedItems[0][row.key as keyof typeof selectedItems[0]]}</Text></View>
                  <View style={styles.diffCol}>
                    <View style={[styles.diffBadge, { backgroundColor: isImprovement ? Colors.success + '15' : Colors.error + '15' }]}>
                      <Text style={[styles.diffVal, { color: isImprovement ? Colors.success : Colors.error }]}>
                        {diffNum > 0 ? `+${diffStr}` : diffStr}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </Card>
        )}

        {/* Photo Comparison */}
        {selectedItems.length === 2 && (
          <View style={styles.photoSection}>
            <View style={styles.sectionHeader}>
              <Camera size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Photo Comparison</Text>
            </View>
            <View style={styles.photoRow}>
              <View style={styles.photoBox}>
                <View style={styles.photoPlaceholder}><Camera size={32} color={Colors.textMuted} /></View>
                <Text style={styles.photoDate}>{selectedItems[1].date}</Text>
              </View>
              <View style={styles.photoBox}>
                <View style={styles.photoPlaceholder}><Camera size={32} color={Colors.textMuted} /></View>
                <Text style={styles.photoDate}>{selectedItems[0].date}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Selection History */}
        <View style={styles.sectionHeader}>
          <Scale size={20} color={Colors.primary} />
          <Text style={styles.sectionTitle}>Select Check-ins (Max 2)</Text>
        </View>
        <View style={styles.historyList}>
          {checkInHistory.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggleSelect(item.id)}
                activeOpacity={0.8}
              >
                <Card style={[styles.historyCard, isSelected && styles.selectedHistory]}>
                  <View style={styles.historyCardRow}>
                    <View style={[styles.checkCircle, isSelected && styles.checkCircleActive]}>
                      {isSelected && <View style={styles.checkInner} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.historyCardDate}>{item.date}</Text>
                      <Text style={styles.historyMeta}>{item.weight} • {item.fat} Body Fat</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
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
  headerSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerRight: { width: 40 },
  scroll: { 
    padding: 24, 
    paddingBottom: 100 
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  compareCard: { 
    padding: 16, 
    marginBottom: 32 
  },
  tableRow: { 
    flexDirection: 'row', 
    paddingVertical: 14, 
    borderBottomWidth: 1, 
    borderBottomColor: Colors.divider 
  },
  labelCol: { width: 80 },
  dataCol: { flex: 1, alignItems: 'center' },
  diffCol: { width: 70, alignItems: 'center' },
  dateLabel: { 
    fontSize: 10, 
    color: Colors.textMuted, 
    fontWeight: '700', 
    textTransform: 'uppercase' 
  },
  rowLabel: { 
    fontSize: 14, 
    color: Colors.textSecondary, 
    fontWeight: '600' 
  },
  rowVal: { 
    fontSize: 14, 
    color: Colors.textPrimary, 
    fontWeight: '700' 
  },
  diffBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  diffVal: { 
    fontSize: 12, 
    fontWeight: '800' 
  },
  photoSection: { 
    marginBottom: 32 
  },
  photoRow: { 
    flexDirection: 'row', 
    gap: 12 
  },
  photoBox: { 
    flex: 1, 
    alignItems: 'center' 
  },
  photoPlaceholder: { 
    width: '100%', 
    aspectRatio: 3 / 4, 
    backgroundColor: Colors.surface, 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: Colors.cardBorder 
  },
  photoDate: { 
    fontSize: 12, 
    color: Colors.textSecondary, 
    marginTop: 8, 
    fontWeight: '600' 
  },
  historyList: {
    gap: 12,
  },
  historyCard: { 
    padding: 16 
  },
  selectedHistory: { 
    borderColor: Colors.primary, 
    backgroundColor: Colors.primary + '05' 
  },
  historyCardRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 14 
  },
  checkCircle: { 
    width: 22, 
    height: 22, 
    borderRadius: 11, 
    borderWidth: 2, 
    borderColor: Colors.cardBorder, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  checkCircleActive: { 
    borderColor: Colors.primary 
  },
  checkInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  historyCardDate: { 
    fontSize: 15, 
    color: Colors.textPrimary, 
    fontWeight: '700' 
  },
  historyMeta: { 
    fontSize: 13, 
    color: Colors.textMuted, 
    marginTop: 2,
    fontWeight: '500',
  },
});
