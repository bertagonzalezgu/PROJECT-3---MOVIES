# Movies

Aplicación web SPA para gestionar preferencias cinematográficas: explora películas en tiempo real desde TMDB, guarda tus favoritas, puntúalas del 1 al 10, y consulta fichas completas de películas, actores y directores.

## Funcionalidades

- **Exploración de catálogo**: listado de películas populares con búsqueda, filtro por género y ordenación (popularidad, puntuación, fecha).
- **Fichas de detalle completas**:
  - **Película**: sinopsis, reparto, director, fecha de estreno, duración, géneros y tráiler (embed de YouTube).
  - **Actor**: biografía, foto, fecha y lugar de nacimiento, filmografía completa.
  - **Director**: mismo formato que actor, filtrando por su filmografía como director.
- **Autenticación**: registro e inicio de sesión con email/contraseña, y login social con Google (Firebase Auth).
- **Favoritos y ranking personal**: marcar/desmarcar películas como favoritas, puntuarlas del 1 al 10, editar o eliminar la puntuación, todo persistido por usuario en Firestore.
- **Navegación accesible**: rutas protegidas para el área personal, navegación completa por teclado, etiquetas ARIA, y cumplimiento de contraste WCAG AA.
- **Diseño mobile-first** con navegación adaptactiva (barra lateral en desktop, barra inferior en mobile).

## Stack técnico

| Área | Tecnología |
|---|---|
| Framework | React + TypeScript + Vite |
| Estilos | Tailwind CSS |
| Enrutado | React Router DOM v6 |
| Datos de películas | [TMDB API v3](https://developer.themoviedb.org/reference/intro/getting-started) |
| Autenticación | Firebase Authentication (email/password + Google) |
| Base de datos | Cloud Firestore |
| Peticiones HTTP | Axios |
| Testing | Vitest + React Testing Library |
| Despliegue | Vercel |

## Estructura del proyecto

```
src/
├── assets/                    # Iconos, imágenes, placeholders
├── components/                # Navbar, Footer (compartidos globales)
├── features/
│   ├── auth/
│   │   ├── components/        # RegisterForm, LoginForm
│   │   ├── context/           # AuthContext, AuthProvider, useAuth, ProtectedRoute
│   │   ├── pages/              # RegisterPage, LoginPage, ProfilePage
│   │   └── services/           # firebaseConfig.ts, authService.ts
│   ├── favorites/
│   │   ├── components/        # RatingStars
│   │   ├── pages/              # FavoritesPage
│   │   └── services/           # favoritesService.ts (Firestore)
│   └── movies/
│       ├── components/        # MovieCard, MovieGrid, SearchBar, CastList
│       ├── hooks/              # useMovieDetail, useFavorite, usePersonDetail
│       ├── pages/               # HomePage, ExplorePage, MovieDetailPage,
│       │                         ActorDetailPage, DirectorDetailPage
│       ├── services/            # tmdbAPI.ts
│       └── types/               # movies.types.ts, credits.types.ts, person.types.ts
├── routes/
│   ├── App.jsx                 # Definición de rutas
│   └── Layout.tsx               # Navbar + Outlet + Footer
├── styles/
│   └── index.css
└── main.jsx
```

## Puesta en marcha

### Requisitos previos

- Node.js 18+
- Una cuenta de [TMDB](https://www.themoviedb.org/) con API Key
- Un proyecto de [Firebase](https://console.firebase.google.com/) con **Authentication** (Email/Password y Google habilitados) y **Cloud Firestore** activados

### 1. Clonar e instalar dependencias

```bash
git clone <url-del-repositorio>
cd project-movies-app
npm install
```

### 2. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:

```env
VITE_TMDB_API_KEY=tu_api_key_de_tmdb

VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

> Todas las variables deben llevar el prefijo `VITE_` para que Vite las exponga al frontend.

### 3. Arrancar en desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`.

### 4. Ejecutar tests

```bash
npm run test
```

Incluye:
- Escenarios Gherkin (búsqueda, favoritos, puntuación) con React Testing Library.
- Tests unitarios de los servicios `tmdbAPI` y `favoritesService`.

### 5. Build de producción

```bash
npm run build
```

## Configuración de servicios externos

### TMDB

1. Crea una cuenta en [themoviedb.org](https://www.themoviedb.org/).
2. Ve a **Configuración → API** y solicita una API Key de tipo "Developer".
3. Copia la **API Key (v3 auth)** a tu `.env`.

### Firebase

1. Crea un proyecto en la [consola de Firebase](https://console.firebase.google.com/).
2. Registra una app web (`</>`) y copia la configuración a tu `.env`.
3. En **Authentication → Sign-in method**, activa los proveedores **Email/Password** y **Google**.
4. En **Firestore Database**, crea la base de datos (modo de prueba es suficiente para desarrollo).

## Modelo de datos (Firestore)

Colección `favorites`, un documento por combinación usuario/película (ID compuesto `{userId}_{movieId}`):

```json
{
  "userId": "abc123",
  "movieId": 550,
  "movieTitle": "Fight Club",
  "moviePoster": "/poster.jpg",
  "rating": 8
}
```

## Accesibilidad

El proyecto sigue las directrices **WCAG 2.1 AA**:
- Etiquetas y roles ARIA en formularios, botones de estado (`aria-pressed`, `aria-current`) y mensajes de error (`role="alert"`).
- Navegación completa por teclado en todos los elementos interactivos.
- Contraste de color verificado con [axe DevTools](https://www.deque.com/axe/devtools/).
- Estructura semántica (`<main>`, `<header>`, `<article>`) en todas las páginas.

> Nota: las incidencias de accesibilidad detectadas dentro del `<iframe>` del reproductor de YouTube (tráiler) pertenecen al contenido embebido de terceros y no al código propio de la aplicación.

## Notas de implementación

- Los favoritos guardan una copia de `movieTitle`/`moviePoster` para evitar peticiones repetidas a TMDB al listar `/favorites`.
- El tráiler incluye un enlace alternativo "Ver en YouTube" por si el `<iframe>` embebido es bloqueado por el navegador o restricciones regionales del vídeo.
- La lógica de carga de datos y gestión de favoritos está extraída en hooks propios (`useMovieDetail`, `useFavorite`, `usePersonDetail`) para mantener los componentes de página centrados en la interfaz.

## Autora

Berta González Güell

## Licencia

Proyecto académico desarrollado como parte del itinerario de especialización.
