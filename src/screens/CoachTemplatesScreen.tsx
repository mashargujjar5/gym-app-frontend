import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Platform } from 'react-native';
import { Colors } from '../theme';
import { Search, Plus, Sparkles, Dumbbell, Link, Users, Lock, Unlock, Zap, Activity, Trash2 } from 'lucide-react-native';
import { templateService } from '../services/templateService';
import { useFocusEffect } from '@react-navigation/native';

const categories = ['All', 'Full Body', 'Upper Body', 'Lower Body'];

export const CoachTemplatesScreen = ({ navigation }: any) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchTemplates();
    }, [activeCategory])
  );

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await templateService.getTemplates();
      if (response.success) {
        setTemplates(response.data);
      }
    } catch (error) {
      console.error('Fetch templates error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const response = await templateService.deleteTemplate(id);
      if (response.success) {
        fetchTemplates();
      }
    } catch (error) {
      console.error('Delete template error:', error);
    }
  };

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Content */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Templates</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{templates.length} Total</Text>
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
            {categories.map((cat: string) => (
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
          {loading ? (
            <Text style={styles.loadingText}>Loading templates...</Text>
          ) : filteredTemplates.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <Dumbbell size={48} color="#CBD5E1" />
              <Text style={styles.emptyStateTitle}>No templates found</Text>
              <Text style={styles.emptyStateSub}>Create your first workout template to get started</Text>
            </View>
          ) : (
            filteredTemplates.map((template) => (
              <View key={template._id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={{flex: 1}}>
                    <Text style={styles.cardTitle}>{template.name}</Text>
                    <View style={styles.cardSubtitleRow}>
                      <Text style={styles.cardSubtitleMain}>{template.category}</Text>
                      <Text style={styles.cardSubtitleDot}>•</Text>
                      <Text style={styles.cardSubtitleGray}>Modified {new Date(template.updatedAt).toLocaleDateString()}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => deleteTemplate(template._id)}>
                    <Trash2 size={16} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Dumbbell size={14} color="#3B82F6" />
                    <View style={styles.statTextCol}>
                      <Text style={styles.statLabel}>Exercises</Text>
                      <Text style={styles.statVal}>{template.exercises?.length || 0}</Text>
                    </View>
                  </View>
                  <View style={styles.statItem}>
                    <Activity size={14} color="#10B981" />
                    <View style={styles.statTextCol}>
                      <Text style={styles.statLabel}>Duration</Text>
                      <Text style={styles.statVal}>{template.duration}m</Text>
                    </View>
                  </View>
                  <View style={styles.statItem}>
                    <Users size={14} color="#64748B" />
                    <View style={styles.statTextCol}>
                      <Text style={styles.statLabel}>Used by</Text>
                      <Text style={styles.statVal}>{template.usageCount || 0}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.tagsRow}>
                  <View style={[styles.tag, {backgroundColor: '#E0E7FF'}]}>
                    <Text style={[styles.tagText, {color: '#4F46E5'}]}>{template.difficulty}</Text>
                  </View>
                  {template.tags && template.tags.map((tag: string, idx: number) => (
                    <View key={idx} style={[styles.tag, {backgroundColor: '#F1F5F9'}]}>
                      <Text style={[styles.tagText, {color: '#64748B'}]}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity 
                  style={styles.assignBtn}
                  onPress={() => navigation.navigate('AssignPlan', { templateId: template._id, templateName: template.name })}
                >
                  <Link size={16} color={Colors.white} />
                  <Text style={styles.assignBtnText}>Assign to Clients</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
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
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#64748B',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSub: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  }
});
