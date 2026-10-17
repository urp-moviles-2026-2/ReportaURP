import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Placeholder from './Placeholder';

export default function DetalleReporteScreen() {
  const { id } = useRoute().params;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `Reporte #${id}`,
      headerRight: () => (
        <Pressable onPress={() => console.log('compartir', id)} hitSlop={10}>
          <Pressable style={{ marginRight: 8 }}>
          </Pressable>
        </Pressable>
      ),
    });
  }, [navigation, id]);

  return (
    <Placeholder
      title={`Reporte #${id}`}
      description="Foto, categoría, ubicación GPS y estado del reporte"
      links={[
        { label: 'Ver reporte relacionado', to: 'DetalleReporte', params: { id: id + 1 } },
      ]}
    />
  );
}