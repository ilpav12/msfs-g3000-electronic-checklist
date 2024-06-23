# MSFS G3000 Electronic Checklist

This is a plugin for the Working Title G3000 for the Microsoft Flight Simulator adding Electronic
Checklist functionalities.

## Pilots

Download the current version on the 
[releases page](https://github.com/ilpav12/msfs-g3000-electronic-checklist/releases/latest). Unzip the file and copy the
content to the `Community` folder of your MSFS installation.

Documentation for the Daher TBM 930 Garmin G3000:
- [Pilot's Guide](https://static.garmin.com/pumac/190-02046-02_a.pdf)
- [Cockpit Reference Guide](https://static.garmin.com/pumac/190-02047-02_a.pdf)

In the TBM 930 Normal and Amplified Procedures are available. The source of the procedures is the official [pilot's
information manual](https://www.tbm.aero/medias_front/documents/154203PIM-TBM-930-FromSN1227.pdf) from Daher.

In the Longitude Normal and Abbreviated Procedures are available. The source of the procedures is the official Garmin 
Checklist [GCL file](https://ww2.txtav.com/TechnicalPublications/Downloads/MFDCheckLists?Brand=Cessna).

## Contributors

Feel free to open issues or send pull requests.

This is an adaptation of the SR22T G1000 Electronic Checklist by 
[Working Title](https://github.com/microsoft/msfs-avionics-mirror/tree/main/src/workingtitle-aircraft-sr22t) and 
utilizes their Avionics Frameworks.

In order to build the project, install the dependencies with `npm install` and run `npm run build` to generate the
plugin files in the `dist` folder. Then symlink or copy the files to the `Community` folder of your MSFS installation.

Inside `src/Global/Plugins/Shared/ChecklistSystem/Checklists` there is a useful python script to convert either PDF
guides pasted in a text file or a json file directly export from the CheckSet software into the format used by the
plugin.

## License

This project is licensed under MIT License.
