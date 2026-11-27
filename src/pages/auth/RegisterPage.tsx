import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { FONTS } from '../../constants/typography';
import { authApi } from '../../api/auth.api';
import { useUIStore, useThemeColors } from '../../store/useUIStore';

export const RegisterPage = ({ navigation }: any) => {
  const colors = useThemeColors();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const showToast = useUIStore((s) => s.showToast);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      showToast({
        type: 'error',
        title: 'Incomplete Form',
        message: 'Please enter your name, email address, and password.',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      if (res.success) {
        showToast({
          type: 'success',
          title: 'Account Created',
          message: 'Your account has been created. Sign in to continue.',
        });
        navigation.navigate('Login');
      }
    } catch (e: any) {
      showToast({
        type: 'error',
        title: 'Registration Failed',
        message: e?.message || 'Unable to register account.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeScreenWrapper edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.kicker, { color: colors.textMuted }]}>FORECASTFX ACCESS</Text>
            <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Register to access macro briefings and Z-score release alerts
            </Text>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surfaceCard,
                borderColor: colors.borderSubtle,
              },
            ]}
          >
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textMuted }]}>FULL NAME</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.bgApp,
                    borderColor: colors.borderSubtle,
                    color: colors.textPrimary,
                  },
                ]}
                placeholder="Your Name"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
                accessibilityLabel="Full name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textMuted }]}>WORK EMAIL</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.bgApp,
                    borderColor: colors.borderSubtle,
                    color: colors.textPrimary,
                  },
                ]}
                placeholder="email@example.com"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                accessibilityLabel="Work email"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textMuted }]}>PASSWORD</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.bgApp,
                    borderColor: colors.borderSubtle,
                    color: colors.textPrimary,
                  },
                ]}
                placeholder="Minimum 8 characters"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                accessibilityLabel="Password"
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.submitButton,
                { backgroundColor: colors.accentNavy },
                pressed && { opacity: 0.88 },
              ]}
              onPress={handleRegister}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Complete Registration"
            >
              {loading ? (
                <ActivityIndicator color={colors.textInverse} />
              ) : (
                <Text style={[styles.submitButtonText, { color: colors.textInverse }]}>
                  Complete Registration
                </Text>
              )}
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Already have an account?
            </Text>
            <Pressable
              style={styles.linkTouch}
              onPress={() => navigation.navigate('Login')}
              accessibilityRole="link"
              accessibilityLabel="Sign In"
            >
              <Text style={[styles.loginLink, { color: colors.sentimentBullish }]}>Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
    gap: 4,
  },
  kicker: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.0,
  },
  brandTitle: {
    fontFamily: FONTS.serif,
    fontSize: 30,
    fontWeight: '700',
  },
  subtitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 18,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    minHeight: 46,
    fontFamily: FONTS.sans,
    fontSize: 14,
  },
  submitButton: {
    borderRadius: 4,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
  },
  footerText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
  },
  linkTouch: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  loginLink: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
  },
});
