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
} from 'react-native';
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
  const [fullName, setFullName] = useState('Sarah Martinez');
  const [bio, setBio] = useState('Certified personal trainer with 5+ years of experience in strength training and nutrition. I help busy professionals achieve their fitness goals through sustainable habits.');
  const [expertise, setExpertise] = useState(['Weight Loss', 'Strength Training', 'Nutrition']);

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
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.saveHeaderBtnText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Profile Photo */}
          <View style={styles.photoSection}>
            <View style={styles.photoContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop' }} 
                style={styles.avatar} 
              />
              <TouchableOpacity style={styles.cameraBtn}>
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

            <View style={styles.bioContainer}>
              <Text style={styles.label}>PROFESSIONAL BIO</Text>
              <View style={styles.textAreaContainer}>
                <Input
                  multiline
                  numberOfLines={5}
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Tell clients about your experience and approach..."
                  style={styles.textArea}
                  maxLength={500}
                />
              </View>
              <View style={styles.charCountRow}>
                <Text style={styles.helpText}>Help clients understand your expertise</Text>
                <Text style={styles.charCount}>{bio.length}/500</Text>
              </View>
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
              <TouchableOpacity style={styles.addExpertiseBtn}>
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
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.saveFullBtnText}>Save Profile</Text>
          </TouchableOpacity>
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
  bioContainer: {
    marginBottom: 24,
  },
  textAreaContainer: {
    // Custom handling for multiline input if needed
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  charCountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
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
});
