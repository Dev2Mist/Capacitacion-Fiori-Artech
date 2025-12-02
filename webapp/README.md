## Explicación

### manifest.json

Este archivo permite "describir" a la aplicacion, dar información sobre el nombre, tipo y versión

#### La identidad

"sap.app" : {
"id": "artech.capacitacion.fiori",
"type": "application",
"i18n": "i18n/i18n.properties", Indica dónde están los textos traducibles
"..." : "..."
}

1. id: Es lo más importante. Es el namespace único de tu app. Todo archivo que cargues se buscará relativo a este ID. Si cambias esto, rompes todas las rutas de tus archivos.
2. i18n: Define dónde está el archivo de "textos". En lugar de hardcodear "Hola" en el XML, usaremos claves como {i18n>saludo}. Fiori lee esta línea para saber de dónde sacar ese texto

#### El entorno

- Explica en qué entorno funciona la aplicacion, en este caso, computadoras, tables y ecelulares. Le dicen al Fiori Launchpad si esta app debe aparecerle a un usuario que entra desde un celular o no.
  "sap.ui": {
  "technology": "UI5",
  "deviceTypes": {
  "desktop": true,
  "tablet": true,
  "phone": true
  }
  }

#### La parte técnica (Dependencias, Models y la Vista Raíz)

##### Dependencias

- Esta seccion indica las librerias que la app necesita para funcionar correctamente, si alguna de las librerias que pretendemos utilizar no está aca, entonces la app fallara
  "sap.ui5": {
  "dependencies": {
  "minUI5Version": "1.120.0",
  "libs": {
  "sap.ui.core": {},
  "sap.m": {},
  "sap.ui.layout": {}
  }

##### Models

- Aquí se definen los modelos del proyecto, o sea, los que se encargaran de la manipulacion de datos y logica de diseño
  "models": {
  "i18n": {
  "type": "sap.ui.model.resource.ResourceModel",
  "settings": {
  "bundleName": "artech.capacitacion.fiori.i18n.i18n"
  }
  }

##### Vista Raíz

- Basicamente es el punto de entrada visual, cuando el Component.js se inicia busca esta configuración para saber qué debe pintar en la pantalla.
  "rootView": {
  "viewName": "artech.capacitacion.fiori.view.App",
  "type": "XML",
  "async": true,
  "id": "app"
  }

## Resumen

El manifest.json permite que tu código JavaScript (Controller.js y Component.js) sea limpio.

Sin Manifest: Tendrías que escribir en tu JS: new sap.m.App(), new ResourceModel(), cargar las librerías manualmente, configurar rutas a mano...

Con Manifest: Es configuración declarativa. Tú dices qué quieres, y el ComponentContainer de SAP se encarga del cómo instanciarlo.

## Mapa para entender cómo funciona la app

```
[index.html]
    │
    └──> Carga el componente: "artech.capacitacion.fiori"
            │
            ▼
   [Component.js] (Busca manifest.json)
            │
            ▼
   [manifest.json]
            │
            ├──> Define rootView: "artech.capacitacion.fiori.view.App"
            │
            └──> Define i18n: "i18n/i18n.properties" ──┐
                                                       │
                                                       ▼                       ▼
[App.controller.js] <── (vinculado por nombre) ── [App.view.xml] <── (usa textos)
"artech...controller.App"                         controllerName="..."
```
