import { FSComponent } from '@microsoft/msfs-sdk';
import { Checklist, ChecklistCategory, ChecklistItemType } from '@base/Shared/ChecklistSystem/Checklist';

export enum ChecklistIdentificationNames {
  PartIdentification = 'Part Identification',
}

/** A utility class to generate crew alerting checklist data. */
export class ChecklistIdentification {
  /**
   * Generates the checklist identification data.
   * @returns An array of checklist identification data.
   **/
  public static getChecklists(): Checklist[] {
    return [
      new Checklist(
        ChecklistIdentificationNames.PartIdentification,
        ChecklistCategory.ChecklistIdentification,
        [
          {
            type: ChecklistItemType.Text,
            text: () => <div class="sr22t-checklist-text">Airframe Make & Model: Cirrus SR22T w/ FIKI</div>,
          },
          {
            type: ChecklistItemType.Text,
            text: () => <div class="sr22t-checklist-text">Applicability: Software 2647.M0 & Subs</div>,
          },
          {
            type: ChecklistItemType.Text,
            text: () => <div class="sr22t-checklist-text">Cirrus Part Number: 38412-503</div>,
          },
        ],
        true
      )
    ];
  }
}
