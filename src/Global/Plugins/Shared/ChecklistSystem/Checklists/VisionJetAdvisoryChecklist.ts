import { ChecklistItemType, Justification } from "@base/Shared/ChecklistSystem/ChecklistItem";
import { VisionJetChecklist, VisionJetChecklistCategory } from "../Checklist";

export enum VisionJetAdvisoryChecklistNames {
  CAPSAUTOPILOTINOPAdvisory = "CAPS AUTOPILOT INOP Advisory",
  CAPSMISCOMPAREAdvisory = "CAPS MISCOMPARE Advisory",
  DOOROPENAdvisory = "DOOR OPEN Advisory",
  EDMDISABLEDAdvisory = "EDM DISABLED Advisory",
  ESPFAILAdvisory = "ESP FAIL Advisory",
  ESPOFFAdvisory = "ESP OFF Advisory",
  FIREEXTLOWLAdvisory = "FIRE EXT LOW L Advisory",
  FIREEXTLOWRAdvisory = "FIRE EXT LOW R Advisory",
  FUELPUMPONAdvisory = "FUEL PUMP ON Advisory",
  FUELSHUTOFFAdvisory = "FUEL SHUTOFF Advisory",
  FUELTANKBALANCEDAdvisory = "FUEL TANK BALANCED Advisory",
  IPSENGINLETUNDERPRESSAdvisory = "IPS ENG INLET UNDERPRESS Advisory",
  IPSFLUIDLOWAdvisory = "IPS FLUID LOW Advisory",
  MASKMICROPHONEAdvisory = "MASK MICROPHONE Advisory",
  OXYGENONAdvisory = "OXYGEN ON Advisory",
  SFDNOCOMPAREAdvisory = "SFD NO-COMPARE Advisory",
  STALLSPEEDHIGHAdvisory = "STALL SPEED HIGH Advisory",
  STARTERENGAGEDAdvisory = "STARTER ENGAGED Advisory",
  SURFACEWATCHFAILAdvisory = "SURFACEWATCH FAIL Advisory",
  TAKEOFFPITCHTRIMAdvisory = "TAKEOFF PITCH TRIM Advisory",
  TAKEOFFTHRUSTAdvisory = "TAKEOFF THRUST Advisory",
  WHEELSPEEDFAULTAdvisory = "WHEEL SPEED FAULT Advisory",
  WOWDISAGREEAdvisory = "WOW DISAGREE Advisory",
}

/** A utility class to generate Vision Jet Advisory checklist data. */
export class VisionJetAdvisoryChecklists {
  /**
   * Generates the Vision Jet Advisory checklist data.
   * @returns An array of Vision Jet Advisory checklists.
   **/
  public static getChecklists(): VisionJetChecklist[] {
    return [
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.CAPSAUTOPILOTINOPAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          {
            type: ChecklistItemType.Note,
            content: "Minimize CAPS deployment speed.",
            justification: Justification.Left,
          },
          { type: ChecklistItemType.Subtitle, content: "If in an emergency situation:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Airspeed",
            response: "MANUALLY REDUCE BELOW 135 KIAS AND 145 KTAS BEFORE DEPLOYING PARACHUTE",
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "b. Throttle",
            response: "ENSURE THROTTLE IS REDUCED TO IDLE BEFORE DEPLOYING PARACHUTE",
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.CAPSMISCOMPAREAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          { type: ChecklistItemType.Note, content: "CAPS service required.", justification: Justification.Left },
          { type: ChecklistItemType.Subtitle, content: "If in flight:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Land as soon as practicable.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
          { type: ChecklistItemType.Subtitle, content: "If on ground:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Do not dispatch.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
        ],
      ),
      new VisionJetChecklist(VisionJetAdvisoryChecklistNames.DOOROPENAdvisory, VisionJetChecklistCategory.Advisory, [
        { type: ChecklistItemType.Note, content: "One or more doors are open.", justification: Justification.Left },
        { type: ChecklistItemType.Subtitle, content: "On ground only:" },
        { type: ChecklistItemType.Challenge, content: "1. Advisory only. No further action required.", response: null },
        { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
      ]),
      new VisionJetChecklist(VisionJetAdvisoryChecklistNames.EDMDISABLEDAdvisory, VisionJetChecklistCategory.Advisory, [
        {
          type: ChecklistItemType.Note,
          content: "Emergency Descent Mode is disabled.",
          justification: Justification.Left,
        },
        { type: ChecklistItemType.Challenge, content: "1. Advisory only. No further action required.", response: null },
        { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
      ]),
      new VisionJetChecklist(VisionJetAdvisoryChecklistNames.ESPFAILAdvisory, VisionJetChecklistCategory.Advisory, [
        { type: ChecklistItemType.Note, content: "ESP is inoperative.", justification: Justification.Left },
        { type: ChecklistItemType.Challenge, content: "1. Advisory only. No further action required.", response: null },
        { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
      ]),
      new VisionJetChecklist(VisionJetAdvisoryChecklistNames.ESPOFFAdvisory, VisionJetChecklistCategory.Advisory, [
        { type: ChecklistItemType.Note, content: "ESP selected off.", justification: Justification.Left },
        { type: ChecklistItemType.Challenge, content: "1. Advisory only. No further action required.", response: null },
        { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
      ]),
      new VisionJetChecklist(VisionJetAdvisoryChecklistNames.FIREEXTLOWLAdvisory, VisionJetChecklistCategory.Advisory, [
        {
          type: ChecklistItemType.Note,
          content: "Pressure is low in the left fire extinguisher.",
          justification: Justification.Left,
        },
        { type: ChecklistItemType.Challenge, content: "1. Continue flight.", response: null },
        { type: ChecklistItemType.Challenge, content: "2. Service aircraft as soon as practical.", response: null },
        { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
      ]),
      new VisionJetChecklist(VisionJetAdvisoryChecklistNames.FIREEXTLOWRAdvisory, VisionJetChecklistCategory.Advisory, [
        {
          type: ChecklistItemType.Note,
          content: "Pressure is low in the right fire extinguisher.",
          justification: Justification.Left,
        },
        { type: ChecklistItemType.Challenge, content: "1. Continue flight.", response: null },
        { type: ChecklistItemType.Challenge, content: "2. Service aircraft as soon as practical.", response: null },
        { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
      ]),
      new VisionJetChecklist(VisionJetAdvisoryChecklistNames.FUELPUMPONAdvisory, VisionJetChecklistCategory.Advisory, [
        {
          type: ChecklistItemType.Note,
          content: "Fuel pump is ON for normal operations.",
          justification: Justification.Left,
        },
        { type: ChecklistItemType.Challenge, content: "1. Advisory only. No further action required.", response: null },
        { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
      ]),
      new VisionJetChecklist(VisionJetAdvisoryChecklistNames.FUELSHUTOFFAdvisory, VisionJetChecklistCategory.Advisory, [
        { type: ChecklistItemType.Note, content: "Fuel shutoff valve is closed.", justification: Justification.Left },
        { type: ChecklistItemType.Challenge, content: "1. ENGINE FIRE ACK", response: "CLOSE GUARD" },
        { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
      ]),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.FUELTANKBALANCEDAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          {
            type: ChecklistItemType.Note,
            content: "Fuel tank quantity balance has been detected.",
            justification: Justification.Left,
          },
          { type: ChecklistItemType.Challenge, content: "1. Fuel Control Switch", response: "AUTO" },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.IPSENGINLETUNDERPRESSAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          {
            type: ChecklistItemType.Note,
            content: "Engine IPS bleed flow low with engine at idle.",
            justification: Justification.Left,
          },
          { type: ChecklistItemType.Subtitle, content: "On ground only:" },
          { type: ChecklistItemType.Subtitle, content: "If in icing conditions:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Increase engine thrust to extinguish message.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
        ],
      ),
      new VisionJetChecklist(VisionJetAdvisoryChecklistNames.IPSFLUIDLOWAdvisory, VisionJetChecklistCategory.Advisory, [
        {
          type: ChecklistItemType.Note,
          content: "IPS fluid below minimum dispatch quantity.",
          justification: Justification.Left,
        },
        { type: ChecklistItemType.Subtitle, content: "On ground only:" },
        { type: ChecklistItemType.Challenge, content: "1. Fill IPS fluid as desired.", response: null },
        { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
      ]),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.MASKMICROPHONEAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          {
            type: ChecklistItemType.Note,
            content: "A crew mask microphone is switched on.",
            justification: Justification.Left,
          },
          { type: ChecklistItemType.Subtitle, content: "If not wearing oxygen mask:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. Turn MIC selection switch to normal headset position.",
            response: null,
            justification: Justification.Indent1,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent1 },
        ],
      ),
      new VisionJetChecklist(VisionJetAdvisoryChecklistNames.OXYGENONAdvisory, VisionJetChecklistCategory.Advisory, [
        { type: ChecklistItemType.Note, content: "Oxygen is on.", justification: Justification.Left },
        { type: ChecklistItemType.Subtitle, content: "On ground only:" },
        { type: ChecklistItemType.Challenge, content: "1. Advisory only. No further action required.", response: null },
        { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
      ]),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.SFDNOCOMPAREAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          { type: ChecklistItemType.Note, content: "SFD comparison data missing.", justification: Justification.Left },
          { type: ChecklistItemType.Challenge, content: "1. Exit IMC.", response: null },
          { type: ChecklistItemType.Challenge, content: "2. Land as soon as practicable.", response: null },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.STALLSPEEDHIGHAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          {
            type: ChecklistItemType.Note,
            content: "Stall protection system adjusted for icing.",
            justification: Justification.Left,
          },
          { type: ChecklistItemType.Subtitle, content: "If airframe is no longer ice contaminated:" },
          {
            type: ChecklistItemType.Challenge,
            content: "a. IPS Stall Offset Reset via MFD Controller:",
            response: null,
            justification: Justification.Indent1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "(1) From Home, touch Aircraft Systems.",
            response: null,
            justification: Justification.Indent2,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "(2) Touch the IPS Stall Offset Reset Button.",
            response: null,
            justification: Justification.Indent2,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Indent2 },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.STARTERENGAGEDAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          { type: ChecklistItemType.Note, content: "Engine start in progress.", justification: Justification.Left },
          {
            type: ChecklistItemType.Note,
            content: "NOTE: Receiving a STARTER ENGAGED CAS Advisory is normal during an engine start.",
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.SURFACEWATCHFAILAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          { type: ChecklistItemType.Note, content: "SurfaceWatch failed.", justification: Justification.Left },
          {
            type: ChecklistItemType.Note,
            content: "NOTE: SurfaceWatch is unavailable.",
            justification: Justification.Left,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.TAKEOFFPITCHTRIMAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          {
            type: ChecklistItemType.Note,
            content: "Pitch trim not in takeoff configuration.",
            justification: Justification.Left,
          },
          { type: ChecklistItemType.Subtitle, content: "On ground only:" },
          { type: ChecklistItemType.Challenge, content: "1. Pitch Trim Position", response: "WITHIN GREEN ARC" },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.TAKEOFFTHRUSTAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          { type: ChecklistItemType.Note, content: "Engine is in takeoff thrust.", justification: Justification.Left },
          { type: ChecklistItemType.Challenge, content: "1. Thrust Lever", response: "MCT" },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.WHEELSPEEDFAULTAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          {
            type: ChecklistItemType.Note,
            content: "Wheel speed sensor fault detected.",
            justification: Justification.Left,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "1. Advisory only. No further action required.",
            response: null,
          },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
      ),
      new VisionJetChecklist(
        VisionJetAdvisoryChecklistNames.WOWDISAGREEAdvisory,
        VisionJetChecklistCategory.Advisory,
        [
          {
            type: ChecklistItemType.Note,
            content: "WOW indicating opposite on ground/in air states.",
            justification: Justification.Left,
          },
          { type: ChecklistItemType.Challenge, content: "1. Continue flight.", response: null },
          { type: ChecklistItemType.Note, content: "Procedure Complete", justification: Justification.Left },
        ],
        true,
      ),
    ];
  }
}
