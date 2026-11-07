import { createContext, useContext, useMemo, useState } from 'react';

const SesionContext = createContext(null);

export function SesionProvider({ children }) {
  // usuario: { nombre, correo, usuario } o null si no hay sesión
  const [usuario, setUsuario] = useState(null);

  const value = useMemo(
    () => ({
      usuario,
      estaLogueado: usuario !== null,
      iniciarSesion: ({ nombre, correo, usuario: handle }) =>
        setUsuario({ nombre, correo, usuario: handle ?? `@${correo.split('@')[0]}` }),
      cerrarSesion: () => setUsuario(null),
    }),
    [usuario]
  );

  return <SesionContext.Provider value={value}>{children}</SesionContext.Provider>;
}

export function useSesion() {
  const contexto = useContext(SesionContext);
  if (!contexto) {
    throw new Error('useSesion debe usarse dentro de <SesionProvider>');
  }
  return contexto;
}
