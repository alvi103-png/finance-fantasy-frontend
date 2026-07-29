# 🎮 Finance Fantasy — Frontend

Interfaz web de finanzas personales con estética *gamer / pixel art*, pensada para que llevar el control del dinero se sienta más como jugar que como una obligación. Construida con React + Vite y estilos en SASS, con un design system propio de inspiración retro.

> Parte del proyecto **Finance Fantasy**. Consume la API REST de `finance-fantasy-backend`.

## Demo


---

## Stack

| Categoría        | Tecnología                          |
|------------------|-------------------------------------|
| Librería UI      | React 19                            |
| Build / Dev      | Vite 8                              |
| Enrutamiento     | React Router DOM 7                  |
| Estilos          | SASS |
| Iconografía      | pixelarticons · @nsmr/pixelart-react |
| Testing          | Vitest · Testing Library · jsdom    |
| Calidad de código| ESLint · Prettier                   |

---

## Enfoque de diseño

- **Design system pixel art propio** definido en `src/styles/` (variables, mixins y reset) y aplicado con SASS por componente (cada componente tiene su `.scss`).
- **Mobile-first**: la experiencia está pensada primero para móvil, con navegación inferior (`BottomNav`).
- Componentes con lenguaje visual de videojuego: barras de vida (`HealthBar`), barras de stats (`StatBar`), tarjetas de resumen, etc.

---

## Estructura de carpetas

```
finance-fantasy-frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.jsx                     # Punto de entrada de la app
│   ├── App.jsx                      # Componente raíz
│   ├── assets/                      # Imágenes (ej. crystal.png)
│   ├── components/
│   │   ├── ui/                      # Componentes base reutilizables
│   │   │   ├── Button/
│   │   │   ├── Dropdown/
│   │   │   ├── HealthBar/           # Barra de "vida" (balance) estilo videojuego
│   │   │   ├── Modal/
│   │   │   └── StatBar/
│   │   ├── layout/                  # Estructura de página
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── BottomNav/           # Navegación inferior (mobile-first)
│   │   └── finance/                 # Componentes de dominio
│   │       ├── SummaryCard/         # Tarjeta de resumen mensual
│   │       ├── TransactionItem/     # Ítem individual de transacción
│   │       └── MonthlyHistoryChart/ # Gráfico de histórico mensual
│   ├── pages/
│   │   ├── Landing/                 # Página de bienvenida
│   │   ├── Login.jsx                # Inicio de sesión
│   │   ├── Register.jsx             # Registro
│   │   ├── Dashboard/               # Resumen del mes actual
│   │   ├── Transactions/            # Listado de movimientos
│   │   ├── NewTransaction/          # Crear transacción
│   │   ├── Statistics/              # Estadísticas y gráficos
│   │   └── Profile/                 # Perfil del usuario
│   ├── routes/
│   │   ├── AppRoutes.jsx            # Definición de rutas
│   │   └── ProtectedRoute.jsx       # Guarda las rutas privadas (requiere sesión)
│   ├── hooks/
│   │   └── useMonthCursor.js        # Navegación entre meses (‹ mes ›)
│   ├── services/
│   │   └── api.js                   # Cliente HTTP + manejo del token JWT
│   ├── data/
│   │   └── categories.jsx           # Catálogo de categorías (con iconos)
│   └── styles/
│       ├── main.scss                # Punto de entrada de estilos
│       ├── _variables.scss          # Paleta y tipografía retro
│       ├── _mixins.scss
│       └── _reset.scss
├── .env.example
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Conexión con el backend

El cliente (`src/services/api.js`) construye las peticiones a partir de `VITE_API_BASE_URL` y adjunta el JWT automáticamente en cada request:

- El token se guarda en `localStorage` bajo la clave `ff_token`.
- Si existe token, se envía en el header `Authorization: Bearer <token>`.
- Las rutas privadas se protegen en el cliente con `ProtectedRoute`.

---

## Puesta en marcha

### Requisitos previos
- Node.js 18+ (recomendado 20+)
- El backend corriendo en `http://localhost:8080`

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
```
Edita `.env` con la URL de tu API:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Arrancar en modo desarrollo
```bash
npm run dev
```
La app queda disponible en `http://localhost:5173`.

### 4. Otros scripts
```bash
npm run build     # Build de producción
npm run preview   # Previsualiza el build
npm run lint      # Linter (ESLint)
npm run test      # Tests (Vitest)
```

---

## Funcionalidades

- Registro e inicio de sesión con autenticación por JWT.
- Dashboard con el balance del mes en clave de videojuego.
- CRUD completo de transacciones (crear, listar, editar, eliminar).
- Filtro de movimientos por mes y por categoría.
- Estadísticas: distribución de gastos por categoría e histórico mensual.
- Navegación mobile-first con barra inferior.

---

## 👩‍Autora

[Viviana Andrango](https://github.com/alvi103-png)