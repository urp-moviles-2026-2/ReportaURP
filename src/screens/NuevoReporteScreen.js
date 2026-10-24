import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography, spacing, radius, common } from '../theme';

export default function NuevoReporteScreen() {
  const navigation = useNavigation();
  const [texto, setTexto] = useState('');

  const MAX_CHARS = 280;

  const handlePublicar = () => {
    if (texto.trim().length > 0) {
      console.log('Publicar reporte:', texto);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Barra superior personalizada: Cancelar a la izquierda, Publicar a la derecha */}
        <View style={styles.topHeader}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>

          <Pressable
            style={[
              styles.publishBtn,
              texto.trim().length > 0 ? styles.publishBtnActive : styles.publishBtnDisabled,
            ]}
            onPress={handlePublicar}
            disabled={texto.trim().length === 0}
          >
            <Text
              style={[
                styles.publishText,
                texto.trim().length > 0 ? styles.publishTextActive : styles.publishTextDisabled,
              ]}
            >
              Publicar
            </Text>
          </Pressable>
        </View>

        {/* Cuerpo del reporte: Avatar y TextInput sin bordes naranjas */}
        <View style={styles.body}>
          <View style={[common.row, { marginBottom: spacing.md }]}>
            <View style={[common.avatarSm, { backgroundColor: '#F7B731' }]}>
              <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 13 }}>GC</Text>
            </View>
            <View style={{ marginLeft: spacing.sm }}>
              <Text style={typography.label}>Gerald Casas</Text>
              <Text style={typography.caption}>@GeraldCasas</Text>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="¿Qué quieres reportar o compartir?"
            placeholderTextColor={colors.textTertiary}
            multiline
            value={texto}
            onChangeText={setTexto}
            maxLength={MAX_CHARS}
            autoFocus
            underlineColorAndroid="transparent"
            selectionColor={colors.primary}
          />
        </View>

        {/* Barra inferior: íconos pequeños de Galería, Cámara, Ubicación y contador */}
        <View style={styles.bottomToolbar}>
          <View style={styles.iconsRow}>
            <Pressable style={styles.smallIconBtn} hitSlop={6} onPress={() => console.log('Galería')}>
              <Ionicons name="images-outline" size={20} color={colors.primary} />
            </Pressable>
            <Pressable style={styles.smallIconBtn} hitSlop={6} onPress={() => console.log('Cámara')}>
              <Ionicons name="camera-outline" size={20} color={colors.primary} />
            </Pressable>
            <Pressable style={styles.smallIconBtn} hitSlop={6} onPress={() => console.log('Ubicación')}>
              <Ionicons name="location-outline" size={20} color={colors.primary} />
            </Pressable>
          </View>

          <Text style={[typography.caption, { color: colors.textTertiary }]}>
            {texto.length}/{MAX_CHARS}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgCard,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgCard,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  cancelText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  publishBtn: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  publishBtnDisabled: {
    backgroundColor: '#E5E5E5',
  },
  publishBtnActive: {
    backgroundColor: colors.primary,
  },
  publishText: {
    fontSize: 14,
    fontWeight: '700',
  },
  publishTextDisabled: {
    color: '#8E8E93',
  },
  publishTextActive: {
    color: '#FFFFFF',
  },
  body: {
    flex: 1,
    padding: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    color: colors.textPrimary,
    textAlignVertical: 'top',
    padding: 0,
    borderWidth: 0,
    // Elimina el outline naranja en browsers/web y no genera borde nativo
    ...Platform.select({
      web: { outlineStyle: 'none' },
    }),
  },
  bottomToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.bgCard,
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  smallIconBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});