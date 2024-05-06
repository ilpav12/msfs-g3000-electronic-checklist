import { FSComponent } from '@microsoft/msfs-sdk';

import { TbmChecklist } from '../TbmChecklist';

export enum TbmPerformanceDataChecklistNames {
  NONE = 'None'
  // TakeoffDistance3600Lb = 'Takeoff Distance - 3600 LB',
  // TakeoffDistance2900Lb = 'Takeoff Distance - 2900 LB',
  // CruisePerformance = 'Cruise Performance',
  // CruisePerformanceWith45MinuteIceAccumulation = 'Cruise Performance with 45 Minute Ice Accumulation',
  // LandingDistance3600LbFlaps100 = 'Landing Distance - 3600 LB - Flaps 100%',
  // LandingDistance3600LbFlaps50 = 'Landing Distance - 3600 LB - Flaps 50%',
  // LandingDistance3600LbFlaps0 = 'Landing Distance - 3600 LB - Flaps 0%',
  // LandingDistanceWithIceAccumulation = 'Landing Distance - with Ice Accumulation',
}

/** A utility class to generate emergency checklist data. */
export class TbmPerformanceDataChecklists {
  /**
   * Generates the emergency checklist data.
   * @returns An array of emergency checklists.
   **/
  public static getChecklists(): TbmChecklist[] {
    return [
      // new TbmChecklist(
      //   TbmPerformanceDataChecklistNames.TakeoffDistance3600Lb,
      //   TbmChecklistCategory.PerformanceData,
      //   [
      //     {
      //       type: TbmChecklistItemType.Text,
      //       text: () => (
      //         <div>
      //           Todo
      //         </div>
      //       )
      //     },
      //   ],
      // ),
      // new TbmChecklist(
      //   TbmPerformanceDataChecklistNames.TakeoffDistance2900Lb,
      //   TbmChecklistCategory.PerformanceData,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmPerformanceDataChecklistNames.CruisePerformance,
      //   TbmChecklistCategory.PerformanceData,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmPerformanceDataChecklistNames.CruisePerformanceWith45MinuteIceAccumulation,
      //   TbmChecklistCategory.PerformanceData,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmPerformanceDataChecklistNames.LandingDistance3600LbFlaps100,
      //   TbmChecklistCategory.PerformanceData,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmPerformanceDataChecklistNames.LandingDistance3600LbFlaps50,
      //   TbmChecklistCategory.PerformanceData,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmPerformanceDataChecklistNames.LandingDistance3600LbFlaps0,
      //   TbmChecklistCategory.PerformanceData,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmPerformanceDataChecklistNames.LandingDistanceWithIceAccumulation,
      //   TbmChecklistCategory.PerformanceData,
      //   [],
      //   true
      // ),
    ];
  }
}
