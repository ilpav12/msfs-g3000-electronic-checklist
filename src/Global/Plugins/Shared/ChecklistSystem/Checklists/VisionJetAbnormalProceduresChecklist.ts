import { ChecklistItemType, Justification } from "@base/Shared/ChecklistSystem/ChecklistItem";
import { VisionJetChecklist, VisionJetChecklistCategory } from "../Checklist";

export enum VisionJetAbnormalProceduresChecklistNames {
  AbnormalEngineShutdownOnGround = "Abnormal Engine Shutdown On Ground",
  AFCSAlerts = "AFCS Alerts",
  AileronMistrimLeftRight = "Aileron Mistrim Left/Right",
  AlternateGearExtension = "Alternate Gear Extension",
  AutopilotAbnormalDisconnect = "Autopilot Abnormal Disconnect",
  AutopilotFailure = "Autopilot Failure",
  AutopilotPreflightTestFail = "Autopilot Preflight Test Fail",
  CommunicationsFailure = "Communications Failure",
  DryMotoringEngineFailedEngineStart = "Dry Motoring Engine - Failed Engine Start",
  ElevatorMistrimDown = "Elevator Mistrim Down",
  ElevatorMistrimUp = "Elevator Mistrim Up",
  FlapsInoperativeApproachLanding = "Flaps Inoperative Approach/Landing",
  FlightThroughVolcanicAsh = "Flight Through Volcanic Ash",
  GearIndicationsNotDownLocked = "Gear Indication(s) Not Down/Locked",
  LandingWithFailedBrakes = "Landing With Failed Brakes",
  LandingWithFlatTire = "Landing With Flat Tire",
  LossofGPSNavigation = "Loss of GPS Navigation",
  PitchAxisFailure = "Pitch Axis Failure",
  RollAxisFailure = "Roll Axis Failure",
  WingStabIPSActivatedinRVSMAirspace = "Wing/Stab IPS Activated in RVSM Airspace",
  YawAxisFailure = "Yaw Axis Failure",
}

/** A utility class to generate Vision Jet Abnormal checklist data. */
export class VisionJetAbnormalProceduresChecklists {
  /**
   * Generates the Vision Jet Abnormal checklist data.
   * @returns An array of Vision Jet Abnormal checklists.
   **/
  public static getChecklists(): VisionJetChecklist[] {
    return [
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.AbnormalEngineShutdownOnGround,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Subtitle, content: "If normal engine shutdown is not successful:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Thrust Lever",
            response: "IDLE",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. ENGINE FIRE ACK",
            response: "LIFT GUARD, TOGGLE",
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.AFCSAlerts,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          {
            type: ChecklistItemType.Note,
            content: "For more information on AFCS alerts, refer to SF50 Garmin Cockpit Reference Guide.",
          },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.AileronMistrimLeftRight,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          {
            type: ChecklistItemType.Note,
            content: "Yellow (left/right arrow) AIL annunciator on PFD.",
            justification: Justification.Left,
          },
          {
            type: ChecklistItemType.Note,
            content: "NOTE: Be prepared for out of trim condition if AP is disengaged.",
            justification: Justification.Left,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "1. Manipulate aileron trim as required to eliminate the mistrim condition.",
            response: null,
          },
          {
            type: ChecklistItemType.Note,
            content:
              "NOTE: Momentary roll trim input in the direction of mistrim indication will typically correct the condition.",
          },
          { type: ChecklistItemType.Subtitle, content: "If condition persists:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Disengage autopilot.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. Retrim aircraft as desired.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.AlternateGearExtension,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Challenge, content: "1. Airspeed", response: "BELOW 210 KIAS" },
          { type: ChecklistItemType.Challenge, content: "2. LANDING GEAR HYD CB (B4)", response: "PULL" },
          { type: ChecklistItemType.Challenge, content: "3. Landing Gear Handle", response: "DOWN" },
          {
            type: ChecklistItemType.Challenge,
            content: "4. Alternate Gear Extension Handle",
            response: "PULL TO STOP, RESTOW",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "5. Verify 3 Green, DOWN / LOCKED indications.",
            response: null,
          },
          { type: ChecklistItemType.Subtitle, content: "If landing gear is down and locked:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. No further action required.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
          { type: ChecklistItemType.Subtitle, content: "If landing gear is not down and locked:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Alternate Gear Extension Handle",
            response: "PULL TO STOP, RESTOW",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Note,
            content:
              "NOTE: Pull the handle to the end of its available travel to ensure landing gear is fully unlocked.",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content:
              "b. Reduce airspeed, or increase load factor (g) by increasing bank angle to assist in extending/locking the gear.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content:
              "c. Check landing gear indications. If landing gear indications are still not confirmed down, prepare for landing with possible gear issue.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "d. Perform visual verification of gear position by ATC (towered airport), if possible.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.AutopilotAbnormalDisconnect,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          {
            type: ChecklistItemType.Note,
            content: "Red AP flashing on PFD; continuous high-low aural tone.",
            justification: Justification.Left,
          },
          { type: ChecklistItemType.Challenge, content: "1. AP DISC Button", response: "PRESS AND RELEASE" },
          { type: ChecklistItemType.Challenge, content: "2. Airplane Control", response: "MAINTAIN" },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.AutopilotFailure,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          {
            type: ChecklistItemType.Note,
            content: "Red AFCS annunciator on PFD; red AP flashing on PFD; continuous high-low aural tone.",
          },
          { type: ChecklistItemType.Challenge, content: "1. AP DISC Button", response: "PRESS AND RELEASE" },
          { type: ChecklistItemType.Challenge, content: "2. Airplane Control", response: "MAINTAIN" },
          { type: ChecklistItemType.Subtitle, content: "If in RVSM airspace:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Exit RVSM airspace.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.AutopilotPreflightTestFail,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Note, content: "Red PFT annunciator on PFD.", justification: Justification.Left },
          { type: ChecklistItemType.Challenge, content: "1. Do not dispatch.", response: null },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.CommunicationsFailure,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Challenge, content: "1. Switches, Controls", response: "CHECK" },
          { type: ChecklistItemType.Challenge, content: "2. Frequency", response: "CHANGE" },
          { type: ChecklistItemType.Challenge, content: "3. Circuit Breakers", response: "SET" },
          { type: ChecklistItemType.Challenge, content: "4. Headset", response: "CHANGE OR SPEAKER" },
          {
            type: ChecklistItemType.Challenge,
            content: "5. Attempt to use oxygen mask microphone or hand-held microphone and cabin speakers.",
            response: null,
          },
          { type: ChecklistItemType.Subtitle, content: "If Precipitation-static is experienced during flight:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. WINDSHLD IPS",
            response: "ON",
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.DryMotoringEngineFailedEngineStart,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Challenge, content: "1. Thrust Lever", response: "IDLE" },
          { type: ChecklistItemType.Challenge, content: "2. Engine Knob", response: "OFF" },
          { type: ChecklistItemType.Challenge, content: "3. BLEED Switch", response: "FRESH" },
          {
            type: ChecklistItemType.Challenge,
            content: "4. Engine Button",
            response: "PRESS AND HOLD 15 - 30 SECONDS",
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.ElevatorMistrimDown,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          {
            type: ChecklistItemType.Note,
            content: "Yellow (down arrow) ELE annunciator on PFD.",
            justification: Justification.Left,
          },
          {
            type: ChecklistItemType.Note,
            content: "NOTE: Be prepared for out of trim condition if AP is disengaged.",
            justification: Justification.Left,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "1. Manipulate elevator trim down to eliminate the mistrim condition.",
            response: null,
          },
          { type: ChecklistItemType.Subtitle, content: "If condition persists:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Disengage autopilot.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. Retrim aircraft as desired.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.ElevatorMistrimUp,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          {
            type: ChecklistItemType.Note,
            content: "Yellow (up arrow) ELE annunciator on PFD.",
            justification: Justification.Left,
          },
          {
            type: ChecklistItemType.Note,
            content: "NOTE: Be prepared for out of trim condition if AP is disengaged.",
            justification: Justification.Left,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "1. Manipulate elevator trim up to eliminate the mistrim condition.",
            response: null,
          },
          { type: ChecklistItemType.Subtitle, content: "If condition persists:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Disengage autopilot.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. Retrim aircraft as desired.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.FlapsInoperativeApproachLanding,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Challenge, content: "1. VREF", response: "REFER TO GREEN DONUT" },
          { type: ChecklistItemType.Challenge, content: "2. Landing Gear", response: "DOWN AND LOCKED" },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.FlightThroughVolcanicAsh,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Challenge, content: "1. Engine Parameters", response: "MONITOR" },
          { type: ChecklistItemType.Subtitle, content: "If engine parameters cannot be kept within limits:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Land as soon as possible.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.GearIndicationsNotDownLocked,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Subtitle, content: "If in flight:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Landing Gear",
            response: "CYCLE UP, THEN DOWN",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Subtitle,
            content: "If Landing Gear is down and locked:",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "(1) Monitor landing gear indications.",
            response: null,
            justification: Justification.Indent2,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent2 },
          {
            type: ChecklistItemType.Subtitle,
            content: "If Landing Gear is not down and locked:",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "(1) Perform Alternate Gear Extension checklist.",
            response: null,
            justification: Justification.Indent2,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent2 },
          { type: ChecklistItemType.Subtitle, content: "If on ground:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Do not taxi.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. Landing Gear",
            response: "CHECK DOWN",
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.LandingWithFailedBrakes,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Subtitle, content: "If one brake is inoperative:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Land on the side of runway corresponding to the inoperative brake.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. Maintain directional control using rudder and operational brake.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "c. Shut down engine as soon as practical.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
          { type: ChecklistItemType.Subtitle, content: "If both brakes are inoperative:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Divert to the longest, widest runway with the most direct headwind.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. Land on downwind side of the runway.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "c. Use the rudder and aileron for directional control.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "d. Shut down engine as soon as practical.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.LandingWithFlatTire,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Subtitle, content: "If main gear tire is flat:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Land on the side of the runway corresponding to the good tire.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. Maintain directional control with the brakes, rudder, and aileron.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "c. Do not taxi. Stop the airplane and perform a normal Engine Shutdown.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
          { type: ChecklistItemType.Subtitle, content: "If nose gear tire is flat:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Land in the center of the runway.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. Hold the nosewheel off the ground as long as possible.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "c. Do not taxi. Stop the airplane and perform a normal Engine Shutdown.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.LossofGPSNavigation,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          {
            type: ChecklistItemType.Note,
            content: "Amber GPS LOI text left of HSI and/or white system message on touchscreen controller.",
          },
          { type: ChecklistItemType.Challenge, content: "1. Navigation", response: "VISUAL, OR SELECT VOR AND/OR DME" },
          {
            type: ChecklistItemType.Challenge,
            content: "2. Perform STICK PUSHER FAIL Caution checklist.",
            response: null,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.PitchAxisFailure,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Note, content: "Red PTCH annunciator on PFD.", justification: Justification.Left },
          { type: ChecklistItemType.Challenge, content: "1. Altitude", response: "MONITOR AND MAINTAIN AS POSSIBLE" },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.RollAxisFailure,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Note, content: "Red ROLL annunciator on PFD.", justification: Justification.Left },
          { type: ChecklistItemType.Challenge, content: "1. Airplane Control", response: "MAINTAIN" },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.WingStabIPSActivatedinRVSMAirspace,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Subtitle, content: "If activated by pilot:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Advise ATC of non RVSM status.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
          { type: ChecklistItemType.Subtitle, content: "If activated uncommanded:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Verify WING/STAB Switch OFF.",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. WING/STAB IPS CB (A6)",
            response: "PULL",
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAbnormalProceduresChecklistNames.YawAxisFailure,
        VisionJetChecklistCategory.AbnormalProcedures,
        [
          { type: ChecklistItemType.Note, content: "Red YAW annunciator on PFD.", justification: Justification.Left },
          { type: ChecklistItemType.Challenge, content: "1. Continue flight.", response: null },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
        true,
      ),
    ];
  }
}
