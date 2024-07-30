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

### Control Bindings

The plugin supports the following control bindings via H Events:

- `AS3000_Electronic_Checklist_[index]_Push` to open the checklist pane at the specified index if closed or to interact
  with the checklist at the specified index if open.
- `AS3000_Electronic_Checklist_[index]_Push_Long` to close the checklist pane if open and restore the previously opened
  pane if any.
- `AS3000_Electronic_Checklist_[index]_Scroll_Up` to scroll up the checklist at the specified index.
- `AS3000_Electronic_Checklist_[index]_Scroll_Down` to scroll down the checklist at the specified index.

where `[index]` is a number from 1 to 4 corresponding to a controllable pane:

- 1: Left PFD.
- 2: Left MFD.
- 3: Right MFD.
- 4: Right PFD.

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
