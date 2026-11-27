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
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore, useThemeColors } from '../../store/useUIStore';

export const LoginPage = ({ navigation }: any) => {
  const colors = useThemeColors();
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('PasswordSuperAman123!');
  const [loading, setLoading] = useState(false);

  const loginSuccess = useAuthStore((s) => s.loginSuccess);
  const showToast = useUIStore((s) => s.showToast);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showToast({
        type: 'error',
        title: 'Incomplete Form',
        message: 'Please enter both your email address and password.',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login({ email: email.trim(), password });
      if (res.success && res.data) {
        await loginSuccess(res.data, {
          user_id: 'usr_01HXYZ789A',
          name: 'Fahmi Dani',
          email: email.trim(),
          role: 'PRO_TRADER',
        });
        showToast({
          type: 'success',
          title: 'Signed In',
          message: 'Welcome back to ForeCastFX.',
        });
      }
    } catch (e: any) {
      showToast({
        type: 'error',
        title: 'Sign In Failed',
        message: e?.message || 'Invalid credentials.',
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
            <Text style={[styles.kicker, { color: colors.textMuted }]}>US MACRO INTELLIGENCE</Text>
            <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>ForeCastFX</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Macroeconomic briefings, Z-score signals, and intermarket charts
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
            <Text style={[styles.formTitle, { color: colors.textPrimary }]}>Sign In</Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textMuted }]}>EMAIL ADDRESS</Text>
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
                accessibilityLabel="Email address"
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
                placeholder="Enter your password"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                accessibilityLabel="Password"
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                { backgroundColor: colors.accentNavy },
                pressed && { opacity: 0.88 },
              ]}
              onPress={handleLogin}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Sign In to ForeCastFX"
            >
              {loading ? (
                <ActivityIndicator color={colors.textInverse} />
              ) : (
                <Text style={[styles.loginButtonText, { color: colors.textInverse }]}>
                  Sign In to Terminal
                </Text>
              )}
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Need an account?
            </Text>
            <Pressable
              style={styles.linkTouch}
              onPress={() => navigation.navigate('Register')}
              accessibilityRole="link"
              accessibilityLabel="Create an account"
            >
              <Text style={[styles.registerLink, { color: colors.sentimentBullish }]}>
                Create Account
              </Text>
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
    fontSize: 32,
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
  formTitle: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
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
  loginButton: {
    borderRadius: 4,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonText: {
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
  registerLink: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
  },
});
