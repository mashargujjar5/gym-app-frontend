import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Colors } from '../theme';
import { Button, Input } from '../components';
import { ArrowLeft } from 'lucide-react-native';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';


export const OTPScreen = ({ navigation, route }: any) => {
  const { login } = useAuth();
  const { email, type, role } = route.params;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyOTP(email, otp, type);
      if (response.success) {
        if (type === 'email-verification') {
          Alert.alert('Success', 'Email verified successfully!');
          await login(response.user, response.token, response.refreshToken);
          
          if (role === 'coach') {
            navigation.replace('CoachProfileSetup', { referralCode: response.user?.referralCode });
          } else {
            if (!response.user.isProfileComplete) {
              navigation.replace('AthleteQuestionnaire');
            }
          }
        } else {

          navigation.navigate('ResetPassword', { email, otp });
        }
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    setResending(true);
    try {
      await authService.resendOTP(email, type);
      setTimer(60);
      Alert.alert('Success', 'OTP resent successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
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
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={24} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.logoArea}>
            <View style={styles.logoBox}>
              <Text style={styles.logoEmoji}>OTP</Text>
            </View>
            <Text style={styles.welcomeText}>Verify Email</Text>
            <Text style={styles.subWelcome}>Enter the 6-digit code sent to {email}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Input
                value={otp}
                onChangeText={setOtp}
                placeholder="000000"
                keyboardType="number-pad"
                maxLength={6}
                style={styles.otpInput}
              />
            </View>

            <TouchableOpacity
              style={[styles.signInBtn, (loading || otp.length < 6) && styles.disabledBtn]}
              onPress={handleVerify}
              disabled={loading || otp.length < 6}
            >
              <Text style={styles.signInBtnText}>{loading ? 'Verifying...' : 'Verify Code'}</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Didn't receive the code? </Text>
              <TouchableOpacity onPress={handleResend} disabled={timer > 0 || resending}>
                <Text style={[styles.signUpLink, timer > 0 && { color: Colors.textMuted }]}>
                  {resending ? 'Resending...' : timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                </Text>
              </TouchableOpacity>
            </View>
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
    fontSize: 20,
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
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  otpInput: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 10,
    fontWeight: '700',
  },
  signInBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  disabledBtn: {
    opacity: 0.6,
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
