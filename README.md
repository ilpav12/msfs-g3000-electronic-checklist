# MSFS 2020 G3000 Electronic Checklist

This is a plugin for the Working Title G3000 for the Microsoft Flight Simulator adding Electronic
Checklist functionalities.

## MSFS 2024 Support

MSFS 2024 is not planned as this feature is now natively supported by 
[WT v2 avionics](https://microsoft.github.io/msfs-avionics-mirror/2024/docs/g3000/features/electronic-checklists).

## Pilots

Download the current version on the
[releases page](https://github.com/ilpav12/msfs-g3000-electronic-checklist/releases/latest). Unzip the file and copy the
content to the `Community` folder of your MSFS installation.

Official documentation of the Garmin G3000 Electronic Checklist can be found on chapter 8.9 of this
[pilot's guide](https://static.garmin.com/pumac/190-02046-02_a.pdf).

### Supported Aircraft

| Developer | Aircraft                  | Categories                                                                                                           | Source                                                                                                                                   |
|-----------|---------------------------|----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Asobo     | Daher TBM 930             | Normal Procedures<br/>Amplified Procedures                                                                           | [Pilot's information manual](https://www.tbm.aero/medias_front/documents/154203PIM-TBM-930-FromSN1227.pdf)                               |
| Asobo     | Cessna Citation Longitude | Abbreviated Proc<br/>Normal Proc                                                                                     | [Garmin Checklist File](https://ww2.txtav.com/TechnicalPublications/Downloads/MFDCheckLists?Brand=Cessna)                                |
| FlightFX  | SF50 Vision Jet           | Emergency Procedures<br/>Warning<br/>Abnormal Procedures<br/>Caution (A-F)<br/>Caution (G-Z)<br/>Advisory<br/>Normal | [Garmin Checklist File](https://techpubs.cirrusaircraft.com/tech/pubs/checklists/view/11?avionics_brand=perspective-touch-plus&model=SF) |
| FlightFX  | Marwan Gharibs HJet       | Normal                                                                                                               | Garmin Checklist File                                                                                                                    |

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
[Working Title](https://github.com/microsoft/msfs-avionics-mirror/tree/v1/src/workingtitle-aircraft-sr22t/src/Plugins/Shared/ChecklistSystem)
and utilizes their Avionics Frameworks.

In order to build the project, install the dependencies with `npm install` and run `npm run build` to generate the
plugin files in the `dist` folder. Then symlink or copy the files to the `Community` folder of your MSFS installation.

Inside `src/Global/Plugins/Shared/ChecklistSystem/Checklists` there is a useful python script to convert either PDF
guides pasted in a text file or a json file directly export from the CheckSet software into the format used by the
plugin.

## License

This project is licensed under MIT License.
