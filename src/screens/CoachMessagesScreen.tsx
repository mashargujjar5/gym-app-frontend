import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, SafeAreaView, Modal, Platform } from 'react-native';
import { Colors } from '../theme';
import { Search, Sparkles, X } from 'lucide-react-native';

const mockMessages = [
  {
    id: '1',
    name: 'Jessica Lee',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    time: '2:30 PM',
    message: 'Thanks for the new workout plan! I\'m excited to start tomorrow.',
    unread: 2,
  },
  {
    id: '2',
    name: 'Michael Torres',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
    time: '1:15 PM',
    message: 'Yes, I can do the session at 6 PM today',
    unread: 1,
  },
  {
    id: '3',
    name: 'Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop',
    time: '11:45 AM',
    message: 'Perfect! I\'ll send you the progress photos tonight.',
    unread: 0,
  },
  {
    id: '4',
    name: 'Robert Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    time: 'Yesterday',
    message: 'I\'ve been feeling much better with the new nutrition plan',
    unread: 0,
  },
  {
    id: '5',
    name: 'Emma Watson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    time: 'Yesterday',
    message: 'Can we reschedule tomorrow\'s session to 8 AM?',
    unread: 4,
  },
  {
    id: '6',
    name: 'David Martinez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    time: 'Monday',
    message: 'Great session today! My squats are getting stronger 💪',
    unread: 0,
  },
  {
    id: '7',
    name: 'Olivia Brown',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
    time: 'Monday',
    message: 'Thank you for adjusting my meal plan!',
    unread: 0,
  },
];

export const CoachMessagesScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [isBroadcastVisible, setBroadcastVisible] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity 
            style={styles.broadcastBtn}
            onPress={() => setBroadcastVisible(true)}
          >
            <Sparkles size={16} color={Colors.white} style={{marginRight: 8}} />
            <Text style={styles.broadcastBtnText}>Broadcast</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={18} color="#94A3B8" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search clients..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <Text style={styles.unreadSummary}>7 unread messages from clients</Text>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {mockMessages.map((msg, index) => (
            <TouchableOpacity 
              key={msg.id} 
              style={[styles.messageRow, index !== mockMessages.length - 1 && styles.messageRowBorder]}
              onPress={() => navigation.navigate('AthleteChatDetail', { name: msg.name })}
            >
              <Image source={{ uri: msg.avatar }} style={styles.avatar} />
              
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.name}>{msg.name}</Text>
                  <Text style={styles.time}>{msg.time}</Text>
                </View>
                <View style={styles.messageFooter}>
                  <Text style={styles.messageText} numberOfLines={1}>{msg.message}</Text>
                  {msg.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{msg.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Broadcast Modal */}
        <Modal
          visible={isBroadcastVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setBroadcastVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Broadcast Message</Text>
              <Text style={styles.modalSubtitle}>Send a message to all 7 clients at once</Text>
              
              <TextInput
                style={styles.modalInput}
                placeholder="Type your message here..."
                placeholderTextColor="#94A3B8"
                multiline={true}
                value={broadcastMessage}
                onChangeText={setBroadcastMessage}
              />

              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.modalCancelBtn}
                  onPress={() => setBroadcastVisible(false)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalSendBtn, !broadcastMessage && styles.modalSendBtnDisabled]}
                  onPress={() => {
                    setBroadcastVisible(false);
                    setBroadcastMessage('');
                  }}
                  disabled={!broadcastMessage}
                >
                  <Text style={styles.modalSendText}>Send to All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  broadcastBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#06B6D4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  broadcastBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  unreadSummary: {
    color: '#06B6D4',
    fontSize: 13,
    fontWeight: '700',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  messageRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
  },
  messageRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  time: {
    fontSize: 12,
    color: '#64748B',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    color: '#64748B',
    paddingRight: 16,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#06B6D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  modalSendBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#06B6D4',
  },
  modalSendBtnDisabled: {
    opacity: 0.5,
  },
  modalSendText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
});
