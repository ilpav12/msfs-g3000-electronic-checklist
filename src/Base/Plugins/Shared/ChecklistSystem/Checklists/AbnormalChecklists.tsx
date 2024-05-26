import { FSComponent } from '@microsoft/msfs-sdk';
import { Checklist, ChecklistCategory, ChecklistItemType } from '@base/Shared/ChecklistSystem/Checklist';

export enum AbnormalChecklistNames {
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
export class AbnormalChecklists {
  /**
   * Generates the abnormal checklist data.
   * @returns An array of abnormal checklists.
   **/
  public static getChecklists(): Checklist[] {
    return [
      new Checklist(
        AbnormalChecklistNames.InadvertentImcEncounter,
        ChecklistCategory.Abnormal,
        [
          { type: ChecklistItemType.Checkbox, title: '1. Airplane Control', action: 'ESTABLISH STRAIGHT AND LEVEL\nFLIGHT' },
          { type: ChecklistItemType.Checkbox, title: '2. Autopilot', action: 'ENGAGE TO HOLD HEADING AND\nALTITUDE' },
          { type: ChecklistItemType.Checkbox, title: '3. Heading', action: 'RESET TO INITIATE 180 DEGREE\nTURN' },
        ],
      ),
      // new Checklist(
      //   AbnormalChecklistNames.DoorOpenInFlight,
      //   ChecklistCategory.Abnormal,
      //   []
      // ),
      // new Checklist(
      //   AbnormalChecklistNames.LandingWithFailedBrakes,
      //   ChecklistCategory.Abnormal,
      //   []
      // ),
      // new Checklist(
      //   AbnormalChecklistNames.LandingWithFlatTire,
      //   ChecklistCategory.Abnormal,
      //   []
      // ),
      new Checklist(
        AbnormalChecklistNames.FlightDisplaysTooDim,
        ChecklistCategory.Abnormal,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. INSTRUMENT dimmer knob', action: 'OFF (FULL COUNTERCLOCKWISE)' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text single-indent" >
                If flight displays do not provide sufficient brightness:
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Revert to standby instruments.', action: null },
        ]
      ),
      // new Checklist(
      //   AbnormalChecklistNames.PitotStaticMalfunction,
      //   ChecklistCategory.Abnormal,
      //   []
      // ),
      // new Checklist(
      //   AbnormalChecklistNames.ElectricTrimAPFailure,
      //   ChecklistCategory.Abnormal,
      //   []
      // ),
      // new Checklist(
      //   AbnormalChecklistNames.BrakeFailureDuringTaxi,
      //   ChecklistCategory.Abnormal,
      //   []
      // ),
      // new Checklist(
      //   AbnormalChecklistNames.WindshieldDeiceSystemMalfunction,
      //   ChecklistCategory.Abnormal,
      //   []
      // ),
      new Checklist(
        AbnormalChecklistNames.AbortedTakeoff,
        ChecklistCategory.Abnormal,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Power Lever', action: 'IDLE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Barkes', action: 'AS REQUIRED' },
        ]
      ),
      // new Checklist(
      //   AbnormalChecklistNames.CommunicationsFailure,
      //   ChecklistCategory.Abnormal,
      //   []
      // ),
      // new Checklist(
      //   AbnormalChecklistNames.HeatedLiftTransducerMalfunction,
      //   ChecklistCategory.Abnormal,
      //   []
      // ),
      // new Checklist(
      //   AbnormalChecklistNames.ErroneousOrLossOfAntiIceFluidDisplay,
      //   ChecklistCategory.Abnormal,
      //   [],
      //   true
      // ),
    ];
  }
}

