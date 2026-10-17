import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Placeholder({ title, description, links = [] }) {
  const navigation = useNavigation();
  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      <Text style={s.desc}>{description}</Text>
      {links.map((l) => (
        <Pressable
          key={l.label}
          style={s.btn}
          onPress={() => navigation.navigate(l.to, l.params)}
        >
          <Text style={s.btnText}>{l.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  desc: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
  btn: { backgroundColor: '#1B7C3F', padding: 12, borderRadius: 8, marginBottom: 8, width: '100%' },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});