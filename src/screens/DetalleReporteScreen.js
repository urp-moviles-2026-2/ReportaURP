import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography, spacing, radius, common } from '../theme';

export default function DetalleReporteScreen() {
  const route = useRoute();
  const id = route.params?.id ?? 1;
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(204);

  useEffect(() => {
    navigation.setOptions({
      title: `Reporte #${id}`,
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

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <ScrollView style={common.screen} contentContainerStyle={styles.container}>
      {/* Autor */}
      <View style={common.row}>
        <View style={[common.avatarMd, { backgroundColor: '#B8E2F2' }]}>
          <Text style={{ fontWeight: '700', color: '#1B6B93', fontSize: 16 }}>SO</Text>
        </View>
        <View style={{ marginLeft: spacing.sm, flex: 1 }}>
          <Text style={typography.label}>Sofia Orbe</Text>
          <Text style={typography.caption}>@sofiaorbe · Pabellón A · Campus Central</Text>
        </View>
        <View style={[common.badge, { backgroundColor: colors.primaryLight }]}>
          <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>
            Reporte #{id}
          </Text>
        </View>
      </View>

      {/* Descripción */}
      <Text style={[typography.body, { marginTop: spacing.md }]}>
        Se reportó una falla en las luminarias del corredor principal frente a los laboratorios. La zona quedaba oscura durante el turno noche.
      </Text>

      {/* Imagen del reporte */}
      <View style={styles.imageBox}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
          }}
          style={styles.image}
        />
        <View style={styles.locationPill}>
          <Ionicons name="location" size={13} color="#FFF" style={{ marginRight: 4 }} />
          <Text style={styles.locationText}>Costa Brava / Campus URP</Text>
        </View>
      </View>

      {/* Métricas e interacción */}
      <View style={[common.rowBetween, styles.statsRow]}>
        <Pressable style={common.row} onPress={toggleLike} hitSlop={8}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={22}
            color={liked ? '#E53935' : colors.textSecondary}
          />
          <Text style={[typography.caption, { marginLeft: 6, fontWeight: '600' }]}>
            {likesCount} likes
          </Text>
        </Pressable>

        <View style={common.row}>
          <Ionicons name="chatbubble-outline" size={20} color={colors.textSecondary} />
          <Text style={[typography.caption, { marginLeft: 6 }]}>26 comentarios</Text>
        </View>

        <Pressable hitSlop={8}>
          <Ionicons name="bookmark-outline" size={20} color={colors.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.divider} />

      {/* Botón para navegar a reporte relacionado (requisito de navegación por params de LAB-03) */}
      <Pressable
        style={styles.relatedBtn}
        onPress={() => navigation.navigate('DetalleReporte', { id: Number(id) + 1 })}
      >
        <Ionicons name="arrow-forward-circle-outline" size={20} color={colors.primary} />
        <Text style={styles.relatedBtnText}>Ver reporte siguiente (#{Number(id) + 1})</Text>
      </Pressable>
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
    height: 220,
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
  relatedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    gap: 8,
  },
  relatedBtnText: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '700',
  },
});