import Placeholder from './Placeholder';

export default function PerfilScreen() {
  return (
    <Placeholder
      title="Perfil"
      description="Datos del estudiante y sus reportes enviados"
      links={[{ label: 'Iniciar sesión', to: 'Login' }]}
    />
  );
}