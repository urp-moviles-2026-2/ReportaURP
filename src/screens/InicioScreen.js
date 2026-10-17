import Placeholder from './Placeholder';

export default function InicioScreen() {
  return (
    <Placeholder
      title="Inicio"
      description="Lista de reportes del campus URP"
      links={[
        { label: 'Ver reporte #1', to: 'DetalleReporte', params: { id: 1 } },
        { label: 'Ver reporte #42', to: 'DetalleReporte', params: { id: 42 } },
        { label: 'Nuevo reporte', to: 'NuevoReporte' },
      ]}
    />
  );
}