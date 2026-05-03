import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Modal, Platform, KeyboardAvoidingView } from 'react-native';
import { Colors } from '../theme';
import { ChevronLeft, Plus, Search, X, Trash2, GripVertical } from 'lucide-react-native';

const MOCK_EXERCISES = [
  { id: '1', name: 'Barbell Back Squat', tags: ['Legs', 'Compound'] },
  { id: '2', name: 'Romanian Deadlift', tags: ['Legs', 'Compound'] },
  { id: '3', name: 'Leg Press', tags: ['Legs', 'Machine'] },
  { id: '4', name: 'Walking Lunges', tags: ['Legs', 'Bodyweight'] },
  { id: '5', name: 'Leg Extension', tags: ['Legs', 'Machine'] },
  { id: '6', name: 'Leg Curl', tags: ['Legs', 'Machine'] },
  { id: '7', name: 'Bulgarian Split Squat', tags: ['Legs', 'Bodyweight'] },
  { id: '8', name: 'Calf Raises', tags: ['Legs', 'Isolation'] },
];

export const CreateTemplateScreen = ({ navigation }: any) => {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<any[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addExercise = (exercise: any) => {
    setExercises([...exercises, { ...exercise, key: Date.now().toString(), sets: '3', reps: '10', rest: '90', rpe: '7' }]);
    // Optionally close modal after picking or let user pick multiple. Let's let them pick multiple.
  };

  const removeExercise = (key: string) => {
    setExercises(exercises.filter(ex => ex.key !== key));
  };

  const filteredExercises = MOCK_EXERCISES.filter(ex => ex.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Template</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Workout Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>WORKOUT NAME</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Leg Day A, Upper Body Push"
              placeholderTextColor="#94A3B8"
              value={workoutName}
              onChangeText={setWorkoutName}
            />
          </View>

          {exercises.length === 0 ? (
            // Empty State
            <View style={styles.emptyState}>
              <View style={styles.emptyIconWrap}>
                <Plus size={32} color="#94A3B8" />
              </View>
              <Text style={styles.emptyTitle}>No exercises yet</Text>
              <Text style={styles.emptySub}>Start building your workout template{'\n'}by adding exercises</Text>
              
              <TouchableOpacity style={styles.addBtnLarge} onPress={() => setModalVisible(true)}>
                <Plus size={16} color="#06B6D4" style={{marginRight: 8}} />
                <Text style={styles.addBtnLargeText}>Add Exercise</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Added Exercises List
            <View style={styles.exerciseList}>
              <View style={styles.columnHeaders}>
                <Text style={[styles.colHeader, {flex: 1}]}>EXERCISE ({exercises.length})</Text>
                <Text style={[styles.colHeader, {width: 40, textAlign: 'center'}]}>SETS</Text>
                <Text style={[styles.colHeader, {width: 40, textAlign: 'center'}]}>REPS</Text>
                <Text style={[styles.colHeader, {width: 40, textAlign: 'center'}]}>REST</Text>
                <Text style={[styles.colHeader, {width: 40, textAlign: 'center'}]}>RPE</Text>
              </View>

              {exercises.map((ex, index) => (
                <View key={ex.key} style={styles.exerciseCard}>
                  <View style={styles.exCardHeader}>
                    <GripVertical size={16} color="#CBD5E1" />
                    <Text style={styles.exCardName}>{ex.name}</Text>
                    <TouchableOpacity onPress={() => removeExercise(ex.key)}>
                      <Trash2 size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.exInputsRow}>
                    <View style={styles.exInputBox}>
                      <Text style={styles.exInputLabel}>SETS</Text>
                      <TextInput style={styles.exInputVal} value={ex.sets} keyboardType="numeric" />
                    </View>
                    <View style={styles.exInputBox}>
                      <Text style={styles.exInputLabel}>REPS</Text>
                      <TextInput style={styles.exInputVal} value={ex.reps} keyboardType="numeric" />
                    </View>
                    <View style={styles.exInputBox}>
                      <Text style={styles.exInputLabel}>REST (s)</Text>
                      <TextInput style={styles.exInputVal} value={ex.rest} keyboardType="numeric" />
                    </View>
                    <View style={styles.exInputBox}>
                      <Text style={styles.exInputLabel}>RPE</Text>
                      <TextInput style={styles.exInputVal} value={ex.rpe} keyboardType="numeric" />
                    </View>
                  </View>
                </View>
              ))}

              <TouchableOpacity style={styles.addBtnLarge} onPress={() => setModalVisible(true)}>
                <Plus size={16} color="#06B6D4" style={{marginRight: 8}} />
                <Text style={styles.addBtnLargeText}>Add Exercise</Text>
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.saveBtn, (!workoutName || exercises.length === 0) && styles.saveBtnDisabled]}
            disabled={!workoutName || exercises.length === 0}
          >
            <Text style={[styles.saveBtnText, (!workoutName || exercises.length === 0) && styles.saveBtnTextDisabled]}>Save Template</Text>
          </TouchableOpacity>
        </View>

        {/* Select Exercise Modal */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Exercise</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                  <X size={24} color="#0F172A" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalSearchBox}>
                <Search size={20} color="#94A3B8" />
                <TextInput
                  style={styles.modalSearchInput}
                  placeholder="Search exercises..."
                  placeholderTextColor="#94A3B8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
                {filteredExercises.map(ex => (
                  <View key={ex.id} style={styles.modalListItem}>
                    <View style={styles.modalListItemText}>
                      <Text style={styles.modalListTitle}>{ex.name}</Text>
                      <View style={styles.modalListTags}>
                        <Text style={[styles.modalTag, {color: '#06B6D4'}]}>{ex.tags[0]}</Text>
                        <Text style={styles.modalTag}>{ex.tags[1]}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.modalAddBtn} onPress={() => addExercise(ex)}>
                      <Plus size={20} color="#06B6D4" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#F8FAFC',
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 40,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#0F172A',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIconWrap: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  addBtnLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CFFAFE',
    paddingVertical: 16,
    borderRadius: 16,
    width: '100%',
  },
  addBtnLargeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#06B6D4',
  },
  columnHeaders: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  colHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  exerciseList: {
    gap: 16,
  },
  exerciseCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 16,
  },
  exCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  exCardName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginLeft: 8,
  },
  exInputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  exInputBox: {
    flex: 1,
    alignItems: 'center',
  },
  exInputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 6,
  },
  exInputVal: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  footer: {
    flexDirection: 'row',
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 32 : 24,
    backgroundColor: '#F8FAFC',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: '#F1F5F9',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.white,
  },
  saveBtnTextDisabled: {
    color: '#94A3B8',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
  },
  modalSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  modalSearchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#0F172A',
  },
  modalList: {
    flex: 1,
  },
  modalListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalListItemText: {
    flex: 1,
  },
  modalListTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  modalListTags: {
    flexDirection: 'row',
    gap: 8,
  },
  modalTag: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  modalAddBtn: {
    padding: 8,
  }
});
