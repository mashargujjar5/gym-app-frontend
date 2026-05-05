import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors, BorderRadius } from '../theme';
import { 
  ArrowLeft, 
  Camera, 
  User,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react-native';
import { Input } from '../components/Input';
import { athleteService } from '../services/athleteService';
import { useAuth } from '../context/AuthContext';

const SERVER_URL = 'http://localhost:5000'; // Adjust based on environment

export const AthleteEditProfileScreen = ({ navigation }: any) => {
  const { user: authUser, checkAuth } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await athleteService.getProfile();
      if (res.success) {
        const data = res.data;
        setFullName(data.name || '');
        setEmail(data.email || '');
        setPhone(data.phoneNumber || '');
        
        if (data.dob) {
          const date = new Date(data.dob);
          setDob(date.toISOString().split('T')[0]);
        }

        if (data.profilePhoto) {
          setProfileImage(data.profilePhoto.startsWith('http') ? data.profilePhoto : `${SERVER_URL}/${data.profilePhoto}`);
        }
      }
    } catch (error: any) {
      console.error('Failed to load profile:', error);
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
      formData.append('email', email);
      formData.append('phoneNumber', phone);
      formData.append('dob', dob);

      if (profileImage && !profileImage.startsWith('http')) {
        const fileName = profileImage.split('/').pop() || 'photo.jpg';
        const fileType = fileName.split('.').pop() || 'jpeg';
        
        if (Platform.OS === 'web') {
          const response = await fetch(profileImage);
          const blob = await response.blob();
          formData.append('profilePhoto', blob, fileName);
        } else {
          formData.append('profilePhoto', {
            uri: profileImage,
            name: fileName,
            type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
          } as any);
        }
      }

      const res = await athleteService.updateProfile(formData);
      if (res.success) {
        await checkAuth(); // Update global auth state
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
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
          <View style={{ width: 40 }} /> 
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#06B6D4" />
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
              <Text style={styles.tapText}>Tap to change photo</Text>
            </View>

            {/* Form */}
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>PERSONAL INFORMATION</Text>
              
              <View style={styles.inputWrap}>
                <View style={styles.labelRow}>
                  <User size={14} color="#94A3B8" />
                  <Text style={styles.inputLabel}>Full Name</Text>
                </View>
                <Input
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter full name"
                  containerStyle={styles.fieldInput}
                />
              </View>

              <View style={styles.inputWrap}>
                <View style={styles.labelRow}>
                  <Mail size={14} color="#94A3B8" />
                  <Text style={styles.inputLabel}>Email Address</Text>
                </View>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  containerStyle={styles.fieldInput}
                />
              </View>

              <View style={styles.inputWrap}>
                <View style={styles.labelRow}>
                  <Phone size={14} color="#94A3B8" />
                  <Text style={styles.inputLabel}>Phone Number</Text>
                </View>
                <Input
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+1 (555) 123-4567"
                  keyboardType="phone-pad"
                  containerStyle={styles.fieldInput}
                />
              </View>

              <View style={styles.inputWrap}>
                <View style={styles.labelRow}>
                  <Calendar size={14} color="#94A3B8" />
                  <Text style={styles.inputLabel}>Date of Birth</Text>
                </View>
                <Input
                  value={dob}
                  onChangeText={setDob}
                  placeholder="YYYY-MM-DD"
                  containerStyle={styles.fieldInput}
                />
              </View>
            </View>
          </ScrollView>
        )}

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.saveBtn, saving && styles.btnDisabled]} 
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.saveBtnText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  photoSection: {
    alignItems: 'center',
    marginVertical: 32,
  },
  photoContainer: {
    position: 'relative',
    padding: 4,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraBtn: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    backgroundColor: '#0F172A',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#F8FAFC',
  },
  tapText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 12,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  formTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  inputWrap: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    paddingLeft: 4,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  fieldInput: {
    backgroundColor: '#F1F5F9',
    borderWidth: 0,
    borderRadius: 16,
    height: 56,
  },
  footer: {
    padding: 24,
    backgroundColor: 'transparent',
  },
  saveBtn: {
    backgroundColor: '#010E1F',
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#010E1F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  btnDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
