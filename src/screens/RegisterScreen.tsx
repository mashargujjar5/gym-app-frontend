import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Colors, Typography, BorderRadius } from '../theme';
import { Button, Input } from '../components';
import { ArrowLeft, User, Mail, Lock, Link } from 'lucide-react-native';
import { authService } from '../services/authService';
import { Alert } from 'react-native';

export const RegisterScreen = ({ navigation, route }: any) => {
  const role = route?.params?.role || 'athlete';
  const isCoach = role === 'coach';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    try {
      const response = await authService.signup({
        name,
        email,
        password,
        role,
        referredBy: role === 'athlete' ? referralCode : undefined
      });
      
      if (response.success) {
        Alert.alert('Success', 'Account created! Please verify your email.');
        navigation.navigate('OTP', { email, type: 'email-verification', role });
      }
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          {/* Back */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={24} color={Colors.textPrimary} />
          </TouchableOpacity>

          {/* Logo Area */}
          <View style={styles.logoArea}>
            <View style={styles.logoBox}>
              <Text style={styles.logoEmoji}>CM</Text>
            </View>
            <Text style={styles.welcomeText}>Create Account</Text>
            <Text style={styles.subWelcome}>Join CoachMate and start your journey.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Alex Johnson"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Min 8 characters"
                isPassword
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <Input
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Repeat your password"
                isPassword
              />
            </View>

            {role === 'athlete' && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Referral Code (Optional)</Text>
                <Input
                  value={referralCode}
                  onChangeText={setReferralCode}
                  placeholder="Enter coach's referral code"
                  autoCapitalize="characters"
                />
              </View>
            )}

            <TouchableOpacity
              style={styles.signInBtn}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.signInBtnText}>{loading ? 'Creating Account...' : 'Create Account'}</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login', { role })}>
              <Text style={styles.signUpLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backBtn: {
    paddingTop: 60,
    marginBottom: 20,
  },
  logoArea: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoBox: {
    width: 64,
    height: 64,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoEmoji: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '800',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subWelcome: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  signInBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  signInBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  signUpLink: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
});
