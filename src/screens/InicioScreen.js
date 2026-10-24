import { useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography, spacing, radius, common } from '../theme';

const POSTS_INICIALES = [
  {
    id: 1,
    author: 'Sofia Orbe',
    username: '@sofiaorbe',
    time: '2 h',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    text: 'Luminaria reparada en el Pabellón A. La iluminación en la tarde quedó excelente para el camino de salida.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    location: 'Campus Central URP',
    comments: 26,
    reposts: 11,
    likes: 204,
    liked: false,
  },
  {
    id: 42,
    author: 'Nicolás Barros',
    username: '@nbarros',
    verified: true,
    time: '18 min',
    avatar: 'NB',
    text: 'Reportado el proyector del Aula 301. Ya vinieron de soporte técnico a revisar el cableado HDMI.',
    comments: 18,
    reposts: 42,
    likes: 318,
    liked: false,
  },
];

export default function InicioScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState(POSTS_INICIALES);
  const [activeTab, setActiveTab] = useState('paraTi');

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const liked = !p.liked;
          return {
            ...p,
            liked,
            likes: liked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const renderPost = ({ item }) => (
    <Pressable
      style={styles.postCard}
      onPress={() => navigation.navigate('DetalleReporte', { id: item.id })}
    >
      <View style={common.row}>
        {typeof item.avatar === 'string' && item.avatar.startsWith('http') ? (
          <Image source={{ uri: item.avatar }} style={styles.avatarImg} />
        ) : (
          <View style={[common.avatarSm, { backgroundColor: '#B8E2F2' }]}>
            <Text style={{ fontWeight: '700', color: '#1B6B93', fontSize: 12 }}>{item.avatar}</Text>
          </View>
        )}

        <View style={{ marginLeft: spacing.sm, flex: 1 }}>
          <View style={common.row}>
            <Text style={typography.label}>{item.author}</Text>
            {item.verified && (
              <Ionicons name="checkmark-circle" size={15} color="#2196F3" style={{ marginLeft: 4 }} />
            )}
            <Text style={[typography.caption, { marginLeft: 6 }]}>
              {item.username} · {item.time}
            </Text>
          </View>
        </View>

        <Ionicons name="ellipsis-horizontal" size={16} color={colors.textTertiary} />
      </View>

      <Text style={[typography.body, { marginTop: spacing.sm }]}>{item.text}</Text>

      {item.image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.postImage} />
          {item.location && (
            <View style={styles.locationBadge}>
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          )}
        </View>
      )}

      {/* Botones de acción (Comentar, Repost, Like, Guardar, Compartir) */}
      <View style={[common.rowBetween, { marginTop: spacing.md, paddingHorizontal: spacing.xs }]}>
        <Pressable
          style={common.row}
          hitSlop={8}
          onPress={() => navigation.navigate('DetalleReporte', { id: item.id })}
        >
          <Ionicons name="chatbubble-outline" size={18} color={colors.textSecondary} />
          <Text style={[typography.caption, { marginLeft: 6 }]}>{item.comments}</Text>
        </Pressable>

        <Pressable style={common.row} hitSlop={8}>
          <Ionicons name="repeat-outline" size={19} color={colors.textSecondary} />
          <Text style={[typography.caption, { marginLeft: 6 }]}>{item.reposts}</Text>
        </Pressable>

        <Pressable style={common.row} hitSlop={8} onPress={() => toggleLike(item.id)}>
          <Ionicons
            name={item.liked ? 'heart' : 'heart-outline'}
            size={19}
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
          <Ionicons name="bookmark-outline" size={18} color={colors.textSecondary} />
        </Pressable>

        <Pressable hitSlop={8} onPress={() => console.log('compartir', item.id)}>
          <Ionicons name="share-outline" size={18} color={colors.textSecondary} />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={common.screen}>
      {/* Tabs superiores sutiles "Para ti" / "Siguiendo" */}
      <View style={styles.topTabs}>
        <Pressable
          style={[styles.topTabBtn, activeTab === 'paraTi' && styles.topTabBtnActive]}
          onPress={() => setActiveTab('paraTi')}
        >
          <Text
            style={[
              styles.topTabText,
              activeTab === 'paraTi' ? styles.topTabTextActive : styles.topTabTextInactive,
            ]}
          >
            Para ti
          </Text>
        </Pressable>

        <Pressable
          style={[styles.topTabBtn, activeTab === 'siguiendo' && styles.topTabBtnActive]}
          onPress={() => setActiveTab('siguiendo')}
        >
          <Text
            style={[
              styles.topTabText,
              activeTab === 'siguiendo' ? styles.topTabTextActive : styles.topTabTextInactive,
            ]}
          >
            Siguiendo
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderPost}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Botón flotante '+' en la esquina inferior derecha */}
      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('NuevoReporte')}
        hitSlop={10}
      >
        <Ionicons name="add" size={26} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topTabs: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.bgCard,
  },
  topTabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm + 4,
  },
  topTabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  topTabText: {
    fontSize: 15,
    fontWeight: '600',
  },
  topTabTextActive: {
    color: colors.textPrimary,
  },
  topTabTextInactive: {
    color: colors.textTertiary,
  },
  postCard: {
    backgroundColor: colors.bgCard,
    padding: spacing.md,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderLight,
  },
  avatarImg: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
  },
  imageContainer: {
    marginTop: spacing.sm,
    borderRadius: radius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 190,
    borderRadius: radius.md,
  },
  locationBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  locationText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
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