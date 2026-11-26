import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { authApi } from '../../api/auth.api';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';

export const LoginPage = ({ navigation }: any) => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('PasswordSuperAman123!');
  const [loading, setLoading] = useState(false);

  const loginSuccess = useAuthStore((s) => s.loginSuccess);
  const showToast = useUIStore((s) => s.showToast);

  const handleLogin = async () => {
    if (!email || !password) {
      showToast({
        type: 'error',
        title: 'Form Belum Lengkap',
        message: 'Mohon masukkan email dan kata sandi Anda.',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      if (res.success && res.data) {
        await loginSuccess(res.data, {
          user_id: 'usr_01HXYZ789A',
          name: 'Fahmi Dani',
          email,
          role: 'PRO_TRADER',
        });
        showToast({
          type: 'success',
          title: 'Login Berhasil',
          message: 'Selamat datang kembali di ForeCastFX.',
        });
      }
    } catch (e: any) {
      showToast({
        type: 'error',
        title: 'Login Gagal',
        message: e?.message || 'Kredensial tidak valid.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.brandCluster}>
            <Text style={styles.brandTitle}>ForeCastFX</Text>
            <View style={styles.brandDot} />
          </View>
          <Text style={styles.subtitle}>Institutional Macro Intelligence Terminal</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.formTitle}>Sign In</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <TextInput
              style={styles.input}
              placeholder="trader@hedgefund.com"
              placeholderTextColor={COLORS.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••••••"
              placeholderTextColor={COLORS.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Pressable
            style={({ pressed }) => [styles.loginButton, pressed && { opacity: 0.85 }]}
            onPress={handleLogin}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Sign In to Terminal"
          >
            {loading ? (
              <ActivityIndicator color={COLORS.textInverse} />
            ) : (
              <Text style={styles.loginButtonText}>Sign In to Terminal</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an institutional account?</Text>
          <Pressable
            onPress={() => navigation.navigate('Register')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="link"
            accessibilityLabel="Register Institutional Account"
          >
            <Text style={styles.registerLink}>Register Now</Text>
          </Pressable>
        </View>
      </View>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  brandCluster: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontFamily: FONTS.sans,
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  brandDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.sentimentBullish,
    marginLeft: 6,
  },
  subtitle: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 6,
  },
  card: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 16,
    padding: 24,
  },
  formTitle: {
    fontFamily: FONTS.sans,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: COLORS.surfaceSecondary,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: FONTS.sans,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  loginButton: {
    backgroundColor: COLORS.sentimentBullish,
    borderRadius: 10,
    paddingVertical: 14,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  loginButtonText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 24,
  },
  footerText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  registerLink: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.sentimentBullish,
  },
});

