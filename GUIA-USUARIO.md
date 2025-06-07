# 📱 Guía de Usuario - TrasteroApp v1.2.0

## 🎯 ¿Qué Problema Resuelve?

**ANTES (v1.1.0):**
- ❌ Cada dispositivo/navegador pide crear nueva contraseña
- ❌ Datos independientes en cada dispositivo
- ❌ Pérdida de sincronización entre dispositivos
- ❌ Frustración al acceder desde múltiples lugares

**AHORA (v1.2.0):**
- ✅ **UNA SOLA CONTRASEÑA** para todos los dispositivos
- ✅ **DATOS SINCRONIZADOS** automáticamente
- ✅ **ACCESO UNIVERSAL** desde cualquier navegador
- ✅ **RESPALDO EN LA NUBE** con GitHub

## 🚀 Configuración Inicial (Solo una vez)

### Paso 1: Crear Token de GitHub

1. **Ir a GitHub**: Acceder a tu cuenta de GitHub
2. **Navegar a Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generar nuevo token**: Hacer clic en "Generate new token (classic)"
4. **Configurar permisos**:
   - Nombre: `TrasteroApp-Sync`
   - Expiración: Sin expiración (o 1 año)
   - Permisos: ✅ **repo** (Full control of private repositories)
5. **Copiar token**: Guardar el token generado (empieza con `ghp_`)

### Paso 2: Configurar TrasteroApp

1. **Abrir TrasteroApp v1.2.0**
2. **Pegar token GitHub** en el campo correspondiente
3. **Escribir nombre del repositorio** (ej: `mi-inventario-personal`)
4. **Hacer clic en "Verificar y Continuar"**

⚠️ **Nota**: Si el repositorio no existe, se creará automáticamente como privado.

### Paso 3: Establecer Contraseña Maestra

1. **Crear contraseña segura** (mínimo 6 caracteres)
2. **Confirmar contraseña**
3. **Hacer clic en "Configurar Contraseña"**

✅ **Esta contraseña funcionará en TODOS tus dispositivos**

### Paso 4: Migración de Datos

**Si tienes datos existentes:**
- Hacer clic en **"Sí, Migrar Datos Existentes"**
- Se transferirán automáticamente a GitHub

**Si empiezas de cero:**
- Hacer clic en **"Empezar de Cero"**
- Se creará un inventario nuevo

## 📱 Usar en Dispositivos Adicionales

### Configuración Rápida (2 minutos)

1. **Abrir TrasteroApp v1.2.0** en el nuevo dispositivo
2. **Ingresar contraseña maestra** (la misma de la configuración inicial)
3. **¡Listo!** Todos tus datos aparecen automáticamente

### No necesitas:
- ❌ Configurar GitHub otra vez
- ❌ Migrar datos
- ❌ Crear nueva contraseña
- ❌ Hacer configuraciones adicionales

## 🛠️ Uso Diario

### Agregar Objetos

1. **Llenar formulario**:
   - **Nombre**: Ej: "Herramientas de jardinería"
   - **Ubicación**: Ej: "Garaje, estante superior"
   - **Categoría**: Seleccionar de la lista
   - **Descripción**: Detalles adicionales (opcional)

2. **Hacer clic en "Agregar Objeto"**
3. **Sincronización automática** → El objeto aparece en todos tus dispositivos

### Buscar Objetos

1. **Usar barra de búsqueda** en la parte superior
2. **Escribir cualquier palabra**: nombre, ubicación, categoría o descripción
3. **Resultados instantáneos** mientras escribes

### Editar/Eliminar

- **✏️ Editar**: Hacer clic en icono de lápiz → Modificar → Guardar
- **🗑️ Eliminar**: Hacer clic en icono de basura → Confirmar eliminación

## 📊 Estadísticas en Tiempo Real

### Panel de Estadísticas
- **Objetos Totales**: Contador total de objetos
- **Ubicaciones Únicas**: Número de lugares diferentes
- **Agregados Hoy**: Objetos añadidos en la fecha actual
- **Última Sincronización**: Cuándo fue la última sincronización

## 🌐 Estados de Sincronización

### 🟢 En Línea
- **Significado**: Conectado a internet
- **Comportamiento**: Sincronización automática activa
- **Acciones**: Cambios se suben inmediatamente

### 🟡 Sincronizando
- **Significado**: Transferencia de datos en progreso
- **Comportamiento**: Indicador pulsante
- **Acciones**: Esperar a que termine

### 🔴 Sin Conexión
- **Significado**: No hay internet
- **Comportamiento**: Modo offline activo
- **Acciones**: Cambios se guardan localmente y se sincronizan al reconectar

## 🔄 Sincronización Manual

### Cuándo usar:
- Quieres asegurar que los datos estén actualizados
- Acabas de hacer cambios importantes
- Sospechas que hay diferencias entre dispositivos

### Cómo hacerlo:
1. **Hacer clic en botón "Sincronizar"** (icono de flechas circulares)
2. **Esperar confirmación** de sincronización exitosa
3. **Verificar estadísticas** para confirmar última sincronización

## 🔐 Gestión de Contraseñas

### Cambiar Contraseña Maestra

1. **Hacer clic en "Cambiar Contraseña"** en el header
2. **Escribir contraseña actual**
3. **Escribir nueva contraseña** (mínimo 6 caracteres)
4. **Confirmar nueva contraseña**
5. **Hacer clic en "Cambiar Contraseña"**

✅ **El cambio se sincroniza automáticamente a todos los dispositivos**

### Si Olvidas la Contraseña

1. **Hacer clic en "Reconfigurar GitHub Sync"** en la pantalla de login
2. **Confirmar que quieres reconfigurar**
3. **Repetir proceso de configuración inicial**

⚠️ **Los datos en GitHub se conservan, solo necesitas reconfigurar el acceso**

## 📥📤 Importar/Exportar

### Exportar Datos

1. **Hacer clic en "Descargar JSON"** en la sección de exportación
2. **Se descarga archivo** `trastero-datos-YYYY-MM-DD.json`
3. **Usar como respaldo** o para transferir a otra aplicación

### Importar Datos

1. **Hacer clic en "Cargar desde JSON"**
2. **Seleccionar archivo JSON** válido
3. **Confirmar importación**
4. **Los objetos se agregan** a los existentes (no los reemplaza)

## ❌ Cerrar Sesión

### Cuándo usar:
- Usar un dispositivo compartido o público
- Terminar sesión por seguridad
- Cambiar de cuenta

### Cómo hacerlo:
1. **Hacer clic en "Cerrar Sesión"** (icono de salida)
2. **Confirmar cierre de sesión**
3. **Regresa a pantalla de login**

⚠️ **Los datos locales se conservan para próximo acceso**

## 🆘 Resolución de Problemas

### Token GitHub Inválido
**Síntoma**: Error al configurar GitHub
**Solución**: 
- Verificar que el token esté copiado completo
- Confirmar que tiene permisos `repo`
- Regenerar token si es necesario

### Error de Sincronización
**Síntoma**: Mensaje de error al sincronizar
**Solución**:
- Verificar conexión a internet
- Usar botón "Sincronizar" manual
- Revisar que el repositorio GitHub existe

### Datos No Aparecen
**Síntoma**: Objetos no se muestran en nuevo dispositivo
**Solución**:
- Verificar que estás usando la contraseña correcta
- Esperar a que termine la sincronización inicial
- Hacer sincronización manual

### Aplicación Lenta
**Síntoma**: Interface responde lento
**Solución**:
- Cerrar pestañas innecesarias del navegador
- Actualizar página (F5)
- Usar navegador actualizado

## 💡 Consejos y Mejores Prácticas

### Organización Efectiva

1. **Ubicaciones Específicas**: 
   - ✅ "Garaje, estante superior izquierdo"
   - ❌ "En algún lugar del garaje"

2. **Nombres Descriptivos**:
   - ✅ "Herramientas de jardinería - Set completo"
   - ❌ "Cosas de jardín"

3. **Categorías Consistentes**:
   - Usar siempre las mismas categorías para objetos similares
   - Aprovechar las categorías predefinidas

4. **Descripciones Útiles**:
   - Incluir detalles que te ayuden a recordar
   - Mencionar características distintivas

### Seguridad

1. **Contraseña Segura**:
   - Usar combinación de letras, números y símbolos
   - No usar información personal obvia
   - No compartir con otros

2. **Token GitHub**:
   - No compartir el token con nadie
   - Regenerar periódicamente por seguridad
   - Revocar si sospechas compromiso

3. **Dispositivos Públicos**:
   - Siempre cerrar sesión al terminar
   - No guardar credenciales en navegadores públicos

### Eficiencia

1. **Sincronización**:
   - Hacer cambios por lotes cuando sea posible
   - No sincronizar manualmente constantemente
   - Confiar en la sincronización automática

2. **Búsqueda**:
   - Usar términos específicos para búsquedas rápidas
   - Aprovechar la búsqueda en tiempo real
   - Buscar por ubicación para encontrar espacios

3. **Mantenimiento**:
   - Revisar y actualizar información periódicamente
   - Eliminar objetos que ya no tienes
   - Exportar datos como respaldo ocasional

---

## 📞 Soporte

**¿Necesitas ayuda?**
- Consultar esta guía primero
- Revisar el README.md para información técnica
- Reportar problemas con información detallada

**TrasteroApp v1.2.0** - Una sola contraseña, todos tus dispositivos sincronizados. 🎯
