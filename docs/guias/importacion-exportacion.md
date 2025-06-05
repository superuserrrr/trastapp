# Guía de Importación/Exportación

## Exportación
1. Haz clic en el botón verde "Exportar a JSON"
2. El archivo se descargará automáticamente
3. El nombre del archivo incluirá la fecha actual

## Importación
1. Haz clic en el botón morado "Importar desde JSON"
2. Selecciona el archivo JSON previamente exportado
3. Elige una de las opciones:
   - **Reemplazar todos**: Elimina todos los objetos actuales y usa solo los del archivo
   - **Añadir a existentes**: Mantiene tus objetos actuales y añade los nuevos

## Formato del archivo JSON
```json
{
  "version": "1.1.0",
  "fecha": "2025-06-05T14:18:19.000Z",
  "total": 2,
  "items": [
    {
      "id": "id-unico-1",
      "nombre": "Nombre del objeto",
      "ubicacion": "Ubicación del objeto",
      "fechaCreacion": "2025-06-01T10:30:00.000Z",
      "fechaModificacion": "2025-06-01T10:30:00.000Z"
    },
    {
      "id": "id-unico-2",
      "nombre": "Otro objeto",
      "ubicacion": "Otra ubicación",
      "fechaCreacion": "2025-06-02T14:45:00.000Z",
      "fechaModificacion": "2025-06-02T14:45:00.000Z"
    }
  ]
}
```

## Compatibilidad
El formato es compatible entre todos los navegadores modernos.

