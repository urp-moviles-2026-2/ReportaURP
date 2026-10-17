import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography, spacing, radius, common } from '../theme';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Botón cerrar modal */}
        <Pressable
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
          hitSlop={10}
        >
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </Pressable>

        {/* Tarjeta ilustrativa sutil superior (estilo mockup) */}
        <View style={styles.topCardContainer}>
          <View style={styles.miniCard}>
            <View style={common.row}>
              <View style={[common.avatarSm, { backgroundColor: '#F5A623', width: 28, height: 28 }]}>
                <Text style={{ fontSize: 10, color: '#FFF', fontWeight: 'bold' }}>URP</Text>
              </View>
              <View style={{ marginLeft: 8, flex: 1 }}>
                <View style={styles.skeletonLineShort} />
              </View>
            </View>
            <View style={[styles.skeletonLine, { marginTop: 8 }]} />
            <View style={[common.row, { marginTop: 8, gap: 12 }]}>
              <Ionicons name="heart" size={14} color="#E53935" />
              <Ionicons name="chatbubble-outline" size={13} color={colors.textTertiary} />
              <Ionicons name="share-outline" size={13} color={colors.textTertiary} />
            </View>
          </View>
        </View>

        {/* Título de bienvenida */}
        <Text style={styles.title}>Bienvenido.</Text>

        {/* Selector de pestañas: Iniciar sesión / Crear cuenta */}
        <View style={styles.segmentContainer}>
          <Pressable
            style={[styles.segmentBtn, tab === 'login' && styles.segmentBtnActive]}
            onPress={() => setTab('login')}
          >
            <Text
              style={[
                styles.segmentText,
                tab === 'login' ? styles.segmentTextActive : styles.segmentTextInactive,
              ]}
            >
              Iniciar sesión
            </Text>
          </Pressable>

          <Pressable
            style={[styles.segmentBtn, tab === 'register' && styles.segmentBtnActive]}
            onPress={() => setTab('register')}
          >
            <Text
              style={[
                styles.segmentText,
                tab === 'register' ? styles.segmentTextActive : styles.segmentTextInactive,
              ]}
            >
              Crear cuenta
            </Text>
          </Pressable>
        </View>

        {/* Campos de texto con íconos */}
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={18} color={colors.textTertiary} style={{ marginRight: 10 }} />
          <TextInput
            style={styles.textInput}
            placeholder="Correo institucional"
            placeholderTextColor={colors.textTertiary}
            keyboardType="email-address"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={18} color={colors.textTertiary} style={{ marginRight: 10 }} />
          <TextInput
            style={styles.textInput}
            placeholder="Contraseña"
            placeholderTextColor={colors.textTertiary}
            secureTextEntry={!showPassword}
            underlineColorAndroid="transparent"
          />
          <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color={colors.textTertiary}
            />
          </Pressable>
        </View>

        <Pressable style={{ alignSelf: 'flex-end', marginTop: 4, marginBottom: spacing.lg }}>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </Pressable>

        {/* Botón principal */}
        <Pressable
          style={styles.submitBtn}
          onPress={() => {
            console.log('Login exitoso');
            navigation.goBack();
          }}
        >
          <Text style={styles.submitBtnText}>
            {tab === 'login' ? 'Entrar a Reporta URP →' : 'Registrarme →'}
          </Text>
        </Pressable>

        {/* Separador */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerDot} />
          <View style={styles.dividerLine} />
        </View>

        {/* Botones sociales */}
        <View style={styles.socialRow}>
          <Pressable style={styles.socialCircleBtn}>
            <Ionicons name="logo-google" size={18} color="#EA4335" />
          </Pressable>
          <Pressable style={styles.socialCircleBtn}>
            <Ionicons name="logo-apple" size={18} color="#000000" />
          </Pressable>
        </View>

        <Text style={styles.termsText}>
          Al continuar aceptas los <Text style={{ textDecorationLine: 'underline' }}>términos</Text>.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgCard,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  closeBtn: {
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  topCardContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  miniCard: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  skeletonLineShort: {
    height: 8,
    width: '50%',
    backgroundColor: '#EAEAEA',
    borderRadius: 4,
  },
  skeletonLine: {
    height: 10,
    width: '90%',
    backgroundColor: '#EAEAEA',
    borderRadius: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0EFEA',
    borderRadius: radius.md,
    padding: 3,
    marginBottom: spacing.lg,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.md - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: colors.textPrimary,
  },
  segmentTextInactive: {
    color: colors.textTertiary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    marginBottom: spacing.md,
    backgroundColor: colors.bgCard,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
  },
  forgotPassword: {
    fontSize: 13,
    color: '#D9534F',
    fontWeight: '500',
  },
  submitBtn: {
    backgroundColor: '#1E1E1E',
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  dividerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginHorizontal: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  socialCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgCard,
  },
  termsText: {
    textAlign: 'center',
    fontSize: 11,
    color: colors.textTertiary,
  },
});
