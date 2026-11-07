import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';

// Usuario actual fijo; se reemplazará por la sesión cuando exista el Context
export const USUARIO_ACTUAL = {
  author: 'Gerald Casas',
  username: '@GeraldCasas',
  avatar: 'GC',
};

// Los ids pueden ser número (ejemplos) o string (nanoid), se comparan como texto
const mismoId = (a, b) => String(a) === String(b);

const initialState = {
  items: [
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
  ],
};

const reportesSlice = createSlice({
  name: 'reportes',
  initialState,
  reducers: {
    agregarReporte: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ titulo, descripcion, ubicacion, categoria }) {
        return {
          payload: {
            id: nanoid(),
            creadoEn: new Date().toISOString(),
            author: USUARIO_ACTUAL.author,
            username: USUARIO_ACTUAL.username,
            avatar: USUARIO_ACTUAL.avatar,
            time: 'ahora',
            titulo,
            descripcion,
            text: descripcion ? `${titulo}\n${descripcion}` : titulo,
            location: ubicacion,
            categoria,
            comments: 0,
            reposts: 0,
            likes: 0,
            liked: false,
          },
        };
      },
    },
    alternarLike(state, action) {
      const reporte = state.items.find((r) => mismoId(r.id, action.payload));
      if (!reporte) return;
      reporte.liked = !reporte.liked;
      reporte.likes += reporte.liked ? 1 : -1;
    },
    eliminarReporte(state, action) {
      state.items = state.items.filter((r) => !mismoId(r.id, action.payload));
    },
  },
});

export const { agregarReporte, alternarLike, eliminarReporte } = reportesSlice.actions;

export const selectReportes = (state) => state.reportes.items;
export const selectReportePorId = (id) => (state) =>
  state.reportes.items.find((r) => mismoId(r.id, id));

// Memoizado para devolver el mismo arreglo mientras no cambien los reportes
const filtrarPorUsuario = createSelector(
  [selectReportes, (_state, usuario) => usuario],
  (items, usuario) => items.filter((r) => r.username === usuario)
);
export const selectReportesDe = (usuario) => (state) => filtrarPorUsuario(state, usuario);

export default reportesSlice.reducer;
