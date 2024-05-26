import css from 'rollup-plugin-import-css';
import resolve from '@rollup/plugin-node-resolve';
import alias from "@rollup/plugin-alias";
import path from "node:path";

const aircraft = [
  'Tbm',
  // 'Longitude',
];

let config = [];

aircraft.map(a => {
  console.log(__dirname);
  ['Pfd', 'Mfd', 'Gtc'].map(i => {
    config.push({
      input: `build/${a}/Plugins/${i.toUpperCase()}/index.js`,
      output: {
        file: `dist/ilpav-avionics-${a.toLowerCase()}-electronic-checklist/html_ui/ChecklistPlugins/${a}Checklist${i}Plugins.js`,
        format: 'iife',
        name: `${a.toLowerCase()}Checklist${i}`,
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
        css({output: `${a}Checklist${i}Plugins.css`}),
        resolve()
      ]
    });
  });
});

export default config;
