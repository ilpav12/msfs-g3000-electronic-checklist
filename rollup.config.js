import css from 'rollup-plugin-import-css';
import image from '@rollup/plugin-image';
import resolve from '@rollup/plugin-node-resolve';

export default [
    // {
    //     input: 'build/Plugins/PFD/index.js',
    //     output: {
    //         file: 'dist/ilpav-avionics-tbm-integrated-checklist/html_ui/TbmChecklistPlugins/TbmChecklistPfdPlugins.js',
    //         format: 'iife',
    //         name: 'tbmChecklistPfd',
    //         globals: {
    //             '@microsoft/msfs-sdk': 'msfssdk',
    //             '@microsoft/msfs-wtg3000-common': 'wtg3000common',
    //             '@microsoft/msfs-wtg3000-pfd': 'wtg3000pfd'
    //         }
    //     },
    //     external: ['@microsoft/msfs-sdk', '@microsoft/msfs-wtg3000-common', '@microsoft/msfs-wtg3000-pfd'],
    //     plugins: [image(), css({ output: 'TbmChecklistPfdPlugins.css' }), resolve()]
    // },
    // {
    //     input: 'build/Plugins/MFD/index.js',
    //     output: {
    //         file: 'dist/ilpav-avionics-tbm-integrated-checklist/html_ui/TbmChecklistPlugins/TbmChecklistMfdPlugins.js',
    //         format: 'iife',
    //         name: 'tbmChecklistMfd',
    //         globals: {
    //             '@microsoft/msfs-sdk': 'msfssdk',
    //             '@microsoft/msfs-wtg3000-common': 'wtg3000common',
    //             '@microsoft/msfs-wtg3000-mfd': 'wtg3000mfd'
    //         }
    //     },
    //     external: ['@microsoft/msfs-sdk', '@microsoft/msfs-wtg3000-common', '@microsoft/msfs-wtg3000-mfd'],
    //     plugins: [image(), css({ output: 'TbmChecklistMfdPlugins.css' }), resolve()]
    // },
    {
        input: 'build/Plugins/GTC/index.js',
        output: {
            file: 'dist/ilpav-avionics-tbm-integrated-checklist/html_ui/TbmChecklistPlugins/TbmChecklistGtcPlugins.js',
            format: 'iife',
            name: 'tbmChecklistGtc',
            globals: {
                '@microsoft/msfs-sdk': 'msfssdk',
                '@microsoft/msfs-wtg3000-common': 'wtg3000common',
                '@microsoft/msfs-wtg3000-gtc': 'wtg3000gtc',
            }
        },
        external: ['@microsoft/msfs-sdk', '@microsoft/msfs-wtg3000-common', '@microsoft/msfs-wtg3000-gtc'],
        plugins: [image(), css({ output: 'TbmChecklistGtcPlugins.css' }), resolve()]
    },
];
