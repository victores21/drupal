<!-- PROJECT LOGO -->
<p align="center">
  <h1 align="center"><b>Framework de front-end</b></h1>

  <p align="center">
    <a href="https://gitlab.com/felipecastillo/frontend-template"><strong>Explora la documentación »</strong></a>
    <br />
    <br />
    <a href="https://gitlab.com/felipecastillo/frontend-template/-/issues">Reporta un error</a>
    ·
    <a href="https://gitlab.com/felipecastillo/frontend-template/-/issues">Solicita una nueva funcionalidad</a>
  </p>
</p>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

## Tabla de contenido

- [Requerimientos del sistema](#requerimientos-del-sistema)
- [Sobre el proyecto](#sobre-el-proyecto)
- [Configuración](#configuracin)
- [Para producción](#para-produccin)
- [Preguntas frecuentes](#preguntas-frecuentes)

## Requerimientos del sistema

- [Node.js 12.22](https://nodejs.org/en/) o una versión superior
- MacOS, Windows (including WSL), y Linux están soportados

## Sobre el proyecto

Este framework te brinda la mejor experiencia para desarrollar una aplicación en conjunto con Drupal y lista para desplegar en producción.

### Construido con las siguientes tecnologías

- [Webpack](https://babeljs.io)
- [Babel](https://tailwindcss.com)
- [Prettier](https://prettier.io)
- [PostCSS](https://postcss.org)
- [ESLint](https://eslint.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Modular Scale](https://github.com/modularscale/modularscale-sass)

## Configuración

> 🏗 La mayoría de la configuración tiene los valores por defecto.

### Instalación manual

1. Copia todos los archivos de este framework en la raíz de tu proyecto de Drupal alojado en `themes`. Ejemplo: `nombre-del-proyecto/themes/custom/nombre-del-tema`

   > ⚠️ Si el destino de tus archivos ya tiene la carpeta `templates` no la sobreescribas.

2. Importa los archivos de estilos y scripts en `nombre_del_tema.libraries.yml`

   ```yml
   // nombre_del_tema.libraries.yml

   app: // Normalmente acá va el nombre de la librería, preferiblemente no cambiar.
     js:
       dist/js/main.bundle.js: { attributes: { preload: true }, preprocess: false, minified: true }
     css:
       component:
         dist/css/main.css: { attributes: { preload: true }, preprocess: false, minified: true }
   ```

   > ⚙️ Inmediatamente después vacía caché en Drupal.

3. Ajusta la configuración del servidor de webpack en `webpack/webpack.settings.js`:

   ```javascript
   // webpack.settings.js

   module.exports = {
     // ...
     devServerConfig: {
       proxy: 'https://front-framework.dd:8443/', // Url del ambiente local.
       public: '/themes/custom/nombre-del-tema/dist/', // Ruta dónde se va a generar dist. Importante que comience con un slash e incluya la carpeta dist.
     },
     // ...
   };
   ```

4. Configura las siguientes rutas en `webpack/webpack.settings.js`:

   ```javascript
   // webpack.settings.js

   module.exports = {
     paths: {
       // Ubicación de la carpeta en la cuál están los archivos de markup (html, twig, tpl).
       templates: './templates/',
     },
     // ...
     entries: {
       // Archivo base de JavaScript.
       main: ['index.js'],
     },
     // ...
   };
   ```

   > ℹ️ Valores manejados por defecto.

5. Importa el archivo de estilos en la raíz del archivo de JavaScript en `front-src/js/index.js`. Debido a que webpack es un paquete de módulos para JavaScript los estilos deben ser importados desde un archivo de JS.

   ```javascript
   // index.js
   import '../css/main.scss';
   ```

   > ⚠️ En `dev` los estilos no son exportados a la carpeta `dist` debido a que son cargados desde JavaScript.

6. Instala las dependencias del proyecto.

   - #### Por terminal o consola
     Ve a la ruta del proyecto y ejecuta el siguiente comando en `nombre-del-proyecto/themes/custom/nombre-del-tema`:
     ```sh
     npm install
     ```
   - #### Si usas alguna herramienta de Jet Brains (WebStorm, PhpStorm, PyCharm):
     Click derecho en `package.json` y luego en `run npm install`.

7. Por último en el mismo directorio, ejecuta el comando del servidor de desarrollo:

   ```sh
   npm run dev
   ```

   > 🚀 webpack iniciará un servidor de desarrollo en `http://localhost:8080`.\
   > Visita `http://localhost:8080` para ver tu aplicación

   Los siguientes scripts se refieren a las diferentes etapas de desarrollo de la aplicación:

   - `dev` - Corre dev el cuál inicia el modo de desarrollo
   - `prod` - Corre prod el cuál construye la aplicación para uso en producción.
   - `lint` - Corre lint el cuál reporta y corrige problemas de estándar en el código.

   NOTA:
   Si al ejecutar algún script, da el siguiente error: `"NODE_ENV" no se reconoce como un comando interno o externo`, debemos asegurarnos tener instalado `cross-env` como devDependencies y al inicio del script poner `cross-env` como en el siguiente ejemplo:

   ```javascript
     scripts: {
         "dev": "cross-env NODE_ENV=development webpack serve --config ./webpack/webpack.dev.js",
         "prod": "NODE_ENV=production webpack --config ./webpack/webpack.prod.js",
         "lint": "eslint --fix ./"
       }
   ```

## Para producción

Ejecuta esta tarea antes de hacer commit o pull.

1. Incluye archivos y/o carpetas para purgar los estilos de Tailwind CSS en `webpack/webpack.settings.js`:

   ```javascript
   // webpack.settings.js

   module.exports = {
     // ...
     purgeCssConfig: {
       content: ['./templates/**/*.{twig,html}', './front-src/js/**/*.js'],
       options: {
         standard: [], // e.g. ['random', 'yep', 'button'] 👉 In this example, the selectors .random, #yep, button will be left in the final CSS.
         deep: [], // e.g. [/red$/] 👉 In this example, selectors ending with red such as .bg-red will be left in the final CSS.
         greedy: [], // e.g. [/red$/] 👉 In this example, selectors such as button.bg-red.nonexistent-class will be left in the final CSS, even if button and nonexistent-class are not found.
         blocklist: [], // e.g. ['usedClass', /^nav-/] 👉 Even if nav-links and usedClass are found by an extractor, they will be removed.
       },
     },
   };
   ```

   Para más info [https://purgecss.com/](https://purgecss.com/)

   > ⚠️ En caso de ser necesario agrega la ruta del módulo en content:\
   > `../../../modules/custom/nombre-del-modulo/templates/**/*{twig,html}`

2. Ejecuta el comando de producción:

   ```sh
   npm run prod
   ```

## Preguntas frecuentes

- #### ¿Cómo se que `dev` está corriendo correctamente?

  Ingresa a `http://localhost:8080/webpack-dev-server` y busca el archivo `main.bundle.js`. Si lo encuentras revisa tu importación en `nombre_del_tema.libraries.yml` o vacía caché.

- #### ¿Por qué no se está generando el archivo de estilos?

  Cerciórate que estás corriendo la tarea para producción `prod`. Si lo estás buscando mientras corres `dev` recuerda que en este modo se generan en el archivo `main.bundle.js`.

- #### ¿Cómo manejo las imágenes que quiera importar en un archivo de markup?

  Guarda las imágenes directamente en la carpeta `img` y llámalas de esa carpeta. Al webpack no tener acceso a los archivos `twig`, `tpl` y `html`, el módulo no procesa las imágenes incluidas en esos archivos y por consiguiente no son agregadas en la carpeta `dist`.

  ```html
  <img src="../img/imagen.jpg" alt="..." />
  ```

- #### ¿Para qué sirve la carpeta `static`?
  Incluye en esta carpeta archivos que no requieran ser procesados por webpack, tales como: vídeos, audios, pdf, etc.

## License

Distributed under the MIT License. See [LICENSE](https://gitlab.com/felipecastillo/frontend-template/blob/master/LICENSE) for more information.

## Colaboradores

- Felipe Castillo <fcastillo@serempre.com>
