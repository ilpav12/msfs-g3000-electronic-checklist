import { FSComponent } from '@microsoft/msfs-sdk';
import { Checklist } from '@base/Shared/ChecklistSystem/Checklist';

export enum PerformanceDataChecklistNames {
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
export class PerformanceDataChecklists {
  /**
   * Generates the emergency checklist data.
   * @returns An array of emergency checklists.
   **/
  public static getChecklists(): Checklist[] {
    return [
      // new Checklist(
      //   PerformanceDataChecklistNames.TakeoffDistance3600Lb,
      //   ChecklistCategory.PerformanceData,
      //   [
      //     {
      //       type: ChecklistItemType.Text,
      //       text: () => (
      //         <div>
      //           Todo
      //         </div>
      //       )
      //     },
      //   ],
      // ),
      // new Checklist(
      //   PerformanceDataChecklistNames.TakeoffDistance2900Lb,
      //   ChecklistCategory.PerformanceData,
      //   []
      // ),
      // new Checklist(
      //   PerformanceDataChecklistNames.CruisePerformance,
      //   ChecklistCategory.PerformanceData,
      //   []
      // ),
      // new Checklist(
      //   PerformanceDataChecklistNames.CruisePerformanceWith45MinuteIceAccumulation,
      //   ChecklistCategory.PerformanceData,
      //   []
      // ),
      // new Checklist(
      //   PerformanceDataChecklistNames.LandingDistance3600LbFlaps100,
      //   ChecklistCategory.PerformanceData,
      //   []
      // ),
      // new Checklist(
      //   PerformanceDataChecklistNames.LandingDistance3600LbFlaps50,
      //   ChecklistCategory.PerformanceData,
      //   []
      // ),
      // new Checklist(
      //   PerformanceDataChecklistNames.LandingDistance3600LbFlaps0,
      //   ChecklistCategory.PerformanceData,
      //   []
      // ),
      // new Checklist(
      //   PerformanceDataChecklistNames.LandingDistanceWithIceAccumulation,
      //   ChecklistCategory.PerformanceData,
      //   [],
      //   true
      // ),
    ];
  }
}
