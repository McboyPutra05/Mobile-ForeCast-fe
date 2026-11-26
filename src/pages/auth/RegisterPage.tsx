import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { authApi } from '../../api/auth.api';
import { useUIStore } from '../../store/useUIStore';

export const RegisterPage = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const showToast = useUIStore((s) => s.showToast);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      showToast({
        type: 'error',
        title: 'Form Belum Lengkap',
        message: 'Mohon isi nama, email, dan password Anda.',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.register({ name, email, password });
      if (res.success) {
        showToast({
          type: 'success',
          title: 'Registrasi Berhasil',
          message: 'Akun Anda berhasil dibuat. Silakan login.',
        });
        navigation.navigate('Login');
      }
    } catch (e: any) {
      showToast({
        type: 'error',
        title: 'Registrasi Gagal',
        message: e?.message || 'Gagal mendaftarkan akun.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.brandTitle}>Create Account</Text>
          <Text style={styles.subtitle}>Join ForeCastFX Macro Analytics Network</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>FULL NAME</Text>
            <TextInput
              style={styles.input}
              placeholder="Fahmi Dani"
              placeholderTextColor={COLORS.textMuted}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>WORK EMAIL</Text>
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
              placeholder="Minimum 8 characters"
              placeholderTextColor={COLORS.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Pressable
            style={({ pressed }) => [styles.submitButton, pressed && { opacity: 0.85 }]}
            onPress={handleRegister}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Complete Registration"
          >
            {loading ? (
              <ActivityIndicator color={COLORS.textInverse} />
            ) : (
              <Text style={styles.submitButtonText}>Complete Registration</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="link"
            accessibilityLabel="Sign In"
          >
            <Text style={styles.loginLink}>Sign In</Text>
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
    marginBottom: 28,
  },
  brandTitle: {
    fontFamily: FONTS.sans,
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
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
  submitButton: {
    backgroundColor: COLORS.sentimentBullish,
    borderRadius: 10,
    paddingVertical: 14,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  submitButtonText: {
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
  loginLink: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.sentimentBullish,
  },
});

