import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Colors, Typography, BorderRadius } from '../theme';
import { Card } from '../components';
import { 
  User, 
  Briefcase, 
  Award, 
  CreditCard, 
  Bell, 
  Calendar, 
  MessageCircle, 
  BookOpen, 
  Utensils, 
  PieChart, 
  Lock, 
  ShieldCheck,
  LogOut,
  ChevronRight,
  Gem
} from 'lucide-react-native';

const menuGroups = [
  {
    title: 'Business',
    items: [
      { Icon: Briefcase, label: 'Coach Profile', arrow: true },
      { Icon: Award, label: 'Certifications', arrow: true },
      { Icon: CreditCard, label: 'Pricing & Packages', arrow: true },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { Icon: Bell, label: 'Client Activity Alerts', toggle: true, defaultOn: true },
      { Icon: Calendar, label: 'Session Reminders', toggle: true, defaultOn: true },
      { Icon: MessageCircle, label: 'Message Notifications', toggle: true, defaultOn: true },
    ],
  },
  {
    title: 'Tools',
    items: [
      { Icon: BookOpen, label: 'Exercise Library', arrow: true },
      { Icon: Utensils, label: 'Nutrition Templates', arrow: true },
      { Icon: PieChart, label: 'Analytics & Reports', arrow: true },
    ],
  },
  {
    title: 'Security',
    items: [
      { Icon: Lock, label: 'Change Password', arrow: true },
      { Icon: ShieldCheck, label: 'Two-Factor Auth', toggle: true, defaultOn: false },
    ],
  },
];

export const CoachProfileScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>MD</Text>
          </View>
          <Text style={styles.profileName}>Mark Davis</Text>
          <Text style={styles.profileTitle}>Certified Personal Trainer</Text>
          <Text style={styles.profileEmail}>mark@coachmate.app</Text>

          <View style={styles.quickStats}>
            <View style={styles.quickStat}>
              <Text style={styles.quickStatVal}>24</Text>
              <Text style={styles.quickStatLabel}>Clients</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStat}>
              <Text style={styles.quickStatVal}>83%</Text>
              <Text style={styles.quickStatLabel}>Adherence</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStat}>
              <Text style={styles.quickStatVal}>4.9</Text>
              <Text style={styles.quickStatLabel}>Rating ⭐</Text>
            </View>
          </View>
        </View>

        {/* Plan Badge */}
        <View style={styles.planSection}>
          <Card style={styles.planBadge}>
            <View style={[styles.planIcon, { backgroundColor: Colors.protein + '15' }]}>
              <Gem size={24} color={Colors.protein} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.planTitle}>Coach Pro Plan</Text>
              <Text style={styles.planSub}>Up to 50 clients · Unlimited plans</Text>
            </View>
            <TouchableOpacity style={styles.manageBtn}>
              <Text style={styles.manageBtnText}>Manage</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {menuGroups.map((group) => (
          <View key={group.title} style={styles.menuGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <Card style={styles.menuCard}>
              {group.items.map((item: any, i: number) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.menuItem, i < group.items.length - 1 && styles.menuItemBorder]}
                >
                  <View style={styles.menuIconBox}>
                    <item.Icon size={18} color={Colors.textPrimary} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {item.toggle ? (
                    <Switch
                      value={item.defaultOn}
                      trackColor={{ false: Colors.cardBorder, true: Colors.primary }}
                      thumbColor={Colors.white}
                    />
                  ) : (
                    <ChevronRight size={18} color={Colors.textMuted} />
                  )}
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        ))}

        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => navigation.replace('Splash')}
        >
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.version}>CoachMate v1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background 
  },
  scroll: { 
    paddingBottom: 100 
  },
  header: { 
    paddingTop: 80, 
    paddingBottom: 40, 
    paddingHorizontal: 24, 
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  avatarLarge: { 
    width: 96, 
    height: 96, 
    borderRadius: 48, 
    backgroundColor: Colors.primary, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarText: { 
    color: Colors.white, 
    fontSize: 32, 
    fontWeight: '800' 
  },
  profileName: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: Colors.textPrimary 
  },
  profileTitle: { 
    fontSize: 14, 
    color: Colors.textSecondary, 
    marginTop: 4,
    fontWeight: '600',
  },
  profileEmail: { 
    fontSize: 13, 
    color: Colors.textMuted, 
    marginTop: 2 
  },
  quickStats: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 28, 
    backgroundColor: Colors.background, 
    borderRadius: 20, 
    paddingVertical: 16, 
    paddingHorizontal: 20, 
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  quickStat: { flex: 1, alignItems: 'center' },
  quickStatVal: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: Colors.textPrimary 
  },
  quickStatLabel: { 
    fontSize: 12, 
    color: Colors.textSecondary, 
    marginTop: 4,
    fontWeight: '600',
  },
  quickStatDivider: { 
    width: 1, 
    height: 32, 
    backgroundColor: Colors.divider 
  },
  planSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  planBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: Colors.protein + '30',
  },
  planIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planTitle: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: Colors.textPrimary 
  },
  planSub: { 
    fontSize: 12, 
    color: Colors.textMuted, 
    marginTop: 2 
  },
  manageBtn: { 
    backgroundColor: Colors.primary, 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    paddingVertical: 8 
  },
  manageBtnText: { 
    color: Colors.white, 
    fontSize: 12, 
    fontWeight: '700' 
  },
  menuGroup: { 
    paddingHorizontal: 24, 
    marginTop: 28 
  },
  groupTitle: { 
    fontSize: 12, 
    color: Colors.textMuted, 
    fontWeight: '800', 
    textTransform: 'uppercase', 
    letterSpacing: 1, 
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: { 
    padding: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 14, 
    padding: 16 
  },
  menuItemBorder: { 
    borderBottomWidth: 1, 
    borderBottomColor: Colors.divider 
  },
  menuIconBox: { 
    width: 38, 
    height: 38, 
    borderRadius: 10, 
    backgroundColor: Colors.background, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  menuLabel: { 
    flex: 1, 
    fontSize: 15, 
    color: Colors.textPrimary, 
    fontWeight: '600' 
  },
  signOutBtn: { 
    marginHorizontal: 24, 
    marginTop: 32, 
    backgroundColor: Colors.error + '10', 
    borderRadius: 16, 
    padding: 16, 
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1, 
    borderColor: Colors.error + '20' 
  },
  signOutText: { 
    color: Colors.error, 
    fontWeight: '800', 
    fontSize: 16 
  },
  version: { 
    textAlign: 'center', 
    fontSize: 12, 
    color: Colors.textMuted, 
    marginTop: 20 
  },
});
