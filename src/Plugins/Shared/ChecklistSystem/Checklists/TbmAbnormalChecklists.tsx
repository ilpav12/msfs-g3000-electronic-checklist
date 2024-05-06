import { FSComponent } from '@microsoft/msfs-sdk';
import { TbmChecklist, TbmChecklistCategory, TbmChecklistItemType } from '../TbmChecklist';

export enum TbmAbnormalChecklistNames {
  InadvertentImcEncounter = 'Inadvertent IMC Encounter',
  // DoorOpenInFlight = 'Door Open In Flight',
  // LandingWithFailedBrakes = 'Landing With Failed Brakes',
  // LandingWithFlatTire = 'Landing With Flat Tire',
  FlightDisplaysTooDim = 'Flight Displays Too Dim',
  // PitotStaticMalfunction = 'Pitot Static Malfunction',
  // ElectricTrimAPFailure = 'Electric Trim/Autopilot Failure',
  // BrakeFailureDuringTaxi = 'Brake Failure During Taxi',
  // WindshieldDeiceSystemMalfunction = 'Windshield De-Ice System Malfunction',
  AbortedTakeoff = 'Aborted Takeoff',
  // CommunicationsFailure = 'Communications Failure',
  // HeatedLiftTransducerMalfunction = 'Heated Lift Transducer Malfunction',
  // ErroneousOrLossOfAntiIceFluidDisplay = 'Erroneous or Loss of Anti-Ice Fluid Display',
}

/** A utility class to generate abnormal checklist data. */
export class TbmAbnormalChecklists {
  /**
   * Generates the abnormal checklist data.
   * @returns An array of abnormal checklists.
   **/
  public static getChecklists(): TbmChecklist[] {
    return [
      new TbmChecklist(
        TbmAbnormalChecklistNames.InadvertentImcEncounter,
        TbmChecklistCategory.Abnormal,
        [
          { type: TbmChecklistItemType.Checkbox, title: '1. Airplane Control', action: 'ESTABLISH STRAIGHT AND LEVEL\nFLIGHT' },
          { type: TbmChecklistItemType.Checkbox, title: '2. Autopilot', action: 'ENGAGE TO HOLD HEADING AND\nALTITUDE' },
          { type: TbmChecklistItemType.Checkbox, title: '3. Heading', action: 'RESET TO INITIATE 180 DEGREE\nTURN' },
        ],
      ),
      // new TbmChecklist(
      //   TbmAbnormalChecklistNames.DoorOpenInFlight,
      //   TbmChecklistCategory.Abnormal,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmAbnormalChecklistNames.LandingWithFailedBrakes,
      //   TbmChecklistCategory.Abnormal,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmAbnormalChecklistNames.LandingWithFlatTire,
      //   TbmChecklistCategory.Abnormal,
      //   []
      // ),
      new TbmChecklist(
        TbmAbnormalChecklistNames.FlightDisplaysTooDim,
        TbmChecklistCategory.Abnormal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. INSTRUMENT dimmer knob', action: 'OFF (FULL COUNTERCLOCKWISE)' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text single-indent" >
                If flight displays do not provide sufficient brightness:
              </div>
            )
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Revert to standby instruments.', action: null },
        ]
      ),
      // new TbmChecklist(
      //   TbmAbnormalChecklistNames.PitotStaticMalfunction,
      //   TbmChecklistCategory.Abnormal,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmAbnormalChecklistNames.ElectricTrimAPFailure,
      //   TbmChecklistCategory.Abnormal,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmAbnormalChecklistNames.BrakeFailureDuringTaxi,
      //   TbmChecklistCategory.Abnormal,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmAbnormalChecklistNames.WindshieldDeiceSystemMalfunction,
      //   TbmChecklistCategory.Abnormal,
      //   []
      // ),
      new TbmChecklist(
        TbmAbnormalChecklistNames.AbortedTakeoff,
        TbmChecklistCategory.Abnormal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Power Lever', action: 'IDLE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Barkes', action: 'AS REQUIRED' },
        ]
      ),
      // new TbmChecklist(
      //   TbmAbnormalChecklistNames.CommunicationsFailure,
      //   TbmChecklistCategory.Abnormal,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmAbnormalChecklistNames.HeatedLiftTransducerMalfunction,
      //   TbmChecklistCategory.Abnormal,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmAbnormalChecklistNames.ErroneousOrLossOfAntiIceFluidDisplay,
      //   TbmChecklistCategory.Abnormal,
      //   [],
      //   true
      // ),
    ];
  }
}

