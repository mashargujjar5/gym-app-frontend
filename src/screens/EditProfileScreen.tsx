import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { coachService } from '../services/coachService';
import { Colors, BorderRadius } from '../theme';
import { 
  ArrowLeft, 
  Camera, 
  X, 
  Plus, 
  Award,
} from 'lucide-react-native';
import { Input } from '../components/Input';

export const EditProfileScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [expertise, setExpertise] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);

  const SPECIALIZATIONS = [
    'Weight Loss',
    'Muscle Building',
    'Strength & Conditioning',
    'HIIT & Cardio',
    'Yoga & Flexibility',
    'Nutrition Coaching',
    'Sports Performance',
    'Rehabilitation',
    'Functional Training',
    'Bodybuilding',
    'Powerlifting'
  ];

  React.useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await coachService.getProfile();
      if (res.success) {
        const user = res.data;
        setFullName(user.name || '');
        setBio(user.professionalBio || '');
        setExpertise(user.specializations || []);
        setProfileImage(user.profilePhoto || null);
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('name', fullName);
      formData.append('professionalBio', bio);
      formData.append('specializations', JSON.stringify(expertise));

      if (profileImage && !profileImage.startsWith('http')) {
        const fileName = profileImage.split('/').pop() || 'photo.jpg';
        const fileType = fileName.split('.').pop() || 'jpeg';
        
        if (Platform.OS === 'web') {
          // On Web, we need to fetch the blob from the local URI
          const response = await fetch(profileImage);
          const blob = await response.blob();
          formData.append('profilePhoto', blob, fileName);
        } else {
          // On Mobile, we use the standard React Native File object
          formData.append('profilePhoto', {
            uri: profileImage,
            name: fileName,
            type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
          } as any);
        }
      }

      const res = await coachService.updateProfile(formData);
      if (res.success) {
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const addExpertise = (item: string) => {
    if (!expertise.includes(item)) {
      setExpertise([...expertise, item]);
    }
    setShowSpecModal(false);
  };

  const removeExpertise = (item: string) => {
    setExpertise(expertise.filter(e => e !== item));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <TouchableOpacity 
            style={styles.saveHeaderBtn}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text style={styles.saveHeaderBtnText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#06B6D4" />
            <Text style={styles.loadingText}>Loading Profile...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Profile Photo */}
          <View style={styles.photoSection}>
            <View style={styles.photoContainer}>
              <Image 
                source={profileImage ? { uri: profileImage } : { uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} 
                style={styles.avatar} 
              />
              <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
                <Camera size={16} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <Input
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your name"
            />

            <Input
              label="PROFESSIONAL BIO"
              multiline
              numberOfLines={5}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell clients about your experience and approach..."
              maxLength={500}
            />
            <View style={styles.charCountRow}>
              <Text style={styles.helpText}>Help clients understand your expertise</Text>
              <Text style={styles.charCount}>{bio.length}/500</Text>
            </View>

            {/* Areas of Expertise */}
            <View style={styles.expertiseSection}>
              <Text style={styles.label}>AREAS OF EXPERTISE</Text>
              <View style={styles.tagsContainer}>
                {expertise.map((item) => (
                  <View key={item} style={styles.tag}>
                    <Text style={styles.tagText}>{item}</Text>
                    <TouchableOpacity onPress={() => removeExpertise(item)}>
                      <X size={14} color="#06B6D4" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.addExpertiseBtn} onPress={() => setShowSpecModal(true)}>
                <Plus size={16} color="#0F172A" />
                <Text style={styles.addExpertiseText}>Add Expertise</Text>
              </TouchableOpacity>
            </View>

            {/* Certifications */}
            <View style={styles.certSection}>
              <View style={styles.certHeader}>
                <Text style={styles.label}>CERTIFICATIONS</Text>
                <TouchableOpacity style={styles.addNewBtn}>
                  <Plus size={14} color="#06B6D4" />
                  <Text style={styles.addNewText}>Add New</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.certCard}>
                <View style={styles.certIcon}>
                  <Award size={20} color="#06B6D4" />
                </View>
                <View style={styles.certInfo}>
                  <Text style={styles.certName}>NASM Certified Personal Trainer</Text>
                  <Text style={styles.certDate}>Issued: June 2021</Text>
                </View>
                <TouchableOpacity>
                  <X size={18} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.certCard}>
                <View style={styles.certIcon}>
                  <Award size={20} color="#06B6D4" />
                </View>
                <View style={styles.certInfo}>
                  <Text style={styles.certName}>Precision Nutrition Level 1</Text>
                  <Text style={styles.certDate}>Issued: Jan 2022</Text>
                </View>
                <TouchableOpacity>
                  <X size={18} color="#94A3B8" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.saveFullBtn}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.saveFullBtnText}>Save Profile</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
        )}

        {/* Specialization Modal */}
        <Modal
          visible={showSpecModal}
          transparent
          animationType="fade"
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowSpecModal(false)}
          >
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownTitle}>Select Specialization</Text>
              <ScrollView>
                {SPECIALIZATIONS.map(item => (
                  <TouchableOpacity 
                    key={item} 
                    style={styles.dropdownItem}
                    onPress={() => addExpertise(item)}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      expertise.includes(item) && { color: '#06B6D4', fontWeight: '700' }
                    ]}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  saveHeaderBtn: {
    backgroundColor: '#06B6D4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveHeaderBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  photoSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  photoContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#F1F5F9',
  },
  cameraBtn: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    backgroundColor: '#06B6D4',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  charCountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
    marginBottom: 24,
  },
  helpText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  charCount: {
    fontSize: 11,
    color: '#94A3B8',
  },
  expertiseSection: {
    marginBottom: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#B2EBF2',
  },
  tagText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#06B6D4',
  },
  addExpertiseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  addExpertiseText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  certSection: {
    marginBottom: 32,
  },
  certHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addNewText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#06B6D4',
  },
  certCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  certIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  certInfo: {
    flex: 1,
    marginLeft: 12,
  },
  certName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  certDate: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  saveFullBtn: {
    backgroundColor: '#06B6D4',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveFullBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdownContainer: {
    backgroundColor: Colors.white,
    width: '100%',
    maxHeight: 400,
    borderRadius: 20,
    padding: 20,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
    textAlign: 'center',
  },
  dropdownItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#475569',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#94A3B8',
    fontSize: 14,
  },
});
