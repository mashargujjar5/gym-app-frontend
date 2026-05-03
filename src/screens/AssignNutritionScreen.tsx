import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Colors, Typography, BorderRadius } from '../theme';
import { Card, Button } from '../components';
import { ChevronLeft, Utensils, Zap, Flame, Info, ChevronDown } from 'lucide-react-native';

const nutritionTemplates = [
  { id: '1', title: 'Lean Bulk (High Carb)', calories: '2,800', p: '200g', c: '350g', f: '70g' },
  { id: '2', title: 'Aggressive Cut', calories: '1,800', p: '180g', c: '120g', f: '60g' },
  { id: '3', title: 'Recomposition', calories: '2,200', p: '190g', c: '200g', f: '65g' },
  { id: '4', title: 'Maintenance (Balanced)', calories: '2,400', p: '170g', c: '250g', f: '80g' },
];

export const AssignNutritionScreen = ({ navigation, route }: any) => {
  const client = route?.params?.client || { name: 'Jessica Lee' };
  const [selected, setSelected] = useState<string | null>(null);

  const handleAssign = () => {
    if (!selected) return;
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Nutrition Plan</Text>
          <Text style={styles.subtitle}>To {client.name}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.sectionHeader}>
          <Utensils size={20} color={Colors.primary} />
          <Text style={styles.sectionTitle}>Nutrition Templates</Text>
        </View>
        
        <View style={styles.templateList}>
          {nutritionTemplates.map((t) => (
            <TouchableOpacity
              key={t.id}
              activeOpacity={0.9}
              onPress={() => setSelected(t.id)}
            >
              <Card
                style={[
                  styles.templateCard,
                  selected === t.id && styles.selectedCard,
                ]}
              >
                <View style={styles.templateHeader}>
                  <Text style={styles.templateTitle}>{t.title}</Text>
                  <Text style={styles.caloriesText}>{t.calories} kcal</Text>
                </View>
                <View style={styles.macrosRow}>
                  <View style={styles.macroPill}>
                    <Text style={styles.macroLabel}>Protein</Text>
                    <Text style={[styles.macroValue, { color: Colors.protein }]}>{t.p}</Text>
                  </View>
                  <View style={styles.macroPill}>
                    <Text style={styles.macroLabel}>Carbs</Text>
                    <Text style={[styles.macroValue, { color: Colors.carbs }]}>{t.c}</Text>
                  </View>
                  <View style={styles.macroPill}>
                    <Text style={styles.macroLabel}>Fats</Text>
                    <Text style={[styles.macroValue, { color: Colors.fat }]}>{t.f}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <Card style={styles.customCard}>
          <View style={styles.customHeader}>
            <Zap size={20} color={Colors.primary} />
            <Text style={styles.customTitle}>Manual Macro Entry</Text>
          </View>
          <View style={styles.inputGrid}>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Calories</Text>
              <TextInput style={styles.input} placeholder="2200" placeholderTextColor={Colors.textMuted} keyboardType="numeric" />
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Protein (g)</Text>
              <TextInput style={styles.input} placeholder="180" placeholderTextColor={Colors.textMuted} keyboardType="numeric" />
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Carbs (g)</Text>
              <TextInput style={styles.input} placeholder="250" placeholderTextColor={Colors.textMuted} keyboardType="numeric" />
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Fat (g)</Text>
              <TextInput style={styles.input} placeholder="70" placeholderTextColor={Colors.textMuted} keyboardType="numeric" />
            </View>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={selected ? "Confirm Assignment" : "Assign Targets"}
          onPress={handleAssign}
        />
      </View>
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
  headerInfo: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: Colors.textPrimary 
  },
  subtitle: { 
    fontSize: 13, 
    color: Colors.success, 
    marginTop: 2, 
    fontWeight: '700' 
  },
  headerRight: { width: 40 },
  scroll: { 
    padding: 24, 
    paddingBottom: 120 
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: Colors.textPrimary, 
  },
  templateList: {
    gap: 12,
    marginBottom: 32,
  },
  templateCard: { 
    padding: 16,
  },
  selectedCard: { 
    borderColor: Colors.primary, 
    backgroundColor: Colors.primary + '05' 
  },
  templateHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  templateTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: Colors.textPrimary 
  },
  caloriesText: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: Colors.primary 
  },
  macrosRow: { 
    flexDirection: 'row', 
    gap: 10 
  },
  macroPill: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    borderRadius: 12, 
    padding: 12, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  macroLabel: { 
    fontSize: 10, 
    color: Colors.textMuted, 
    marginBottom: 4, 
    fontWeight: '800',
    textTransform: 'uppercase' 
  },
  macroValue: { 
    fontSize: 15, 
    fontWeight: '800', 
  },
  customCard: { 
    padding: 20 
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  customTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: Colors.textPrimary, 
  },
  inputGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 12 
  },
  inputWrap: { 
    width: '47%' 
  },
  inputLabel: { 
    fontSize: 12, 
    color: Colors.textSecondary, 
    marginBottom: 8,
    fontWeight: '600',
  },
  input: { 
    backgroundColor: Colors.background, 
    borderRadius: 12, 
    padding: 14, 
    color: Colors.textPrimary, 
    borderWidth: 1, 
    borderColor: Colors.cardBorder,
    fontWeight: '600',
  },
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    padding: 24, 
    paddingBottom: 40,
    backgroundColor: Colors.surface, 
    borderTopWidth: 1, 
    borderTopColor: Colors.divider 
  },
});
