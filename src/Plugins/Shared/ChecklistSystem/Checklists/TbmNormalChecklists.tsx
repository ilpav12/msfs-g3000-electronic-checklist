import { FSComponent } from '@microsoft/msfs-sdk';

import { TbmChecklist, TbmChecklistCategory, TbmChecklistItemType } from '../TbmChecklist';

export enum TbmNormalChecklistNames {
  AirspeedsForNormalOperation = 'Airspeeds for Normal Operation',
  PreflightInspection = 'Preflight Inspection',
  BeforeStartingEngine = 'Before Starting Engine',
  StartingEngine = 'Starting Engine',
  BeforeTaxiing = 'Before Taxiing',
  Taxiing = 'Taxiing',
  BeforeTakeoff = 'Before Takeoff',
  NormalTakeoff = 'Normal Takeoff',
  ShortFieldTakeoff = 'Short Field Takeoff',
  FullPowerClimbROPTechnique = 'Full Power Climb: Rich of Peak Technique',
  CruiseClimbLOPTechnique = 'Cruise Climb: Lean of Peak Technique',
  Cruise = 'Cruise',
  KnownIcingConditionsInFlight = 'Known Icing Conditions - In Flight',
  Descent = 'Descent',
  BeforeLanding = 'Before Landing',
  NormalLanding = 'Normal Landing',
  ShortFieldLanding = 'Short Field Landing',
  BalkedLandingGoAround = 'Balked Landing/Go-Around',
  AfterLanding = 'After Landing',
  Shutdown = 'Shutdown',
  ColdWeatherStarting = 'Cold Weather Starting',
  HotWeatherOperation = 'Hot Weather Operation',
  ExtendedGroundOperation = 'Extended Ground Operation',
  EnablingDisablingEsp = 'Enabling/Disabling ESP',
}

/** A utility class to generate normal checklist data. */
export class TbmNormalChecklists {
  /**
   * Generates the normal checklist data.
   * @returns An array of normal checklists.
   **/
  public static getChecklists(): TbmChecklist[] {
    return [
      new TbmChecklist(
        TbmNormalChecklistNames.AirspeedsForNormalOperation,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Section, title: 'Takeoff Rotation:' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Normal, Flaps 50%', action: '77 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Obstacle Clearance, Flaps 50%', action: '85 KIAS' },
          { type: TbmChecklistItemType.Section, title: 'Enroute Climb, Flaps Up:' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Best Rate of Climb, SL', action: '103 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Best Rate of Climb, 10,000', action: '102 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Best Angle of Climb, SL', action: '88 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Best Angle of Climb, 10,000', action: '88 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Normal, Full Power, Full Rich Climb', action: '120 KIAS' },
          { type: TbmChecklistItemType.Section, title: 'Landing Approach:' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Normal Approach, Flaps Up', action: '90-95 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Normal Approach, Flaps 50%', action: '85-90 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Normal Approach, Flaps 100%', action: '80-85 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Short Field, Flaps 100% (VREF)', action: '79 KIAS' },
          { type: TbmChecklistItemType.Section, title: 'Go-Around, Flaps 50%:' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Full Power', action: '80 KIAS' },
          { type: TbmChecklistItemType.Section, title: 'Maximum Recommended Turbulent Air Penetration:' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3600 lb', action: '140 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2900 lb', action: '123 KIAS' },
          { type: TbmChecklistItemType.Section, title: 'Maximum Demonstrated Crosswind Velocity:' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Takeoff or Landing', action: '21 Knots' },
          { type: TbmChecklistItemType.Section, title: 'Anti Ice System Airspeed Limitations:' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Max. Airspeed Anti-Ice System\nOperation', action: '177 KIAS and 204 KTAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: 'Recommended Holding Airspeed', action: '120 KIAS' },
        ],
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.PreflightInspection,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Cabin', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Required Documents', action: 'ON BOARD' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Avionics Power Switch', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Bat 2 Master Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. PFD', action: 'VERIFY ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. Essential Bus Voltage', action: '23-25 VOLTS' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'f. Flap Position Light', action: 'OUT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'g. Bat 1 Master Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'h. Avionics Cooling Fan', action: 'AUDIBLE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'i. WIND SHLD Push-Button', action: 'PRESS' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) Verify evidence of deicing\nfluid from spray nozzles.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'j. PUMP BKUP Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) Metering Pump Duty Cycle', action: 'VERIFY CONTINUOUSLY ON' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(2) Deicing Fluid and Endurance\nIndications', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'k. PUMP BKUP Switch', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'l. ICE PROTECT System Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'm. ICE PROTECT Mode Switch', action: 'NORM' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) Metering Pump Duty Cycle', action: 'VERIFY 30s ON, 90s OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(2) Deicing Fluid and Endurance\nIndications', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'n. ICE PROTECT Mode Switch', action: 'HIGH' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) Metering Pump Duty Cycle', action: 'VERIFY CONTINUOUSLY ON' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(2) Deicing Fluid and Endurance\nIndications', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'o. ICE Inspection Lights Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) Verify LH and RH Operation.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'p. PITOT HEAT Switch', action: 'ON 45 SECONDS, THEN OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'q. Lights', action: 'CHECK OPERATION' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'r. Stall Warning', action: 'TEST' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: Test stall warning system by applying suction to the stall warning system inlet and noting the warning horn sounds.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 's. Fuel Quantity', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 't. Fuel Selector', action: 'SELECT FULLEST TANK' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'u. Flaps', action: '100%, CHECK LIGHT ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'v. Bat 1 and 2 Master Switches', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'w. Alternate Static Source', action: 'NORMAL' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'x. Circuit Breakers', action: 'IN' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'y. Fire Extinguisher', action: 'CHARGED AND AVAILABLE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'z. Emergency Egress Hammer', action: 'AVAILABLE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'aa. CAPS Handle', action: 'PIN REMOVED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Left Fuselage', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Door Lock', action: 'UNLOCK' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. COM 1 Antenna (top)', action: 'CONDITION AND ATTACHMENT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Transponder Antenna (underside)', action: 'CONDITION AND ATTACHMENT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Wing/Fuselage Fairing', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. COM 2 Antenna (underside)', action: 'CONDITION AND ATTACHMENT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'f. Baggage Door', action: 'CLOSED AND SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'g. Static Button', action: 'CHECK FOR BLOCKAGE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'h. Parachute Cover', action: 'SEALED AND SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Empennage', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Tiedown Rope', action: 'REMOVE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Horizontal and Vertical Stabilizers', action: 'CONDITION' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: Verify tape covering the forward and aft inspection holes located on outboard ends of horizontal stabilizer is installed and securely attached.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Elevator and Tab', action: 'CONDITION AND MOVEMENT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Rudder', action: 'FREEDOM OF MOVEMENT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. Rudder Trim Tab', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'f. Attachment hinges, bolts and\ncotter pins', action: 'SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'g. Stabilizers Porous Panels', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) Verify Evidence of Deicing\nFluid Along Length of Panels and\nElevator Horns', action: 'SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Right Fuselage', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Static Button', action: 'CHECK FOR BLOCKAGE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Wing/Fuselage Fairing', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Door Lock', action: 'UNLOCK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Right Wing Trailing Edge', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Flap and Rub Strips (if installed)', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Aileron and Tab', action: 'CONDITION AND MOVEMENT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Aileron and Seal', action: 'SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Hinges, actuation arm, bolts, and\ncotter pins', action: 'SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Right Wing Tip', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Tip', action: 'ATTACHMENT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Strobe, Nav Light and Lens', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Fuel Vent (underside)', action: 'UNOBSTRUCTED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '7. Right Wing Forward and Main Gear', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Leading Edge and Stall Strips', action: 'CONDITION' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Fuel Cap', action: 'CHECK QUANTITY AND SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Fuel Drains (2 underside)', action: 'DRAIN AND SAMPLE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Wheel Fairings', action: 'SECURITY, ACCUMULATION OF DEBRIS' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. Tire', action: 'CONDITION, INFLATION, AND WEAR' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'f. Wheel and Brakes', action: 'FLUID LEAKS, EVIDENCE OF\nOVERHEATING, GENERAL CONDITION\nAND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'g. Chocks and Tiedown Ropes', action: 'REMOVE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'h. Deicing Fluid Tank', action: 'VERIFY DESIRED QUANTITY' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) Filler Cap', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(2) Fluid Vent (underside wing)', action: 'UNOBSTRUCTED' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'i. Porous Panels', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) Verify Evidence of Deicing\nFluid Along Length of Panels.', action: null },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text warning">
                WARNING: Stall Warning Faceplate and Vane may be HOT.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'j. Lift Transducer Faceplate', action: 'PERCEPTIBLY HOT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'k. Lift Transducer Vane', action: 'VERY HOT' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) Verify Stall Warning audio\nalert after lifting stall vane with\nwooden tooth pick or tongue\ndepressor.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '8. Nose, Right Side', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Vortex Generator', action: 'CONDITION' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Cowling', action: 'ATTACHMENTS SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Exhaust Pipe', action: 'CONDITION, SECURITY, AND\nCLEARANCE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Gascolator (underside)', action: 'DRAIN FOR 3 SECONDS, SAMPLE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. Ice—lnspection Light', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '9. Nose gear, Propeller, and Spinner', action: null },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text warning">
                WARNING: Keep clear of propeller rotation plane. Do not allow others to approach propeller.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Tow Bar', action: 'REMOVE AND STOW' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Strut', action: 'CONDITION' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Wheel Fairing', action: 'SECURITY, ACCUMULATION OF DEBRIS' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Wheel and Tire', action: 'CONDITION, INFLATION, AND WEAR' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. Propeller', action: 'CHECK ADEOUATE GROUND\nCLEARANCE, CONDITION\n(INDENTATIONS, NICKS, ETC.)' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'f. Slinger Ring', action: 'EVIDENCE OF DEICING FLUID' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'g. Spinner', action: 'CONDITION, SECURITY, AND OIL LEAKS' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'h. Air Inlets', action: 'UNOBSTRUCTED' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'i. Alternator', action: 'CONDITION' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '10. Nose, Left Side', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Landing Light', action: 'CONDITION' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Engine Oil', action: 'CHECK 6-8 QUARTS, LEAKS, CAP &\nDOOR SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Cowling', action: 'ATTACHMENTS SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. External Power', action: 'DOOR SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. Vortex Generator', action: 'CONDITION' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'f. Exhaust Pipe.', action: 'CONDITION, SECURITY, AND\nCLEARANCE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'g. Ice—lnspection Light', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'h. Windshield Spray Nozzles', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '11. Left Gear and Forward Wing', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Wheel fairings', action: 'SECURITY, ACCUMULATION OF DEBRIS' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Tire', action: 'CONDITION, INFLATION, AND WEAR' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Wheel and Brakes', action: 'FLUID LEAKS, EVIDENCE OF\nOVERHEATING, GENERAL CONDITION\nAND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Chocks and Tiedown Ropes', action: 'REMOVE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. Fuel Drains (2 underside)', action: 'DRAIN AND SAMPLE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'f. Fuel Cap.', action: 'CHECK QUANTITY AND SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'g. Leading Edge and Stall Strips', action: 'CONDITION' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'h. Deicing Fluid Tank', action: 'VERIFY DESIRED QUANTITY' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) Filler Cap', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(2) Fluid Vent (underside wing)', action: 'UNOBSTRUCTED' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'i. Porous Panels', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) Verify Evidence of Deicing\nFluid Along Length of Panels.', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '12. Left Wing Tip', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Fuel Vent (underside)', action: 'UNOBSTRUCTED' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text warning">
                WARNING: Pitot Probe may be HOT.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Pitot Probe (underside)', action: 'UNOBSTRUCTED' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Pitot Probe', action: 'VERY HOT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Strobe, Nav Light and Lens', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. Tip', action: 'ATTACHMENT' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '13. Left Wing Trailing Edge', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Flap and Rub Strips (If installed)', action: 'CONDITION AND SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Aileron', action: 'FREEDOM OF MOVEMENT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Aileron Gap Seal', action: 'SECURITY' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Hinges, actuation arm, bolts, and\ncotter Pins', action: 'SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '14. Cabin', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Fluid Quantity', action: 'VERIFY 5 GALLON MINIMUM' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. ICE PROTECT System Switch', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Flaps', action: '0%' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Battery 1 Master Switch', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. Avionics Master Switch', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'f. Cabin Speaker', action: 'OFF' },
        ],
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.BeforeStartingEngine,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Preflight Inspection', action: 'COMPLETED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Weight and Balance', action: 'VERIFY WITHN LIMITS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Emergency Equipment', action: 'ON BOARD' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Passengers', action: 'BRIEFED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Seats, Seat Belts, and Harnesses', action: 'ADJUST & SECURE' },
          {
            type: TbmChecklistItemType.Text,
            extendedMarginBelow: true,
            text: () => (
              <div class="Tbm-checklist-text warning">
                WARNING: Ensure that the airplane is properly loaded and within the AFM’s weight and
                balance limitations prior to takeoff.
              </div>
            ),
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                CAUTION: Crew seats must be locked in position and control handles fully down before
                flight. Ensure seat belt harnesses are not twisted.
              </div>
            ),
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                Prior to flight, Verify CAPS handle safety pin is removed and ensure all the passengers
                have been fully briefed on smoking, the use of the oxygen system, seat belts, doors,
                emergency exits, egress hammer, and CAPS.
              </div>
            ),
          },
        ],
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.StartingEngine,
        TbmChecklistCategory.Normal,
        [
          {
            type: TbmChecklistItemType.Text,
            extendedMarginBelow: true,
            text: () => (
              <div class="Tbm-checklist-text warning">
                WARNING: If airplane will be started using external power, keep all personnel and power
                unit cables well clear of the propeller rotation plane.
              </div>
            ),
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                CAUTION: Alternators should be left OFF during engine starting to avoid high electrical
                loads. During start, limit cranking to intervals of 10 seconds with a 20-second cooling
                period between cranks. This will improve battery and contactor life.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. External Power (If applicable)', action: 'CONNECT' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Brakes', action: 'HOLD' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Bat Master Switches', action: 'ON (CHECK VOLTS)' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Strobe Lights', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Mixture', action: 'FULL RICH' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Power Lever', action: 'FULL FORWARD' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '7. Fuel Pump', action: 'BOOST' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '8. Propeller Area', action: 'CLEAR' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '9. Power Lever', action: 'OPEN 1/4 INCH' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '10. Ignition Switch', action: 'START (RELEASE AFTER ENGINE\nSTARTS)' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '11. Mixture', action: 'LEAN UNTIL RPM RISES TO A MAXIMUM\nVALUE. LEAVE THE MIXTURE IN THIS\nPOSITION DURING TAXI AND UNTIL\nRUNUP' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '12. Power Lever', action: 'RETARD (TO MAINTAIN 1000 RPM)' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '13. Oil Pressure', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '14. Alt Master Switches', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '15. Avionics Power Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '16. Engine Parameters', action: 'MONITOR' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '17. External Power (If applicable)', action: 'DISCONNECT' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '18. Amp Meter/Indication', action: 'CHECK' },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.BeforeTaxiing,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Flaps', action: 'UP (0%)' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Radios/Avionics', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Cabin Heat/Defrost', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Fuel Selector', action: 'SWITCH TANK' },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.Taxiing,
        TbmChecklistCategory.Normal,
        [
          {
            type: TbmChecklistItemType.Text,
            extendedMarginBelow: true,
            text: () => (
              <div class="Tbm-checklist-text warning">
                WARNING: Maximum continuous engine speed for taxiing is 1000 RPM on flat, smooth,
                hard surfaces. Power settings slightly above 1000 RPM are permissible to start motion,
                for turf, soft surfaces, and on inclines. Use minimum power to maintain taxi speed. If the
                1000 RPM taxi power limit and proper braking procedures are not observed, the brake
                system may overheat and result in brake damage or brake fire.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Parking Brake', action: 'DISENGAGE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Brakes', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. HSI Orientation', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Attitude Gyro', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Turn Coordinator', action: 'CHECK' },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.BeforeTakeoff,
        TbmChecklistCategory.Normal,
        [
          {
            type: TbmChecklistItemType.Text,
            extendedMarginBelow: true,
            text: () => (
              <div class="Tbm-checklist-text warning">
                WARNING: Do not takeoff with frost, ice, snow, or other contamination on the fuselage,
                wing, stabilizers, and control surfaces.
              </div>
            ),
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                CAUTION: Because this aircraft has a turbocharged system that maintains 36.0 in.Hg
                manifold pressure for all takeoffs, the mixture should be full rich for takeoff, even at high
                elevation airports. Leaning for takeoff and during maximum performance climb may cause
                excessive cylinder head temperatures.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Doors', action: 'LATCHED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. CAPS Handle', action: 'VERIFY PIN REMOVED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Seat Belts and Shoulder Harness', action: 'SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Air Conditioner', action: ' AS DESIRED' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                CAUTION: Use of RECIRC mode prohibited in flight.
              </div>
            ),
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: Aircraft with optional Air Conditioning System: Add 100 feet to ground roll
                distance and 150 feet to distance over 50' obstacle if Air Conditioner is ON during
                takeoff.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Fuel Quantity', action: 'CONFIRM' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Fuel Selector', action: 'FULLEST TANK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '7. Fuel Pump', action: 'BOOST' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '8. Mixture', action: 'FULL RICH' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '9. Flaps', action: 'SET 50% & CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '10. Transponder', action: 'SET' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '11. Autopilot', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '12. Navigation Radios/GPS', action: 'SET FOR TAKEOFF' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '13. Cabin Heat/Defrost', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '14. Brakes', action: 'HOLD' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '15. Power Lever', action: '1700 RPM' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '16. Alternator', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Pitot Heat', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Navigation Lights', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Landing Light', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Annunciator Lights', action: 'CHECK' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text double-indent">
                -Verify both ALT 1 and ALT 2 caution lights out and positive amps indication for<br />each alternator.
              </div>
            )
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '17. Voltage', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '18. Pitot Heat', action: 'AS REQUIRED' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: Pitot Heat should be turned ON for flight into IMC, flight into visible moisture, or
                whenever ambient temperatures are 41 F (5 C) or less.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '19. Navigation Lights', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '20. Landing Light', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '21. Magnetos', action: 'CHECK LEFT AND RIGHT' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text single-indent">
                RPM drop must not exceed 150 RPM for either magneto. RPM differential must not<br />exceed 75 RPM between magnetos.
              </div>
            )
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Ignition Switch', action: 'R, NOTE RPM, THEN BOTH' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Ignition Switch', action: 'L, NOTE RPM, THEN BOTH' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '22. Engine Parameters', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '23. Power Lever', action: '1000 RPM' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '24. Flight Instruments, HSI, and Altimeter\nAltimeter', action: 'CHECK & SET' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '25. Flight Controls', action: 'FREE & CORRECT' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '26. Trim', action: 'SET TAKEOFF' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '27. Autopilot', action: 'DISCONNECT', extendedMarginBelow: true },
          { type: TbmChecklistItemType.Section, title: 'If icing conditions are anticipated immediately after take-off:' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. ICE PROTECT System Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. ICE PROTECT Mode Switch ', action: 'NORM' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. PITOT HEAT Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Cabin Heat ', action: 'HOT' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. Windshield Defrost', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'f. Ice—lnspection Lights', action: 'AS REOUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'g. Verify airframe is free of\ncontamination immediately before takeoff.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'h. Flaps', action: 'RETRACT AS SOON AS PRACTICAL' },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.NormalTakeoff,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Brakes', action: 'RELEASE (STEER WITH RUDDER ONLY)' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Power Lever', action: 'FULL FORWARD' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Engine Parameters', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Elevator Control', action: 'ROTATE SMOOTHLY AT 77-80 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. At 90 KIAS, Flaps', action: 'UP' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: Fuel BOOST should be left ON during takeoff and for Climb as required for vapor
                suppression with hot or warm fuel.
              </div>
            ),
          },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.ShortFieldTakeoff,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Flaps', action: '50%' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Brakes', action: 'HOLD' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Power Lever', action: 'FULL FORWARD' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Engine Parameters', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Brakes', action: 'RELEASE (STEER WITH RUDDER ONLY)' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Elevator Control', action: 'ROTATE SMOOTHLY AT 77 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '7. Airspeed at Obstacle', action: '85 KIAS' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                The fuel pump should be in the BOOST position during takeoff and for climb as required
                for vapor suppression with hot or warm fuel.
              </div>
            ),
          },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.FullPowerClimbROPTechnique,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Oxygen', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Power Lever', action: 'FULL FORWARD' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Mixture', action: 'MAINTAIN FUEL FLOW IN GREEN ARC' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Flaps', action: 'VERIFY UP' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Airspeed', action: '120 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Fuel Pump', action: 'BOOST' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '7. Fuel Flow', action: 'MONITOR' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '8. Engine Parameters', action: 'MONITOR' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: The fuel pump should be in the BOOST position during takeoff and for climb as
                required for vapor suppression with hot or warm fuel.
              </div>
            ),
          },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.CruiseClimbLOPTechnique,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Power Lever', action: 'REDUCE TO 305 IN. HG' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Mixture', action: 'LEAN TO CYAN TARGET OR LESS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Minimum Airspeed', action: '120 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Fuel Pump', action: 'BOOST' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Oxygen', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Oxygen Masks/Cannulas', action: 'DON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. Oxygen System', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Flow Rate', action: 'ADJUST FOR PLANNED CRUISE\nALTITUDE' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Flowmeters and Quantity', action: 'MONITOR' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Cylinder Head Temperatures', action: 'MONITOR' },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.Cruise,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Oxygen', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Cruise Altitude', action: 'ESTABLISHED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Power Lever', action: 'REDUCE TO 30.5 IN. HG OR LESS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Fuel Pump', action: 'AS REQUIRED' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: The Fuel Pump must be set to BOOST during maneuvering flight (i.e. flight training
                maneuvers, chandelles, stalls, etc.).
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Mixture', action: 'ADJUST' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Engine Parameters', action: 'MONITOR' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '7. Fuel Flow and Balance', action: 'MONITOR' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text single-indent">
                If any CHT’s exceed 420°F:
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '8. Mixture', action: 'LEAN 0.5 GPH AND MONITOR' },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.KnownIcingConditionsInFlight,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Section, title: 'If Inadvertent Icing Encounter OR Icing Conditions Exist:' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. PITOT HEAT Switch', action: 'VERIFY ON' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. ICE PROTECT System Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. ICE PROTECT Mode Switch', action: 'NORM' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. WIND SHLD Push-Button', action: 'PRESS AS REOUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Monitor ice accumulation', action: null },
          {
            type: TbmChecklistItemType.Text, text: () => (
              <div class="Tbm-checklist-text single-indent">
                If ice accretions do not shed from protected surfaces:
              </div>
            )
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. ICE PROTECT Mode', action: 'HIGH' },
          {
            type: TbmChecklistItemType.Text, text: () => (
              <div class="Tbm-checklist-text single-indent">
                If ice accumulating on protected surfaces:
              </div>
            )
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. ICE PROTECT Mode Push-Button', action: 'MAX' },
          {
            type: TbmChecklistItemType.Text, text: () => (
              <div class="Tbm-checklist-text single-indent">
                If ice accumulating on protected surfaces:
              </div>
            )
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. PUMP BKUP Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. Perform Anti—lce System Failure\nchecklist', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. WIND SHLD Push-Button', action: 'PRESS AS REOUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'f. Airspeed', action: 'MAINTAIN 95-177 KIAS OR LESS THAN\n204 KTAS' },
          { type: TbmChecklistItemType.Section, title: 'While in Icing Conditions:' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. FLAPS', action: 'UP' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Ice—lnspection Lights', action: 'AS REOUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Cabin Heat', action: 'HOT' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Windshield Defrost', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Anti—lce Fluid Quantity and\nEndurance', action: 'MONITOR' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Ensure adequate quantity to\nComplete flight', action: null, extendedMarginBelow: true },
          { type: TbmChecklistItemType.Section, title: 'After Leaving Icing Conditions:' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Anti—lce System', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Airspeed', action: 'AS FLIGHT CONDITIONS DICTATE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Ice—lnspection Lights', action: 'AS REOUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Cabin Heat', action: 'AS REOUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Windshield Defrost', action: 'AS REOUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. WIND SHLD Push-Button', action: 'PRESS AS REQUIRED' },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.Descent,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Oxygen', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Altimeter', action: 'SET' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Cabin Heat/Defrost', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Landing Light', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Fuel System', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Power Lever', action: 'AS REQUIRED' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text single-indent">
                For Rapid Descent:
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Power Lever', action: 'SMOOTHLY REDUCE MAP 18 TO 20 IN.\nHG' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '7. Mixture', action: 'AS REQUIRED' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text single-indent">
                For Rapid Descent:
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Mixture', action: 'MAINTAIN CHTS ABOVE 240 F' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '8. Brake Pressure', action: 'CHECK' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                Avoid prolonged idle settings. Maintain a CHT of 240°F (116°C) or greater.
              </div>
            ),
          },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.BeforeLanding,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Seat Belt and Shoulder Harness', action: 'SECURE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Fuel Pump', action: 'BOOST' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Mixture', action: 'FULL RICH' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Flaps', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Autopilot', action: 'AS REQUIRED', extendedMarginBelow: true },
          { type: TbmChecklistItemType.Section, title: 'If icing conditions are anticipated for approach and landing:' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. ICE PROTECT System Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'b. ICE PROTECT Mode Switch', action: 'HIGH' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'c. Monitor ice accumulation.', action: null },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text double-indent">
                If ice continues accumulating on protected surfaces:
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) ICE PROTECT Mode Push-\nButton', action: 'MAX' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text double-indent">
                If ice accretions do not shed from protected surfaces:
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(1) PUMP BKUP Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 3, title: '(2) Perform Anti—lce System\nFailure checklist', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'd. WIND SHLD Push-Button', action: 'PRESS AS REQUIRED' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                CAUTION: To prevent an obstructed View due to residual deicing fluid on windshield, do
                not operate windshield de—ice system within 30 seconds of landing.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'e. Ice—lnspection Lights', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'f. Flaps', action: '50%' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'g. Airspeed', action: 'MINIMUM OF 95 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'h. Airspeed on Short Final', action: '88 KIAS' },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.NormalLanding,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Flaps', action: '100%' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Airspeed', action: '80-85 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Power Lever', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Text, text: () => <div class="Tbm-checklist-text single-indent">After touchdown:</div> },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Brakes', action: 'AS REQUIRED' },
          {
            type: TbmChecklistItemType.Text,
            extendedMarginBelow: true,
            text: () => (
              <div class="Tbm-checklist-text ">
                CAUTION: Landings should be made with full flaps. Landings with less than full flaps are
                recommended only if the flaps fail to deploy or to extend the aircraft’s glide distance
                redue to engine malfunction. Landings with flaps at 50% or 0%; power should be used to
                achieve a normal glide path and low descent rate. Flare should be minimized.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Section, title: 'Normal Landing' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                Normal landings are made with full flaps with power on or off. Surface winds and air
                turbulence are usually the primary factors in determining the most comfortable approach
                speeds.
              </div>
            ),
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                Actual touchdown should be made with power off and on the main wheels first to reduce.
                the landing speed and subsequent need for braking. Gently lower the nose wheel to the
                runway after airplane speed has diminished. This is especially important for rough or soft
                field landings.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Section, title: 'Crosswind Landings' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                Normal crosswind landings are made with full flaps. Avoid prolonged slips. After
                touchdown, hold a straight course with rudder and brakes as required.
              </div>
            ),
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                The maximum allowable crosswind velocity is dependent upon pilot capability as well as
                aircraft limitations. Operation in direct crosswinds of 21 knots has been demonstrated.
              </div>
            ),
          },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.ShortFieldLanding,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Flaps', action: '100%' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Airspeed', action: '79 KIAS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Power Lever', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Text, text: () => <div class="Tbm-checklist-text single-indent">After clear of obstacles:</div> },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Power Lever', action: 'REDUCE TO IDLE' },
          { type: TbmChecklistItemType.Text, text: () => <div class="Tbm-checklist-text single-indent">After touchdown:</div> },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Brakes', action: 'MAXIMUM' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                For a short field landing in smooth air conditions, make an approach at 79 KIAS with full
                flaps using enough power to control the glide path (slightly higher approach speeds
                should be used under turbulent air conditions). After all approach obstacles are cleared,
                progressively reduce power to reach idle just before touchdown and maintain the
                approach speed by lowering the nose of the airplane. Touchdown should be made power-
                off and on the main wheels first.
              </div>
            ),
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                Immediately after touchdown, lower the nose wheel and apply braking as required. For
                maximum brake effectiveness, retract the flaps, hold the control yoke full back, and apply
                maximum brake pressure without skidding.
              </div>
            ),
          },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.BalkedLandingGoAround,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Autopilot', action: 'DISENGAGE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Power Lever', action: 'FULL FORWARD' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Flaps', action: '50%' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Airspeed', action: '80-85 KIAS' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text single-indent">
                After clear of obstacles:
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Flaps', action: 'UP' },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.AfterLanding,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Power Lever', action: '1000 RPM' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Fuel Pump', action: 'OFF OR BOOST' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Mixture', action: 'LEAN TO OBTAIN MAXIMUM IDLE RPM' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Flaps', action: 'UP' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Transponder', action: 'STBY' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Lights', action: 'AS REQUIRED' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '7. PITOT HEAT Switch', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '8. ICE PROTECT System Switch', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '9. PUMP BKUP Switch', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '10. Ice—lnspection Lights', action: 'OFF' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: As the airplane slows the rudder becomes less effective and taxiing is
                accomplished using differential braking.
              </div>
            ),
          },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.Shutdown,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Fuel Pump (if used)', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Throttle', action: 'IDLE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Ignition Switch', action: 'CYCLE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Mixture', action: 'CUTOFF' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. All Switches', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Magnetos', action: 'OFF' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '7. ELT', action: 'TRANSMIT LIGHT OUT' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '8. Chocks, Tie-downs, Pitot Covers', action: 'AS REQUIRED' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                CAUTION: Note that the engine hesitates as the switch cycles through the “OFF”
                position. If the engine does not hesitate, one or both magnetos are not grounded.
                Prominently mark the propeller as being “Hot”, and contact maintenance personnel
                immediately.
              </div>
            ),
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: After a hard landing, the ELT may activate. If this is suspected, press the RESET
                button.
              </div>
            ),
          },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.ColdWeatherStarting,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Ignition Switch', action: 'OFF' },
          {
            type: TbmChecklistItemType.Text,
            extendedMarginBelow: true,
            text: () => (
              <div class="Tbm-checklist-text warning">
                WARNING: Use caution when pulling the propeller through by hand. Make sure
                ignition switch is OFF, keys are out of ignition, and then act as if the engine will start.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Propeller', action: 'HAND TURN SEVERAL ROTATIONS' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. External Power (If applicable)', action: 'CONNECT' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Brakes', action: 'HOLD' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Bat Master Switches', action: 'ON (CHECK VOLTAGE)' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Mixture', action: ' FULL RICH' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '7. Power lever', action: 'FULL FORWARD' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '8. Fuel Pump', action: 'HIGH BOOST/PRIME, THEN BOOST' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: In temperatures down to 20°F, hold Fuel Pump switch to HIGH BOOST/PRIME for 15
                seconds prior to starting.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '9. Propeller Area', action: 'CLEAR' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '10. Power Lever', action: ' OPEN 1/4 INCH' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '11. Ignition Switch', action: 'START (RELEASE AFTER ENGINE\nSTARTS)' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                CAUTION: Limit cranking to intervals of 10 seconds with a 20 second cooling period
                between cranks.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '12. Power Lever', action: 'RETARD (TO MAINTAIN 1000 RPM)' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '13. Oil Pressure', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '14. Alt Master Switches', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '15. Avionics Power Switch', action: 'ON' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '16. Engine Parameters', action: 'MONITOR' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '17. External Power (If applicable)', action: 'DISCONNECT' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '18. Amp Meter/Indication', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '19. Strobe Lights', action: 'ON' },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.HotWeatherOperation,
        TbmChecklistCategory.Normal,
        [
          { type: TbmChecklistItemType.Section, title: 'Ground Operation of Air Conditioning (Optional)' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: To facilitate faster cabin cooling, prior to engine start leave the cabin doors open
                for a short time to allow hot air to escape cabin.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Control Panel', action: 'SELECT DESIRED MODE AND\nTEMPERATURE' },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Voltage', action: 'MONITOR' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: Decrease electrical load if battery discharge is noted.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Annunciator Lights', action: 'CHECK' },
          { type: TbmChecklistItemType.Checkbox, level: 2, title: 'a. Verify ALT 1 caution light out and\npositive amps indication.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Engine Parameters', action: 'CHECK' },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.ExtendedGroundOperation,
        TbmChecklistCategory.Normal,
        [
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                For airplanes that experience prolonged engine operation on the ground, the following
                procedure is recommended to reduce potential for spark plug lead fouling and lead build—
                up on engine valve guides.
              </div>
            ),
          },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text warning">
                WARNING: Before takeoff, the mixture lever mst be returned to the full forward/rich
                position.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Set throttle to 1200 RPM.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Lean the mixture for maximum RPM.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Reduce throttle to RPM for continued\nground operations (800 — 1000 RPM is recommended).', action: null },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                NOTE: If further ground operations will be required after the BEFORE TAKEOFF checklist
                is completed, lean the mixture again (as described above) until ready for the TAKEOFF
                checklist.
              </div>
            ),
          },
        ]
      ),
      new TbmChecklist(
        TbmNormalChecklistNames.EnablingDisablingEsp,
        TbmChecklistCategory.Normal,
        [
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                When installed, Electronic Stability and Protection (ESP) assists the pilot in maintaining
                the airplane in a safe flight condition. To Enable/Disable the System:
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. Turn the large FMS Knob to select\nthe AUX page group.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '2. Turn the small FMS Knob to select\nthe System Setup Page.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '3. Press the SETUP 2 Softkey.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '4. Press the FMS Knob momentarily to\nactivate the flashing cursor.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '5. Turn the large FMS Knob to highlight\nthe Status field in the Stability &\nProtection Box.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '6. Turn the small FMS Knob to select\nENABLED or DISABLED.', action: null },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '7. Press the FMS Knob momentarily to\nremove the flashing cursor.', action: null },
          { type: TbmChecklistItemType.Section, title: 'Temporary Interrupt of ESP' },
          {
            type: TbmChecklistItemType.Text,
            text: () => (
              <div class="Tbm-checklist-text ">
                Although ESP is only provided when AFCS Autopilot is disengaged, the AFCS and its
                servos are the source of ESP guidance. When the AP Disconnect button is pressed and
                held, the servos will provide no ESP control force feedback. Upon release of the AP
                Disconnect button, ESP will be restored.
              </div>
            ),
          },
          { type: TbmChecklistItemType.Checkbox, level: 1, title: '1. AP Disconnect', action: 'PRESS AND HOLD UNTIL MANEUVER\nCOMPLETE' },
        ],
        true
      ),
    ];
  }
}
