import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../theme';
import { Sparkles, Copy, Share2, Users, MessageCircle } from 'lucide-react-native';

export const CoachCodeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Background */}
        <View style={styles.headerBackground} />
        
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.topSection}>
            <View style={styles.sparkleBadge}>
              <Sparkles size={28} color={Colors.white} />
            </View>
            <Text style={styles.title}>You're All Set! 🎉</Text>
            <Text style={styles.subtitle}>Your unique coach code is ready to share with potential clients</Text>
            
            {/* Stepper */}
            <View style={styles.stepperRow}>
              <View style={styles.stepActive} />
              <View style={styles.stepActive} />
              <View style={styles.stepActive} />
              <View style={styles.stepActive} />
            </View>
            <Text style={styles.stepperText}>Setup Complete</Text>
          </View>

          <Text style={styles.sectionLabel}>YOUR UNIQUE COACH CODE</Text>

          {/* Code Card */}
          <View style={styles.codeCard}>
            <Text style={styles.codeText}>CM-9</Text>
            <Text style={styles.codeText}>921</Text>
            <View style={styles.codeDivider} />
            
            <TouchableOpacity style={styles.copyBtn}>
              <Copy size={16} color={Colors.white} style={styles.btnIcon} />
              <Text style={styles.copyBtnText}>Copy Code</Text>
            </TouchableOpacity>
          </View>

          {/* Share Link */}
          <TouchableOpacity style={styles.shareBtn}>
            <Share2 size={16} color="#0F172A" style={styles.btnIcon} />
            <Text style={styles.shareBtnText}>Share Invite Link</Text>
          </TouchableOpacity>

          {/* How It Works Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <View style={styles.infoIconWrap}><Users size={16} color="#06B6D4" /></View>
              <Text style={styles.infoCardTitle}>How It Works</Text>
            </View>
            <Text style={styles.infoCardDesc}>Share your coach code with clients. They'll enter it during signup to automatically connect with you.</Text>
            
            <View style={styles.listRow}>
              <View style={styles.numBadge}><Text style={styles.numText}>1</Text></View>
              <Text style={styles.listText}>Client downloads CoachMate app</Text>
            </View>
            <View style={styles.listRow}>
              <View style={styles.numBadge}><Text style={styles.numText}>2</Text></View>
              <Text style={styles.listText}>They enter your code during signup</Text>
            </View>
            <View style={styles.listRow}>
              <View style={styles.numBadge}><Text style={styles.numText}>3</Text></View>
              <Text style={styles.listText}>You're instantly connected!</Text>
            </View>
          </View>

          {/* Pro Tips Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <MessageCircle size={16} color="#06B6D4" style={{marginRight: 8}} />
              <Text style={styles.infoCardTitle}>Pro Tips</Text>
            </View>
            
            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.listText}>Add your code to your social media bio</Text>
            </View>
            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.listText}>Include it in email signatures</Text>
            </View>
            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.listText}>Share the invite link in group chats</Text>
            </View>
          </View>

        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.startBtn} onPress={() => navigation.navigate('CoachTabs')}>
            <Text style={styles.startBtnText}>Get Started with CoachMate</Text>
          </TouchableOpacity>
          <Text style={styles.footerNote}>You can always find your code in Settings</Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC', // slightly grey background for the cards to pop
  },
  container: {
    flex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#CCFBF1',
    opacity: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sparkleBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#06B6D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  stepperRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  stepActive: {
    width: 30,
    height: 4,
    backgroundColor: '#06B6D4',
    borderRadius: 2,
  },
  stepperText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#06B6D4',
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 16,
  },
  codeCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  codeText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#06B6D4',
    lineHeight: 52,
    letterSpacing: 2,
  },
  codeDivider: {
    width: 40,
    height: 4,
    backgroundColor: '#CCFBF1',
    borderRadius: 2,
    marginTop: 16,
    marginBottom: 24,
  },
  copyBtn: {
    flexDirection: 'row',
    backgroundColor: '#06B6D4',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnIcon: {
    marginRight: 8,
  },
  copyBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  shareBtn: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  shareBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFEFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  infoCardDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 16,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  numBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ECFEFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#06B6D4',
  },
  listText: {
    fontSize: 12,
    color: '#475569',
    flex: 1,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#06B6D4',
    marginRight: 12,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#F8FAFC',
  },
  startBtn: {
    backgroundColor: '#06B6D4',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  startBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 10,
    color: '#94A3B8',
  },
});
