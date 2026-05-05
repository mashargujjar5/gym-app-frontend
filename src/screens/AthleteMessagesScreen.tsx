import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { Colors } from '../theme';
import { Search } from 'lucide-react-native';
import { messageService } from '../services/messageService';

export const AthleteMessagesScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'coach' | 'friends'>('coach');
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredConversations = conversations.filter(conv => {
    // For athlete, "coach" tab shows users with role 'coach'
    // "friends" tab could show others if the backend supported it, but currently it's mostly coach
    const matchesTab = activeTab === 'coach' ? conv.user.role === 'coach' : conv.user.role !== 'coach';
    const matchesSearch = conv.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        
        {/* Segmented Control */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'coach' && styles.tabActive]}
            onPress={() => setActiveTab('coach')}
          >
            <Text style={[styles.tabText, activeTab === 'coach' && styles.tabTextActive]}>Coach</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'friends' && styles.tabActive]}
            onPress={() => setActiveTab('friends')}
          >
            <Text style={[styles.tabText, activeTab === 'friends' && styles.tabTextActive]}>Friends</Text>
          </TouchableOpacity>
        </View>
 
        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={18} color={Colors.textMuted} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

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
              <Text style={styles.emptyText}>No messages yet</Text>
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
                <View style={styles.avatarContainer}>
                  {conv.user.profilePhoto ? (
                    <Image source={{ uri: conv.user.profilePhoto }} style={styles.avatar} />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarText}>{conv.user.name.charAt(0)}</Text>
                    </View>
                  )}
                  {conv.user.lastActiveAt && (new Date().getTime() - new Date(conv.user.lastActiveAt).getTime() < 5 * 60 * 1000) && (
                    <View style={styles.onlineDot} />
                  )}
                </View>
                
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
                    <Text style={styles.messageText} numberOfLines={2}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0F172A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
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
  messageRow: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  messageRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  avatarContainer: {
    marginRight: 16,
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  avatarPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#010E1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
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
    alignItems: 'flex-start',
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    paddingRight: 16,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#010E1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  unreadText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
});

