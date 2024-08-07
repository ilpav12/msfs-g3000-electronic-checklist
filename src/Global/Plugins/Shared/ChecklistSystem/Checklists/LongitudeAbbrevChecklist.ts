import {
  ChecklistItemInteractionType,
  ChecklistItemType,
  Justification,
} from "@base/Shared/ChecklistSystem/ChecklistItem";
import { LongitudeChecklist, LongitudeChecklistCategory } from "../Checklist";

export enum LongitudeAbbrevChecklistNames {
  BeforeTakeoff = "Before Takeoff",
  AfterTakeoff = "After Takeoff",
  IceProtectionCheck = "Ice Protection Check",
  EngineDryMotor = "Engine Dry Motor",
}

/** A utility class to generate normal checklist data. */
export class LongitudeAbbrevChecklists {
  /**
   * Generates the normal checklist data.
   * @returns An array of normal checklists.
   **/
  public static getChecklists(): LongitudeChecklist[] {
    return [
      new LongitudeChecklist(LongitudeAbbrevChecklistNames.BeforeTakeoff, LongitudeChecklistCategory.Abbrev, [
        { type: ChecklistItemType.Subtitle, content: "Cockpit Items" },
        {
          type: ChecklistItemType.Challenge,
          content: "Circuit Breakers",
          response: "In",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "STBY PWR Switch",
          response: "TEST/ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "BATT Buttons (both)",
          response: "ON, Check Volts",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "EIS/CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Smoke Goggles",
          response: "Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Oxygen System",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Hydraulics Data",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "APU",
          response: "Start",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "External Power",
          response: "Disconnected",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Cockpit Controls",
          response: "Check/Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Trims (3)",
          response: "Check/Set",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Stab Trim Position - %MAC/Stab\n______________________________\n24%/-6.4    26%/-5.8    28%/-5.1    30%/-4.5    32%/-3.9    34%/-3.2    36%-40%/-2.6",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Initialization",
          response: "Complete",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Fuel Quantity and Balance",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Autopilot",
          response: "Engage/Disengage",
        },
        {
          type: ChecklistItemType.Subtitle,
          content: "Takeoff Simplified Criteria",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Static Takeoff, No Obstacles, Ice Protection OFF, APR Auto, No Tailwind, Dry Rwy, Press Alt at or below 3000 ft, Ambient temp at or below 35 deg C, Flaps 2, Rwy Grad 0% to -2%,",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Max Brake Temp:\nBefore Taxi 150 deg C\nBefore Takeoff 195 deg C",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "______________________________\nWeight V1/VR/V2/VFTO TFL\n24-28k, 99/103/117/185 (>4000) 28-32k, 109/112/124/185 (>4700)\n32-33.5k 114/115/126/185 (>5000)\n33.5-36.5k 121/122/131/185 (>5800)\n36.5-39.5k 128/128/137/185 (>7100)",
        },
        { type: ChecklistItemType.Subtitle, content: "Before Start" },
        {
          type: ChecklistItemType.Challenge,
          content: "Parking Brake",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Wheel Chocks",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Cabin Door/Cabin Door\nCurtain",
          response: "Closed/Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Passenger Briefing",
          response: "Complete",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Cabin Divider\n(if installed)",
          response: "Secured Open",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Seats, Pedals,\nSeat Belts",
          response: "Adjusted/Fastened",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "SEAT BELTS Button",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "EIS/CAS",
          response: "Check",
        },
        { type: ChecklistItemType.Subtitle, content: "Starting Engines" },
        {
          type: ChecklistItemType.Challenge,
          content: "Throttles",
          response: "IDLE",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Engines",
          response: "Start",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "EIS/CAS",
          response: "Check",
        },
        { type: ChecklistItemType.Subtitle, content: "Before Taxi" },
        {
          type: ChecklistItemType.Challenge,
          content: "Wheel Chocks",
          response: "Removed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Flight Controls",
          response: "Free and Correct",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Nosewheel Steering\nDisconnect",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Speedbrakes",
          response: "Check/Retracted",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "PTCU",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Flight Instruments/\nAvionics",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Ice Protection",
          response: "As Required",
        },
        { type: ChecklistItemType.Subtitle, content: "Taxi" },
        {
          type: ChecklistItemType.Challenge,
          content: "Exterior Lights",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Brakes",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Nosewheel Steering",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Thrust Reversers",
          response: "Check, as Required/\nStowed",
        },
        { type: ChecklistItemType.Subtitle, content: "Before Takeoff" },
        {
          type: ChecklistItemType.Challenge,
          content: "Flaps",
          response: "Set for Takeoff",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Speedbrakes",
          response: "Retracted",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Trims (3)",
          response: "Set for Takeoff",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Ice Protection",
          response: "Check, as Required*",
        },
        {
          type: ChecklistItemType.Link,
          content: "Ice Protection Check",
          linkTarget: {
            checklistName: LongitudeAbbrevChecklistNames.IceProtectionCheck,
            checklistCategory: LongitudeChecklistCategory.Abbrev,
          },
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "V Speeds",
          response: "Displayed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "SPD Knob",
          response: "FMS",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Crew Briefing",
          response: "Complete",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Radar",
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
          content: "Control Lock",
          response: "Unlocked",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Flight Controls",
          response: "Free",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Ice Protection",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Exterior Lights",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "EIS/CAS",
          response: "Check",
        },
      ]),
      new LongitudeChecklist(LongitudeAbbrevChecklistNames.AfterTakeoff, LongitudeChecklistCategory.Abbrev, [
        { type: ChecklistItemType.Subtitle, content: "After Takeoff/Climb" },
        {
          type: ChecklistItemType.Challenge,
          content: "Landing Gear",
          response: "Up",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Flaps\n(at or above V2+20)",
          response: "Up",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Throttles",
          response: "CLB",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Ice Protection\n(above 400 ft AGL)",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Pressurization",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "SEAT BELTS Button",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Altimeters\n(at transition altitude)",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Exterior Lights",
          response: "As Required",
        },
        { type: ChecklistItemType.Subtitle, content: "Descent" },
        {
          type: ChecklistItemType.Challenge,
          content: "Pressurization LDG ELEV",
          response: "Verify",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Altimeters\n(at transition level)",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Exterior Lights",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Subtitle,
          content: "Landing Simplified Criteria",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "IDLE at 50 ft, Ice Protection Off, Flaps: Approach - 2, Landing -FULL, No Tailwind, Dry Rwy, Rwy Grad:-0.5% to 2%, Rwy Length 4200 ft or longer, Press Alt at or below 4000 ft, Ambient Temp at or below 40 deg C\n____________________________________\nWeight VAPP/VREF\n23.5k 113/104\n25.5k 118/108\n27.5k 123/112\n29.5k 128/116\n31.5k 133/121\n33.5k 137/125",
        },
        { type: ChecklistItemType.Subtitle, content: "Approach" },
        {
          type: ChecklistItemType.Challenge,
          content: "Landing Data",
          response: "Confirm",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Ice Protection",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Flight Instruments/\nAvionics",
          response: "Check/Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Crew Briefing",
          response: "Complete",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Passenger Briefing",
          response: "Complete",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Cabin Divider\n(if installed)",
          response: "Secured Open",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Cabin Door Curtain",
          response: "Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Seats/Seat Belts",
          response: "Adjusted/Fastened",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "SEAT BELTS Button",
          response: "ON",
        },
        { type: ChecklistItemType.Subtitle, content: "Before Landing" },
        {
          type: ChecklistItemType.Challenge,
          content: "Landing Gear",
          response: "Down (3 Green)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Flaps",
          response: "FULL",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Exterior Lights",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Speedbrakes",
          response: "Retracted",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "EIS/CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Autopilot",
          response: "Disengage",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Autothrottle (prior to\n50 feet AGL)",
          response: "Disengage",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Airspeed",
          response: "VREF",
        },
        { type: ChecklistItemType.Subtitle, content: "Go-Around" },
        {
          type: ChecklistItemType.Challenge,
          content: "TO/GA Button",
          response: "Push",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Throttles",
          response: "TO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Pitch Attitude",
          response: "7.5 deg Nose Up Initially",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Flaps",
          response: "2",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Climb Speed",
          response: "VAPP (Minimum)",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Landing Gear",
          response: "Up",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Flaps\n(at or above VAPP + 10)",
          response: "Up",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "SPD Knob",
          response: "FMS",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Throttles",
          response: "As Required",
        },
        { type: ChecklistItemType.Subtitle, content: "After Landing" },
        {
          type: ChecklistItemType.Challenge,
          content: "Thrust Reversers",
          response: "Stow",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Flaps",
          response: "As Desired",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Ice Protection",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Exterior Lights",
          response: "As Required",
        },
        { type: ChecklistItemType.Subtitle, content: "Shutdown/Quick Turn" },
        {
          type: ChecklistItemType.Challenge,
          content: "Throttles",
          response: "IDLE",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Parking Brake",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Ice Protection",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "ENGINE RUN/STOP\nButtons",
          response: "STOP",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "SEAT BELTS Button",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "APU",
          response: "Off",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "EIS/CAS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Main Batteries",
          response: "Connected",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "APU",
          response: "As Desired",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Turn-Around Time/\nBrake Temps",
          response: "Consider",
        },
        {
          type: ChecklistItemType.Link,
          content: "Return to Cockpit Items (if Quick Turn)",
          linkTarget: {
            checklistName: LongitudeAbbrevChecklistNames.BeforeTakeoff,
            checklistCategory: LongitudeChecklistCategory.Abbrev,
          },
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- CONTINUE WITH SHUTDOWN -",
          justification: Justification.Center,
          interactionType: ChecklistItemInteractionType.NoScrollStop,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "EMER LTS Switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "STBY PWR Switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "APU Knob",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Exterior Lights",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Control Lock",
          response: "As Required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "BATT Buttons (both)",
          response: "OFF",
        },
      ]),
      new LongitudeChecklist(LongitudeAbbrevChecklistNames.IceProtectionCheck, LongitudeChecklistCategory.Abbrev, [
        { type: ChecklistItemType.Subtitle, content: "Ice Protection Check" },
        {
          type: ChecklistItemType.Challenge,
          content: "Throttles",
          response: "IDLE",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Engine Ice Protection",
          response: "On/Verify CAS/Off",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Stab Ice Protection",
          response: "On/Verify CAS/Off",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "APU Bleed",
          response: "Off",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Engine HP Valves\n(Anti-ice Synoptic)",
          response: "Open",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Throttles",
          response: "Slowly Increase/\nValve Close",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Wing Ice Protection",
          response: "On/Valves Open/Off",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Throttles",
          response: "Idle",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "APU Bleed",
          response: "As Desired",
        },
        {
          type: ChecklistItemType.Link,
          content: "Return to Abbreviated Procedures, Before Takeoff",
          linkTarget: {
            checklistName: LongitudeAbbrevChecklistNames.BeforeTakeoff,
            checklistCategory: LongitudeChecklistCategory.Abbrev,
          },
        },
      ]),
      new LongitudeChecklist(
        LongitudeAbbrevChecklistNames.EngineDryMotor,
        LongitudeChecklistCategory.Abbrev,
        [
          { type: ChecklistItemType.Subtitle, content: "Engine Dry Motor" },
          {
            type: ChecklistItemType.Challenge,
            content: "Throttle",
            response: "IDLE",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "ENGINE RUN/STOP\nButton",
            response: "STOP",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "ENGINE STARTER Button",
            response: "Push and Hold\n(>19% N2 or\n15 seconds)",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Repeat for opposite engine.",
            response: null,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Next Start Attempt",
            response: "White ENG DRY MTR\nPROC L and/or R CAS\nMessage Clears",
          },
        ],
        true,
      ),
    ];
  }
}
