import css from 'rollup-plugin-import-css';
import resolve from '@rollup/plugin-node-resolve';
import alias from "@rollup/plugin-alias";
import path from "node:path";
import fs from "node:fs";

function updateManifestVersion() {
  return {
    generateBundle(outputOptions, bundle) {
      const manifestFile = JSON.parse(fs.readFileSync('dist/ilpav-avionics-g3000-electronic-checklist/manifest.json', 'utf8'));
      const packageFile = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      manifestFile.package_version = packageFile.version;
      fs.writeFileSync('dist/ilpav-avionics-g3000-electronic-checklist/manifest.json', JSON.stringify(manifestFile, null, 2));
    }
  }
}

let config = [];

['Pfd', 'Mfd', 'Gtc'].map(i => {
  config.push({
    input: `build/Global/Plugins/${i.toUpperCase()}/index.js`,
    output: {
      file: `dist/ilpav-avionics-g3000-electronic-checklist/html_ui/ChecklistPlugins/Checklist${i}Plugins.js`,
      format: 'iife',
      name: `Checklist${i}`,
      globals: {
        '@microsoft/msfs-sdk': 'msfssdk',
        '@microsoft/msfs-wtg3000-common': 'wtg3000common',
        '@microsoft/msfs-wtg3000-pfd': 'wtg3000pfd',
        '@microsoft/msfs-wtg3000-mfd': 'wtg3000mfd',
        '@microsoft/msfs-wtg3000-gtc': 'wtg3000gtc',
      }
    },
    external: [
      '@microsoft/msfs-sdk',
      '@microsoft/msfs-wtg3000-common',
      '@microsoft/msfs-wtg3000-pfd',
      '@microsoft/msfs-wtg3000-mfd',
      '@microsoft/msfs-wtg3000-gtc',
    ],
    plugins: [
      alias({
        entries: [
          {find: '@base', replacement: path.join(__dirname, '\\build\\Base\\Plugins')},
        ],
      }),
      css({output: `Checklist${i}Plugins.css`}),
      updateManifestVersion(),
      resolve()
    ]
  });
});

export default config;
