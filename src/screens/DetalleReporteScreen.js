import { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography, spacing, radius, common } from '../theme';
import {
  USUARIO_ACTUAL,
  selectReportePorId,
  alternarLike,
  eliminarReporte,
} from '../store/reportesSlice';

const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

export default function DetalleReporteScreen() {
  const route = useRoute();
  const id = route.params?.id;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const reporte = useSelector(selectReportePorId(id));

  useEffect(() => {
    navigation.setOptions({
      title: 'Reporte',
      headerRight: () => (
        <Pressable
          onPress={() => console.log('compartir reporte', id)}
          hitSlop={10}
          style={{ marginRight: 8 }}
        >
          <Ionicons name="share-outline" size={22} color={colors.textPrimary} />
        </Pressable>
      ),
    });
  }, [navigation, id]);

  if (!reporte) {
    return (
      <View style={[common.centered, styles.container]}>
        <Text style={typography.body}>Este reporte ya no existe</Text>
      </View>
    );
  }

  const esMio = reporte.username === USUARIO_ACTUAL.username;
  const avatarEsUrl = typeof reporte.avatar === 'string' && reporte.avatar.startsWith('http');

  // Se vuelve primero para no mostrar el aviso de "ya no existe" al borrar
  const handleEliminar = () => {
    navigation.goBack();
    dispatch(eliminarReporte(reporte.id));
  };

  return (
    <ScrollView style={common.screen} contentContainerStyle={styles.container}>
      {/* Autor */}
      <View style={common.row}>
        {avatarEsUrl ? (
          <Image source={{ uri: reporte.avatar }} style={styles.avatarImg} />
        ) : (
          <View style={[common.avatarMd, { backgroundColor: '#B8E2F2' }]}>
            <Text style={{ fontWeight: '700', color: '#1B6B93', fontSize: 16 }}>
              {reporte.avatar}
            </Text>
          </View>
        )}
        <View style={{ marginLeft: spacing.sm, flex: 1 }}>
          <Text style={typography.label}>{reporte.author}</Text>
          <Text style={typography.caption}>
            {reporte.username} · {reporte.time}
          </Text>
        </View>
        {reporte.categoria ? (
          <View style={[common.badge, { backgroundColor: colors.primaryLight }]}>
            <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>
              {capitalizar(reporte.categoria)}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Texto del reporte */}
      <Text style={[typography.body, { marginTop: spacing.md }]}>{reporte.text}</Text>

      {/* Imagen con la ubicación encima; sin imagen, la ubicación va en una línea */}
      {reporte.image ? (
        <View style={styles.imageBox}>
          <Image
            source={{ uri: reporte.image }}
            style={[styles.image, { height: Math.min(width, height) * 0.6 }]}
          />
          {reporte.location ? (
            <View style={styles.locationPill}>
              <Ionicons name="location" size={13} color="#FFF" style={{ marginRight: 4 }} />
              <Text style={styles.locationText}>{reporte.location}</Text>
            </View>
          ) : null}
        </View>
      ) : reporte.location ? (
        <View style={[common.row, styles.locationLine]}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={typography.bodySmall}>{reporte.location}</Text>
        </View>
      ) : null}

      {/* Métricas e interacción */}
      <View style={[common.rowBetween, styles.statsRow]}>
        <Pressable
          style={common.row}
          onPress={() => dispatch(alternarLike(reporte.id))}
          hitSlop={8}
        >
          <Ionicons
            name={reporte.liked ? 'heart' : 'heart-outline'}
            size={22}
            color={reporte.liked ? '#E53935' : colors.textSecondary}
          />
          <Text style={[typography.caption, { marginLeft: 6, fontWeight: '600' }]}>
            {reporte.likes} likes
          </Text>
        </Pressable>

        <View style={common.row}>
          <Ionicons name="chatbubble-outline" size={20} color={colors.textSecondary} />
          <Text style={[typography.caption, { marginLeft: 6 }]}>
            {reporte.comments} comentarios
          </Text>
        </View>

        <Pressable hitSlop={8}>
          <Ionicons name="bookmark-outline" size={20} color={colors.textSecondary} />
        </Pressable>
      </View>

      {esMio ? (
        <>
          <View style={styles.divider} />
          <Pressable style={styles.deleteBtn} onPress={handleEliminar}>
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
            <Text style={styles.deleteBtnText}>Eliminar</Text>
          </Pressable>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.bgCard,
  },
  imageBox: {
    marginTop: spacing.md,
    borderRadius: radius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    borderRadius: radius.md,
  },
  locationPill: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.sm,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.md,
  },
  locationLine: {
    marginTop: spacing.md,
    gap: 4,
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.danger,
    gap: 8,
  },
  deleteBtnText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '700',
  },
});
