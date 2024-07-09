import css from "rollup-plugin-import-css";
import esbuild from "rollup-plugin-esbuild";
import typescriptPaths from "rollup-plugin-typescript-paths";
import fs from "node:fs";

const distDir = "./dist/ilpav-avionics-g3000-electronic-checklist";

const manifestFile = JSON.parse(fs.readFileSync(distDir + "/manifest.json", "utf8"));
const packageFile = JSON.parse(fs.readFileSync("package.json", "utf8"));
manifestFile.package_version = packageFile.version;
fs.writeFileSync(distDir + "/manifest.json", JSON.stringify(manifestFile, null, 2));

let config = [];

["Pfd", "Mfd", "Gtc"].map((i) => {
  config.push({
    input: `src/Global/Plugins/${i.toUpperCase()}/index.ts`,
    output: {
      file: `${distDir}/html_ui/ChecklistPlugins/Checklist${i}Plugin.js`,
      format: "iife",
      name: `Checklist${i}`,
      globals: {
        "@microsoft/msfs-sdk": "msfssdk",
        "@microsoft/msfs-wtg3000-common": "wtg3000common",
        "@microsoft/msfs-wtg3000-pfd": "wtg3000pfd",
        "@microsoft/msfs-wtg3000-mfd": "wtg3000mfd",
        "@microsoft/msfs-wtg3000-gtc": "wtg3000gtc",
      },
    },
    external: [
      "@microsoft/msfs-sdk",
      "@microsoft/msfs-wtg3000-common",
      "@microsoft/msfs-wtg3000-pfd",
      "@microsoft/msfs-wtg3000-mfd",
      "@microsoft/msfs-wtg3000-gtc",
    ],
    plugins: [
      typescriptPaths({ preserveExtensions: true }),
      esbuild({
        target: "es2017",
        jsxFactory: "FSComponent.buildComponent",
        jsxFragment: "FSComponent.Fragment",
      }),
      css({ output: `Checklist${i}Plugin.css` }),
    ],
  });
});

export default config;
