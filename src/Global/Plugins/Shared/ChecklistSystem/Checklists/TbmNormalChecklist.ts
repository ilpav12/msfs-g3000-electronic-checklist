import { ChecklistItemType, Justification } from "@base/Shared/ChecklistSystem/ChecklistItem";
import { ChecklistFilePaths } from "@base/Shared";
import { TbmChecklist, TbmChecklistCategory } from "../Checklist";

export enum TbmNormalChecklistNames {
  AirspeedsForNormalOperation = "Airspeeds for normal operation",
  InsideInspection = "Inside inspection",
  BeforeStartingEngine = "Before starting engine",
  Motoring = "Motoring (if residual ITT > 150°C)",
  EngineStart = "Engine start",
  AfterEngineStartWithGPU = "After engine start with GPU",
  AfterEngineStart = "After engine start",
  BeforeTaxiing = "Before taxiing",
  BeforeLineUp = "Before line up",
  NormalTakeoff = "Normal takeoff",
  ShortTakeoff = "Short takeoff",
  AfterTakeoff = "After takeoff",
  Climb = "Climb",
  Cruise = "Cruise",
  BeforeDescent = "Before descent",
  Approach = "Approach",
  FinalOrDownwind = "Final approach (in GS) or downwind leg (VMC)",
  ShortFinal = "Short final (≈ 500 ft)",
  RunwayClear = "Runway clear",
  Shutdown = "Shutdown",
}

/** A utility class to generate normal checklist data. */
export class TbmNormalChecklists {
  /**
   * Generates the normal checklist data.
   * @returns An array of normal checklists.
   **/
  public static getChecklists(): TbmChecklist[] {
    return [
      new TbmChecklist(TbmNormalChecklistNames.AirspeedsForNormalOperation, TbmChecklistCategory.Normal, [
        { type: ChecklistItemType.PlainText, content: "Conditions:" },
        {
          type: ChecklistItemType.PlainText,
          content: "- Takeoff weight: 7394 lbs (3354 kg)",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- Landing weight: 7024 lbs (3186 kg)",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Rotation airspeed (Vʀ):",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Flaps TO",
          response: "90 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Best rate of climb speed (Vʏ):",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Landing gear\nand flaps UP",
          response: "124 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Best angle of climb speed (Vx):",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Landing gear\nand flaps UP",
          response: "100 KIAS",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "Maximum speed:" },
        {
          type: ChecklistItemType.Challenge,
          content: "Flaps TO",
          response: "178 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Flaps LDG",
          response: "122 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Maximum airspeed\nwith landing\ngear down",
          response: "178 KIAS",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Maximum landing gear operating airspeeds",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Extension",
          response: "178 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Retraction",
          response: "150 KIAS",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "Approach airspeed:" },
        {
          type: ChecklistItemType.Challenge,
          content: "Flaps LDG",
          response: "85 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Maximum\noperating speed\n(Vᴍᴏ)",
          response: "266 KIAS",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Glide speed (maximum L / D ratio)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Landing gear\nand flaps UP",
          response: "120 KIAS",
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.InsideInspection, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Cabin door\nand pilot door,\nif installed",
          response: "Closed / Locked",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Baggage",
          response: "Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. EMERGENCY\nEXIT pin",
          response: "Removed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Seat, pedals,\nharness",
          response: "Adjust / Lock",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. PASSENGER\nOXYGEN",
          response: "STBY",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. OXYGEN",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Crew oxygen\nmasks",
          response: "Test",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. EXT LIGHTS",
          response: "All OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. INT LIGHTS",
          response: "All OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. Crash lever",
          response: "Down",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. STARTER",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. IGNITION",
          response: "AUTO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. AUX BP",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. FUEL SEL",
          response: "MAN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. AP / TRIMS",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. A/C",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. SEATS HTRS\nMASTER",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. CB LIGHTS",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "19. MICRO / MASK",
          response: "MICRO / Guarded",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "20. DE ICE\nSYSTEM",
          response: "All OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "21. INERT SEP",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "22. PARK BRAKE",
          response: "Reset / ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "23. LANDING GEAR",
          response: "DN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "24. DUMP",
          response: "NORM / Guarded",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "25. BLEED",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "26. HOT AIR FLOW",
          response: "Fully turned to\nthe right",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "27. MAN OVRD",
          response: "Full backward\n(notched)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "28. THROTTLE",
          response: "CUT OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "29. FUEL TANK\nSELECTOR",
          response: "Open / L or R",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "30. ALTERNATE\nSTATIC SOURCE",
          response: "Pushed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "31. EMERGENCY\nRAM AIR",
          response: "Pushed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "32. ESS BUS TIE",
          response: "NORM / Guarded",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "33. Breakers",
          response: "All pushed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "34. Landing gear\nemergency pump\nhandle",
          response: "Check",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.BeforeStartingEngine, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Crash lever",
          response: "Up",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. ATIS",
          response: "Copied",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Start\nclearance",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. SOURCE",
          response: "BATT or GPU",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. GENERATOR",
          response: "MAIN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. TEST",
          response: "Press",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. LANDING GEAR\nLIGHTS / CHECK\nDOWN",
          response: "Test",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. MFD",
          response: "Initialize",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Fuel on board",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. Residual ITT",
          response: "Check",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If residual ITT > 150°C:",
        },
        {
          type: ChecklistItemType.Link,
          content: "11. Refer to Motoring procedure",
          linkTarget: {
            checklistName: TbmNormalChecklistNames.Motoring,
            checklistCategory: TbmChecklistCategory.Normal,
          },
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. VOLTS:\nBATT> 24.5 V /\nGPU ~ 28 V",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. CAS",
          response: "Check",
        },
      ]),
      new TbmChecklist(
        TbmNormalChecklistNames.Motoring,
        TbmChecklistCategory.Normal,
        [
          {
            type: ChecklistItemType.Challenge,
            content: "1. IGNITION",
            response: "OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "2. AUX BP",
            response: "ON",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "3. AUX BOOST PMP\nON",
            response: "Check ON",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "4. Propeller\narea",
            response: "Clear",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "5. STARTER",
            response: "ON\n2 sec then OFF",
          },
          {
            type: ChecklistItemType.PlainText,
            content: "After 30 seconds maximum:",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "6. STARTER",
            response: "ABORT\nThen OFF",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "7. AUX BP",
            response: "OFF",
          },
        ],
        false,
        true,
      ),
      new TbmChecklist(TbmNormalChecklistNames.EngineStart, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: After aborted engine starts, wait: 1 min / 5 min / 30 min before 2nd / 3rd / 4th new engine start.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. IGNITION",
          response: "AUTO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. AUX BP",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. AUX BOOST\nPMP ON",
          response: "Check ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Propeller\narea",
          response: "Clear",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. STARTER",
          response: "ON\n2 sec then OFF",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When Ng around 13 %:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. THROTTLE",
          response: "LO-IDLE",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. ITT, Ng, OIL °C\nand OIL PSI",
          response: "Monitor",
          imagePath: ChecklistFilePaths.ASSETS_PATH + "/max-engine-values.png",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "When" },
        {
          type: ChecklistItemType.PlainText,
          content: "- Ng > 50 % and,",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- 1 minute max:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Starter",
          response: "Check OFF\nautomatically",
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.AfterEngineStartWithGPU, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. SOURCE",
          response: "BATT",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. GPU",
          response: "Disconnect",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. GPU DOOR",
          response: "Check OFF",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.AfterEngineStart, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. THROTTLE",
          response: "LO-IDLE ▶ Flight IDLE",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Ng",
          response: "Check 70 % ± 2 %",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. OIL °C and\nOIL PSI",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. AUX BP",
          response: "AUTO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. FUEL SEL",
          response: "AUTO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. SHIFT",
          response: "Test",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. AP / TRIMS",
          response: "ON",
        },
        { type: ChecklistItemType.PlainText, content: "If BATT < 80 amps:" },
        {
          type: ChecklistItemType.Challenge,
          content: "8. GENERATOR",
          response: "ST-BY / Test",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. GENERATOR",
          response: "MAIN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. A/C",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. SEATS HTRS\nMASTER",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. BLEED",
          response: "AUTO or MAX DIFF",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.BeforeTaxiing, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Stand-by\ninstruments",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. DE ICE SYSTEM",
          response: "Test",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. INERT SEP",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Flight\ncontrols",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. TRIMS",
          response: "Test",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. FLAPS",
          response: "UP",
        },
        { type: ChecklistItemType.PlainText, content: "7. MFD" },
        {
          type: ChecklistItemType.Challenge,
          content: "a. FPL",
          response: "Set",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. LFE",
          response: "Set / Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. WX RADAR",
          response: "STBY",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. THROTTLE",
          response: "Feather twice",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. EIS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. TAXI lights",
          response: "ON",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.BeforeLineUp, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. LDG lights",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. NAV",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. STROBE",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. IGNITION",
          response: "As required\n(AUTO or ON)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. AUX BP",
          response: "AUTO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. FUEL SEL",
          response: "AUTO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. DE ICE SYSTEM",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. PITOT L HTR /\nPITOT R & STALL\nHTR",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. INERT SEP",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. TRIMS",
          response: "TO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. FLAPS",
          response: "TO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. A/C",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. BLEED",
          response: "AUTO or\nMAX DIFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. LFE",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. FUEL gages",
          response: "Check imbalance",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. BATT",
          response: "Check below\n50 amps",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. EIS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "19. Altimeters\nsetting",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "20. Instruments\ndeparture\nsetting",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "21. SID (PROC)",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "22. ALT SEL",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "23. XPDR squawk",
          response: "Set",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.NormalTakeoff, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. ADI, HSI,\nheadings",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. PROP RPM",
          response: "Green sector",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Brakes",
          response: "Release",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. TRQ",
          response: "100 %",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Rotation airspeed",
          response: null,
          imagePath: ChecklistFilePaths.ASSETS_PATH + "/rotation-airspeed.png",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Attitude",
          response: "10° Up",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When vertical speed is positive:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Brakes",
          response: "Apply",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. LANDING GEAR",
          response: "UP",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When airspeed above 115 KIAS:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. FLAPS",
          response: "UP",
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.ShortTakeoff, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. ADI, HSI,\nheadings",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. PROP RPM",
          response: "Green sector",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. TRQ",
          response: "100 %",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Brakes",
          response: "Release",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Rotation airspeed",
          response: null,
          imagePath: ChecklistFilePaths.ASSETS_PATH + "/rotation-airspeed.png",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Weight < 6579 lbs (2984 kg):",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Attitude",
          response: "15° Up",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Weight > 6579 lbs (2984 kg):",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Attitude",
          response: "12.5° Up",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When vertical speed is positive:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Brakes",
          response: "Apply",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. LANDING GEAR",
          response: "UP",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When airspeed above 115 KIAS:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. FLAPS",
          response: "UP",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.AfterTakeoff, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. LANDING GEAR",
          response: "Check UP",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. FLAPS",
          response: "Check UP",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. TRQ",
          response: "Check max 100 %",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. EIS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. DE ICE SYSTEM",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. INERT SEP",
          response: "As required",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.Climb, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. ALT SEL",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Altimeters\nsetting",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Autopilot",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. TRQ\nadjustment /\nITT / Ng",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. EIS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. WX RADAR",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8.\nPressurization",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. FUEL gages",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. AMPS / VOLTS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. DE ICE\nSYSTEM",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. INERT SEP",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. LDG lights",
          response: "As required",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.Cruise, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Altimeters\nsetting",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Autopilot",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. TRQ adjustment /\nITT / Ng",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. EIS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Pressurization",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. FUEL gages",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. AMPS / VOLTS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. DE ICE SYSTEM",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. INERT SEP",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. LDG lights",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. Top of\ndescent",
          response: "Computed",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.BeforeDescent, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Briefing\nbefore approach",
          response: "Completed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Altimeters\nsetting",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Pressurization",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. LFE",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. FUEL gages",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. AMPS / VOLTS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. DE ICE SYSTEM",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. INERT SEP",
          response: "As required",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.Approach, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Altimeters\nsetting (QNH)",
          response: "Set / Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Minimums",
          response: "Set / Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. COM / NAV /\nGPS",
          response: "Set / Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Pressurization",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. LFE",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. FUEL gages",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. AMPS / VOLTS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. DE ICE SYSTEM",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. INERT SEP",
          response: "ON",
        },
        { type: ChecklistItemType.PlainText, content: "Below FL 100:" },
        {
          type: ChecklistItemType.Challenge,
          content: "10. LDG lights",
          response: "ON",
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.FinalOrDownwind, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. LDG lights",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. LANDING GEAR",
          response: "DN\nCheck 3 green",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. FLAPS",
          response: "TO",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.ShortFinal, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. LANDING GEAR",
          response: "Check\nDN and 3 green",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. FLAPS",
          response: "LDG",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. AP / YD",
          response: "Disconnect",
        },
      ]),
      new TbmChecklist(TbmNormalChecklistNames.RunwayClear, TbmChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. TAXI light",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. NAV",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. STROBE",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. DE ICE SYSTEM",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. TRIMS",
          response: "Reset to TO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. FLAPS",
          response: "UP",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. A/C",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. XPDR",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. WX RADAR",
          response: "Check",
        },
      ]),
      new TbmChecklist(
        TbmNormalChecklistNames.Shutdown,
        TbmChecklistCategory.Normal,
        [
          {
            type: ChecklistItemType.Challenge,
            content: "1. PARK BRAKE",
            response: "Set / ON",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "2. EXT LIGHTS",
            response: "All OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "3. INT LIGHTS",
            response: "As required",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "4. OXYGEN",
            response: "OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "5. FUEL SEL",
            response: "MAN",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "6. AP / TRIMS",
            response: "OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "7. A/C",
            response: "OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "8. SEATS HTRS\nMASTER",
            response: "OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "9. BLEED",
            response: "OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "10. THROTTLE",
            response: "Flight IDLE\nFor 2 min",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "11. THROTTLE",
            response: "LO-IDLE\nFor 15 sec",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "12. THROTTLE",
            response: "CUT OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "13. INERT SEP",
            response: "OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "14. AUX BOOST\nPMP ON",
            response: "Check ON",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "15. AUX BP",
            response: "OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "16. GENERATOR",
            response: "OFF",
          },
          {
            type: ChecklistItemType.PlainText,
            content: "When inertial separator is retracted, after approximately 40 sec:",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "17. SOURCE",
            response: "OFF",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "18. Crash lever",
            response: "Pull down",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "19. Stand-by\ninstruments",
            response: "OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "20. Oxygen\ncylinder (right\nwing fairing)",
            response: "Close",
          },
          {
            type: ChecklistItemType.PlainText,
            content: "21. Install air inlet and static port plugs, and exhaust and pitot covers.",
          },
          {
            type: ChecklistItemType.Note,
            content: "NOTE: Be careful of exhaust stubs temperature before installing covers.",
          },
          {
            type: ChecklistItemType.Note,
            content: "NOTE: 15 to 20 minutes after the engine shutdown, check engine oil level.",
          },
        ],
        true,
      ),
    ];
  }
}
