import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Image } from 'react-native';
import { Colors } from '../theme';
import { Check, Dumbbell, Activity, Send, Search, ArrowUpRight } from 'lucide-react-native';

const mockSummary = [
  { id: '1', name: 'Bench Press', details: '3 sets • 12 reps', status: '+5kg PR', statusColor: '#10B981', iconBg: '#E0E7FF', Icon: Dumbbell, iconColor: '#6366F1' },
  { id: '2', name: 'HIIT Sprints', details: '5 intervals • 1:00', status: 'Steady', statusColor: '#64748B', iconBg: '#FCE7F3', Icon: Activity, iconColor: '#F43F5E' },
];

const mockChats = [
  { id: '1', name: 'Coach Mike', sub: 'Active 5m ago', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop' },
  { id: '2', name: 'Sarah J.', sub: 'Online', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
  { id: '3', name: 'Gym Group', sub: '12 members', isGroup: true },
];

export const WorkoutCompleteScreen = ({ navigation }: any) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState('2');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.checkCircle}>
            <Check size={32} color="#10B981" />
          </View>
          <Text style={styles.title}>Workout{'\n'}Complete!</Text>
          <Text style={styles.subtitle}>Great job, you crushed your session.</Text>
        </View>

        {/* Big Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>45:12</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Calories</Text>
            <Text style={styles.statValue}>342 kcal</Text>
          </View>
        </View>

        {/* Summary Section */}
        <Text style={styles.sectionTitle}>Summary</Text>
        {mockSummary.map((item) => (
          <View key={item.id} style={styles.summaryCard}>
            <View style={styles.summaryLeft}>
              <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
                <item.Icon size={20} color={item.iconColor} />
              </View>
              <View>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseDetails}>{item.details}</Text>
              </View>
            </View>
            <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
          </View>
        ))}

      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.shareBtn} onPress={() => setShowShareModal(true)}>
          <Send size={18} color={Colors.white} style={styles.btnIcon} />
          <Text style={styles.shareBtnText}>Share with Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dashBtn} onPress={() => navigation.navigate('AthleteTabs')}>
          <Text style={styles.dashBtnText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>

      {/* Share Workout Modal */}
      <Modal visible={showShareModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.dragHandle} />
            
            <Text style={styles.modalHeaderTitle}>WORKOUT PREVIEW</Text>
            
            {/* Workout Preview Card */}
            <View style={styles.previewCard}>
              <View style={styles.previewHeader}>
                <Text style={styles.previewTitle}>Upper Body Hypertrophy</Text>
                <ArrowUpRight size={20} color="#0EA5E9" />
              </View>
              <View style={styles.previewStatsRow}>
                <View style={styles.previewStat}>
                  <Text style={styles.previewStatLabel}>TOTAL VOLUME</Text>
                  <Text style={styles.previewStatValue}>5,420 kg</Text>
                </View>
                <View style={styles.previewStat}>
                  <Text style={styles.previewStatLabel}>DURATION</Text>
                  <Text style={styles.previewStatValue}>58 min</Text>
                </View>
              </View>
              <View style={styles.previewTopSet}>
                <Text style={styles.previewStatLabel}>TOP SET</Text>
                <Text style={styles.previewStatValue}>Bench Press 95kg x 8</Text>
              </View>
            </View>

            <Text style={styles.shareTitle}>Share with Friends</Text>
            
            <View style={styles.searchBox}>
              <Search size={20} color={Colors.textMuted} />
              <TextInput 
                style={styles.searchInput}
                placeholder="Search friends or groups"
                placeholderTextColor={Colors.textMuted}
              />
            </View>

            <Text style={styles.recentChatsTitle}>RECENT CHATS</Text>
            
            <ScrollView showsVerticalScrollIndicator={false} style={styles.chatList}>
              {mockChats.map((chat) => (
                <TouchableOpacity 
                  key={chat.id} 
                  style={styles.chatRow}
                  onPress={() => setSelectedChat(chat.id)}
                >
                  <View style={styles.chatLeft}>
                    {chat.isGroup ? (
                      <View style={styles.groupAvatar}>
                        <Text style={styles.groupAvatarText}>👥</Text>
                      </View>
                    ) : (
                      <Image source={{ uri: chat.img }} style={styles.avatarImg} />
                    )}
                    <View>
                      <Text style={styles.chatName}>{chat.name}</Text>
                      <Text style={styles.chatSub}>{chat.sub}</Text>
                    </View>
                  </View>
                  <View style={[styles.radioBtn, selectedChat === chat.id && styles.radioBtnSelected]}>
                    {selectedChat === chat.id && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.sendBtn} onPress={() => setShowShareModal(false)}>
              <Send size={18} color={Colors.white} style={styles.btnIcon} />
              <Text style={styles.sendBtnText}>Send Workout</Text>
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
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 160,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 12,
    color: '#64748B',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: '#FAFAFA',
  },
  shareBtn: {
    flexDirection: 'row',
    backgroundColor: '#010E1F',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  btnIcon: {
    marginRight: 8,
  },
  shareBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  dashBtn: {
    backgroundColor: Colors.white,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dashBtnText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.6)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    height: '85%',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  modalHeaderTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0EA5E9',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 16,
  },
  previewCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 32,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  previewStatsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  previewStat: {
    flex: 1,
  },
  previewStatLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
    marginBottom: 4,
  },
  previewStatValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '700',
  },
  previewTopSet: {
    marginTop: 8,
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  recentChatsTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1,
    marginBottom: 16,
  },
  chatList: {
    flex: 1,
    marginBottom: 20,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  chatLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  groupAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupAvatarText: {
    fontSize: 18,
  },
  chatName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  chatSub: {
    fontSize: 12,
    color: '#64748B',
  },
  radioBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBtnSelected: {
    borderColor: '#0EA5E9',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0EA5E9',
  },
  sendBtn: {
    flexDirection: 'row',
    backgroundColor: '#010E1F',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  sendBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
