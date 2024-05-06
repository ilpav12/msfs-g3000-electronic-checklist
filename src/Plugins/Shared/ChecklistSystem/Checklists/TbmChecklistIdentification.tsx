import { FSComponent } from '@microsoft/msfs-sdk';

import { TbmChecklist, TbmChecklistCategory, TbmChecklistItemType } from '../TbmChecklist';

export enum TbmChecklistIdentificationNames {
  PartIdentification = 'Part Identification',
}

/** A utility class to generate crew alerting checklist data. */
export class TbmChecklistIdentification {
  /**
   * Generates the checklist identification data.
   * @returns An array of checklist identification data.
   **/
  public static getChecklists(): TbmChecklist[] {
    return [
      new TbmChecklist(
        TbmChecklistIdentificationNames.PartIdentification,
        TbmChecklistCategory.ChecklistIdentification,
        [
          {
            type: TbmChecklistItemType.Text,
            text: () => <div class="Tbm-checklist-text">Airframe Make & Model: Cirrus Tbm w/ FIKI</div>,
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => <div class="Tbm-checklist-text">Applicability: Software 2647.M0 & Subs</div>,
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => <div class="Tbm-checklist-text">Cirrus Part Number: 38412-503</div>,
          },
        ],
        true
      )
    ];
  }
}
