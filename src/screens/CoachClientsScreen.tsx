import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Image } from 'react-native';
import { Colors } from '../theme';
import { UserPlus, Search, XCircle, CheckCircle2, Clock } from 'lucide-react-native';

const alertsData = [
  {
    id: '1',
    client: 'Jessica Lee',
    message: 'missed 2 workouts this week',
    time: '2 hours ago',
    type: 'urgent',
  },
  {
    id: '2',
    client: 'David M.',
    message: 'logged a new personal best',
    time: '5 hours ago',
    type: 'success',
  }
];

const clientsData = [
  {
    id: '1',
    name: 'Jessica Lee',
    avatarText: 'JL',
    bgColor: '#991B1B', // Dark red like the image
    time: '5 hours ago',
    workoutStatus: 'missed',
    nutritionStatus: 'done',
    nextSession: 'Tomorrow, 9:00 AM',
    badgeVal: '12',
  },
  {
    id: '2',
    name: 'Michael Torres',
    avatarText: 'MT',
    bgColor: '#1E40AF',
    time: '30 mins ago',
    workoutStatus: 'done',
    nutritionStatus: 'done',
    nextSession: 'Today, 6:00 PM',
    badgeVal: '28',
  },
  {
    id: '3',
    name: 'Sophia Chen',
    avatarText: 'SC',
    bgColor: '#115E59',
    time: '1 hour ago',
    workoutStatus: 'done',
    nutritionStatus: 'done',
    nextSession: 'Tomorrow, 10:30 AM',
    badgeVal: '45',
  },
  {
    id: '4',
    name: 'Robert Kim',
    avatarText: 'RK',
    bgColor: '#374151',
    time: '4 days ago',
    workoutStatus: 'pending',
    nutritionStatus: 'missed',
    nextSession: 'Today, 4:00 PM',
  },
  {
    id: '5',
    name: 'Emma Watson',
    avatarText: 'EW',
    bgColor: '#1E3A8A',
    time: '2 hours ago',
    workoutStatus: 'done',
    nutritionStatus: 'done',
    nextSession: 'Tomorrow, 7:00 AM',
    badgeVal: '21',
  },
];

export const CoachClientsScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Clients</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.addBtn}
              onPress={() => navigation.navigate('InviteClient')}
            >
              <UserPlus size={18} color={Colors.white} />
            </TouchableOpacity>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>8 Active</Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search size={18} color="#94A3B8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search clients..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Alerts & Updates */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Alerts & Updates</Text>
            <Text style={styles.sectionSubtitle}>2 Urgent</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.alertsScroll}>
            {alertsData.map((alert) => (
              <View 
                key={alert.id} 
                style={[
                  styles.alertCard, 
                  alert.type === 'urgent' ? styles.alertCardUrgent : styles.alertCardSuccess
                ]}
              >
                <View style={styles.alertTop}>
                  {alert.type === 'urgent' ? (
                    <XCircle size={18} color="#EF4444" style={{marginRight: 8}} />
                  ) : (
                    <CheckCircle2 size={18} color="#10B981" style={{marginRight: 8}} />
                  )}
                  <Text style={styles.alertText}>
                    <Text style={{fontWeight: '800', color: '#0F172A'}}>{alert.client}</Text> {alert.message}
                  </Text>
                </View>
                <View style={styles.alertBottom}>
                  <Text style={styles.alertTime}>{alert.time}</Text>
                  {alert.type === 'urgent' && (
                    <View style={styles.urgentTag}><Text style={styles.urgentTagText}>Urgent</Text></View>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* All Clients List */}
          <View style={[styles.sectionHeaderRow, { marginTop: 24, marginBottom: 16 }]}>
            <Text style={styles.sectionTitle}>All Clients</Text>
            <TouchableOpacity>
              <Text style={styles.sortLink}>Sort by Activity</Text>
            </TouchableOpacity>
          </View>

          {clientsData.map((client) => (
            <TouchableOpacity 
              key={client.id} 
              style={styles.clientItem}
              onPress={() => navigation.navigate('ClientDetail', { client: { ...client, initials: client.avatarText, color: client.bgColor } })}
            >
              
              {/* Avatar Box */}
              <View style={styles.avatarWrap}>
                <View style={[styles.avatar, { backgroundColor: client.bgColor }]}>
                  <Text style={styles.avatarLetter}>{client.avatarText}</Text>
                </View>
                {client.badgeVal && (
                  <View style={styles.avatarBadge}>
                    <Text style={styles.avatarBadgeText}>{client.badgeVal}</Text>
                  </View>
                )}
              </View>

              {/* Client Info */}
              <View style={styles.clientInfo}>
                <View style={styles.clientInfoTop}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <View style={styles.timeWrap}>
                    <Clock size={10} color="#94A3B8" style={{marginRight: 4}} />
                    <Text style={styles.clientTime}>{client.time}</Text>
                  </View>
                </View>

                <View style={styles.clientInfoBottom}>
                  <View style={styles.statusWrap}>
                    {client.workoutStatus === 'missed' ? <XCircle size={12} color="#EF4444" style={{marginRight:4}} /> :
                     client.workoutStatus === 'done' ? <CheckCircle2 size={12} color="#10B981" style={{marginRight:4}} /> :
                     <Clock size={12} color="#94A3B8" style={{marginRight:4}} />}
                    <Text style={styles.statusText}>Workout</Text>
                  </View>
                  <View style={styles.statusWrap}>
                    {client.nutritionStatus === 'missed' ? <XCircle size={12} color="#EF4444" style={{marginRight:4}} /> :
                     client.nutritionStatus === 'done' ? <CheckCircle2 size={12} color="#10B981" style={{marginRight:4}} /> :
                     <Clock size={12} color="#94A3B8" style={{marginRight:4}} />}
                    <Text style={styles.statusText}>Nutrition</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={styles.nextSessionText}>{client.nextSession}</Text>
                  </View>
                </View>
              </View>
              
            </TouchableOpacity>
          ))}

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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#06B6D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadge: {
    backgroundColor: '#CFFAFE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  activeBadgeText: {
    color: '#0891B2',
    fontSize: 12,
    fontWeight: '800',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },
  alertsScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  alertCard: {
    width: 280,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    backgroundColor: '#FAFAF9',
  },
  alertCardUrgent: {
    borderColor: '#FECDD3',
    backgroundColor: '#FFF1F2',
  },
  alertCardSuccess: {
    borderColor: '#D1FAE5',
    backgroundColor: '#F0FDF4',
  },
  alertTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  alertText: {
    flex: 1,
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  alertBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 26, // Align with text under icon
  },
  alertTime: {
    fontSize: 10,
    color: '#94A3B8',
    marginRight: 8,
  },
  urgentTag: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  urgentTagText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '800',
  },
  sortLink: {
    fontSize: 12,
    fontWeight: '800',
    color: '#06B6D4',
  },
  clientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  avatarWrap: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#06B6D4',
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  avatarBadgeText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '800',
  },
  clientInfo: {
    flex: 1,
  },
  clientInfoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  timeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
  clientInfoBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#64748B',
  },
  nextSessionText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#06B6D4',
  },
});
