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
  Target, 
  Ruler, 
  Bell, 
  Moon, 
  Activity, 
  MessageCircle, 
  Calendar, 
  HelpCircle, 
  Star, 
  Shield, 
  LogOut,
  ChevronRight,
  Heart
} from 'lucide-react-native';

const menuGroups = [
  {
    title: 'Account',
    items: [
      { Icon: User, label: 'Edit Profile', arrow: true },
      { Icon: Target, label: 'My Goals', arrow: true },
      { Icon: Ruler, label: 'Units & Measurements', arrow: true },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { Icon: Bell, label: 'Notifications', toggle: true, defaultOn: true },
      { Icon: Moon, label: 'Dark Mode', toggle: true, defaultOn: false },
      { Icon: Heart, label: 'Apple Health Sync', toggle: true, defaultOn: false },
    ],
  },
  {
    title: 'Coach',
    items: [
      { Icon: MessageCircle, label: 'Message Coach', arrow: true },
      { Icon: Calendar, label: 'Schedule Session', arrow: true },
    ],
  },
  {
    title: 'Support',
    items: [
      { Icon: HelpCircle, label: 'Help Center', arrow: true },
      { Icon: Star, label: 'Rate the App', arrow: true },
      { Icon: Shield, label: 'Privacy Policy', arrow: true },
    ],
  },
];

export const AthleteProfileScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>AJ</Text>
          </View>
          <Text style={styles.profileName}>Alex Johnson</Text>
          <Text style={styles.profileEmail}>alex@example.com</Text>
          
          <View style={styles.coachBadge}>
            <User size={14} color={Colors.primary} />
            <Text style={styles.coachText}>Coach: Mark Davis</Text>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.quickStat}>
              <Text style={styles.quickStatVal}>48</Text>
              <Text style={styles.quickStatLabel}>Workouts</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStat}>
              <Text style={styles.quickStatVal}>12</Text>
              <Text style={styles.quickStatLabel}>Streak 🔥</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStat}>
              <Text style={styles.quickStatVal}>-6 lbs</Text>
              <Text style={styles.quickStatLabel}>Progress</Text>
            </View>
          </View>
        </View>

        {/* Plan Section */}
        <View style={styles.planSection}>
          <Card style={styles.planCard}>
            <View style={[styles.planIcon, { backgroundColor: Colors.primary + '10' }]}>
              <Star size={24} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.planTitle}>Premium Pro Athlete</Text>
              <Text style={styles.planSub}>Next renewal: June 1, 2026</Text>
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
                  onPress={() => {
                    if (item.label === 'Message Coach') {
                      navigation.navigate('AthleteMessages');
                    }
                  }}
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
    marginBottom: 16 
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
  profileEmail: { 
    fontSize: 14, 
    color: Colors.textSecondary, 
    marginTop: 4,
    fontWeight: '600',
  },
  coachBadge: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12, 
    backgroundColor: Colors.primary + '10', 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    paddingVertical: 6 
  },
  coachText: { 
    color: Colors.primary, 
    fontSize: 12, 
    fontWeight: '700' 
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
  planCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: Colors.primary + '20',
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
