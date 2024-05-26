import { FSComponent } from '@microsoft/msfs-sdk';
import { Checklist, ChecklistCategory, ChecklistItemType } from '@base/Shared/ChecklistSystem/Checklist';

export enum EmergencyChecklistNames {
  AirspeedsForEmergencyOperations = 'Airspeeds for Emergency Operations',
  EngineFailureOnTakeoffLowAltitude = 'Engine Failure On Takeoff (Low Altitude)',
  EngineFailureInFlight = 'Engine Failure In Flight',
  // EngineAirstart = 'Engine Airstart',
  // CabinFireInFlight = 'Cabin Fire In Flight',
  // EngineFireInFlight = 'Engine Fire In Flight',
  // WingFireInFlight = 'Wing Fire In Flight',
  // EngineFireDuringStart = 'Engine Fire During Start',
  // SmokeAndFumeElimination = 'Smoke and Fume Elimination',
  EmergencyDescent = 'Emergency Descent',
  MaximumGlide = 'Maximum Glide',
  EmergencyLandingWithoutEnginePower = 'Emergency Landing Without Engine Power',
  Ditching = 'Ditching',
  LandingWithoutElevatorControl = 'Landing Without Elevator Control',
  EnginePartialPowerLoss = 'Engine Partial Power Loss',
  UnexpectedLossOfManifoldPressure = 'Unexpected Loss of Manifold Pressure',
  // OverboostPressureReliefValve = 'Overboost / Pressure Relief Valve',
  // EgtTitChtTemperatureSensorFailure = 'EGT, TIT or CHT Temperature Sensor Failure',
  // PropellerGovernorFailure = 'Propeller Governor Failure',
  AhrsFailure = 'Attitude & Heading Reference System (AHRS) Failure',
  AdcFailure = 'Air Data Computer (ADC) Failure',
  PfdDisplayFailure = 'PFD Display Failure',
  InadvertentSpinEntry = 'Inadvertent Spin Entry',
  InadvertentSpiralDiveDuringImcFlight = 'Inadvertent Spiral Dive During IMC Flight',
  // PowerLeverLinkageFailure = 'Power Lever Linkage Failure',
  EmergencyEngineShutdownOnGround = 'Emergency Engine Shutdown On Ground',
  // AntiIceSystemFailureExcessiveIceAccumulation = 'Anti-Ice System Failure / Excessive Ice Accumulation',
  EmergencyGroundEgress = 'Emergency Ground Egress',
  CapsDeployment = 'CAPS Deployment',
}

/** A utility class to generate emergency checklist data. */
export class EmergencyChecklists {
  /**
   * Generates the emergency checklist data.
   * @returns An array of emergency checklists.
   **/
  public static getChecklists(): Checklist[] {
    return [
      new Checklist(
        EmergencyChecklistNames.AirspeedsForEmergencyOperations,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Section, title: 'Maneuvering Speed:' },
          { type: ChecklistItemType.Checkbox, title: '3600 lb', action: '140 KIAS' },
          { type: ChecklistItemType.Section, title: 'Best Glide:' },
          { type: ChecklistItemType.Checkbox, title: 'All weights', action: '92 KIAS' },
          { type: ChecklistItemType.Section, title: 'Emergency Landing (Engine-out):' },
          { type: ChecklistItemType.Checkbox, title: 'Flaps Up', action: '90 KIAS' },
          { type: ChecklistItemType.Checkbox, title: 'Flaps 50%', action: '85 KIAS' },
          { type: ChecklistItemType.Checkbox, title: 'Flaps 100%', action: '80 KIAS' },
        ],
      ),
      new Checklist(
        EmergencyChecklistNames.EngineFailureOnTakeoffLowAltitude,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, title: '1. Best Glide or Landing Speed (as\nappropriate)', action: 'ESTABLISH' },
          { type: ChecklistItemType.Checkbox, title: '2. Mixture', action: 'CUTOFF' },
          { type: ChecklistItemType.Checkbox, title: '3. Fuel Selector', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, title: '4. Ignition Switch', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, title: '5. Flaps', action: 'AS REQUIRED', extendedMarginBelow: true },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text indented">
                If time permits:
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, title: '6. Power Lever', action: 'IDLE' },
          { type: ChecklistItemType.Checkbox, title: '7. Fuel Pump', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, title: '8. Bat-Alt Master Switches', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, title: '9. Seat Belts', action: 'ENSURE SECURED', extendedMarginBelow: true },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text warning">
                WARNING: If engine failure is accompanied by fuel fumes in the cockpit, or if internal engine damage is suspected,
                move Mixture Control to CUTOFF and do not attempt a restart
              </div>
            )
          },
        ],
      ),
      new Checklist(
        EmergencyChecklistNames.EngineFailureInFlight,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, title: '1. Best Glide Speed', action: 'ESTABLISH' },
          { type: ChecklistItemType.Checkbox, title: '2. Fuel Selector', action: 'SWITCH TANKS' },
          { type: ChecklistItemType.Checkbox, title: '3. Ignition Switch', action: 'CHECK, BOTH' },
          { type: ChecklistItemType.Checkbox, title: '4. Fuel Pump', action: 'BOOST' },
          { type: ChecklistItemType.Checkbox, title: '5. Power Lever', action: '1/2 OPEN' },
          { type: ChecklistItemType.Checkbox, title: '6. Mixture', action: 'IDLE CUTOFF THEN SLOWLY ADVANCE\nUNTIL ENGINE STARTS' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text indented">
                If engine does not start:
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, title: '7. Perform CAPS deployment or\nEmergency Landing Without Engine Power Checklist, as required.', action: null },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text indented">
                If engine starts:
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, title: '8. CHTs and Oil Temperature', action: 'VERIFY WITHIN GREEN RANGE, WARM\nENGINE AT PARTIAL POWER IF REQUIRED' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text warning">
                WARNING: If engine failure is accompanied by fuel fumes in the cockpit, or if internal engine damage is suspected,
                move Mixture Control to CUTOFF, Fuel Selector to OFF, and do not attempt a restart
              </div>
            )
          },
        ]
      ),
      // new Checklist(
      //   EmergencyChecklistNames.EngineAirstart,
      //   ChecklistCategory.Emergency,
      //   [
      //     { type: ChecklistItemType.Checkbox, title: '1. Bat Master Switches', action: 'ON' },
      //     { type: ChecklistItemType.Checkbox, title: '2. Power Lever', action: 'OPEN 1/2 INCH' },
      //     { type: ChecklistItemType.Checkbox, title: '3. Mixture', action: 'RICH, AS REQ\'D' },
      //     { type: ChecklistItemType.Checkbox, title: '4. Fuel Selector', action: 'SWITCH TANKS' },
      //     { type: ChecklistItemType.Checkbox, title: '5. Ignition Switch', action: 'BOTH' },
      //     { type: ChecklistItemType.Checkbox, title: '6. Fuel Pump', action: 'BOOST' },
      //     { type: ChecklistItemType.Checkbox, title: '7. Alt Master Switches', action: 'OFF' },
      //     { type: ChecklistItemType.Checkbox, title: '8. Starter (Propeller not Windmilling)', action: 'ENGAGE' },
      //     { type: ChecklistItemType.Checkbox, title: '9. Power Lever', action: 'SLOWLY INCREASE' },
      //     { type: ChecklistItemType.Checkbox, title: '10. Alt Master Switches', action: 'ON' },
      //     { type: ChecklistItemType.Checkbox, title: '11. CHTs and Oil Temperature',
      //        action: 'VERIFY WITHIN GREEN RANGE, WARM\nENGINE AT PARTIAL POWER IF REQUIRED' },
      //     { type: ChecklistItemType.Checkbox, title: '12. If engine will not start, perform\nForced Landing checklist.',
      //        action: null },
      //   ]
      // ),
      // new Checklist(
      //   EmergencyChecklistNames.CabinFireInFlight,
      //   ChecklistCategory.Emergency,
      //   []
      // ),
      // new Checklist(
      //   EmergencyChecklistNames.EngineFireInFlight,
      //   ChecklistCategory.Emergency,
      //   []
      // ),
      // new Checklist(
      //   EmergencyChecklistNames.WingFireInFlight,
      //   ChecklistCategory.Emergency,
      //   []
      // ),
      // new Checklist(
      //   EmergencyChecklistNames.EngineFireDuringStart,
      //   ChecklistCategory.Emergency,
      //   []
      // ),
      // new Checklist(
      //   EmergencyChecklistNames.SmokeAndFumeElimination,
      //   ChecklistCategory.Emergency,
      //   []
      // ),
      new Checklist(
        EmergencyChecklistNames.EmergencyDescent,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Power Lever', action: 'IDLE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Mixture', action: 'AS REQUIRED' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. Airspeed', action: 'VNE (205 KIAS)' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text ">
                CAUTION: If significant turbulence is expected do not descend at indicated airspeeds
                greater than VNO (176 KIAS).
              </div>
            )
          },
        ]
      ),
      new Checklist(
        EmergencyChecklistNames.MaximumGlide,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: 'Maximum Glide Speed', action: 'ESTABLISH' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text ">
                NOTE: At 3600 lb Maximum Glide Ratio 8.6: 1.
              </div>
            )
          },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text ">
                NOTE: At 3600 lb Best Glide Speed is 92 KIAS.
              </div>
            )
          },
        ]
      ),
      new Checklist(
        EmergencyChecklistNames.EmergencyLandingWithoutEnginePower,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Best Glide Speed', action: 'ESTABLISH' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Radio', action: 'TRANSMIT (121.5 MHz) MAYDAY GIVING\nLOCATION AND INTENTIONS' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. Transponder', action: ' SQUAWK 7700' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '4. If off airport, ELT', action: 'ACTIVATE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '5. Power Lever', action: 'IDLE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '6. Mixture', action: 'CUTOFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '7. Fuel Selector', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '8. Ignition Switch', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '9. Fuel Pump', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '10. Flaps (when landing is assured)', action: '100% ' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '11. Master Switches', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '12. Seat Belt(s)', action: 'SECURED' },
        ]
      ),
      new Checklist(
        EmergencyChecklistNames.Ditching,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Radio', action: 'TRANSMIT (121.5 MHz) MAYDAY GIVING\nLOCATION AND INTENTIONS' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Transponder', action: ' SQUAWK 7700' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. CAPS', action: 'ACTIVATE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '4. Airplane', action: 'EVACUATE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '5. Flotation Devices', action: 'INFLATE WHEN CLEAR OF AIRPLANE' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text ">
                If available, life preservers should be donned and life raft should be prepared for
                r immediate evacuation upon touchdown. Consider unlatching a door prior to assuming the
                emergency landing body position in order to provide a ready escape path.
              </div>
            )
          },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text ">
                It may be necessary to allow some cabin flooding to equalize pressure on the doors. If
                the doors cannot be opened, break out the windows with the egress hammer and crawl
                through the opening.
              </div>
            )
          },
        ]
      ),
      new Checklist(
        EmergencyChecklistNames.LandingWithoutElevatorControl,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Flaps', action: 'SET 50%' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Trim', action: 'SET 80 KIAS' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. Power', action: 'AS REQUIRED FOR GLIDE ANGLE' },
        ]
      ),
      new Checklist(
        EmergencyChecklistNames.EnginePartialPowerLoss,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Air Conditioner (if installed)', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Fuel Pump', action: 'HIGH BOOST/PRIME' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. Fuel Selector', action: 'SWITCH TANKS' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '4. Mixture', action: 'CHECK APPROPRIATE FOR FLIGHT\nCONDITIONS' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '5. Power Lever', action: 'SWEEP' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '6. Ignition Switch', action: 'BOTH, L, THEN R' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '7. Land as soon as practical.', action: null },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text warning">
                WARNING: If there is a strong smell of fuel in the cockpit, divert to the nearest suitable
                e landing field. Fly a forced landing pattern and shut down the engine fuel supply once a
                safe landing is assured.
              </div>
            )
          },
        ]
      ),
      new Checklist(
        EmergencyChecklistNames.UnexpectedLossOfManifoldPressure,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Power', action: 'ADJUST TO MINIMUM REOUIRED FOR\nSUSTAINED FLIGHT' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Mixture', action: 'ADJUST FOR EGTS BETWEEN 1300\nDEGREE TO 1400 DEGREE F' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. Descend to MINIMUM SAFE ALTITUDE\nfrom which a landing may be safely accomplished.', action: null },
          { type: ChecklistItemType.Checkbox, level: 1, title: '4. Divert to nearest suitable airfield.', action: null },
          { type: ChecklistItemType.Checkbox, level: 1, title: '5. Radio', action: 'ADVISE ATC LANDING URGENT OR\nTRANSMIT (121.5 MHZ) MAYDAY GIVING LOCATION AND INTENTIONS WHEN WORKLOAD PERMITS' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '6. Oil Pressure', action: 'MONITOR' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '7. Land as soon as possible.', action: null },
        ]
      ),
      // new Checklist(
      //   EmergencyChecklistNames.OverboostPressureReliefValve,
      //   ChecklistCategory.Emergency,
      //   []
      // ),
      // new Checklist(
      //   EmergencyChecklistNames.EgtTitChtTemperatureSensorFailure,
      //   ChecklistCategory.Emergency,
      //   []
      // ),
      // new Checklist(
      //   EmergencyChecklistNames.PropellerGovernorFailure,
      //   ChecklistCategory.Emergency,
      //   []
      // ),
      new Checklist(
        EmergencyChecklistNames.AhrsFailure,
        ChecklistCategory.Emergency,
        [
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text ">
                Failure of the Attitude and Heading Reference System (AHRS) is indicated by removal of
                the sky/ground presentation and a “Red X” and a yellow “ATTITUDE FAIL” shown on the
                PFD. The digital heading presentation will be replaced with a yellow “HDG” and the
                compass rose digits will be removed. The course pointer will indicate straight up and
                course may be set using the digital window.
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Verify Avionics System has switched\nto functioning AHRS.', action: null },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text 1Tab">
                If not, manually switch to functioning AHRS and attempt to bring failed AHRS back
                on-line:
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Failed AHRS Circuit Breaker', action: 'SET' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text 1Tab">
                If open, reset (close) circuit breaker. If circuit breaker opens again, do not reset.
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. Be prepared to revert to Standby\nInstruments (Altitude, Heading).', action: '' },
        ]
      ),
      new Checklist(
        EmergencyChecklistNames.AdcFailure,
        ChecklistCategory.Emergency,
        [
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text ">
                Complete loss of the Air Data Computer is indicated by a “Red X” and yellow text over
                the airspeed, altimeter, vertical speed, TAS and OAT displays. Some FMS functions, such
                as true airspeed and wind calculations, will also be lost.
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Failed ADAHRS Circuit Breaker', action: 'SET' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text 1Tab">
                If open, reset (close) circuit breaker. If circuit breaker opens again, do not reset.
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Revert to Standby Instruments\n(Altitude, Airspeed).', action: null },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. Land as soon as practical.', action: null },
        ]
      ),
      new Checklist(
        EmergencyChecklistNames.PfdDisplayFailure,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Display Backup', action: 'ACTIVATE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Land as soon as practical.', action: null },
        ]
      ),
      new Checklist(
        EmergencyChecklistNames.InadvertentSpinEntry,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. CAPS', action: 'ACTIVATE' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text warning">
                WARNING: In all cases, if the aircraft enters an unusual attitude following or in
                connection with a stall, a spin condition should be assumed and, immediate deployment of
                the CAPS is required. Under no circumstances should spin recovery other than CAPS
                deployment be attempted.
              </div>
            )
          },
        ]
      ),
      new Checklist(
        EmergencyChecklistNames.InadvertentSpiralDiveDuringImcFlight,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Power Lever', action: 'IDLE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Stop the spiral dive by using\ncoordinated aileron and rudder control while referring to the attitude indicator and turn coordinator to level the wings.', action: null },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. Cautiously apply elevator back\npressure to bring airplane to level flight attitude.', action: null },
          { type: ChecklistItemType.Checkbox, level: 1, title: '4. Trim for level flight.', action: null },
          { type: ChecklistItemType.Checkbox, level: 1, title: '5. Set power as required.', action: null },
          { type: ChecklistItemType.Checkbox, level: 1, title: '6. Use autopilot if functional otherwise\nmaintain a constant heading through the coordinated aileron and rudder inputs.', action: null },
          { type: ChecklistItemType.Checkbox, level: 1, title: '7. Exit IMC conditions as soon as\npossible.', action: null },

        ]
      ),
      // new Checklist(
      //   EmergencyChecklistNames.PowerLeverLinkageFailure,
      //   ChecklistCategory.Emergency,
      //   []
      // ),
      new Checklist(
        EmergencyChecklistNames.EmergencyEngineShutdownOnGround,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Power Lever', action: 'IDLE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Fuel Pump (if used)', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. Mixture', action: 'CUTOFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '4. Fuel Selector', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '5. Ignition Switch.', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '6. Bat-Alt Master Switches', action: 'OFF' },
        ]
      ),
      // new Checklist(
      //   EmergencyChecklistNames.AntiIceSystemFailureExcessiveIceAccumulation,
      //   ChecklistCategory.Emergency,
      //   []
      // ),
      new Checklist(
        EmergencyChecklistNames.EmergencyGroundEgress,
        ChecklistCategory.Emergency,
        [
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Engine', action: 'SHUTDOWN' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Seat belts', action: 'RELEASE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. Airplane', action: 'EXIT' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text warning">
                WARNING: While exiting the airplane, make sure evacuation path is clear of other aircraft,
                spinning propellers, and other hazards.
              </div>
            )
          },
        ]
      ),
      new Checklist(
        EmergencyChecklistNames.CapsDeployment,
        ChecklistCategory.Emergency,
        [
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text warning">
                WARNING: The maximum demonstrated deployment speed is 140 KIAS.
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, level: 1, title: '1. Activation Handle Cover', action: 'REMOVE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '2. Activation Handle (Both Hands)', action: 'PULL STRAIGHT DOWN' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text 1Tab">
                After Deployment as time permits:
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, level: 1, title: '3. Mixture', action: 'CUTOFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '4. Fuel Selector', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '5. Fuel Pump', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '6. Bat-Alt Master Switches', action: 'OFF' },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text 1Tab">
                Turn the Bat-Alt Master Switches off after completing any necessary radio
                communications.
              </div>
            )
          },
          { type: ChecklistItemType.Checkbox, level: 1, title: '7. Ignition Switch', action: 'OFF' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '8. ELT', action: 'ON' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '9. Seat Belts and Harnesses', action: 'TIGHTEN' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '10. Loose Items', action: 'SECURE' },
          { type: ChecklistItemType.Checkbox, level: 1, title: '11. Assume emergency landing body\nposition.', action: null },
          { type: ChecklistItemType.Checkbox, level: 1, title: '12. After the airplane comes to a\ncomplete stop, evacuate quickly and\nmove upwind.', action: null },
          {
            type: ChecklistItemType.Text,
            text: () => (
              <div class="sr22t-checklist-text warning">
                WARNING: Jerking or rapidly pulling the activation T-handle will greatly increase the pull
                forces required to activate the rocket. Use a firm and steady pulling motion – a “chin-up”
                type pull enhances successful activation.
              </div>
            )
          },
        ],
        true
      ),
    ];
  }
}
