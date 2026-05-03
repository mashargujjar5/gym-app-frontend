import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Colors } from '../theme';
import { User, Briefcase, FileText, ChevronDown, Plus, Camera } from 'lucide-react-native';

export const CoachProfileSetupScreen = ({ navigation, route }: any) => {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');

  const isFormValid = name.length > 0 && experience.length > 0 && bio.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
        {/* Gradient-like Header (Solid cyan fading to white using layered views) */}
        <View style={styles.headerArea}>
          <View style={styles.headerBackground} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>Complete Your Coach Profile</Text>
            <Text style={styles.subtitle}>Help your clients get to know you better</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Photo */}
          <Text style={styles.label}>Profile Photo</Text>
          <View style={styles.photoRow}>
            <TouchableOpacity style={styles.photoCircle}>
              <User size={32} color="#06B6D4" />
              <View style={styles.cameraBadge}>
                <Camera size={12} color={Colors.white} />
              </View>
            </TouchableOpacity>
            <View style={styles.photoTextWrap}>
              <Text style={styles.photoTitle}>Upload a professional photo</Text>
              <Text style={styles.photoSub}>A clear photo helps build trust with clients</Text>
            </View>
          </View>

          {/* Full Name */}
          <Text style={styles.label}>Full Name *</Text>
          <View style={styles.inputBox}>
            <User size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="e.g., Sarah Martinez"
              placeholderTextColor="#94A3B8"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Years of Experience */}
          <Text style={styles.label}>Years of Experience *</Text>
          <View style={styles.inputBox}>
            <Briefcase size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="e.g., 8"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              value={experience}
              onChangeText={setExperience}
            />
          </View>

          {/* Professional Bio */}
          <Text style={styles.label}>Professional Bio *</Text>
          <View style={[styles.inputBox, styles.textAreaBox]}>
            <FileText size={18} color="#94A3B8" style={[styles.inputIcon, styles.textAreaIcon]} />
            <TextInput 
              style={[styles.input, styles.textArea]}
              placeholder="Share your experience, approach, and what makes you unique as a coach..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={bio}
              onChangeText={setBio}
              maxLength={500}
            />
          </View>
          <Text style={styles.charCount}>{bio.length}/500 characters</Text>

          {/* Specializations */}
          <Text style={styles.label}>Specializations * (Select at least 1)</Text>
          <TouchableOpacity style={styles.inputBox}>
            <Text style={[styles.input, { color: '#94A3B8' }]}>Select your specializations...</Text>
            <ChevronDown size={18} color="#94A3B8" style={styles.inputRightIcon} />
          </TouchableOpacity>

          {/* Certifications */}
          <Text style={styles.label}>Certifications (Optional)</Text>
          <TouchableOpacity style={styles.addCertBtn}>
            <Plus size={16} color="#64748B" />
            <Text style={styles.addCertText}>Add Certification</Text>
          </TouchableOpacity>

        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.continueBtn, !isFormValid && styles.continueBtnDisabled]}
            disabled={!isFormValid}
            onPress={() => navigation.navigate('CoachCode', { referralCode: route.params?.referralCode })}
          >
            <Text style={[styles.continueBtnText, !isFormValid && styles.continueBtnTextDisabled]}>
              Complete Setup & Continue
            </Text>
          </TouchableOpacity>
          <Text style={styles.footerNote}>Please fill all required fields</Text>
        </View>

      </KeyboardAvoidingView>
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
  headerArea: {
    position: 'relative',
    height: 120,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#CCFBF1',
    opacity: 0.6,
  },
  headerContent: {
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  photoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#CCFBF1',
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    position: 'relative',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    backgroundColor: '#06B6D4',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  photoTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  photoSub: {
    fontSize: 10,
    color: '#94A3B8',
  },
  photoTextWrap: {
    flex: 1,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    marginBottom: 20,
    minHeight: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  inputRightIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    paddingVertical: 14,
  },
  textAreaBox: {
    alignItems: 'flex-start',
    paddingVertical: 14,
    marginBottom: 4,
  },
  textAreaIcon: {
    marginTop: 2,
  },
  textArea: {
    minHeight: 100,
    paddingVertical: 0,
  },
  charCount: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 20,
  },
  addCertBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 14,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  addCertText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  continueBtn: {
    backgroundColor: '#06B6D4',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueBtnDisabled: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  continueBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  continueBtnTextDisabled: {
    color: '#94A3B8',
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 10,
    color: '#94A3B8',
  },
});
