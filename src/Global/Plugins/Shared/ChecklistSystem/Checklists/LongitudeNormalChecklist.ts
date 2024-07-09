import {
  ChecklistItemInteractionType,
  ChecklistItemType,
  Justification,
} from "@base/Shared/ChecklistSystem/ChecklistItem";
import { LongitudeChecklist, LongitudeChecklistCategory } from "../Checklist";

export enum LongitudeNormalChecklistNames {
  CockpitCabinInspection = "Cockpit/Cabin Inspection",
  CockpitPreparation = "Cockpit Preparation",
  BeforeStart = "Before Start",
  StartingEnginesUsingAPU = "Starting Engines (Using APU)",
  BeforeTaxi = "Before Taxi",
  Taxi = "Taxi",
  BeforeTakeoff = "Before Takeoff",
  Takeoff = "Takeoff",
  AfterTakeoffClimb = "After Takeoff/Climb",
  Cruise = "Cruise",
  Descent = "Descent",
  Approach = "Approach",
  BeforeLanding = "Before Landing",
  Landing = "Landing",
  GoAround = "Go-Around",
  AfterLanding = "After Landing",
  Shutdown = "Shutdown",
  QuickTurn = "Quick Turn",
  StartingAPU = "Starting APU",
  EngineDryMotor = "Engine Dry Motor",
  StartingEnginesUsingAlternativeSources = "Starting Engines (Using Cross-Bleed or External Pneumatic)",
  TurbulentAirPenetration = "Turbulent Air Penetration",
  CockpitControls = "Expanded Preflight, Cockpit Controls",
  Trims = "Expanded Preflight, Trims",
  Initialization = "Expanded Preflight, Initialization",
  IceProtectionSystems = "Expanded Preflight, Ice Protection Systems",
  NoiseAbatement = "Noise Abatement",
}

/** A utility class to generate normal checklist data. */
export class LongitudeNormalChecklists {
  /**
   * Generates the normal checklist data.
   * @returns An array of normal checklists.
   **/
  public static getChecklists(): LongitudeChecklist[] {
    return [
      new LongitudeChecklist(LongitudeNormalChecklistNames.CockpitCabinInspection, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Documents",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. First Aid Kit",
          response: "Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Cabin",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. Emergency\nExit",
          response: "Secure/Clear/\nLock Pin Removed/\nCover In Place",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. Life Vests\n(if required)",
          response: "Stowed",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. Seats/Seat Belts",
          response: "Condition",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "d. Cabin Fire\nExtinguishers (2)/\nSmoke Hood",
          response: "Serviced/Secured",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Cockpit Fire\nExtinguisher/\nSmoke Hood",
          response: "Serviced/Secured",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Circuit Breakers (CBs)",
          response: "In",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. STBY PWR Switch",
          response: "TEST and Hold\n(Green light for\nminimum 10\nseconds)/ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. EMER LTS Switch",
          response: "ARM/Check\nCabin Lights",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. LANDING GEAR\nHandle",
          response: "DOWN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. BATT Buttons\n(both)",
          response: "ON, Check Volts",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. EIS/CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "If the white FUEL SCAV ON L-R CAS message had not been observed approximately one minute after powering up, then re-conduct the Power On Auto test by selecting the Power On Auto Button (MFD GTC: Home > Aircraft Systems > Controls > Systems Tests) and verifying the white FUEL SCAV ON L-R CAS message displays in approximately 30 seconds.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. Electrical Power\nSource",
          response: "As Desired",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. EXT PWR Button\n(if AVAIL illuminated)",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. BATT Amps (both)",
          response: "0 or Charging",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- AND/OR -",
          justification: Justification.Center,
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. APU Knob",
          response: "ON/START",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(Refer to Normal Procedures, Starting APU.)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. External Power",
          response: "Disconnected\n(AVAIL light\nextinguished)",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. BATT Amps (both)",
          response: "0 or Charging",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. Smoke Goggles",
          response: "Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. Oxygen Pressure\nand Masks",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content:
            "a. O2 PRESSURE\n(for full cylinder)\n(MFD GTC: Home >\nAircraft Systems >\nSynoptics > Summary\nor Pre-Flight)",
          response: "Check Per Table",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Temp (deg C)/ PSI (+/- 100) ______________________________________ -40/1300 0/1500 20/1800 40/2000 50/2100",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Refer to Volume 2, Normal Procedures, Oxygen Duration Charts, for takeoff pressures with less than full oxygen cylinder.",
        },
        {
          type: ChecklistItemType.Warning,
          content: "WARNING",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Warning,
          content:
            "Some eyeglasses, headsets, hats, and hairstyles can interfere with the quick donning capability of the mask. It is the crew members' responsibility to make sure the mask can be donned quickly.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. Oxygen Masks",
          response: "Test/Stowed/\n100%",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(1) MIC SEL\nButtons\n(both)",
          response: "MASK\n(MIC/INPH Switches,\noutboard to enable\nintercom)",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(2) Mask Box\nPRESS TO TEST\nAND RESET Button",
          response: "Push and Hold",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(3) Mask PRESS\nTO TEST\nButton",
          response: "Push (3 seconds),\nCheck Volume\n(Verify blinker turns\nyellow and oxygen\nflows.)",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(4) MIC SEL\nButtons\n(both)",
          response: "HEADSET\n(MIC/INPH Switches,\ncenter to enable auto\nsquelch)",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. HYDRAULICS Data\n(MFD GTC: Home\n> Aircraft Systems >\nSynoptics > Summary)",
          response: "Check for\nValid Data",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. Exterior/Interior\nLights",
          response: "ON/Check/Off,\nor as Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. CONTROL LOCK\nHandle",
          response: "As Desired",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.CockpitPreparation, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Preflight Inspection",
          response: "Complete",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. EIS/CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. APU Knob (if not\nalready started)",
          response: "ON/START",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(Refer to Normal Procedures, Starting APU.)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. External Power\n(if used)",
          response: "Disconnected\n(AVAIL extinguished)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Engine Dry Motor",
          response: "Consider",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(Refer to Normal Procedures, Engine Dry Motor.)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. ATIS/Clearance",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Cockpit Controls",
          response: "Check/Set",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(Refer to Normal Procedures, Expanded Preflight Procedures.)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Trims (3)",
          response: "Check/Set for Takeoff",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(Refer to Normal Procedures, Expanded Preflight Procedures.)",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Stab Trim Postiion - %MAC/Stab _____________________________________ 24%/-6.4 26%/-5.8 28%/-5.1 30%/-4.5 32%/-3.9 34%/-3.2 36%-40%/-2.6",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Initialization\n(MFD GTC: Home >INIT\nor Home > Utilities >\nInitialization)",
          response: "Complete",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(Refer to Normal Procedures, Expanded Preflight Procedures.)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. V Speeds",
          response: "Set",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Simplified performance criteria is provided for cases where runway length is appreciably longer than takeoff field length required. Refer to Volume 1, Section IV, Takeoff and Landing, for performance data for other conditions.",
        },
        {
          type: ChecklistItemType.Subtitle,
          content: "Takeoff Simplified Criteria",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Static Takeoff, No Obstacles, Ice Protection OFF, APR Auto, No Tailwind, Dry Rwy, Press Alt at or below 3000 ft, Ambient temp at or below 35 deg C, Flaps: Takeoff/Approach - 2, Landing - FULL Rwy Grad: Takeoff 0% to -2%, Landing -2% to 2% Max Brake Temp: Before Taxi 150 deg C Before Takeoff 195 deg C",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "_________________________________________\nWeight V1/VR/V2/VFTO Rwy Lgth APP/VREF\n24-28k, 99/103/117/185 (>4000) [124/113]\n28-32k, 109/112/124/185 (>4700) [134/123]\n32-33.5k 114/115/126/185 (>5000) [137/125]\n33.5-36.5k 121/122/131/185 (>5800) [144/131*]\n36.5-39.5k 128/128/137/185 (>7100) [149/136*]",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "__________________________________________\n*For use in an emergency landing. Maximum design landing weight is 33,500 pounds. Landing at weights above 33,500 pounds can exceed the Landing Brake Energy Limit.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. Pressurization\nLDG ELEV",
          response: "Verify/Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. Fuel Quantity\nand Balance",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. Autopilot",
          response: "Engage/Disengage",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.BeforeStart, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "Do not start engines unless wheels are chocked or the white PARK BRAKE ON CAS message is displayed.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. EMER/PARK BRAKE\nHandle",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Wheel Chocks\n(if white PARK BRAKE\nON CAS message\ndisplayed)",
          response: "Removed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Cabin Door/\nCabin Door Curtain",
          response: "Closed/Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Passenger Briefing",
          response: "Complete",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Cabin Divider\n(if installed)",
          response: "Secured Open",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Seats/Seat Belts/\nShoulder Harnesses/\nPedals",
          response: "Adjusted/\nFastened",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. SEAT BELTS Button",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. EIS/CAS",
          response: "Check",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.StartingEnginesUsingAPU, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.PlainText,
          content:
            "Refer to Volume 2, Normal Procedures, Cold Weather Operations, prior to attempting an engine start, if prolonged exposure to ambient air temperatures below 0 deg C has occurred.",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "Do not attempt an engine start with a tailwind component greater than 16 knots.\nTo maintain ITT below the start limits, the engine ITT should be 450 deg C or less prior to start initiation.",
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "Although FADEC will automatically terminate an abnormal start, it cannot ensure start limits are not exceeded. The pilot must monitor the start for the abort limits in Step 5.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. Throttles",
          response: "IDLE",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. ENGINE RUN/STOP\nButton (either engine)",
          response: "RUN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. START Pressure",
          response: "Verify 32 PSI or more",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. ENGINE STARTER\nButton",
          response: "Push",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Engine Instruments",
          response: "Monitor",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "a. Abort start if no ITT rise within 20 seconds.\nb. Abort start if no oil pressure rise by 30% N2.\nc. Abort start if ITT will exceed red line.\nd. Abort start if stabilized idle is not achieved within 50 seconds of initial ITT rise.",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "Operate engine at or near idle for 3 minutes after engine start and until oil temperature increases to normal. Thrust used during taxi operations is acceptable.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Opposite Engine",
          response: "Repeat Steps 1\nthru 5",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. EIS/CAS",
          response: "Check",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.BeforeTaxi, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Wheel Chocks",
          response: "Removed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Cockpit Speakers\n(GTC: Audio & Radios)",
          response: "As Desired",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Flight Controls/\nNosewheel Steering\nDisconnect",
          response: "Free and Correct/\nCheck",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Speedbrakes",
          response: "Check/Retracted",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Flaps",
          response: "Set for Takeoff",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. PTCU",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. EMER/PARK BRAKE\nHandle (while holding\ntoe brakes)",
          response: "Stow,\nthen Set",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. Hydraulics\nSynoptic\n(MFD GTC: Home\n> Aircraft Systems >\nSynoptics > Summary\nor Hydraulics)",
          response: "Select",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. HYDRAULICS PUMP\nSwitch (either one)",
          response: "MIN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "d. Verify selected side hydraulic\npressure cycles anywhere within:",
          response: null,
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "(1) 1400 to 2900 PSI (if HYDRAULIC PUMP Switch A is selected)\n(2) 1800 to 3250 PSI (if HYDRAULIC PUMP Switch B is selected)",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "e. HYDRAULICS PUMP\nSwitch (selected side)",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Flight Instruments/\nAvionics",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. Attitude &\nHeading, Air Data\nDisplays",
          response: "Aligned/No Flags",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. Altimeters",
          response:
            "Confirm and Compare\n(within 75 feet of\nknown field elevation\nwith local altimeter\nsetting and within 50\nfeet of each other)",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. ICE PROTECTION\nButtons",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "Time with WING ICE PROTECTION button ON and thrust settings higher than idle while stationary must not exceed 15 seconds.",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.Taxi, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Exterior Lights",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. EMER/PARK BRAKE\nHandle",
          response: "Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Brakes",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Nosewheel Steering",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Thrust Reversers",
          response: "Check,\nas Required/\nStowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. Deploy\n(Reverse Idle)",
          response: "Verify Green\nT/R DEPLOY\nIndications Display",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. Stow",
          response: "Verify Indications Clear",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. CONTROL LOCK\nHandle",
          response: "As Desired",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.BeforeTakeoff, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Flaps",
          response: "Set for Takeoff",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Speedbrakes",
          response: "Retracted",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Trims (3)",
          response: "Set for Takeoff",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Ice Protection\nSystems",
          response: "Check, as Required",
        },
        {
          type: ChecklistItemType.Link,
          content: "(Refer to Normal Procedures, Expanded Preflight Procedures.)",
          linkTarget: {
            checklistName: LongitudeNormalChecklistNames.IceProtectionSystems,
            checklistCategory: LongitudeChecklistCategory.Normal,
          },
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. V Speeds",
          response: "Displayed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. SPD Knob",
          response: "FMS",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Crew Briefing",
          response: "Complete",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "a. If Rolling Takeoff Planned, Add 500 Feet to Computed Takeoff Distance.",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Radar",
          response: "As Required",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- CLEARED FOR TAKEOFF -",
          justification: Justification.Center,
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. CONTROL LOCK\nHandle",
          response: "UNLOCK",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. Flight Controls",
          response: "Free",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. ICE PROTECTION\nButtons",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Exterior Lights",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. EIS/CAS",
          response: "Check",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.Takeoff, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "During takeoff, no changes should be made to the ENGINE or WING ICE PROTECTION buttons until above 400 feet AGL, as engine overtemperatures can occur.",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content: "Autothrottle is inhibited during takeoff and up to 400 feet AGL.",
        },
        { type: ChecklistItemType.Subtitle, content: "Static Takeoff" },
        {
          type: ChecklistItemType.Challenge,
          content: "1. Throttles",
          response: "TO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Brakes",
          response: "Release",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. EIS/CAS",
          response: "Check (N1 matches\ncommand, green TO)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Elevator Control",
          response: "Rotate at VR\n(10 deg initial pitch)",
        },
        { type: ChecklistItemType.Subtitle, content: "Rolling Takeoff" },
        {
          type: ChecklistItemType.Challenge,
          content: "1. Brakes",
          response: "Release",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Throttles",
          response: "TO (within 500 feet\nafter brake release)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. EIS/CAS",
          response: "Check (N1 matches\ncommand, green TO)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Elevator Control",
          response: "Rotate at VR\n(10 deg initial pitch)",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.AfterTakeoffClimb, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Landing Gear\n(at positive rate of\nclimb)",
          response: "Up",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Flaps (at or\nabove V2 + 20 knots)",
          response: "Up",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Throttles",
          response: "CLB",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. ICE PROTECTION\nButtons",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Pressurization",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. SEAT BELTS Button",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Altimeters\n(at transition altitude)",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Exterior Lights",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. APU Knob (prior to\nclimb above FL350)",
          response: "OFF",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.Cruise, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Throttles",
          response: "CRU or as Desired",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content: "AT (if used) will decrease to CRU 10 minutes after level off.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Oxygen Mask\n(when required)",
          response: "Don and NORM",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. MIC SEL Button",
          response: "MASK",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. MIC/INPH Switch",
          response: "Outboard,\nas Required to\nEnable Intercom",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Autopilot\n(if in RVSM airspace)",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Altimeters\n(if in RVSM airspace)",
          response: "Crosscheck\n(within 200 feet at 1\nhour intervals or less)",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.Descent, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Pressurization\nLDG ELEV",
          response: "Verify Landing Elevation",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Altimeters\n(at transition level)",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. APU Knob\n(at or below 15,000\nfeet with 72% N2\nMinimum)",
          response: "ON/START, as Desired",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(Refer to Normal Procedures, Starting APU.)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Exterior Lights",
          response: "As Required",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.Approach, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Landing Data",
          response: "Confirm",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. V Speeds",
          response: "Set",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. Landing Distance",
          response: "Calculate",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "Simplified performance criteria is provided for cases where runway length is appreciably longer than landing field length required. Refer to Volume 1, Section IV, Landing for performance data for other conditions.",
        },
        {
          type: ChecklistItemType.Subtitle,
          content: "Landing Simplified Criteria",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "IDLE at 50 ft, Ice Protection Off, Flaps: Approach - 2, Landing - FULL, No Tailwind, Dry Rwy, Rwy Grad:-0.5% to 2%, Rwy Length 4200 ft or longer, Press Alt at or below 4000 ft, Ambient Temp at or below 40 deg C",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "____________________________________\nWeight VAPP/VREF\n23.5k 113/104\n25.5k 118/108\n27.5k 123/112\n29.5k 128/116\n31.5k 133/121\n33.5k 137/125",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. ICE PROTECTION\nButtons",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Flight Instruments/\nAvionics",
          response: "Check/Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. FMS/\nNavigation Aids",
          response: "Set, as Required",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. Minimums",
          response: "Set",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. Altimeters",
          response: "Verify Setting",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Crew Briefing",
          response: "Complete",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Flaps",
          response: "1 or 2, when Desired",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Passenger Briefing",
          response: "Complete",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Cabin Divider\n(if installed)",
          response: "Secured Open",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Cabin Door Curtain",
          response: "Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Seats/Seat Belts/\nShoulder Harnesses",
          response: "Adjusted/\nFastened",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. SEAT BELTS Button",
          response: "ON",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.BeforeLanding, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Landing Gear",
          response: "Down (3 Green)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Flaps",
          response: "Full",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Exterior Lights",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Speedbrakes",
          response: "Retracted",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. EIS/CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Autopilot (prior to\nminimum use height)",
          response: "Disengage",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Autothrottle\n(prior to 50 feet AGL)",
          response: "Disengage",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Airspeed (minimum)",
          response: "VREF",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.Landing, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Throttles",
          response: "IDLE",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Brakes\n(after nosewheel\ntouchdown)",
          response: "Apply",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Thrust Reversers\n(after nosewheel\ntouchdown)",
          response: "Deploy\n(Reverse Idle\nby 45 KIAS)",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.GoAround, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. TO/GA Button\n(either throttle)",
          response: "Push",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "The autopilot, if engaged, will disengage and the aural will sound continuously until cancelled.\nThe autothrottle, if engaged, will move the throttles to the TO position.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Throttles",
          response: "TO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Pitch Attitude",
          response: "7.5 deg\nNose Up Initially",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Flaps",
          response: "2",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Climb Airspeed",
          response: "VAPP (Minimum)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Landing Gear\n(at positive rate of\nclimb)",
          response: "Up",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "If the landing gear is retracted before the flaps reach 2, the landing gear aural will sound briefly.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Flaps (at or\nabove VAPP\n+ 10 knots)",
          response: "Up",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. SPD Knob",
          response: "FMS",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Throttles",
          response: "As Required",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.AfterLanding, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Thrust Reversers",
          response: "Stow",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Flaps",
          response: "As Desired",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. ICE PROTECTION:",
          response: null,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. ENGINE Buttons\n(both)",
          response: "As Required",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. WING Button",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. STAB Button",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Exterior Lights",
          response: "As Required",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.Shutdown, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Throttles",
          response: "IDLE",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "Engines must remain at or near idle for a minimum of 3 minutes prior to shutdown to allow the engine inter-turbine temperatures to stabilize. Landing rollout and taxi time at or near idle may be included.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. EMER/PARK BRAKE\nHandle",
          response: "Set (white\nPARK BRAKE ON\nCAS message\ndisplayed)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. ENGINE ICE\nPROTECTION Buttons\n(both)",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. ENGINE RUN/STOP\nButtons (both)",
          response: "STOP",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. SEAT BELTS Button",
          response: "Off",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. EMER LTS Switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. STBY PWR Switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. APU Knob",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Exterior Lights",
          response: "Off",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. CONTROL LOCK\nHandle",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. BATT Buttons (both)\n(3 minutes after STOP\nfor FADEC data\ndownload)",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. Engine Inlet and\nExhaust Covers",
          response: "As Required",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "a. Engine inlet and exhaust covers should be installed to prevent FOD ingestion.",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. Engine and\nAPU Oil Levels",
          response: "Check, as Desired",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(Refer to Volume 2, Normal Procedures, Refuel/Defuel Panel.)",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content: "Oil levels are most accurate between 5 and 30 minutes after engine shutdown.",
        },
        {
          type: ChecklistItemType.Challenge,
          content:
            "14. If the ambient air temperature is,\nor is anticipated to fall below 0 deg C,\nrefer to Volume 2, Normal Procedures,\nCold Weather Operations for\nparking/securing.",
          response: null,
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.QuickTurn, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Throttles",
          response: "IDLE",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "Engines must remain at or near idle for a minimum of 3 minutes prior to shutdown to allow the engine inter-turbine temperatures to stabilize. Landing rollout and taxi time at or near idle may be included.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. EMER/PARK BRAKE\nHandle",
          response: "Set (white\nPARK BRAKE ON\nCAS message\ndisplayed)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. ENGINE ICE\nPROTECTION Buttons\n(both)",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. ENGINE RUN/STOP\nButtons (both)",
          response: "STOP",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. SEAT BELTS Button",
          response: "Off",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Exterior Lights",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. APU Knob",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. EIS/CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "If the white FUEL SCAV ON L-R CAS message had not been observed approximately one minute after powering up, then re-conduct the Power On Auto test by selecting the Power On Auto Button (MFD GTC: Home > Aircraft Systems > Controls > Systems Tests) and verifying the white FUEL SCAV ON L-R CAS message displays in approximately 30 seconds.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Main Batteries\nConnected",
          response: "Check",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "a. Verify all displays remain powered and BUS TIE Button indicates OPEN.",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. STBY PWR Switch",
          response: "TEST and Hold\n(Green Light\nfor Minimum 10\nSeconds)/ON",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "a. White NO STANDBY DATA CAS message will display during the test and remain until SFD aligns; no crew action required if message clears.",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "b. Amber RUDDER MAINTENANCE CAS message will display and remain for approximately 2 minutes; no crew action required if message clears.",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. Electrical Power\nSource",
          response: "As Desired",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. APU Knob\n(if not running)",
          response: "ON/START",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(Refer to Normal Procedures, Starting APU.)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. BATT Amps\n(both)",
          response: "0 or Charging",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- OR -",
          justification: Justification.Center,
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. EXT PWR Button\n(if AVAIL illuminated)",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. BATT Amps\n(both)",
          response: "0 or Charging",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content:
            "12. As necessary, refer to Volume 1,\nSection IV, Takeoff, Minimum\nTurn-Around Time and Maximum Brake\nTemperature.",
          response: null,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. Oxygen Pressure\nand Masks",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content:
            "a. O2 PRESSURE\n(for full cylinder)\n(MFD GTC: Home >\nAircraft Systems >\nSynoptics > Summary\nor Pre-Flight)",
          response: "Check Per Table",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Temp (deg C)/ PSI (+/- 100) ______________________________________ -40/1300 0/1500 20/1800 40/2000 50/2100",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Refer to Volume 2, Normal Procedures, Oxygen Duration Charts, for takeoff pressures with less than full oxygen cylinder.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. Oxygen\nMasks",
          response: "Test/Stowed/100%",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(1) MIC SEL\nButtons\n(both)",
          response: "MASK\n(MIC/INPH Switches,\noutboard to enable\nintercom)",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(2) Mask Box\nPRESS TO\nTEST AND\nRESET Button",
          response: "Push and Hold",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(3) Mask\nPRESS\nTO TEST\nButton",
          response: "Push (3 seconds),\nCheck Volume\n(Verify blinker turns\nyellow and oxygen\nflows.)",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(4) MIC SEL\nButtons\n(both)",
          response: "HEADSET\n(MIC/INPH Switches,\ncenter to enable auto\nsquelch)",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Link,
          content: "14. Return to Normal Procedures, Cockpit Preparation.",
          linkTarget: {
            checklistName: LongitudeNormalChecklistNames.CockpitPreparation,
            checklistCategory: LongitudeChecklistCategory.Normal,
          },
          justification: Justification.Indent1,
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.StartingAPU, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.PlainText,
          content:
            "Refer to Volume 2, Normal Procedures, Cold Weather Operations, prior to attempting an APU start if prolonged exposure to ambient air temperatures below 0 deg C has occurred.",
        },
        {
          type: ChecklistItemType.Warning,
          content: "WARNING",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Warning,
          content:
            "When on ground, the airplane batteries must be installed and the BATT buttons (both) selected ON prior to and during all APU operations to assure fire protection system power.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. EIS/CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "Attempting an APU start is prohibited with an amber BATTERY VOLTS L and/or R CAS messsage displayed.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. APU Knob",
          response: "ON",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "a. Red APU FIRE button illuminates momentarily, then extinguishes.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "b. Green digits for APU RPM% and EGT deg C are displayed within 10 seconds of selecting ON.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "With engine generator(s) online, maximum altitude for APU starts is at or below 15,000 feet and requires 72% N2 minimum. With main batteries only, maximum altitude for APU starts is FL310.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. APU Knob",
          response: "START (Release after\n1 second.)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. APU RPM",
          response: "Stabilizes 98%-100%",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. APU BLEED Button",
          response: "NORM",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. APU GEN Switch",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Environmental\nControls",
          response: "As Desired",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.EngineDryMotor, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.PlainText,
          content:
            "Engine life can be affected if ground starts are initiated between 15 and 180 minutes after engine shutdown. If engine restarts are desired within this time period, an engine dry motor is recommended. After completion of the dry motor, a normal engine start sequence can be initiated any time after 3 minutes and before 40 minutes have elapsed. If the 40-minute duration has elapsed prior to start, and the total duration since shutdown has not exceeded 180 minutes, this engine dry motor procedure should be repeated.",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "If this procedure is used to assist with setting the parking brake and the white ENG DRY MTR PROC CAS message is not displayed, then the 3-minute wait after dry motoring is not required.",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "Engine starter operation requires bleed air from the APU, external pneumatic cart, or opposite engine.\nObserve engine starter limits. Refer to Volume 1, Section II, Engine Start Limits.\nIf using opposite engine bleed air, the running engine should be IDLE + 25% N1 Minimum, then returned to IDLE when dry motor is complete.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. Throttle\n(affected side)",
          response: "IDLE",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. ENGINE RUN/STOP\nButton (affected side)",
          response: "STOP",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. ENGINE STARTER\nButton (affected side)",
          response: "Push and Hold",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. ENGINE STARTER\nButton (affected side)",
          response: "Release\nwhen N2\nReaches 19% or 15\nSeconds (whichever\noccurs first)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Delay Before\nNext Start\nAttempt",
          response: "When White\nENG DRY\nMTR PROC L and/or R\nCAS Message Clears",
        },
      ]),
      new LongitudeChecklist(
        LongitudeNormalChecklistNames.StartingEnginesUsingAlternativeSources,
        LongitudeChecklistCategory.Normal,
        [
          {
            type: ChecklistItemType.PlainText,
            content:
              "Refer to Volume 2, Normal Procedures, Cold Weather Operations, prior to attempting an engine start, if prolonged exposure to ambient air temperatures below 0 deg C has occurred.",
          },
          {
            type: ChecklistItemType.Caution,
            content: "CAUTION",
            interactionType: ChecklistItemInteractionType.NoScrollStop,
          },
          {
            type: ChecklistItemType.Caution,
            content:
              "Do not attempt an engine start with a tailwind component greater than 16 knots.\nTo maintain ITT below the start limits, the engine ITT should be 450 deg C or less prior to start initiation.",
          },
          {
            type: ChecklistItemType.Caution,
            content:
              "Although FADEC will automatically terminate an abnormal start, it cannot ensure start limits are not exceeded. The pilot must monitor the start for the abort limits in Step 5.",
          },
          { type: ChecklistItemType.Subtitle, content: "Using Cross-Bleed" },
          {
            type: ChecklistItemType.Challenge,
            content: "1. BLEED ISOLATE\nButton",
            response: "NORM",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "2. Throttle\n(running engine)",
            response: "IDLE +25% N1\nminimum",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "3. Non-Running Engine:",
            response: null,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Throttle",
            response: "IDLE",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. ENGINE RUN/STOP\nButton",
            response: "RUN",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "c. START Pressure",
            response: "Verify 32 PSI or more",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "d. ENGINE STARTER\nButton",
            response: "Push",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "e. Engine\nInstruments",
            response: "Monitor",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.PlainText,
            content:
              "(1) Abort start if no ITT rise within 20 seconds.\n(2) Abort start if no oil pressure rise by 30% N2.\n(3) Abort start if ITT will exceed red line.\n(4) Abort start if stabilized idle is not achieved within 50 seconds of initial ITT rise.",
            justification: Justification.Indent3,
          },
          {
            type: ChecklistItemType.Note,
            content: "NOTE",
            interactionType: ChecklistItemInteractionType.NoScrollStop,
          },
          {
            type: ChecklistItemType.Note,
            content:
              "Operate engine at or near idle for 3 minutes after engine start and until oil temperature increases to normal. Thrust used during taxi operations is acceptable.",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "4. Throttles",
            response: "IDLE",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "5. EIS/CAS",
            response: "Check",
          },
          {
            type: ChecklistItemType.Subtitle,
            content: "Using External Pneumatic",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "1. External Pneumatic\nSource",
            response: "Connect",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "2. Throttles",
            response: "IDLE",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "3. ENGINE RUN/STOP\nButton (either engine)",
            response: "RUN",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "4. START Pressure",
            response: "Verify 32 PSI or more",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "5. ENGINE STARTER\nButton",
            response: "Push",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "6. Engine Instruments",
            response: "Monitor",
          },
          {
            type: ChecklistItemType.PlainText,
            content:
              "a. Abort start if no ITT rise within 20 seconds.\nb. Abort start if no oil pressure rise by 30% N2.\nc. Abort start if ITT will exceed red line.\nd. Abort start if stabilized idle is not achieved within 50 seconds of initial ITT rise.",
            justification: Justification.Indent2,
          },
          {
            type: ChecklistItemType.Note,
            content: "NOTE",
            interactionType: ChecklistItemInteractionType.NoScrollStop,
          },
          {
            type: ChecklistItemType.Note,
            content:
              "Operate engine at or near idle for 3 minutes after engine start and until oil temperature increases to normal. Thrust used during taxi operations is acceptable.",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "7. Opposite Engine",
            response: "Start",
          },
          {
            type: ChecklistItemType.PlainText,
            content: "If External Pneumtic:",
            justification: Justification.Indent2,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Repeat Steps 2 thru 6\n(opposite engine)",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. External\nPneumatic Source",
            response: "Disconnect",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.PlainText,
            content: "If Cross-Bleed:",
            justification: Justification.Indent2,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "a. External\nPneumatic Source",
            response: "Disconnect",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. Throttle\n(non-running engine)",
            response: "IDLE",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "c. Throttle\n(running engine)",
            response: "IDLE +25% N1\nminimum",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "d. ENGINE RUN/STOP\nButton\n(non-running engine)",
            response: "RUN",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "e. Repeat steps 4 thru 6\n(non-running engine)",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Note,
            content: "NOTE",
            interactionType: ChecklistItemInteractionType.NoScrollStop,
          },
          {
            type: ChecklistItemType.Note,
            content:
              "Operate engine at or near idle for 3 minutes after engine start and until oil temperature increases to normal. Thrust used during taxi operations is acceptable.",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "8. EIS/CAS",
            response: "Check",
          },
        ],
      ),
      new LongitudeChecklist(LongitudeNormalChecklistNames.TurbulentAirPenetration, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Note,
          content: "NOTE",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "Flight through severe turbulence should be avoided. The following procedures are recommended if severe turbulence is encountered.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. Maximum Airspeed",
          response: "235 KIAS or\nMach 0.75\n(whichever is less)\n(Do not chase airspeed.)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Maintain a constant attitude without\nchasing altitude.\nAvoid sudden large control movements.",
          response: null,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Autopilot\n(if engaged)",
          response: "Disengage Altitude\nHold",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Autothrottle",
          response: "Disengage",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. SEAT BELTS Button",
          response: "ON",
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.CockpitControls, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "7. Cockpit Controls",
          response: "Check/Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. L PFD GTC DIM\nKnobs",
          response: "Adjusted",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. MAP LIGHT Knob",
          response: "As Desired",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. Left MIC SEL\nButton",
          response: "HEADSET",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "d. Left DISPLAY REV\nButton",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "e. COM 1 TUNE\nButton",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "f. PAX OXYGEN Knob",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "g. MAIN Buttons\n(both)",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "h. ELEC Buttons\n(both)",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "i. INTERIOR Button",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "j. GEN Switches (3)",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "k. MFD GTCs DIM\nKnobs",
          response: "Adjusted",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "l. PRIMARY STAB TRIM\nButton",
          response: "A",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "m. SECONDARY TRIM\nButton",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "n. FUEL RECIRC PUMP\nButton",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "o. CONTROL LOCK\nHandle",
          response: "As Desired",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "p. EMER GEAR\nRELEASE Handle",
          response: "Stowed",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "q. PITCH/ROLL\nDISCONNECT Handle",
          response: "NORM/\nPushed Down",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "r. APU BLEED Button",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "s. ENG BLEED Buttons\n(both)",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "t. BLEED ISOLATE\nButton",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "u. PRESS SOURCE\nButtons (both)",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "v. FLOW Button",
          response: "As Desired",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "w. CABIN DUMP\nButton",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "x. PRESS MODE\nButton",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "y. CABIN TEMP Knob",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "z. ECS Knob",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "aa. CKPT TEMP Knob",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ab. ENGINE RUN/STOP\nButtons (both)",
          response: "STOP",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ac. FUEL TRANSFER\nKnob",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ad. FUEL GRAVITY\nXFLOW Button",
          response: "CLOSED",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ae. FUEL BOOST\nPUMP Buttons (both)",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "af. RUDDER STANDBY\nButton",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ag. PTCU Knob",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ah. HYDRAULICS\nPUMP Switches (both)",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ai. LANDING GEAR\nHandle",
          response: "GEAR DOWN\n(3 Green)",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "aj. ICE PROTECTION\nButtons",
          response: null,
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(1) ENGINE Buttons\n(both)",
          response: "OFF",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(2) WING Button",
          response: "OFF",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(3) STAB Button",
          response: "OFF",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(4) PITOT/STATIC\nButton",
          response: "NORM",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ak. ELT Switch",
          response: "ARM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "al. COM 2 TUNE\nButton",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "am. Right DISPLAY\nREV Button",
          response: "NORM",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "an. Right MIC SEL\nButton",
          response: "HEADSET",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ao. MAP LIGHT Knob",
          response: "As Desired",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ap. R PFD GTC DIM\nKnobs",
          response: "Adjusted",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "aq. MANUAL POWER\nRESERVE Button",
          response: "Not Illuminated",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ar. AUTO POWER\nRESERVE Button",
          response: "Not Illuminated",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "as. SPD Knob",
          response: "FMS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "at. LIGHTS Buttons\nand Knobs",
          response: "As Desired",
          justification: Justification.Indent1,
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.Trims, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "8. Trims (3)",
          response: "Check/Set for Takeoff",
        },
        { type: ChecklistItemType.Subtitle, content: "SECONDARY STAB TRIM" },
        {
          type: ChecklistItemType.Challenge,
          content: "a. SECONDARY TRIM\nButton",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Amber STAB TRIM FAIL A-B and white AP FAIL CAS messages display.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. SECONDARY TRIM\nSwitch (both halves)",
          response: "NOSE DOWN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify proper stabilizer trim movement on the EIS.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. SECONDARY TRIM\nSwitch (both halves)",
          response: "NOSE UP",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify proper stabilizer trim movement on the EIS.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "d. SECONDARY TRIM\nSwitch (left half only)",
          response: "NOSE DOWN/\nNOSE UP",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify no stabilizer trim movement on the EIS.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "e. SECONDARY TRIM\nSwitch (right half\nonly)",
          response: "NOSE DOWN/\nNOSE UP",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify no stabilizer trim movement on the EIS.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "f. SECONDARY TRIM\nButton",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Amber STAB TRIM FAIL A-B and white AP FAIL CAS messages clear.",
          justification: Justification.Indent3,
        },
        { type: ChecklistItemType.Subtitle, content: "PRIMARY STAB TRIM" },
        {
          type: ChecklistItemType.Challenge,
          content: "a. PRIMARY STAB\nTRIM Button",
          response: "A",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. Pilot Stabilizer\nTrim Switch\n(both halves)",
          response: "DOWN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "(1) Verify proper stabilizer trim movement on the EIS.\n(2) While trimming, push and hold the MASTER DISCONNECT button and verify trimming stops.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. Pilot Stabilizer\nTrim Switch\n(both halves)",
          response: "UP",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "(1) Verify proper stabilizer trim movement on the EIS.\n(2) While trimming, push and hold the MASTER DISCONNECT button and verify trimming stops.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "d. Pilot Stabilizer\nTrim Switch\n(left half only)",
          response: "UP/DOWN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify no stabilizer trim movement on the EIS.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "e. Pilot Stabilizer\nTrim Switch\n(right half only)",
          response: "UP/DOWN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify no stabilizer trim movement on the EIS.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "f. Repeat steps b. thru e. on copilot side.",
          response: null,
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "g. STAB Trim",
          response: "Set for Takeoff",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Stab Trim Postiion - %MAC/Stab ____________________________________ 24%/-6.4 26%/-5.8 28%/-5.1 30%/-4.5 32%/-3.9 34%/-3.2 36%-40%/-2.6",
        },
        { type: ChecklistItemType.Subtitle, content: "AILERON TRIM" },
        {
          type: ChecklistItemType.Challenge,
          content: "a. AILERON\nTRIM Switch\n(both halves)",
          response: "LEFT WING DOWN/\nRIGHT WING DOWN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify proper aileron trim movement on the EIS.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. AILERON\nTRIM Switch\n(upper half\nonly)",
          response: "LEFT WING DOWN/\nRIGHT WING DOWN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify no aileron trim movement on the EIS.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. AILERON\nTRIM Switch\n(lower half\nonly)",
          response: "LEFT WING DOWN/\nRIGHT WING DOWN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify no aileron trim movement on the EIS.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "d. AILERON\nTRIM",
          response: "Set for Takeoff",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.Subtitle, content: "RUDDER TRIM" },
        {
          type: ChecklistItemType.Challenge,
          content: "a. RUDDER TRIM\nKnob",
          response: "PUSH NOSE L/\nNOSE R",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify proper rudder trim movement on the EIS.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. RUDDER TRIM",
          response: "Set for Takeoff",
          justification: Justification.Indent1,
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.Initialization, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "9. Initialization\n(MFD GTC: Home > INIT\nor Home > Utilities >\nInitialization)",
          response: "Complete",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. Crew Profile\n(optional)",
          response: "Set",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. Database Status",
          response: "Verify",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. Weight and Fuel",
          response: "Complete",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "d. Active Flight Plan",
          response: "Enter",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "e. Takeoff Data\n(if available)",
          response: "Not Required",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "f. CONTROL LOCK\nHandle",
          response: "UNLOCK",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "g. System Tests:",
          response: null,
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(1) Stall Warn\nButton",
          response: "Select and Verify\n(when complete,\nCONTROL LOCK\nHandle as desired)",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(a) Left AOA indicator increases to bottom of red arc.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(b) Left stick shaker activates independently and stops.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(c) Right AOA indicator increases to bottom of red arc.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(d) Right stick shaker activates independently and stops.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(e) Both stick shakers activate together.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(f) Both AOA indicators increase to 1.0.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(g) Stick pusher activates.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(h) Red PUSH momentarily displays on both PFDs.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: '(i) "Push" aural.',
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(j) AOA indications and shakers cease.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(2) Engine Fire\nButton",
          response: "Select and Verify\n(any order)",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(a) Steady MASTER CAUTION and flashing MASTER WARNING lights.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(b) Both red ENG FIRE lights illuminate steady.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(c) Red ENGINE FIRE L-R CAS message displays.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(d) Amber FIRE DETECT FAIL L-R CAS message displays.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: '(e) "Left Engine Fire" aural.',
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: '(f) "Right Engine Fire" aural.',
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(g) Single chime.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(3) Baggage Fire\nButton",
          response: "Select and Verify",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(a) Both MASTER WARNING lights flash.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: '(b) "Baggage Fire" aural.',
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(c) Red BAGGAGE FIRE CAS message displays.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(4) Annunciator\nButton\n(Optional to test)",
          response: "Select and Verify",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(a) All overhead LIGHTS buttons illuminate ON.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(b) Steady MASTER CAUTION and flashing MASTER WARNING lights.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(c) POWER RESERVE MANUAL and AUTO buttons illuminate.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(d) Both BOTTLE ARMED buttons illuminate.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(e) Halos around ENGINE RUN/STOP buttons illuminate.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(f) ENGINE STARTER buttons illuminate.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(g) FLAP RESET button illuminates.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(5) Overspeed\nButton\n(Optional to test)",
          response: "Select and Verify",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(a) Overspeed warning.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(6) Traffic Button\n(if button not showing\nGreen PASS and\nOptional to test)",
          response: "Select and Verify",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: '(a) "TCAS II System Test Passed" aural.',
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(b) TCAS indications return to normal.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(c) Test is complete when a green PASS is indicated on the selected button.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "(7) HF Button(s)\n(if button not showing\nGreen PASS and\nOptional to test)",
          response: "Select and Verify",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(a) Test is complete when a green PASS is indicated on the selected button.",
          justification: Justification.Indent4,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "h. Accept Initialization.",
          response: null,
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Link,
          content: "i. Return to Normal Procedures, Cockpit Preparation",
          linkTarget: {
            checklistName: LongitudeNormalChecklistNames.CockpitPreparation,
            checklistCategory: LongitudeChecklistCategory.Normal,
          },
          justification: Justification.Indent3,
        },
      ]),
      new LongitudeChecklist(LongitudeNormalChecklistNames.IceProtectionSystems, LongitudeChecklistCategory.Normal, [
        {
          type: ChecklistItemType.Challenge,
          content: "4. Ice Protection\nSystems",
          response: "Check, as Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. Throttles",
          response: "IDLE",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. ENGINE ICE\nPROTECTION Buttons\n(both)",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify white A/I ENG ON CAS message displays.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "c. ENGINE ICE\nPROTECTION Buttons\n(both)",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "d. STAB ICE\nPROTECTION Button",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify white STAB DE-ICE ON CAS message\ndisplays.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "e. STAB ICE\nPROTECTION Button",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "f. APU BLEED Button",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "g. ENG HP Valves\n(both) (MFD GTC:\nHome > Aircraft\nSystems > Synoptics\n> Anti-Ice)",
          response: "Verify Open",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "h. Throttles",
          response: "Slowly Increase Until\nBoth ENG HP Valves\nClose",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION",
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "Time with WING ICE PROTECTION button ON and thrust settings higher than idle while stationary must not exceed 15 seconds.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "i. WING ICE\nPROTECTION Button",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "(1) Verify Both ENG HP Valves Open.",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "j. WING ICE\nPROTECTION Button",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "k. Throttles",
          response: "IDLE",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "l. APU BLEED Button",
          response: "As Desired",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Link,
          content: "m. Return to Normal Procedures, Before Takeoff.",
          linkTarget: {
            checklistName: LongitudeNormalChecklistNames.BeforeTakeoff,
            checklistCategory: LongitudeChecklistCategory.Normal,
          },
          justification: Justification.Indent2,
        },
      ]),
      new LongitudeChecklist(
        LongitudeNormalChecklistNames.NoiseAbatement,
        LongitudeChecklistCategory.Normal,
        [
          {
            type: ChecklistItemType.PlainText,
            content:
              "The following is the recommended procedure to assist in noise abatement using thrust cutbacks. It does not guarantee noise levels will not be exceeded. Always refer to the airport information for specific noise abatement procedures.",
          },
          {
            type: ChecklistItemType.Warning,
            content: "WARNING",
            interactionType: ChecklistItemInteractionType.NoScrollStop,
          },
          {
            type: ChecklistItemType.Warning,
            content:
              "This recommended procedure is not intended to preempt the responsibilities of the crew for safe airplane operation. Compliance with applicable climb and airspeed requirements and ATC instructions are still required.",
          },
          { type: ChecklistItemType.Subtitle, content: "Takeoff" },
          {
            type: ChecklistItemType.PlainText,
            content: "Conduct a normal static takeoff and climb with the following exceptions:",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "1. Flaps",
            response: "2",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "2. Climb Airspeed",
            response: "V2 + 20 Knots\n(not to exceed a nose\nup pitch attitude of\n20 deg)",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "3. Throttles (when\nnear noise\nabatement area\nand when clear\nof obstacles)",
            response:
              "70% N1 or Lower\n(Increase thrust as\nneeded to maintain\npositive and/or\nrequired rate of climb.)",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "4. When clear of noise abatement area:",
            response: null,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Throttles",
            response: "CLB",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. Flaps (at or above\nV2 + 20 knots)",
            response: "Up",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "c. Resume desired climb speed.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Subtitle, content: "Landing" },
          {
            type: ChecklistItemType.PlainText,
            content:
              "Conduct a normal approach and landing with the following exceptions when near the noise abatement area:",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "1. APU",
            response: "OFF",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "2. Maintain high altitude with low power.",
            response: null,
          },
        ],
        true,
      ),
    ];
  }
}
