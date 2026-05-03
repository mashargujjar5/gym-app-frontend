import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  SafeAreaView,
  Platform,
  Share,
} from 'react-native';
import { Colors, BorderRadius } from '../theme';
import { 
  User, 
  Lock, 
  ShieldCheck, 
  LogOut, 
  ChevronRight, 
  Copy, 
  Share2, 
  Settings2,
  FileText,
  Bell,
  CreditCard,
  UserPlus,
  CheckCircle2,
} from 'lucide-react-native';

export const CoachSettingsScreen = ({ navigation }: any) => {
  const [isLbs, setIsLbs] = useState(true);

  const onShare = async () => {
    try {
      await Share.share({
        message: 'Join my coaching on CoachMate! Use code: COACH-7X9K2',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const MenuItem = ({ icon: Icon, label, sublabel, onPress, rightElement, badge }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        <Icon size={20} color={Colors.textPrimary} />
      </View>
      <View style={styles.menuContent}>
        <View style={styles.menuLabelRow}>
          <Text style={styles.menuLabel}>{label}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.menuSublabel}>{sublabel}</Text>
      </View>
      {rightElement || <ChevronRight size={18} color={Colors.textMuted} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity 
            style={styles.inviteBtn}
            onPress={() => navigation.navigate('InviteClient')}
          >
            <Text style={styles.inviteBtnText}>Invite Clients</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop' }} 
                  style={styles.avatar} 
                />
                <View style={styles.certifiedBadge}>
                  <CheckCircle2 size={10} color={Colors.white} />
                  <Text style={styles.certifiedText}>CERTIFIED PRO</Text>
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Sarah Martinez</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>✉️ sarah.martinez@email.com</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>📞 +1 (555) 123-4567</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Active Clients</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>342</Text>
                <Text style={styles.statLabel}>Total Sessions</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Certifications</Text>
              </View>
            </View>
          </View>

          {/* Coach Code Section */}
          <View style={styles.codeCard}>
            <View style={styles.codeHeader}>
              <View>
                <Text style={styles.codeTitle}>YOUR COACH CODE</Text>
                <Text style={styles.codeSubtitle}>Share with potential clients</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('CoachCode')}>
                <Text style={styles.viewDetails}>View Details</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.codeValueContainer}>
              <Text style={styles.coachCodeText}>COACH-7X9K2</Text>
            </View>

            <View style={styles.codeActions}>
              <TouchableOpacity style={styles.codeActionBtn}>
                <Copy size={18} color={Colors.textPrimary} />
                <Text style={styles.codeActionText}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.codeActionBtn, styles.shareBtn]} onPress={onShare}>
                <Share2 size={18} color={Colors.white} />
                <Text style={[styles.codeActionText, { color: Colors.white }]}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Unit Preference */}
          <View style={styles.preferenceRow}>
            <View style={styles.prefIconContainer}>
              <Settings2 size={20} color="#3B82F6" />
            </View>
            <View style={styles.prefContent}>
              <Text style={styles.prefLabel}>Unit Preference</Text>
              <Text style={styles.prefValue}>{isLbs ? 'Pounds (LBS)' : 'Kilograms (KG)'}</Text>
            </View>
            <Switch
              value={isLbs}
              onValueChange={setIsLbs}
              trackColor={{ false: '#D1D5DB', true: '#D1D5DB' }}
              thumbColor={isLbs ? '#06B6D4' : '#F3F4F6'}
            />
          </View>

          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT</Text>
            <MenuItem 
              icon={User} 
              label="Edit Profile" 
              sublabel="Update your personal information" 
              onPress={() => navigation.navigate('EditProfile')}
            />
            <MenuItem 
              icon={Lock} 
              label="Change Password" 
              sublabel="Update your security credentials" 
              onPress={() => navigation.navigate('ChangePassword')}
            />
          </View>

          {/* Client Management Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CLIENT MANAGEMENT</Text>
            <MenuItem 
              icon={ShieldCheck} 
              label="Client Permissions" 
              sublabel="Control what clients can see and do" 
              onPress={() => navigation.navigate('ClientPermissions')}
            />
            <MenuItem 
              icon={FileText} 
              label="Template Management" 
              sublabel="Organize your workout templates" 
              badge="6 templates"
              onPress={() => navigation.navigate('CoachTemplates')}
            />
            <MenuItem 
              icon={Bell} 
              label="Notification Center" 
              sublabel="Manage alerts for client activities" 
              badge="4 new"
              onPress={() => navigation.navigate('NotificationSettings')}
            />
          </View>

          {/* Business Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>BUSINESS</Text>
            <MenuItem 
              icon={CreditCard} 
              label="Subscription & Billing" 
              sublabel="Pro Plan • $29.99/month" 
              rightElement={
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Active</Text>
                  <ChevronRight size={18} color={Colors.textMuted} />
                </View>
              }
              onPress={() => {}}
            />
          </View>

          {/* Log Out */}
          <TouchableOpacity 
            style={styles.logoutBtn}
            onPress={() => navigation.replace('Login')}
          >
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.footerVersion}>CoachMate Trainer v2.1.0</Text>
        </ScrollView>
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
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  inviteBtn: {
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  inviteBtnText: {
    color: '#06B6D4',
    fontWeight: '700',
    fontSize: 13,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileSection: {
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#F8FAFC',
  },
  certifiedBadge: {
    position: 'absolute',
    bottom: -5,
    alignSelf: 'center',
    backgroundColor: '#06B6D4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  certifiedText: {
    color: Colors.white,
    fontSize: 8,
    fontWeight: '900',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  infoRow: {
    marginBottom: 2,
  },
  infoText: {
    fontSize: 13,
    color: '#64748B',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  codeCard: {
    backgroundColor: '#FFF7F5', // Light peach/pink from image
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFE4DE',
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  codeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  codeSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  viewDetails: {
    fontSize: 12,
    color: '#06B6D4',
    fontWeight: '700',
  },
  codeValueContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0F7FA',
  },
  coachCodeText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 1,
  },
  codeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  codeActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  shareBtn: {
    backgroundColor: '#06B6D4',
  },
  codeActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 24,
  },
  prefIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefContent: {
    flex: 1,
    marginLeft: 12,
  },
  prefLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  prefValue: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 12,
  },
  menuLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  menuSublabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeBadgeText: {
    backgroundColor: '#DCFCE7',
    color: '#16A34A',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1F2',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFE4E6',
    gap: 8,
    marginTop: 8,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '800',
  },
  footerVersion: {
    textAlign: 'center',
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 24,
  }
});
