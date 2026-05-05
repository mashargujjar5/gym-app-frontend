import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Platform, Image } from 'react-native';
import { Colors } from '../theme';
import { ChevronLeft, Search, Calendar, CheckCircle2, Circle, AlertCircle } from 'lucide-react-native';
import { coachService } from '../services/coachService';
import { templateService } from '../services/templateService';

export const AssignPlanScreen = ({ navigation, route }: any) => {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  
  const templateId = route.params?.templateId;
  const templateName = route.params?.templateName || 'Template';

  React.useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await coachService.getCoachAthletes();
      if (response.success) {
        setClients(response.data);
      }
    } catch (error) {
      console.error('Fetch clients error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!templateId || selectedClients.length === 0) return;
    
    try {
      setAssigning(true);
      const startDate = new Date().toISOString(); // Simple start date, could add a picker
      const response = await templateService.assignTemplate(templateId, selectedClients, startDate);
      if (response.success) {
        navigation.navigate('CoachTabs', { screen: 'CoachTemplates' });
      }
    } catch (error) {
      console.error('Assign template error:', error);
    } finally {
      setAssigning(false);
    }
  };

  const toggleClient = (id: string) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter(clientId => clientId !== id));
    } else {
      setSelectedClients([...selectedClients, id]);
    }
  };

  const selectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map(c => c._id));
    }
  };

  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>Assign Template</Text>
            <Text style={styles.headerSubtitle}>{templateName}</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Search Bar */}
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

          {/* Start Date */}
          <View style={styles.dateSection}>
            <Text style={styles.label}>START DATE</Text>
            <TouchableOpacity style={styles.datePicker}>
              <Calendar size={18} color="#0F172A" />
              <Text style={styles.dateText}>13/3/26</Text>
            </TouchableOpacity>
          </View>

          {/* Select All Button */}
          <TouchableOpacity style={styles.selectAllBtn} onPress={selectAll}>
            <Text style={styles.selectAllText}>
              {selectedClients.length === clients.length ? 'Deselect All' : 'Select All'}
            </Text>
          </TouchableOpacity>

          {/* Client List */}
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>SELECT CLIENTS ({selectedClients.length} SELECTED)</Text>
          </View>

          {loading ? (
            <Text style={styles.loadingText}>Loading clients...</Text>
          ) : filteredClients.length === 0 ? (
            <View style={styles.emptyContainer}>
              <AlertCircle size={40} color="#CBD5E1" />
              <Text style={styles.emptyTextTitle}>No clients found</Text>
            </View>
          ) : (
            filteredClients.map((client) => {
              const isSelected = selectedClients.includes(client._id);
              return (
                <TouchableOpacity 
                  key={client._id} 
                  style={[styles.clientItem, isSelected && styles.clientItemActive]}
                  onPress={() => toggleClient(client._id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.selectionIcon}>
                    {isSelected ? (
                      <CheckCircle2 size={24} color="#0F172A" fill="#0F172A" />
                    ) : (
                      <Circle size={24} color="#E2E8F0" />
                    )}
                  </View>

                  {client.profilePhoto ? (
                    <Image source={{ uri: client.profilePhoto }} style={styles.avatar} />
                  ) : (
                    <View style={[styles.avatar, { backgroundColor: '#3B82F6' }]}>
                      <Text style={styles.avatarText}>{getInitials(client.name)}</Text>
                    </View>
                  )}

                  <View style={styles.clientInfo}>
                    <Text style={styles.clientName}>{client.name}</Text>
                    <View style={styles.clientSubRow}>
                      <Text style={[styles.clientStatus, { color: client.status === 'active' ? '#10B981' : '#64748B' }]}>
                        {client.status}
                      </Text>
                      <Text style={styles.dot}>•</Text>
                      <Text style={styles.clientJoined}>Joined {new Date(client.createdAt).toLocaleDateString()}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}

        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.assignBtn, (selectedClients.length === 0 || assigning) && styles.assignBtnDisabled]} 
            onPress={handleAssign}
            disabled={selectedClients.length === 0 || assigning}
          >
            <CheckCircle2 size={18} color={Colors.white} style={{marginRight: 8}} />
            <Text style={styles.assignBtnText}>
              {assigning ? 'Assigning...' : `Assign to ${selectedClients.length} Client${selectedClients.length !== 1 ? 's' : ''}`}
            </Text>
          </TouchableOpacity>
        </View>

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitleBox: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
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
  dateSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 8,
    letterSpacing: 1,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  selectAllBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  listHeader: {
    marginBottom: 16,
  },
  listHeaderText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1,
  },
  clientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  clientItemActive: {
    borderColor: '#0F172A',
  },
  selectionIcon: {
    marginRight: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  clientSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  dot: {
    fontSize: 12,
    color: '#94A3B8',
    marginHorizontal: 6,
  },
  clientJoined: {
    fontSize: 12,
    color: '#64748B',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 24,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  assignBtn: {
    flex: 2,
    backgroundColor: '#06B6D4',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  assignBtnDisabled: {
    opacity: 0.5,
  },
  assignBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.white,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#64748B',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyTextTitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 12,
  }
});
