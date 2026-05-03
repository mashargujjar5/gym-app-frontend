import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Modal, 
  TextInput,
  Platform
} from 'react-native';
import { Colors } from '../theme';
import { ChevronLeft, Share2, Plus, Mail, X, RefreshCw, Lightbulb } from 'lucide-react-native';

const pendingInvites = [
  { id: '1', email: 'sarah.johnson@email.com', sent: 'Sent 2 days ago' },
  { id: '2', email: 'mike.anderson@email.com', sent: 'Sent 4 days ago' },
  { id: '3', email: 'emily.davis@email.com', sent: 'Sent 6 days ago' },
];

export const InviteClientScreen = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.titleSection}>
            <Text style={styles.title}>Grow Your Roster</Text>
            <Text style={styles.subtitle}>Share your coach code with potential clients</Text>
          </View>

          {/* Share Link Button */}
          <TouchableOpacity style={styles.shareBtn}>
            <Share2 size={16} color={Colors.white} style={{marginRight: 8}} />
            <Text style={styles.shareBtnText}>Share Invite Link</Text>
          </TouchableOpacity>

          <Text style={styles.helperText}>
            New clients can enter this code during signup or use your personalized invite link.
          </Text>

          {/* Pending Invites Section */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Pending Invites</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.addCircleBtn} onPress={() => setModalVisible(true)}>
                <Plus size={16} color={Colors.white} />
              </TouchableOpacity>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>3</Text>
              </View>
            </View>
          </View>

          {/* Invite Cards */}
          {pendingInvites.map((invite) => (
            <View key={invite.id} style={styles.inviteCard}>
              <View style={styles.inviteCardTop}>
                <View style={styles.mailIconBox}>
                  <Mail size={16} color="#06B6D4" />
                </View>
                <View style={styles.inviteInfo}>
                  <Text style={styles.inviteEmail}>{invite.email}</Text>
                  <View style={styles.timeRow}>
                    <ClockIcon size={12} color="#94A3B8" style={{marginRight: 4}} />
                    <Text style={styles.inviteTime}>{invite.sent}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.deleteBtn}>
                  <X size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.resendBtn}>
                <RefreshCw size={14} color="#06B6D4" style={{marginRight: 8}} />
                <Text style={styles.resendBtnText}>Resend Invitation</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Pro Tip */}
          <View style={styles.proTipCard}>
            <View style={styles.lightbulbWrap}>
              <Lightbulb size={16} color="#EAB308" />
            </View>
            <Text style={styles.proTipText}>
              <Text style={{fontWeight: '800', color: '#0F172A'}}>Pro Tip: </Text>
              Add your coach code to your social media bio for easy client sign-ups.
            </Text>
          </View>

        </ScrollView>

        {/* Invite Modal */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Invite a New Client</Text>
              <Text style={styles.modalSubtitle}>
                Enter the email address of the client you want to invite.
              </Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Enter email address"
                placeholderTextColor="#94A3B8"
                value={inviteEmail}
                onChangeText={setInviteEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity style={styles.sendInviteBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.sendInviteBtnText}>Send Invite</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelTextBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

// Simple proxy for Clock icon which seems to be missing from lucide-react-native sometimes
const ClockIcon = ({ size, color, style }: any) => (
  <View style={style}>
    <Text style={{color, fontSize: size, lineHeight: size}}>⏱</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  shareBtn: {
    flexDirection: 'row',
    backgroundColor: '#06B6D4',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  shareBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  helperText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
    marginBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addCircleBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#06B6D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeText: {
    color: '#06B6D4',
    fontSize: 12,
    fontWeight: '800',
  },
  inviteCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  inviteCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mailIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFEFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  inviteInfo: {
    flex: 1,
  },
  inviteEmail: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteTime: {
    fontSize: 11,
    color: '#94A3B8',
  },
  deleteBtn: {
    padding: 8,
  },
  resendBtn: {
    flexDirection: 'row',
    backgroundColor: '#ECFEFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendBtnText: {
    color: '#06B6D4',
    fontSize: 13,
    fontWeight: '800',
  },
  proTipCard: {
    flexDirection: 'row',
    backgroundColor: '#F0FDFA',
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  lightbulbWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  proTipText: {
    flex: 1,
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 24,
  },
  sendInviteBtn: {
    width: '100%',
    backgroundColor: '#06B6D4',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  sendInviteBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  cancelTextBtn: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
});
