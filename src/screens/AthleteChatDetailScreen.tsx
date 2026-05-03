import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../theme';
import { ChevronLeft, MoreVertical, Plus, Send, TrendingUp, Trophy } from 'lucide-react-native';

const mockChatHistory = [
  { type: 'date', text: 'Yesterday' },
  { id: '1', sender: 'Manny', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', message: "Who's hitting the gym today?", time: '2:15 PM' },
  { id: '2', sender: 'Alex', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', message: "I'm in! Leg day 💪", time: '2:18 PM' },
  { id: '3', sender: 'Jordan', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop', message: "Chest and triceps for me 💪", time: '2:22 PM' },
  { type: 'date', text: 'Today' },
  { id: '4', sender: 'Manny', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', message: "Just hit a new PR on bench press! 140kg 🔥", time: '9:30 AM' },
  { id: '5', sender: 'Alex', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', message: "Congrats Manny! That's huge! 🎉", time: '9:35 AM' },
  { type: 'custom', component: 'leaderboard' },
];

export const AthleteChatDetailScreen = ({ navigation }: any) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <View style={styles.groupAvatar}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop' }} style={styles.headerAvatarImg} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Gym Squad 💪</Text>
            <Text style={styles.headerSub}>8 members</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.moreBtn}>
          <MoreVertical size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {mockChatHistory.map((item, index) => {
          if (item.type === 'date') {
            return (
              <View key={`date-${index}`} style={styles.datePillContainer}>
                <View style={styles.datePill}>
                  <Text style={styles.datePillText}>{item.text}</Text>
                </View>
              </View>
            );
          }

          if (item.type === 'custom' && item.component === 'leaderboard') {
            return (
              <View key={`lb-${index}`} style={styles.leaderboardCard}>
                <View style={styles.lbHeader}>
                  <View style={styles.lbHeaderLeft}>
                    <View style={styles.lbEmojiBox}><Text style={{fontSize: 20}}>💪</Text></View>
                    <View>
                      <Text style={styles.lbTitle}>🏆 LEADERBOARD</Text>
                      <Text style={styles.lbSubtitle}>Bench Press</Text>
                      <Text style={styles.lbMeta}>1RM (One Rep Max)</Text>
                    </View>
                  </View>
                  <TrendingUp size={20} color="#64748B" />
                </View>

                {/* Rank 1 */}
                <View style={[styles.lbRow, styles.lbRowGold]}>
                  <Trophy size={16} color="#EAB308" style={styles.lbRankIcon} />
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' }} style={styles.lbAvatar} />
                  <View style={styles.lbUserInfo}>
                    <View style={styles.lbNameRow}>
                      <Text style={styles.lbName}>Manny Rodriguez</Text>
                      <View style={styles.newPrBadge}><Text style={styles.newPrText}>NEW PR</Text></View>
                    </View>
                    <Text style={styles.lbTime}>2 days ago</Text>
                  </View>
                  <Text style={styles.lbScore}>140kg</Text>
                </View>

                {/* Rank 2 */}
                <View style={[styles.lbRow, styles.lbRowSilver]}>
                  <Trophy size={16} color="#94A3B8" style={styles.lbRankIcon} />
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' }} style={styles.lbAvatar} />
                  <View style={styles.lbUserInfo}>
                    <Text style={styles.lbName}>Alex Martinez</Text>
                    <Text style={styles.lbTime}>1 week ago</Text>
                  </View>
                  <Text style={styles.lbScore}>135kg</Text>
                </View>

                {/* Rank 3 */}
                <View style={[styles.lbRow, styles.lbRowBronze]}>
                  <Trophy size={16} color="#D97706" style={styles.lbRankIcon} />
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop' }} style={styles.lbAvatar} />
                  <View style={styles.lbUserInfo}>
                    <Text style={styles.lbName}>Jordan Lee</Text>
                    <Text style={styles.lbTime}>3 days ago</Text>
                  </View>
                  <Text style={styles.lbScore}>130kg</Text>
                </View>

                <TouchableOpacity style={styles.lbFooterBtn}>
                  <Text style={styles.lbFooterText}>Tap to view all 4 entries →</Text>
                </TouchableOpacity>
              </View>
            );
          }

          // Normal Message
          return (
            <View key={item.id} style={styles.messageRow}>
              <Image source={{ uri: item.avatar }} style={styles.msgAvatar} />
              <View style={styles.msgContentContainer}>
                <Text style={styles.msgSender}>{item.sender}</Text>
                <View style={styles.msgBubble}>
                  <Text style={styles.msgText}>{item.message}</Text>
                </View>
                <Text style={styles.msgTime}>{item.time}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.plusBtn}>
          <Plus size={20} color="#64748B" />
        </TouchableOpacity>
        
        <View style={styles.textInputBox}>
          <TextInput 
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#94A3B8"
          />
        </View>

        <TouchableOpacity style={styles.sendBtn}>
          <Send size={20} color="#64748B" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: 8,
    marginRight: 8,
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    overflow: 'hidden',
  },
  headerAvatarImg: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 12,
    color: '#64748B',
  },
  moreBtn: {
    padding: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  datePillContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  datePill: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  datePillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  msgAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  msgContentContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  msgSender: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
    marginLeft: 4,
  },
  msgBubble: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderTopLeftRadius: 4,
  },
  msgText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  msgTime: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
    marginLeft: 4,
  },
  
  // Leaderboard Card Styles
  leaderboardCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    width: '95%',
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  lbHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  lbHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lbEmojiBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lbTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  lbSubtitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  lbMeta: {
    fontSize: 10,
    color: '#64748B',
  },
  lbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  lbRowGold: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FEF08A',
  },
  lbRowSilver: {
    backgroundColor: Colors.white,
    borderColor: '#E2E8F0',
  },
  lbRowBronze: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  lbRankIcon: {
    marginRight: 12,
  },
  lbAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  lbUserInfo: {
    flex: 1,
  },
  lbNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  lbName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  newPrBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  newPrText: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.white,
  },
  lbTime: {
    fontSize: 10,
    color: '#64748B',
  },
  lbScore: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  lbFooterBtn: {
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 8,
  },
  lbFooterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },

  // Input Box
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: Colors.white,
  },
  plusBtn: {
    padding: 8,
  },
  textInputBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 8,
  },
  textInput: {
    fontSize: 14,
    color: '#0F172A',
    padding: 0,
  },
  sendBtn: {
    padding: 8,
  },
});
