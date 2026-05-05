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
import { LogIn, Mail, Lock, Apple } from 'lucide-react-native';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { Alert } from 'react-native';


export const LoginScreen = ({ navigation, route }: any) => {
  const { login } = useAuth();
  const role = route?.params?.role || 'athlete';

  const isCoach = role === 'coach';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        await login(response.user, response.token, response.refreshToken);
        
        // Redirection is now handled by AppNavigator based on user state
        // but if we need specific onboarding screens, we handle them here or in AppNavigator
        if (response.user.role === 'coach') {
          // If profile not setup, it will be handled by navigation or by user state
        } else {
          if (!response.user.isProfileComplete) {
            navigation.replace('AthleteQuestionnaire');
          }
        }
      }

    } catch (error: any) {
      if (error.isVerified === false) {
        Alert.alert('Verification Required', 'Please verify your email first.');
        navigation.navigate('OTP', { email, type: 'email-verification', role: 'athlete' }); // Default role for redirection
      } else {
        Alert.alert('Login Failed', error.message || 'Invalid credentials');
      }
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
          {/* Logo Area */}
          <View style={styles.logoArea}>
            <View style={styles.logoBox}>
              <Text style={styles.logoEmoji}>CM</Text>
            </View>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subWelcome}>Sign in and keep leveling up.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
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
                placeholder="Enter your password"
                isPassword
              />
            </View>

            <TouchableOpacity 
              style={styles.forgotBtn}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signInBtn}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.signInBtnText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity style={styles.appleBtn}>
              <Apple size={24} color={Colors.white} fill={Colors.white} />
              <Text style={styles.appleText}>Sign in with Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register', { role })}>
              <Text style={styles.signUpLink}>Sign Up</Text>
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
  logoArea: {
    alignItems: 'center',
    paddingTop: 80,
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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  signInBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signInBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.divider,
  },
  dividerText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  appleBtn: {
    backgroundColor: Colors.black,
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  appleText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
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
