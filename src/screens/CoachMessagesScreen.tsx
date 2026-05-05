import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, SafeAreaView, Modal, Platform, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { Colors } from '../theme';
import { Search, Sparkles } from 'lucide-react-native';
import { messageService } from '../services/messageService';

export const CoachMessagesScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [isBroadcastVisible, setBroadcastVisible] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const pollingRef = React.useRef<any>(null);


  const fetchConversations = async () => {
    try {
      const response = await messageService.getConversations();
      if (response.success) {
        setConversations(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    
    // Poll for new messages every 10 seconds
    pollingRef.current = setInterval(fetchConversations, 10000);
    
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);


  const onRefresh = () => {
    setRefreshing(true);
    fetchConversations();
  };

  const handleBroadcast = async () => {
    if (!broadcastMessage.trim() || isBroadcasting) return;

    setIsBroadcasting(true);
    try {
      const response = await messageService.broadcastMessage(broadcastMessage.trim());
      if (response.success) {
        Alert.alert('Success', response.message);
        setBroadcastVisible(false);
        setBroadcastMessage('');
        fetchConversations(); // Refresh to see new messages in threads
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send broadcast message');
    } finally {
      setIsBroadcasting(false);
    }
  };

  const filteredConversations = conversations.filter(conv => 
    conv.user.name.toLowerCase().includes(search.toLowerCase())
  );

  const unreadTotal = conversations.reduce((acc, conv) => acc + (conv.unreadCount || 0), 0);

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

        {unreadTotal > 0 && (
          <Text style={styles.unreadSummary}>{unreadTotal} unread messages from clients</Text>
        )}

        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
            }
          >
            {filteredConversations.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No clients found</Text>
              </View>
            ) : (
              filteredConversations.map((conv, index) => (
                <TouchableOpacity 
                  key={conv.user._id} 
                  style={[styles.messageRow, index !== filteredConversations.length - 1 && styles.messageRowBorder]}
                  onPress={() => navigation.navigate('AthleteChatDetail', { 
                    userId: conv.user._id,
                    name: conv.user.name,
                    avatar: conv.user.profilePhoto
                  })}
                >
                  {conv.user.profilePhoto ? (
                    <Image source={{ uri: conv.user.profilePhoto }} style={styles.avatar} />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarText}>{conv.user.name.charAt(0)}</Text>
                    </View>
                  )}
                  
                  <View style={styles.messageContent}>
                    <View style={styles.messageHeader}>
                      <Text style={styles.name}>{conv.user.name}</Text>
                      {conv.lastMessage && (
                        <Text style={styles.time}>
                          {new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                      )}
                    </View>
                    <View style={styles.messageFooter}>
                      <Text style={styles.messageText} numberOfLines={1}>
                        {conv.lastMessage ? conv.lastMessage.content : "No messages yet"}
                      </Text>
                      {conv.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadText}>{conv.unreadCount}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        )}

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
              <Text style={styles.modalSubtitle}>Send a message to all your active clients at once</Text>
              
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
                  style={[styles.modalSendBtn, (!broadcastMessage.trim() || isBroadcasting) && styles.modalSendBtnDisabled]}
                  onPress={handleBroadcast}
                  disabled={!broadcastMessage.trim() || isBroadcasting}
                >
                  {isBroadcasting ? (
                    <ActivityIndicator size="small" color={Colors.white} />
                  ) : (
                    <Text style={styles.modalSendText}>Send to All</Text>
                  )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    paddingTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 16,
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
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#010E1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
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

