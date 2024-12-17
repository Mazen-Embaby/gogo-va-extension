// esbuild.config.js

const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/scripts/background.ts', './src/scripts/content.ts', './src/scripts/extract-content.ts'],
  bundle: true,
  outdir: './dist/chrome-extension/browser/scripts/',
  minify: true,
}).catch(() => process.exit(1));


// const esbuild = require('esbuild');
// const path = require('path');
// const copyPlugin = require('esbuild-plugin-copy');

// // Define the esbuild configuration
// const config = [
//   {
//     entryPoints: ['sidepanel/index.js'], // Entry point for the sidepanel
//     outdir: 'dist/sidepanel',
//     format: 'iife',
//     bundle: true,
//     minify: false,
//     sourcemap: true,
//     plugins: [
//       copyPlugin({
//         src: ['manifest.json', 'background.js', 'sidepanel', 'images'],
//         dest: 'dist', // Destination for copied files
//       }),
//     ],
//     external: [], // List any external modules you don't want bundled
//   },
//   {
//     entryPoints: ['app/content.js'], // Entry point for extract-content
//     outdir: 'dist/scripts',
//     format: 'esm',
//     bundle: true,
//     minify: false,
//     sourcemap: true,
//     plugins: [], // You can add more plugins here if needed
//     external: [], // Any external modules to exclude from the bundle
//   },
// ];

// // Run the build process
// // esbuild.build(config[0]).catch(() => process.exit(1));
// esbuild.build(config[1]).catch(() => process.exit(1));

