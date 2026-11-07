import { useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography, spacing, radius, common } from '../theme';
import { reporteSchema, reporteVacio, CATEGORIAS } from '../schemas/reporteSchema';
import { agregarReporte } from '../store/reportesSlice';
import FormField from '../components/FormField';
import ChipSelectField from '../components/ChipSelectField';

export default function NuevoReporteScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const descripcionRef = useRef(null);
  const ubicacionRef = useRef(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(reporteSchema),
    defaultValues: reporteVacio,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const descripcion = watch('descripcion');

  const onSubmit = (datos) => {
    console.log('Publicar reporte:', datos);
    dispatch(agregarReporte(datos));
    Alert.alert('Reporte enviado', 'Tu reporte se registró correctamente.');
    reset();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
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
              isSubmitting ? styles.publishBtnDisabled : styles.publishBtnActive,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text
              style={[
                styles.publishText,
                isSubmitting ? styles.publishTextDisabled : styles.publishTextActive,
              ]}
            >
              Publicar
            </Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[common.row, { marginBottom: spacing.md }]}>
            <View style={[common.avatarSm, { backgroundColor: '#F7B731' }]}>
              <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 13 }}>GC</Text>
            </View>
            <View style={{ marginLeft: spacing.sm }}>
              <Text style={typography.label}>Gerald Casas</Text>
              <Text style={typography.caption}>@GeraldCasas</Text>
            </View>
          </View>

          <FormField
            control={control}
            name="titulo"
            label="Título"
            placeholder="¿Qué quieres reportar?"
            maxLength={60}
            autoFocus
            returnKeyType="next"
            onSubmitEditing={() => descripcionRef.current?.focus()}
          />

          <FormField
            ref={descripcionRef}
            control={control}
            name="descripcion"
            label="Descripción"
            placeholder="Cuéntanos más detalles (opcional)"
            multiline
            maxLength={300}
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => ubicacionRef.current?.focus()}
          />

          <FormField
            ref={ubicacionRef}
            control={control}
            name="ubicacion"
            label="Ubicación"
            placeholder="Ej. Pabellón B, segundo piso"
            returnKeyType="done"
          />

          <ChipSelectField control={control} name="categoria" label="Categoría" options={CATEGORIAS} />
        </ScrollView>

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
            {descripcion.length}/300
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
  },
  bodyContent: {
    padding: spacing.md,
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