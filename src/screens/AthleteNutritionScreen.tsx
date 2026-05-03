import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, Typography, BorderRadius } from '../theme';
import { Card, Badge } from '../components';
import { ChevronLeft, Info, ShoppingCart, List } from 'lucide-react-native';

const mockNutritionPlan = {
  name: 'High Protein Lean Bulk',
  goal: 'Muscle Gain',
  caloriesPerDay: 2600,
  mealsPerDay: 5,
  duration: '12 weeks',
  macros: { protein: 200, carbs: 300, fat: 80 },
};

const meals = [
  {
    id: '1',
    time: '07:00 AM',
    name: 'Breakfast',
    items: ['Oats (100g)', 'Eggs x3', 'Banana', 'Whole milk (250ml)'],
    calories: 620,
    emoji: '🌅',
  },
  {
    id: '2',
    time: '10:00 AM',
    name: 'Mid-Morning Snack',
    items: ['Greek Yogurt (200g)', 'Mixed Berries', 'Almonds (30g)'],
    calories: 340,
    emoji: '🍓',
  },
  {
    id: '3',
    time: '01:00 PM',
    name: 'Lunch',
    items: ['Chicken Breast (200g)', 'Brown Rice (150g)', 'Broccoli (100g)', 'Olive Oil (1 tbsp)'],
    calories: 680,
    emoji: '🍗',
  },
  {
    id: '4',
    time: '04:00 PM',
    name: 'Pre-Workout',
    items: ['Protein Shake', 'Banana', 'Peanut Butter (1 tbsp)'],
    calories: 420,
    emoji: '⚡',
  },
  {
    id: '5',
    time: '08:00 PM',
    name: 'Dinner',
    items: ['Salmon (180g)', 'Sweet Potato (200g)', 'Spinach Salad'],
    calories: 540,
    emoji: '🐟',
  },
];

const shoppingList = [
  { category: '🥩 Protein', items: ['Chicken Breast', 'Eggs (dozen)', 'Salmon', 'Greek Yogurt', 'Whey Protein'], checked: [false, false, true, false, true] },
  { category: '🌾 Carbs', items: ['Oats', 'Brown Rice', 'Sweet Potato', 'Banana'], checked: [false, true, false, false] },
  { category: '🥑 Fats', items: ['Almonds', 'Olive Oil', 'Peanut Butter', 'Avocado'], checked: [false, false, false, true] },
];

export const AthleteNutritionScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'shopping'>('plan');
  const [checkedItems, setCheckedItems] = useState(
    shoppingList.map((c) => ({ ...c }))
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nutrition Plan</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Plan Header Card */}
        <Card style={styles.planHeaderCard}>
          <View style={styles.planInfo}>
            <Text style={styles.planName}>{mockNutritionPlan.name}</Text>
            <View style={styles.planMeta}>
              <Badge label={mockNutritionPlan.goal} color={Colors.primary} bgColor={Colors.primary + '10'} />
              <Badge label={`${mockNutritionPlan.caloriesPerDay} kcal/day`} color={Colors.primary} bgColor={Colors.primary + '10'} />
            </View>
          </View>
          
          <View style={styles.macroStrip}>
            {[
              { label: 'Protein', value: mockNutritionPlan.macros.protein, unit: 'g', color: Colors.protein },
              { label: 'Carbs', value: mockNutritionPlan.macros.carbs, unit: 'g', color: Colors.carbs },
              { label: 'Fats', value: mockNutritionPlan.macros.fat, unit: 'g', color: Colors.fat },
            ].map((m) => (
              <View key={m.label} style={styles.macroItem}>
                <Text style={[styles.macroVal, { color: m.color }]}>{m.value}{m.unit}</Text>
                <Text style={styles.macroLbl}>{m.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab('plan')}
            style={[styles.tab, activeTab === 'plan' && styles.tabActive]}
          >
            <List size={18} color={activeTab === 'plan' ? Colors.white : Colors.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'plan' && styles.tabTextActive]}>Meal Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('shopping')}
            style={[styles.tab, activeTab === 'shopping' && styles.tabActive]}
          >
            <ShoppingCart size={18} color={activeTab === 'shopping' ? Colors.white : Colors.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'shopping' && styles.tabTextActive]}>Shopping</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'plan' ? (
          <View style={styles.mealsList}>
            {meals.map((meal) => (
              <Card key={meal.id} style={styles.mealCard}>
                <View style={styles.mealHeader}>
                  <View style={styles.mealIconBox}>
                    <Text style={styles.mealEmoji}>{meal.emoji}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.mealTime}>{meal.time}</Text>
                    <Text style={styles.mealNameText}>{meal.name}</Text>
                  </View>
                  <Badge
                    label={`${meal.calories} kcal`}
                    color={Colors.protein}
                    bgColor={Colors.protein + '10'}
                  />
                </View>
                <View style={styles.mealItems}>
                  {meal.items.map((item, i) => (
                    <View key={i} style={styles.mealItem}>
                      <View style={[styles.bullet, { backgroundColor: Colors.protein }]} />
                      <Text style={styles.mealItemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            ))}
          </View>
        ) : (
          <View style={styles.mealsList}>
            {shoppingList.map((category, ci) => (
              <Card key={ci} style={styles.mealCard}>
                <Text style={styles.categoryTitle}>{category.category}</Text>
                {category.items.map((item, ii) => (
                  <TouchableOpacity
                    key={ii}
                    style={styles.shoppingItem}
                    onPress={() => {
                      const updated = [...checkedItems];
                      updated[ci].checked[ii] = !updated[ci].checked[ii];
                      setCheckedItems(updated);
                    }}
                  >
                    <View style={[styles.shoppingCheck, checkedItems[ci].checked[ii] && styles.shoppingChecked]}>
                      {checkedItems[ci].checked[ii] && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={[
                      styles.shoppingText,
                      checkedItems[ci].checked[ii] && styles.shoppingTextDone
                    ]}>{item}</Text>
                  </TouchableOpacity>
                ))}
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
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
  headerRight: {
    width: 40,
  },
  scroll: { 
    padding: 24, 
    paddingBottom: 100 
  },
  planHeaderCard: {
    padding: 20,
    marginBottom: 24,
  },
  planInfo: {
    marginBottom: 20,
  },
  planName: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  planMeta: { 
    flexDirection: 'row', 
    gap: 8 
  },
  macroStrip: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  macroItem: { 
    alignItems: 'center',
    flex: 1,
  },
  macroVal: { 
    fontSize: 20, 
    fontWeight: '800' 
  },
  macroLbl: { 
    fontSize: 12, 
    color: Colors.textSecondary, 
    marginTop: 4, 
    fontWeight: '600' 
  },
  tabs: { 
    flexDirection: 'row', 
    gap: 12,
    marginBottom: 24,
  },
  tab: { 
    flex: 1, 
    flexDirection: 'row',
    paddingVertical: 12, 
    borderRadius: 16, 
    backgroundColor: Colors.surface, 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 8,
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
  mealsList: {
    gap: 16,
  },
  mealCard: {
    padding: 16,
  },
  mealHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    marginBottom: 16 
  },
  mealIconBox: { 
    width: 48, 
    height: 48, 
    borderRadius: 14, 
    backgroundColor: Colors.background, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  mealEmoji: {
    fontSize: 24,
  },
  mealTime: { 
    fontSize: 12, 
    color: Colors.textMuted, 
    fontWeight: '600' 
  },
  mealNameText: { 
    fontSize: 16, 
    fontWeight: '700',
    color: Colors.textPrimary, 
    marginTop: 2 
  },
  mealItems: { 
    gap: 8,
    paddingLeft: 4,
  },
  mealItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10 
  },
  bullet: { 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
  },
  mealItemText: { 
    fontSize: 14, 
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  categoryTitle: { 
    fontSize: 18, 
    fontWeight: '700',
    color: Colors.textPrimary, 
    marginBottom: 16 
  },
  shoppingItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: Colors.divider 
  },
  shoppingCheck: { 
    width: 24, 
    height: 24, 
    borderRadius: 8, 
    borderWidth: 2, 
    borderColor: Colors.cardBorder, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  shoppingChecked: { 
    backgroundColor: Colors.success, 
    borderColor: Colors.success 
  },
  checkmark: { 
    color: Colors.white, 
    fontWeight: '900', 
    fontSize: 12 
  },
  shoppingText: { 
    fontSize: 15, 
    color: Colors.textPrimary, 
    flex: 1,
    fontWeight: '500',
  },
  shoppingTextDone: { 
    textDecorationLine: 'line-through', 
    color: Colors.textMuted 
  },
});
