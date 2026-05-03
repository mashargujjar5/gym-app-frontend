import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Platform } from 'react-native';
import { Colors, BorderRadius } from '../theme';
import { Search, Plus, Sparkles, Dumbbell, Link, Users, Lock, Unlock, Zap, Activity } from 'lucide-react-native';

const mockTemplates = [
  {
    id: '1',
    title: 'Leg Day A - Strength Focus',
    tags: ['Lower Body', 'Advanced', 'Powerlifting'],
    modified: '2 days ago',
    exercises: 8,
    duration: '60',
    usedBy: 12,
    isLocked: false,
  },
  {
    id: '2',
    title: 'Upper Body Push',
    tags: ['Upper Body', 'Intermediate', 'Bodybuilding'],
    modified: '1 week ago',
    exercises: 5,
    duration: '45',
    usedBy: 15,
    isLocked: true,
  },
  {
    id: '3',
    title: 'Full Body Hypertrophy',
    tags: ['Full Body', 'Beginner', 'Hypertrophy'],
    modified: '3 days ago',
    exercises: 10,
    duration: '75',
    usedBy: 8,
    isLocked: false,
  }
];

const categories = ['All', 'Full Body', 'Upper Body', 'Lower Body'];

export const CoachTemplatesScreen = ({ navigation }: any) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Content */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Templates</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>6 Total</Text>
            </View>
          </View>
          
          <View style={styles.searchBox}>
            <Search size={20} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search templates..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={styles.createBtn}
              onPress={() => navigation.navigate('CreateWorkoutOption')}
            >
              <View style={styles.createBtnIcon}>
                <Plus size={16} color={Colors.white} />
              </View>
              <View>
                <Text style={styles.actionBtnTitle}>Create Template</Text>
                <Text style={styles.actionBtnSub}>Build your own workout</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.aiBtn}
              onPress={() => navigation.navigate('AIPreHabPlan')}
            >
              <View style={styles.aiBtnIcon}>
                <Sparkles size={16} color={Colors.white} />
              </View>
              <View>
                <Text style={styles.actionBtnTitle}>AI PreHab Plan</Text>
                <Text style={styles.actionBtnSub}>Smart injury prevention</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categoryContent}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, activeCategory === cat && styles.categoryPillActive]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Templates List */}
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {mockTemplates.map((template) => (
            <View key={template.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{flex: 1}}>
                  <Text style={styles.cardTitle}>{template.title}</Text>
                  <View style={styles.cardSubtitleRow}>
                    <Text style={styles.cardSubtitleMain}>{template.tags[0]}</Text>
                    <Text style={styles.cardSubtitleDot}>•</Text>
                    <Text style={styles.cardSubtitleGray}>Modified {template.modified}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.iconBtn}>
                  {template.isLocked ? <Lock size={16} color="#EF4444" /> : <Unlock size={16} color="#10B981" />}
                </TouchableOpacity>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Dumbbell size={14} color="#3B82F6" />
                  <View style={styles.statTextCol}>
                    <Text style={styles.statLabel}>Exercises</Text>
                    <Text style={styles.statVal}>{template.exercises}</Text>
                  </View>
                </View>
                <View style={styles.statItem}>
                  <Activity size={14} color="#10B981" />
                  <View style={styles.statTextCol}>
                    <Text style={styles.statLabel}>Duration</Text>
                    <Text style={styles.statVal}>{template.duration}</Text>
                  </View>
                </View>
                <View style={styles.statItem}>
                  <Users size={14} color="#64748B" />
                  <View style={styles.statTextCol}>
                    <Text style={styles.statLabel}>Used by</Text>
                    <Text style={styles.statVal}>{template.usedBy}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.tagsRow}>
                <View style={[styles.tag, {backgroundColor: '#FEE2E2'}]}>
                  <Text style={[styles.tagText, {color: '#EF4444'}]}>{template.tags[1]}</Text>
                </View>
                <View style={[styles.tag, {backgroundColor: '#FEF3C7'}]}>
                  <Text style={[styles.tagText, {color: '#D97706'}]}>{template.tags[2]}</Text>
                </View>
                {template.tags[3] && (
                  <View style={[styles.tag, {backgroundColor: '#E0E7FF'}]}>
                    <Text style={[styles.tagText, {color: '#4F46E5'}]}>{template.tags[3]}</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity 
                style={styles.assignBtn}
                onPress={() => navigation.navigate('AssignPlan', { templateName: template.title })}
              >
                <Link size={16} color={Colors.white} />
                <Text style={styles.assignBtnText}>Assign to Clients</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* FAB */}
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => navigation.navigate('CreateWorkoutOption')}
        >
          <Plus size={24} color={Colors.white} />
        </TouchableOpacity>
        
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
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  badge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#0F172A',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  createBtn: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: { elevation: 4 }
    })
  },
  createBtnIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aiBtn: {
    flex: 1,
    backgroundColor: '#06B6D4',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  aiBtnIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionBtnTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 2,
  },
  actionBtnSub: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.8)',
  },
  categoryScroll: {
    marginHorizontal: -20,
  },
  categoryContent: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryPillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryTextActive: {
    color: Colors.white,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100, // For FAB
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 }
    })
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardSubtitleMain: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSubtitleDot: {
    fontSize: 12,
    color: '#94A3B8',
    marginHorizontal: 6,
  },
  cardSubtitleGray: {
    fontSize: 12,
    color: '#64748B',
  },
  iconBtn: {
    padding: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statTextCol: {
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 2,
  },
  statVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
  },
  assignBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06B6D4',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  assignBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.white,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: { elevation: 8 }
    })
  }
});
