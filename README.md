# TrasteroApp Standalone v1.1.0

Una aplicación HTML/CSS/JavaScript pura para gestionar objetos personales en casa **con protección por contraseña**, que funciona directamente desde el sistema de archivos sin necesidad de servidor web.

## 🚀 Características

- 🔐 **Sistema de autenticación**: Protege tus datos con contraseña personal
- **Gestión completa de objetos**: Agregar, editar ubicación y eliminar objetos
- **Búsqueda en tiempo real**: Buscar por nombre de objeto o ubicación
- **Persistencia local segura**: Los datos se guardan encriptados en localStorage
- **Diseño responsive**: Funciona en desktop, tablet y móvil
- **Sin dependencias**: Funciona con protocolo file:// directamente
- **Interfaz moderna**: Diseño minimalista con iconos SVG integrados
- 🔒 **Privacidad total**: Todos los datos permanecen en tu dispositivo

## 🔐 Funcionalidades de Seguridad (NUEVO v1.1.0)

### Sistema de Autenticación
- 🔑 **Primera configuración**: Establece tu contraseña al primer uso
- 🔒 **Login seguro**: Acceso protegido con pantalla de autenticación
- 👁️ **Visibilidad de contraseña**: Opción para mostrar/ocultar contraseña
- ⏰ **Sesión temporal**: Cierre automático tras 30 minutos de inactividad
- 🔄 **Cambio de contraseña**: Actualiza tu contraseña desde la aplicación
- 🚪 **Cierre manual**: Botón de cerrar sesión disponible siempre

### Protección de Datos
- 🔐 **Encriptación básica**: Contraseñas almacenadas con hash + salt
- 💾 **Tokens temporales**: Sesiones seguras con limpieza automática
- 🛡️ **Validación robusta**: Verificación de credenciales y longitud mínima
- 🧹 **Limpieza automática**: Eliminación de datos sensibles al cerrar sesión

## 📋 Funcionalidades

### Gestión de Objetos
- ✅ Agregar objetos con nombre y ubicación
- ✅ Editar ubicación de objetos existentes
- ✅ Eliminar objetos con confirmación
- ✅ Timestamps automáticos (creación y modificación)

### Búsqueda y Filtrado
- ✅ Búsqueda en tiempo real
- ✅ Filtrar por nombre de objeto
- ✅ Filtrar por ubicación
- ✅ Contador de resultados

### Persistencia y Estados
- ✅ Almacenamiento en localStorage
- ✅ Contadores automáticos
- ✅ Estados de carga y edición
- ✅ Confirmaciones de eliminación

## 🛠️ Instalación y Uso

### Opción 1: Archivo Único con Autenticación (Recomendado)
1. Descarga el archivo `index.html` (versión 1.1.0 con autenticación)
2. Abre el archivo directamente en tu navegador preferido
3. Configura tu contraseña en el primer acceso
4. ¡Listo! Tu aplicación está protegida y funcionando

### Opción 2: Archivos Separados con Autenticación
Si prefieres tener CSS y JavaScript en archivos separados:
1. Descarga: `index-modular.html`, `styles.css`, `script.js`
2. Mantén los archivos en la misma carpeta
3. Abre `index-modular.html` en tu navegador
4. Configura tu contraseña en el primer acceso

### Migración desde Versión Anterior
- Los usuarios existentes: Al actualizar se solicitará configurar contraseña
- Datos existentes: Se mantienen todos los objetos guardados anteriormente
- Compatibilidad: Funciona con todos los navegadores modernos

## 🎨 Diseño

- **Colores**: Esquema azul/gris con acentos visuales
- **Tipografía**: Inter font stack con fallbacks del sistema
- **Iconos**: SVG inline para máxima compatibilidad
- **Animaciones**: Transiciones suaves y feedback visual
- **Responsive**: Diseño adaptativo para todos los dispositivos

## 📱 Compatibilidad

- ✅ Chrome/Chromium (Recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Funciona con protocolo `file://`
- ✅ No requiere servidor web
- ✅ Compatible con dispositivos móviles

## 💾 Almacenamiento de Datos

Los datos se almacenan localmente en el navegador usando `localStorage`:
- **Objetos**: `trastero_items` - JSON array de objetos
- **Contraseña**: `trastero_password` - Hash encriptado con salt
- **Sesión**: `trastero_last_auth` - Timestamp de última autenticación
- **Token temporal**: `trastero_session` (sessionStorage) - Token de sesión activa
- **Persistencia**: Los datos persisten entre sesiones de forma segura
- **Privacidad**: Los datos nunca salen de tu dispositivo

### Estructura de Datos
```javascript
{
  id: "único_id_generado",
  nombre: "Nombre del objeto",
  ubicacion: "Ubicación específica",
  fechaCreacion: "2024-01-01T00:00:00.000Z",
  fechaModificacion: "2024-01-01T00:00:00.000Z"
}
```

## 🔧 Desarrollo

### Estructura del Proyecto
```
TrasteroApp_Standalone/
├── index.html                    # Aplicación completa con autenticación
├── index-modular.html           # Versión modular con autenticación
├── styles.css                   # Estilos con funciones de seguridad
├── script.js                    # JavaScript con sistema de auth
├── index-original.html          # Versión anterior (sin auth)
├── styles-original.css          # Estilos originales (backup)
├── script-original.js           # JavaScript original (backup)
└── README.md                    # Este archivo
```

### Características Técnicas
- **Sin bundlers**: JavaScript vanilla ES6+
- **Sin frameworks**: HTML/CSS/JS puro
- **Sin CDN**: Todo autocontenido
- **Modular**: Código bien estructurado y comentado
- **Performante**: Optimizado para velocidad y UX

## 🐛 Resolución de Problemas

### La aplicación no carga
- Asegúrate de que JavaScript esté habilitado en tu navegador
- Verifica que el archivo no esté corrupto
- Intenta abrir en modo incógnito

### Los datos no se guardan
- Verifica que localStorage esté habilitado
- Comprueba que no estés en modo incógnito (en algunos navegadores)
- Asegúrate de tener espacio suficiente en el navegador

### Problemas de visualización
- Actualiza el navegador a la versión más reciente
- Verifica que CSS esté habilitado
- Intenta cambiar el zoom del navegador (Ctrl + 0)

### Problemas de autenticación
- **Contraseña olvidada**: Ejecuta `localStorage.removeItem('trastero_password')` en la consola del navegador
- **Sesión bloqueada**: Limpia el localStorage o espera 30 minutos para que expire
- **Error de login**: Verifica que la contraseña tenga al menos 4 caracteres
- **Datos no accesibles**: Asegúrate de introducir la contraseña correcta

## 📄 Licencia

Este proyecto es de dominio público. Puedes usar, modificar y distribuir libremente.

## 🤝 Contribuciones

Si encuentras errores o tienes sugerencias de mejora:
1. Reporta el issue con detalles específicos
2. Incluye información del navegador y sistema operativo
3. Describe los pasos para reproducir el problema

## 📋 Changelog

### v1.1.0 (ACTUAL) - Sistema de Autenticación
- 🔐 **NUEVO**: Sistema de autenticación con contraseña
- 🔑 **NUEVO**: Pantalla de login con setup inicial
- ⏰ **NUEVO**: Gestión de sesiones con timeout automático (30 min)
- 🔄 **NUEVO**: Cambio de contraseña desde la aplicación
- 🚪 **NUEVO**: Botón de cerrar sesión
- 🛡️ **NUEVO**: Encriptación básica de contraseña con salt
- 💾 **NUEVO**: Tokens de sesión temporales seguros
- 🔒 **MEJORADO**: Header rediseñado con controles de seguridad
- 📱 **MEJORADO**: Diseño responsive para pantallas de login
- 🎨 **MEJORADO**: Nuevos estilos para modales y mensajes de estado

### v1.0.0 - Funcionalidad Base
- ✅ Funcionalidad completa implementada
- ✅ Diseño responsive
- ✅ Persistencia con localStorage
- ✅ Búsqueda en tiempo real
- ✅ Edición inline de ubicaciones
- ✅ Confirmación de eliminación
- ✅ Contadores automáticos
- ✅ Feedback visual y animaciones
