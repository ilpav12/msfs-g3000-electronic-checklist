/* eslint-disable max-len */
import { FSComponent } from '@microsoft/msfs-sdk';

import { TbmChecklist } from '../TbmChecklist';

export enum TbmCrewAlertingChecklistNames {
  NONE = 'None'
  // CasDescription = 'CAS Description',
  // OilPressWarning = 'OIL PRESS Warning',
  // OilTempWarning = 'OIL TEMP Warning',
  // ChtCautionAndWarning = 'CHT Caution and Warning',
  // ManPressureWarning = 'MAN PRESSURE Warning',
  // TitWarning = 'TIT Warning',
  // RpmWarning = 'RPM Warning',
  // FuelQtyWarning = 'FUEL QTY Warning',
  // FuelImbalanceWarning = 'Fuel Imbalance Warning',
  // MBus1Warning = 'M BUS 1 Warning',
  // MBus2Warning = 'M BUS 2 Warning',
  // EssBusWarning = 'ESS BUS Warning',
  // CoLvlHighWarning = 'CO LVL HIGH Warning',
  // OxygenFaultWarning = 'OXYGEN FAULT Warning',
  // OxygenQtyWarning = 'OXYGEN QTY Warning',
  // BrakeTempWarning = 'BRAKE TEMP Warning',
  // StarterEngagedWarning = 'STARTER ENGAGED Warning',
  // AutoDescentWarning = 'AUTO DESCENT Warning',
  // UnderspeedProtectActiveWarning = 'UNDERSPEED PROTECT ACTIVE Warning',
  // AntiIceFloWarning = 'ANTI ICE FLO Warning',
  // AntiIceCtlWarning = 'ANTI ICE CTL Warning',
  // AntiIceQtyCautionAndWarning = 'ANTI ICE QTY Caution and Warning',
  // AoaOverheatCautionAndWarning = 'AOA OVERHEAT Caution and Warning',
  // OilPressCaution = 'OIL PRESS Caution',
  // ManPressureCaution = 'MAN PRESSURE Caution',
  // StarterEngagedCaution = 'STARTER ENGAGED Caution',
  // AltAirOpenCaution = 'ALT AIR OPEN Caution',
  // FuelQtyCaution = 'FUEL QTY Caution',
  // FuelImbalanceCaution = 'FUEL IMBALANCE Caution',
  // MBus1Caution = 'M BUS 1 Caution',
  // MBus2Caution = 'M BUS 2 Caution',
  // Batt1Caution = 'BATT 1 Caution',
  // Alt1Caution = 'ALT 1 Caution',
  // Alt2Caution = 'ALT 2 Caution',
  // AvionicsOffCaution = 'AVIONICS OFF Caution',
  // PitotHeatFailCaution = 'PITOT HEAT FAIL Caution',
  // PitotHeatRequiredCaution = 'PITOT HEAT REQUIRED Caution',
  // FlapsCaution = 'FLAPS Caution',
  // BrakeTempCaution = 'BRAKE TEMP Caution',
  // OxygenQtyCaution = 'OXYGEN QTY Caution',
  // OxygenRqdCaution = 'OXYGEN RQD Caution',
  // ParkBrakeCaution = 'PARK BRAKE Caution',
  // AntiIcePsiCaution = 'ANTI ICE PSI Caution',
  // AntiIceSpdCaution = 'ANTI ICE SPD Caution',
  // AntiIceLvlCaution = 'ANTI ICE LVL Caution',
  // AntiIceHtrCaution = 'ANTI ICE HTR Caution',
  // AoaFailAdvisory = 'AOA FAIL Advisory',
  // AltMiscompCaution = 'ALT MISCOMP Caution',
  // IasMiscompCaution = 'IAS MISCOMP Caution',
  // HdgMiscompCaution = 'HDG MISCOMP Caution',
  // PitMiscompCaution = 'PIT MISCOMP Caution',
  // RollMiscompCaution = 'ROLL MISCOMP Caution',
  // ApMiscompCaution = 'AP MISCOMP Caution',
  // ApPfdAhrsCaution = 'AP/PFD AHRS Caution',
  // NoAdcModesCaution = 'NO ADC MODES Caution',
  // NoVertModesCaution = 'NO VERT MODES Caution',
  // HypoxiaAlertCaution = 'HYPOXIA ALERT Caution',
}

/** A utility class to generate crew alerting checklist data. */
export class TbmCrewAlertingChecklists {
  /**
   * Generates the crew alerting checklist data.
   * @returns An array of crew alerting checklists.
   **/
  public static getChecklists(): TbmChecklist[] {
    return [
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.CasDescription,
      //   TbmChecklistCategory.CrewAlerting,
      //   [
      //     {
      //       type: TbmChecklistItemType.Text,
      //       text: () => (
      //         <div class="Tbm-checklist-text">
      //           Aircraft annunciations and alerts are displayed in the Crew Alerting System (CAS) window located to the right of the altimeter and VSI. Aircraft annunciations are
      //           grouped by criticality and sorted by order of appearance with the most recent message on top. The color of the message text is based on its urgency and required
      //           action:
      //         </div>
      //       )
      //     },
      //   ],
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.OilPressWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.OilTempWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.ChtCautionAndWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.ManPressureWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.TitWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.RpmWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.FuelQtyWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.FuelImbalanceWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.MBus1Warning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.MBus2Warning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.EssBusWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.CoLvlHighWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.OxygenFaultWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.OxygenQtyWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.BrakeTempWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.StarterEngagedWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AutoDescentWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.UnderspeedProtectActiveWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AntiIceFloWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AntiIceCtlWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AntiIceQtyCautionAndWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AoaOverheatCautionAndWarning,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.OilPressCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.ManPressureCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.StarterEngagedCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AltAirOpenCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.FuelQtyCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.FuelImbalanceCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.MBus1Caution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.MBus2Caution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.Batt1Caution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.Alt1Caution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.Alt2Caution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AvionicsOffCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.PitotHeatFailCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.PitotHeatRequiredCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.FlapsCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.BrakeTempCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.OxygenQtyCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.OxygenRqdCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.ParkBrakeCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AntiIcePsiCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AntiIceSpdCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AntiIceLvlCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AntiIceHtrCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AoaFailAdvisory,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.AltMiscompCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.IasMiscompCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.HdgMiscompCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.PitMiscompCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.RollMiscompCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.ApMiscompCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.ApPfdAhrsCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.NoAdcModesCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.NoVertModesCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new TbmChecklist(
      //   TbmCrewAlertingChecklistNames.HypoxiaAlertCaution,
      //   TbmChecklistCategory.CrewAlerting,
      //   [],
      //   true
      // ),
    ];
  }
}
