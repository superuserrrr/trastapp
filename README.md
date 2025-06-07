# TrasteroApp v1.2.0 - Sincronización GitHub

## 🎯 Problema Resuelto

TrasteroApp v1.2.0 resuelve el problema de **múltiples contraseñas y datos separados entre dispositivos**. Ahora puedes acceder a tu inventario desde cualquier dispositivo con una sola contraseña y todos tus datos sincronizados automáticamente.

## ✨ Nuevas Características v1.2.0

### 🔗 Sincronización GitHub
- **Una sola contraseña** para todos los dispositivos
- **Sincronización automática** en tiempo real
- **Respaldo en la nube** usando GitHub como backend
- **Modo offline** con sincronización posterior

### 🛠️ Setup Wizard Inteligente
- Configuración guiada paso a paso
- Auto-detección del repositorio
- Migración automática de datos existentes
- Verificación de credenciales GitHub

### 🌐 Experiencia Multi-Dispositivo
- **Primera vez**: Setup completo con wizard
- **Dispositivos adicionales**: Solo ingresa tu contraseña maestra
- **Datos siempre actualizados** en todos los dispositivos
- **Indicadores de estado** de sincronización

## 🚀 Inicio Rápido

### Primer Uso (Setup Inicial)

1. **Abrir TrasteroApp v1.2.0** en tu navegador
2. **Configurar GitHub** (una sola vez):
   - Crear Personal Access Token en GitHub
   - Especificar nombre del repositorio
3. **Establecer contraseña maestra** (funciona en todos los dispositivos)
4. **Migrar datos existentes** (si los tienes) o empezar de cero

### Uso en Dispositivos Adicionales

1. **Abrir TrasteroApp v1.2.0**
2. **Ingresar contraseña maestra**
3. **¡Listo!** Todos tus datos están sincronizados

## 📋 Configuración GitHub

### Crear Personal Access Token

1. Ve a **GitHub Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Clic en **"Generate new token (classic)"**
3. Selecciona permisos: **`repo`** (Full control of private repositories)
4. Copia el token generado

### Estructura del Repositorio

```
tu-repositorio/
└── data/
    └── trastero-data.json  # Archivo principal de datos
```

### Archivo de Datos (`trastero-data.json`)

```json
{
  "version": "1.2.0",
  "passwordHash": "hash_de_contraseña_maestra",
  "lastSync": "2025-06-05T20:00:00.000Z",
  "owner": "tu_usuario_github",
  "config": {
    "repo": "nombre_repositorio",
    "created": "2025-06-05T20:00:00.000Z"
  },
  "items": [
    // array de objetos del usuario
  ]
}
```

## 🔒 Seguridad

- **Contraseñas encriptadas** con SHA-256 + salt
- **Tokens GitHub encriptados** en localStorage
- **Repositorios privados** por defecto
- **Validación de credenciales** antes de configurar

## 📱 Estados de Sincronización

### 🟢 En Línea
- Conectado a internet
- Sincronización automática activa
- Datos actualizados en tiempo real

### 🟡 Sincronizando
- Subiendo/descargando cambios
- Indicador visual pulsante
- Proceso en curso

### 🔴 Sin Conexión
- Modo offline activo
- Cambios guardados localmente
- Se sincroniza al reconectar

## 🛠️ Funcionalidades

### Gestión de Objetos
- ➕ **Agregar objetos** con nombre, ubicación, categoría y descripción
- ✏️ **Editar objetos** existentes
- 🗑️ **Eliminar objetos** con confirmación
- 🔍 **Buscar objetos** en tiempo real

### Sincronización Automática
- 🔄 **Sincronización automática** después de cada cambio
- 🔄 **Botón de sincronización manual** para forzar actualización
- 📊 **Estadísticas de sincronización** en tiempo real

### Gestión de Contraseñas
- 🔑 **Cambiar contraseña maestra** desde la aplicación
- 🔐 **Verificación de contraseña actual** antes del cambio
- 🔄 **Sincronización automática** de nuevas credenciales

### Importar/Exportar
- 📤 **Exportar datos** a JSON local
- 📥 **Importar datos** desde archivo JSON
- 🔄 **Migración automática** de datos existentes

## 📊 Estadísticas

- **Objetos Totales**: Contador en tiempo real
- **Ubicaciones Únicas**: Número de ubicaciones diferentes
- **Agregados Hoy**: Objetos añadidos en el día actual
- **Última Sincronización**: Timestamp de la última sincronización

## 🎨 Interfaz de Usuario

### Diseño Elegante
- **Gradientes modernos** con palette azul-gris
- **Animaciones suaves** y transiciones
- **Iconos SVG** vectoriales
- **Diseño responsive** para móviles y tablets

### Experiencia de Usuario
- **Setup wizard** intuitivo paso a paso
- **Mensajes contextuales** de éxito/error/warning
- **Indicadores visuales** de estado de sincronización
- **Loading screens** informativos

## 🔧 Tecnologías

- **HTML5/CSS3/JavaScript** vanilla (sin dependencias)
- **GitHub REST API v4** para sincronización
- **Web Crypto API** para encriptación
- **localStorage** para cache y configuración
- **Progressive Web App** compatible

## 🌐 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Dispositivos
- 💻 **Desktop** (Windows, macOS, Linux)
- 📱 **Móviles** (iOS, Android)
- 🖥️ **Tablets** (iPad, Android tablets)

## 📝 Flujo de Trabajo

### Primera Configuración
```
1. Abrir TrasteroApp → 2. Setup GitHub Token → 3. Contraseña Maestra → 4. Migrar Datos → 5. ¡Listo!
```

### Uso Diario
```
1. Abrir TrasteroApp → 2. Ingresar Contraseña → 3. Gestionar Objetos → 4. Sincronización Automática
```

### Nuevo Dispositivo
```
1. Abrir TrasteroApp → 2. Ingresar Contraseña Maestra → 3. Datos Sincronizados Automáticamente
```

## 🆘 Resolución de Problemas

### Token GitHub Inválido
- Verificar que el token tenga permisos `repo`
- Regenerar token si es necesario
- Usar "Reconfigurar GitHub Sync" para empezar de nuevo

### Error de Sincronización
- Verificar conexión a internet
- Comprobar que el repositorio existe
- Usar "Sincronizar" manual para reintentar

### Contraseña Olvidada
- La contraseña está almacenada en GitHub
- Usar "Reconfigurar GitHub Sync" para crear nueva configuración
- Los datos existentes se conservan en GitHub

## 🚀 Próximas Características

- 🔄 **Sincronización en segundo plano** con Service Workers
- 📸 **Fotos de objetos** con almacenamiento en GitHub
- 🏷️ **Etiquetas personalizadas** y filtros avanzados
- 📱 **Aplicación móvil nativa** con Capacitor
- 👥 **Compartir inventarios** entre usuarios

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

## 📞 Soporte

Para reportar problemas o solicitar características:
- Crear issue en el repositorio GitHub
- Documentar pasos para reproducir el problema
- Incluir información del navegador y dispositivo

---

**TrasteroApp v1.2.0** - Una sola contraseña, todos tus dispositivos sincronizados. 🎯
