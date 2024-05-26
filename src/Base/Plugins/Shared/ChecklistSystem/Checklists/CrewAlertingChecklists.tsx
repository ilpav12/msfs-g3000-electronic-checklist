/* eslint-disable max-len */
import { FSComponent } from '@microsoft/msfs-sdk';
import { Checklist } from '@base/Shared/ChecklistSystem/Checklist';

export enum CrewAlertingChecklistNames {
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
export class CrewAlertingChecklists {
  /**
   * Generates the crew alerting checklist data.
   * @returns An array of crew alerting checklists.
   **/
  public static getChecklists(): Checklist[] {
    return [
      // new Checklist(
      //   CrewAlertingChecklistNames.CasDescription,
      //   ChecklistCategory.CrewAlerting,
      //   [
      //     {
      //       type: ChecklistItemType.Text,
      //       text: () => (
      //         <div class="sr22t-checklist-text">
      //           Aircraft annunciations and alerts are displayed in the Crew Alerting System (CAS) window located to the right of the altimeter and VSI. Aircraft annunciations are
      //           grouped by criticality and sorted by order of appearance with the most recent message on top. The color of the message text is based on its urgency and required
      //           action:
      //         </div>
      //       )
      //     },
      //   ],
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.OilPressWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.OilTempWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.ChtCautionAndWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.ManPressureWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.TitWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.RpmWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.FuelQtyWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.FuelImbalanceWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.MBus1Warning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.MBus2Warning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.EssBusWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.CoLvlHighWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.OxygenFaultWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.OxygenQtyWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.BrakeTempWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.StarterEngagedWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AutoDescentWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.UnderspeedProtectActiveWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AntiIceFloWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AntiIceCtlWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AntiIceQtyCautionAndWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AoaOverheatCautionAndWarning,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.OilPressCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.ManPressureCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.StarterEngagedCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AltAirOpenCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.FuelQtyCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.FuelImbalanceCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.MBus1Caution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.MBus2Caution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.Batt1Caution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.Alt1Caution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.Alt2Caution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AvionicsOffCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.PitotHeatFailCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.PitotHeatRequiredCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.FlapsCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.BrakeTempCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.OxygenQtyCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.OxygenRqdCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.ParkBrakeCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AntiIcePsiCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AntiIceSpdCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AntiIceLvlCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AntiIceHtrCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AoaFailAdvisory,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.AltMiscompCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.IasMiscompCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.HdgMiscompCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.PitMiscompCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.RollMiscompCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.ApMiscompCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.ApPfdAhrsCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.NoAdcModesCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.NoVertModesCaution,
      //   ChecklistCategory.CrewAlerting,
      //   []
      // ),
      // new Checklist(
      //   CrewAlertingChecklistNames.HypoxiaAlertCaution,
      //   ChecklistCategory.CrewAlerting,
      //   [],
      //   true
      // ),
    ];
  }
}
