import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Colors } from '../theme';
import { ChevronLeft, MoreVertical, Plus, Send } from 'lucide-react-native';
import { messageService } from '../services/messageService';

export const AthleteChatDetailScreen = ({ navigation, route }: any) => {
  const { userId, name, avatar } = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const fetchMessages = async () => {
    try {
      const response = await messageService.getMessages(userId);
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // In a real app, you might set up a socket listener here
  }, [userId]);

  const handleSend = async () => {
    if (!inputText.trim() || sending) return;

    setSending(true);
    try {
      const response = await messageService.sendMessage(userId, inputText.trim());
      if (response.success) {
        setMessages([...messages, response.data]);
        setInputText('');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <View style={styles.avatarWrap}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.headerAvatarImg} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{name.charAt(0)}</Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.headerTitle}>{name}</Text>
            <Text style={styles.headerSub}>Active now</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.moreBtn}>
          <MoreVertical size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => {
            const isMe = msg.sender === userId ? false : true; // This is a bit simplified, usually you compare with logged in user ID
            
            return (
              <View key={msg._id} style={[styles.messageRow, isMe ? styles.messageRowMe : styles.messageRowThem]}>
                {!isMe && (
                  <View style={styles.msgAvatarWrap}>
                    {avatar ? (
                      <Image source={{ uri: avatar }} style={styles.msgAvatar} />
                    ) : (
                      <View style={styles.smallAvatarPlaceholder}>
                        <Text style={styles.smallAvatarText}>{name.charAt(0)}</Text>
                      </View>
                    )}
                  </View>
                )}
                <View style={[styles.msgContentContainer, isMe ? styles.msgContentContainerMe : styles.msgContentContainerThem]}>
                  <View style={[styles.msgBubble, isMe ? styles.msgBubbleMe : styles.msgBubbleThem]}>
                    <Text style={[styles.msgText, isMe ? styles.msgTextMe : styles.msgTextThem]}>{msg.content}</Text>
                  </View>
                  <Text style={[styles.msgTime, isMe ? styles.msgTimeMe : styles.msgTimeThem]}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}

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
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
        </View>

        <TouchableOpacity 
          style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]} 
          onPress={handleSend}
          disabled={!inputText.trim() || sending}
        >
          {sending ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Send size={20} color={inputText.trim() ? Colors.primary : "#64748B"} />
          )}
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
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
  },
  headerAvatarImg: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    flex: 1,
    backgroundColor: '#010E1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 12,
    color: '#10B981', // Green for active
  },
  moreBtn: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-end',
    maxWidth: '85%',
  },
  messageRowThem: {
    alignSelf: 'flex-start',
  },
  messageRowMe: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  msgAvatarWrap: {
    marginRight: 8,
  },
  msgAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  smallAvatarPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#010E1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallAvatarText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  msgContentContainer: {
    flex: 1,
  },
  msgContentContainerMe: {
    alignItems: 'flex-end',
  },
  msgContentContainerThem: {
    alignItems: 'flex-start',
  },
  msgBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  msgBubbleThem: {
    backgroundColor: '#F1F5F9',
    borderBottomLeftRadius: 4,
  },
  msgBubbleMe: {
    backgroundColor: '#010E1F',
    borderBottomRightRadius: 4,
  },
  msgText: {
    fontSize: 14,
    lineHeight: 20,
  },
  msgTextThem: {
    color: '#334155',
  },
  msgTextMe: {
    color: Colors.white,
  },
  msgTime: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
  },
  msgTimeMe: {
    marginRight: 4,
  },
  msgTimeThem: {
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: Colors.white,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
  },
  plusBtn: {
    padding: 8,
  },
  textInputBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  textInput: {
    fontSize: 14,
    color: '#0F172A',
    padding: 0,
    paddingTop: Platform.OS === 'ios' ? 4 : 0,
  },
  sendBtn: {
    padding: 8,
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
});

