import { View, Text, FlatList, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography, spacing, radius, common } from '../theme';
import { useSesion } from '../context/SesionContext';
import { USUARIO_ACTUAL, selectReportesDe, alternarLike } from '../store/reportesSlice';

export default function PerfilScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const { cerrarSesion } = useSesion();
  const reportes = useSelector(selectReportesDe(USUARIO_ACTUAL.username));

  // DetalleReporte vive dentro de InicioTab
  const abrirDetalle = (id) =>
    navigation.navigate('InicioTab', { screen: 'DetalleReporte', params: { id } });

  const renderHeader = () => (
    <View>
      {/* Banner de cabecera con color cálido degradado */}
      <View style={[styles.banner, { height: height * 0.15 + insets.top }]} />

      <View style={styles.profileBody}>
        {/* Avatar redondo */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{USUARIO_ACTUAL.avatar}</Text>
        </View>

        {/* Nombre y usuario */}
        <Text style={[typography.h2, { marginTop: spacing.sm }]}>{USUARIO_ACTUAL.author}</Text>
        <Text style={typography.caption}>{USUARIO_ACTUAL.username}</Text>

        {/* Biografía */}
        <Text style={[typography.body, { marginTop: spacing.sm, color: colors.textSecondary }]}>
          Estudiante de Ing. Informática · URP. Apoyando en la mejora continua de la infraestructura del campus.
        </Text>

        {/* Seguidores y Siguiendo */}
        <View style={[common.row, { marginTop: spacing.md, gap: spacing.lg }]}>
          <View style={common.row}>
            <Text style={[typography.label, { fontWeight: '700' }]}>284</Text>
            <Text style={[typography.caption, { marginLeft: 4 }]}>siguiendo</Text>
          </View>
          <View style={common.row}>
            <Text style={[typography.label, { fontWeight: '700' }]}>1.8K</Text>
            <Text style={[typography.caption, { marginLeft: 4 }]}>seguidores</Text>
          </View>
        </View>

        {/* Botones: Editar perfil y Compartir perfil DEBAJO de seguidores */}
        <View style={styles.buttonsRow}>
          <Pressable style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Editar perfil</Text>
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Compartir perfil</Text>
          </Pressable>
        </View>

        <Pressable style={styles.logoutBtn} onPress={cerrarSesion}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutBtnText}>Cerrar sesión</Text>
        </Pressable>
      </View>

      <View style={styles.divider} />
    </View>
  );

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.postCard}
      onPress={() => abrirDetalle(item.id)}
    >
      <View style={common.row}>
        <View style={[common.avatarSm, { backgroundColor: colors.secondary }]}>
          <Text style={{ fontWeight: '700', color: '#FFF', fontSize: 12 }}>{item.avatar}</Text>
        </View>
        <View style={{ marginLeft: spacing.sm, flex: 1 }}>
          <View style={common.row}>
            <Text style={typography.label}>{item.author}</Text>
            {item.verified && (
              <Ionicons name="checkmark-circle" size={14} color="#2196F3" style={{ marginLeft: 4 }} />
            )}
            <Text style={[typography.caption, { marginLeft: 6 }]}>
              {item.username} · {item.time}
            </Text>
          </View>
        </View>
      </View>

      <Text style={[typography.body, { marginTop: spacing.sm }]}>{item.text}</Text>

      {/* Acciones */}
      <View style={[common.rowBetween, { marginTop: spacing.md, paddingHorizontal: spacing.xs }]}>
        <Pressable
          style={common.row}
          hitSlop={8}
          onPress={() => abrirDetalle(item.id)}
        >
          <Ionicons name="chatbubble-outline" size={17} color={colors.textSecondary} />
          <Text style={[typography.caption, { marginLeft: 6 }]}>{item.comments}</Text>
        </Pressable>

        <Pressable style={common.row} hitSlop={8}>
          <Ionicons name="repeat-outline" size={18} color={colors.textSecondary} />
          <Text style={[typography.caption, { marginLeft: 6 }]}>{item.reposts}</Text>
        </Pressable>

        <Pressable style={common.row} hitSlop={8} onPress={() => dispatch(alternarLike(item.id))}>
          <Ionicons
            name={item.liked ? 'heart' : 'heart-outline'}
            size={18}
            color={item.liked ? '#E53935' : colors.textSecondary}
          />
          <Text
            style={[
              typography.caption,
              { marginLeft: 6, color: item.liked ? '#E53935' : colors.textSecondary },
            ]}
          >
            {item.likes}
          </Text>
        </Pressable>

        <Pressable hitSlop={8}>
          <Ionicons name="bookmark-outline" size={17} color={colors.textSecondary} />
        </Pressable>

        <Pressable hitSlop={8}>
          <Ionicons name="share-outline" size={17} color={colors.textSecondary} />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={common.screen}>
      <FlatList
        data={reportes}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Aún no publicaste reportes</Text>}
        contentContainerStyle={[
          styles.listContent,
          { paddingLeft: insets.left, paddingRight: insets.right },
        ]}
        ItemSeparatorComponent={() => <View style={styles.postDivider} />}
      />

      {/* Botón flotante '+' en la esquina inferior derecha */}
      <Pressable
        style={[styles.fab, { marginRight: insets.right }]}
        onPress={() => navigation.navigate('NuevoReporte')}
        hitSlop={10}
      >
        <Ionicons name="add" size={26} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#F5A623',
  },
  listContent: {
    paddingBottom: spacing.xxl * 2,
  },
  profileBody: {
    paddingHorizontal: spacing.md,
    marginTop: -38,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#F7B731',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgCard,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.danger,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginTop: spacing.sm,
  },
  postCard: {
    backgroundColor: colors.bgCard,
    padding: spacing.md,
  },
  emptyText: {
    ...typography.bodySmall,
    textAlign: 'center',
    padding: spacing.lg,
  },
  postDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderLight,
  },
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
});