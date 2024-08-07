import { ChecklistItemType, Justification } from "@base/Shared/ChecklistSystem/ChecklistItem";
import { ChecklistFilePaths } from "@base/Shared";
import { TbmChecklist, TbmChecklistCategory } from "../Checklist";

export enum TbmAmplifiedChecklistNames {
  PreflightInspection = "Preflight inspection",
  InsideInspection = "Inside inspection",
  BeforeStartingEngine = "Before starting engine",
  EngineStart = "Engine start",
  Motoring = "Motoring",
  MotoringFollowedByEngineStart = "Motoring followed by an engine start",
  AfterEngineStartWithGPU = "After engine start with GPU",
  AfterEngineStart = "After engine start",
  InFlightAvailableOxygenQuantity = "In-flight available oxygen quantity",
  BeforeTaxiing = "Before taxiing",
  Taxiing = "Taxiing",
  BeforeLineUp = "Before line up",
  NormalTakeoff = "Normal takeoff",
  ShortTakeoff = "Short takeoff",
  AfterTakeoff = "After takeoff",
  Climb = "Climb",
  Cruise = "Cruise",
  BeforeDescent = "Before descent",
  Approach = "Approach",
  FinalOrDownwind = "Final approach (in GS) or downwind leg (VMC)",
  ShortFinal = "Short final (≈ 500 ft)",
  Landing = "Landing",
  GoAroundAPOff = "Go-around with AP OFF",
  GoAroundAPOn = "Go-around with AP ON",
  TouchAndGo = "Touch and go",
  RunwayClear = "Runway clear",
  Shutdown = "Shutdown",
  OutsideCheckAfterShutdown = "Outside check after shutdown",
}

/** A utility class to generate normal checklist data. */
export class TbmAmplifiedChecklists {
  /**
   * Generates the normal checklist data.
   * @returns An array of normal checklists.
   **/
  public static getChecklists(): TbmChecklist[] {
    return [
      new TbmChecklist(TbmAmplifiedChecklistNames.PreflightInspection, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.PlainText,
          content: "The preflight inspection procedure is based on a scanning method.",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "It is divided in 6 subparts to cover all items of the preflight",
          imagePath: ChecklistFilePaths.ASSETS_PATH + "/preflight-inspection-locations.png",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "I Initial inside inspection",
        },
        { type: ChecklistItemType.PlainText, content: "II Cabin" },
        { type: ChecklistItemType.PlainText, content: "III L.H. Wing" },
        {
          type: ChecklistItemType.PlainText,
          content: "IV Fuselage forward section",
        },
        { type: ChecklistItemType.PlainText, content: "V R.H. Wing" },
        {
          type: ChecklistItemType.PlainText,
          content: "VI Fuselage rear section / Empennages",
        },
        {
          type: ChecklistItemType.Warning,
          content:
            "WARNING: During outside inspection, visually check inspection doors and airplane general condition. Check for systems and parts attachments / deflections / leaks / cracks / deteriorations / non-obstructions / nicks / numbers / free movements / position.",
        },
        {
          type: ChecklistItemType.Warning,
          content:
            "In cold weather, remove even small accumulations of frost, ice or snow from wing, tail and control surfaces. In case of night flight, check good operation of all navigation lights, landing lights, strobe lights and make sure that an emergency lamp is on board.",
        },
        {
          type: ChecklistItemType.Warning,
          content:
            "If icing conditions are foreseen, particularly check good functioning of all electrical and pneumatic ice protection systems.",
        },
        {
          type: ChecklistItemType.Warning,
          content: "Check that type and quantity of fuel used for refueling are correct.",
        },
        {
          type: ChecklistItemType.Warning,
          content:
            "Remove covers on: pitots (2), static ports (2), static dischargers (2), engine air inlet (1), air inlets (2), exhaust cover and propeller locks (2).",
        },
        {
          type: ChecklistItemType.Warning,
          content: "WARNING: Remove tie-downs.",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Initial inside inspection",
        },
        { type: ChecklistItemType.Subtitle, content: "Cockpit - I" },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: When engine is shut down, do not set the PROP DE ICE switch to ON for more than 10 seconds, damage to the propeller blades could result.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. A/C switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. SEATS HTRS\nMASTER switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. DE ICE SYSTEM\npanel",
          response: "All OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. MICRO/MASK\nswitch",
          response: "MICRO / Guarded",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Flight\ncontrols lock",
          response: "Removed / Stowed",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: The flight controls lock is normally stowed in the front cargo compartment with the towing bar and the blanking covers.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Flight\ncontrols\ndeflections",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. PARK BRAKE",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. LANDING GEAR\nlever",
          response: "DN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. DUMP switch",
          response: "NORM / Guarded",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. BLEED switch",
          response: "OFF",
        },
        { type: ChecklistItemType.PlainText, content: "Engine controls" },
        {
          type: ChecklistItemType.Challenge,
          content: "11. MAN OVRD\ncontrol",
          response: "Backward",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: When the engine is shut down, the throttle must not be moved into the reverse area as a lack of hydraulic pressure prevents movement into reverse range. Trying to force the mechanism will cause damage.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. THROTTLE",
          response: "CUT OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. FLAPS lever",
          response: "UP",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. FUEL TANK\nSELECTOR",
          response: "L or R",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Open door of emergency landing compartment to check LANDING GEAR emergency control.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. Lever",
          response: "Pushed down",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. By-pass\nselector",
          response: "Fully depressed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. Door",
          response: "In place",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: By-pass selector must be pushed at its maximum stop, so as to have the door in place.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. ALTERNATE\nSTATIC SOURCE\nselector",
          response: "Pushed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "19. EMERGENCY\nRAM AIR control\nknob",
          response: "Pushed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "20. Breakers\npanel",
          response: "All breakers\nchecked",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "21. ELT switch",
          response: "ARM / OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "22. AP / TRIMS\nswitch",
          response: "OFF",
        },
        { type: ChecklistItemType.PlainText, content: "FUEL panel" },
        {
          type: ChecklistItemType.Challenge,
          content: "23. FUEL SEL\nswitch",
          response: "MAN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "24. AUX BP\nswitch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "ENGINE START panel" },
        {
          type: ChecklistItemType.Challenge,
          content: "25. IGNITION\nswitch",
          response: "AUTO or OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: The IGNITION switch is normally selected to AUTO. This ensures ignition, whenever the STARTER switch is set to ON.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "26. STARTER\nswitch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: If not, starter is going to operate as soon as SOURCE selector is moved to BATT or GPU (if connected).",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "ELECTRIC POWER panel",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "27. Crash lever",
          response: "Up",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "28. GENERATOR\nselector",
          response: "MAIN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "29. SOURCE\nselector",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "30. ACCESS\nlighting",
          response: "Check\nTo ensure that\nthe fuse of the\nBATT BUS\noperates correctly",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "31. INT LIGHTS\npanel",
          response: "All OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "32. EXT LIGHTS\npanel",
          response: "All OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "33. OXYGEN\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "34. PASSENGER\nOXYGEN switch",
          response: "STBY",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "35. Emergency\nlighting",
          response: "Check",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: Before selecting source, check position of ignition and starter switches.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "36. IGNITION\nswitch",
          response: "AUTO or OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "37. STARTER\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "38. LANDING GEAR\nlever",
          response: "DN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "39. SOURCE\nselector",
          response: "BATT or GPU",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "40. Standby\ninstrument\nbattery\nindicator symbol",
          response: "Not displayed",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "If a battery symbol appears on the standby instrument display, airplane takeoff is not allowed until the situation is resolved. Refer to the battery details in the standby instrument Pilot's guide for further information.",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "If BATT source:" },
        {
          type: ChecklistItemType.Challenge,
          content: "41. Voltage",
          response: "Check > 24.5 volts",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: If not, use a GPU or charge battery. This minimum voltage is not an absolute guarantee for a correctly charged battery. It is recommended to use a GPU in cold weather, when airplane has been stopped more than 3 hours at a temperature below - 10°C (+ 14°F).",
        },
        { type: ChecklistItemType.PlainText, content: "If GPU source:" },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: Low voltage (around 24.5 V) may indicate that only the battery is powering the airplane and not the pair GPU + battery. Make sure that a GPU is connected and powering the airplane.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "42. Voltage",
          response: "Check ≈ 28 volts",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: If using a GPU, ensure that it provides a 28-volt regulated voltage, with negative on earth, as well as it supplies 800 amps minimum and 1000 amps maximum. See placard located near ground power receptacle door.",
        },
        { type: ChecklistItemType.PlainText, content: "EXT LIGHTS panel" },
        {
          type: ChecklistItemType.Challenge,
          content: "43. OFF/TAXI/LDG\nswitch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "44. STROBE\nswitch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "45. NAV switch",
          response: "ON",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "DE ICE SYSTEM panel" },
        {
          type: ChecklistItemType.Challenge,
          content: "46. All switches",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "47. ICE LIGHT\nswitch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "48 - From outside the airplane, check operation of all lights and stall warning alert.",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Reentering the airplane",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "49. EXT LIGHTS\npanel",
          response: "All OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "50. CAS display",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "51. Left and\nright FUEL\nquantities",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "52. FLAPS lever",
          response: "LDG",
        },
        { type: ChecklistItemType.PlainText, content: "LANDING GEAR panel" },
        {
          type: ChecklistItemType.Challenge,
          content: "53. Warning\nlights",
          response: "Check 3 green ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "54. LIGHT TEST\npush-button",
          response: "Press\nCheck all\nlights flashing",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "DE ICE SYSTEM panel" },
        {
          type: ChecklistItemType.Warning,
          content: "WARNING: Do not touch pitots nor stall warning vane. They could be hot enough to burn skin.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "55. PITOT L\nHTR switch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "56. PITOT HT\nON L",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "57. PITOT R &\nSTALL HTR switch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Correct operation of pitot (PITOT L and R) tube heating elements and of stall aural warning system (STALL HTR) is indicated by display of corresponding CAS message, when control switches are ON.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "58. PITOT HT\nON L-R",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "59. STALL\nHEAT ON",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "60. PITOT L\nHTR switch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "61. PITOT R &\nSTALL HTR switch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "62. Crash lever",
          response: "Pull down",
        },
        { type: ChecklistItemType.Subtitle, content: "Cabin - II" },
        {
          type: ChecklistItemType.Challenge,
          content: "63. Cabin fire\nextinguisher",
          response: "Pressure /\nAttachment",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "64. Seats /\nbelts",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "65. Windows",
          response: "General\ncondition / No\ncrack",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "66. Emergency\nexit",
          response: "Closed / Locked",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "67. Anti-theft\nsafety pin",
          response: "Removed / Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "68. Baggage\ncompartment",
          response: "Straps in place",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If 6-seat accommodation:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "69. Partition\nnet",
          response: "General\ncondition / In\nplace",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If 4-seat accommodation and baggage transportation:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "70. Large net or\nsmall net",
          response: "General\ncondition / In\nplace",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "71. Doors\noperation",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "72. Stairs\ncondition",
          response: "Condition / Play",
        },
        { type: ChecklistItemType.PlainText, content: "Outside inspection" },
        {
          type: ChecklistItemType.PlainText,
          content: "The preflight inspection described in the opening figure is recommended before each flight.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: If a preflight inspection is performed just after the engine shutdown, be careful because the leading edge of engine air inlet, as well as exhaust stubs may be very hot.",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "If the airplane was in long term storage or if it has undergone major maintenance or if it has been used from emergency airfields, a thorough outside inspection is recommended.",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "When the airplane is stored outside, the use of the flight control lock and blanking covers is recommended. Propeller should be tied down to prevent rotation without oil pressure.",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "When the airplane is stored for extended periods of time, a thorough preflight inspection is recommended. Particular attention should be paid to possible blockages in airspeed sensing lines, foreign objects in engine intake and exhaust stubs and water contamination of the fuel system.",
        },
        { type: ChecklistItemType.Subtitle, content: "L.H. wing III" },
        {
          type: ChecklistItemType.Challenge,
          content: "73. Flap",
          response: "Condition / Play",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Also inspect the lower surface, as well as flap fairing, where pebbles (and even ice in case of slush on the runway) may have accumulated.",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "74. Aileron and\ntrim / Spoiler",
          response: "Condition / Free\nmovement /\nDeflection",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Ensure there are no foreign objects in the spoiler recess. When ailerons are in the neutral position, it is normal that spoilers are lightly extended at upper surface.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "75. Trailing\nedge static\ndischarger",
          response: "Condition /\nNumber /\nAttachment",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "76 - Winglet /\nnav. lights / strobe /\nlanding light /\nrecognition light /\ntaxi light",
          response: "Condition",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "77. OAT probe",
          response: "Condition",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "78. Fuel tank\ncap",
          response: "Closed / Locked",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Fuel tank caps must be tight (which is characterized by a consequent exertion to lock and unlock them) to avoid water infiltration in case of rain on ground, and to avoid fuel loss in flight.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "79. Fuel tank\nair vent",
          response: "Unobstructed",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Air vent is not likely to be obstructed by ice or water, as it is located in a wing lower surface recess.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "80. Left pitot",
          response: "Condition",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "81. Wing lower\nsurface",
          response: "No leak",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "82 - Check fuel tank access doors for leaks.",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "83 - Check for surface damage.",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "84. Wing deicer\nboots",
          response: "Condition /\nAttachment",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Care must be taken when refuelling the airplane to avoid damaging the wing deicer boots. A protective apron should be used if possible.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "85. Fuel tank\ndrain (two on\neach wing)",
          response: "Drain\nFuel free of water\nand contamination",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: In case of water in fuel system, drain it carefully using the four drain valves of tank sumps, and the fuel filter drain valve, till every trace of water or deposit has disappeared.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "A long term storage of the airplane causes water accumulation in fuel, which absorbs additive. This phenomenon occurs when an excessive quantity of water accumulates in fuel tank sumps.",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "L.H. main LANDING GEAR",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "86. Shock\nabsorber",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "87. Doors",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "88. Tire",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "89. Wheel well",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: If airplane has been used from muddy airfields or in snow, check wheel wells to make sure they are clean and not obstructed.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "Check frequently all landing gear retraction mechanism components, shock-absorbers, tires and brakes. This is particularly important for airplanes used from hilly fields.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "Improperly serviced or worn shock-absorbers may result in excessive loads being transmitted to the airplane structure during ground operations. Without passengers and baggages on board, the unpainted surface of the main gear shock absorber tube must be visible about:",
        },
        {
          type: ChecklistItemType.Note,
          content: "55 mm (2.17 in) of minimum height with half tank,",
        },
        {
          type: ChecklistItemType.Note,
          content: "40 mm (1.57 in) of minimum height with full tanks.",
        },
        {
          type: ChecklistItemType.Subtitle,
          content: "Fuselage forward section - IV",
        },
        { type: ChecklistItemType.PlainText, content: "Forward compartment" },
        {
          type: ChecklistItemType.Challenge,
          content: "90. Inside",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "91. Door",
          response: "Close / Lock",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "92. GPU door",
          response: "Closed\nIf not used",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "93. Fuel circuit\ndrain",
          response: "Drain\nFuel free of water\nand contamination",
        },
        {
          type: ChecklistItemType.Warning,
          content: "WARNING: If the clogging indicator is extended, red collar visible, the flight is not authorized.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "94. Filter\ncontamination\nindicator\n(clogging\nindicator)",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "95. L.H. exhaust\nstub",
          response: "Condition / No\ncracks",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Inspect if possible pressure port located inside exhaust stub. A missing port or a cracked port may hinder correct operation of continuous heating of air inlet lip.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "96. Upper engine\ncowls",
          response: "Open",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "For the first flight of the day:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "97. Oil cap",
          response: "Closed / Locked",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "98. Engine oil\nlevel",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "99. Fuel pipes",
          response: "No leak,\ndeterioration,\nwear",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "100. Engine\ncowls",
          response: "Condition",
        },
        { type: ChecklistItemType.PlainText, content: "Closed / Locked" },
        { type: ChecklistItemType.PlainText, content: "Air inlets" },
        {
          type: ChecklistItemType.Challenge,
          content: "101. Main",
          response: "No cracks.\nUnobstructed",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Check for no cracks, which are sometimes put in evidence by traces of soot resulting from exhaust gases.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "102. Lateral /\nupper",
          response: "Unobstructed",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Lateral air inlets, which supply air conditioning system and oil cooler, are provided with blanking covers. It is not the case for upper air inlets of RAM AIR system (circular grille located in front of R.H. windshield) and of vapor cycle cooling system (two rectangular grilles located forward of the circular grille).",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "103. Propeller\nand spinner",
          response: "No nicks, cracks\nor oil leaks /\nAttachment",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: In case of operation from contaminated runways, it is necessary to carefully examine propeller blades, where traces of abrasion may be found. Propeller damage may reduce blade life time and degrade performance. Any propeller damage should be referred to maintenance personnel.",
        },
        { type: ChecklistItemType.PlainText, content: "Nose gear" },
        {
          type: ChecklistItemType.Challenge,
          content: "104. Shock\nabsorber",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "105. Doors",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "106. Tire",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "107. Wheel well",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Without passengers and baggages on board, the unpainted surface of the nose gear shock absorber tube must be visible about:",
        },
        {
          type: ChecklistItemType.Note,
          content: "57 mm (2.22 in) of minimum height with full tanks,",
        },
        {
          type: ChecklistItemType.Note,
          content: "63 mm (2.46 in) of minimum height with half tank.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Crush or relieve the shock absorber one time or twice before the inspection to\nremove possible sticking.",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "In case of doubt, request a check of the shock absorber pressure.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "108. R.H.\nexhaust stub",
          response: "Condition / No\ncracks",
        },
        { type: ChecklistItemType.Subtitle, content: "R.H. wing - V" },
        {
          type: ChecklistItemType.PlainText,
          content: "Additional remarks are identical to those of L.H. wing.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "109. Fuel tank\ndrain (two on\neach wing)",
          response: "Drain\nFuel free of water\nand contamination",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "R.H. main LANDING GEAR",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "110. Shock\nabsorber",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "111. Doors",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "112. Tire",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "113. Wheel well",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "114. Wing deicer\nboots",
          response: "Condition /\nAttachment",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "115. Stall\nwarning",
          response: "Condition /\nDeflection",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "116. Wing lower\nsurface",
          response: "No leaks",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "117. Fuel tank\ncap",
          response: "Closed / Locked",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "118. Fuel tank\nair vent",
          response: "Unobstructed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "119. Right pitot",
          response: "Condition",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "120 - Winglet /\nnav. lights / strobe /\nlanding light /\nrecognition light /\ntaxi light",
          response: "Condition",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "121. Trailing\nedge static\ndischarger",
          response: "Condition /\nNumber /\nAttachment",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "122. Aileron /\nspoiler",
          response: "Condition / Free\nmovement /\nDeflection",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "123. Flap",
          response: "Condition / Play",
        },
        { type: ChecklistItemType.PlainText, content: "Rear R.H. karman" },
        {
          type: ChecklistItemType.Challenge,
          content: "124. Oxygen\ncylinder",
          response: "Open",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "125. Oxygen\npressure",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "126. Confirm OXYGEN quantity\nin regards with the expected flight.",
          response: null,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "127. Oxygen\npressure",
          response: "Check",
        },
        {
          type: ChecklistItemType.Subtitle,
          content: "Fuselage rear section / empennages - VI",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Check that outside handle of emergency exit is flush with door skin.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "128. ELT",
          response: "ARM / OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "129. ELT door",
          response: "Closed / Locked",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Access to ELT is possible through an inspection door located on R.H. side of fuselage rear section.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "130. Static\npressure ports",
          response: "Clean",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "131. Ventral\nfins",
          response: "Condition /\nAttachments",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Ventral fins are made of two parts (one fixed part and one removable part with rear lower inspection door). Check that these two parts are connected by the locking roller.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "132. Inspection\ndoor under\nfuselage",
          response: "Attachments.\nClosed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "133. Horizontal stabilizer\ndeicer boots (R.H. side)\nCondition / Attachments",
          response: null,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "134. Elevator\nand trim",
          response: "Condition /\nDeflection free\nmovement /\nTrim position",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: To check the deflection, hold the two half-elevators near fuselage, inside both elevator trims to avoid stresses.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "135. Static\ndischargers",
          response: "Condition",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "136. Vertical\nstabilizer\ndeicer boots",
          response: "Condition /\nAttachments",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "137. Rudder and\ntrim",
          response: "Condition / Trim\nposition",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "138. Static\ndischargers",
          response: "Condition",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "139. Tail cone /\nnav. lights /\nstrobe",
          response: "Condition",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "140. Static\npressure ports",
          response: "Clean",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.InsideInspection, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.PlainText,
          content:
            "After completion of preflight inspection. Initial inside inspection and outside inspection performed.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. Cabin door\nand pilot door,\nif installed",
          response: "Closed / Locked",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Baggage",
          response: "Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. EMERGENCY\nEXIT pin",
          response: "Removed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Seats,\npedals, harness",
          response: "Adjust / Lock",
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: It is mandatory to set the seat to the highest position before adjusting the front seats fore or aft. Otherwise, moving the seat may damage the upholstery on the side panels.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Pilot seat and\nR.H. front\nseat, if occupied",
          response: "Adjust",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Adjust seats and harnesses to ensure access to flight controls. The pilot at L.H. position must be able to easily reach the A/C and PRESSURIZATION panel.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Height\nadjustment",
          response: "Max. UP",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Fore and aft\nadjustment",
          response: "Adjust and check\nlocking",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Height\nadjustment",
          response: "Adjust",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. L.H and R.H.\npedals",
          response: "Adjust",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Pilot and\npassengers\nbelts and\nharnesses",
          response: "Fasten",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Check for the correct locking of belt buckles for the pilot and passengers; as well as automatic locking of shoulder harness by exerting a rapid pull on the harness.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "If airbags are installed, unoccupied seat belts need to be strapped. It is prohibited to fly with these belts unstrapped.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. PASSENGER\nOXYGEN switch",
          response: "STBY",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. OXYGEN\nswitch",
          response: "ON",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Make sure to set on STBY the PASSENGER OXYGEN switch before setting the OXYGEN switch to ON to avoid passengers mask deployment.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. Crew oxygen\nmasks",
          response: "Test",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Press push-button PRESS TO TEST: the blinker shall turn red momentarily, then turns transparent.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. EXT LIGHTS\npanel",
          response: "All OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. INT LIGHTS\npanel",
          response: "All OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. DIMMER\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. CABIN switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. ACCESS\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. PANEL\nrheostat",
          response: "Fully turned to\nthe left",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "19. All lights",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "20. Crash lever",
          response: "Down",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "21. STARTER\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: If not, starter is going to operate as soon as SOURCE selector is positioned on BATT or GPU.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "22. IGNITION\nswitch",
          response: "AUTO",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: The IGNITION switch is normally selected to AUTO. This ensures ignition, whenever the starter is activated.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "23. AUX BP\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "24. FUEL SEL\nswitch",
          response: "MAN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "25. AP / TRIMS\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "26. A/C switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "27. SEATS HTRS\nMASTER switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "28. CB LIGHTS\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "29. MICRO / MASK\nswitch",
          response: "MICRO / Guarded",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "30. DE ICE\nSYSTEM panel",
          response: "All OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "31. INERT SEP\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "32. PARK BRAKE",
          response: "Reset / ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "33. LANDING GEAR\nlever",
          response: "DN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "34. DUMP switch",
          response: "NORM / Guarded",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "35. BLEED switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "36. HOT AIRFLOW\ndistributor",
          response: "Fully turned to\nthe right",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "37. Pitch trim\nwheel",
          response: "Check",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: Make sure that MAN OVRD control is backward to avoid overtemperature risks at start.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "38. MAN OVRD\ncontrol",
          response: "Full backward\n(notched)",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: When the engine is shut down, the THROTTLE must not be moved into the reverse area.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "39. THROTTLE",
          response: "CUT OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "40. FUEL TANK\nSELECTOR",
          response: "Open / L or R",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "41. ALTERNATE\nSTATIC SOURCE\nselector",
          response: "Normal / Pushed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "42. EMERGENCY\nRAM AIR",
          response: "Closed / Pushed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "43. ESS BUS TIE\nswitch",
          response: "NORM / Guarded",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "44. Breakers",
          response: "All pushed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "45. EMERGENCY\nLANDING GEAR\nlever",
          response: "Check",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.BeforeStartingEngine, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.PlainText,
          content:
            "Check that the weight and balance are within the correct limits. Brief passengers about use of seat belts and the emergency oxygen system, as well as opening the access door and the emergency exit.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. Preflight\ninspection",
          response: "Completed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Crash lever",
          response: "Up",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. ATIS",
          response: "Copied",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Start\nclearance",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. SOURCE\nselector",
          response: "BATT (battery\nstart) or GPU\n(GPU start)",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If one screen (L or R PFD, or MFD) is missing:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. SOURCE\nselector",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Wait for 30 seconds",
          response: null,
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. SOURCE\nselector",
          response: "BATT (battery\nstart) or GPU\n(GPU start)",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "If GPU use:" },
        {
          type: ChecklistItemType.Challenge,
          content: "9.GPU DOOR",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. Voltmeter",
          response: "Check 28 Volts ±\n0.5 Volt",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: Voltage is higher than 24.5 Volts which corresponds to the voltage in case of battery use.",
        },
        { type: ChecklistItemType.PlainText, content: "If battery use:" },
        {
          type: ChecklistItemType.Challenge,
          content: "11. Battery\nvoltage",
          response: "Check > 24.5 V",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If battery voltage < 24.5 V:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. Ask for a GPU and be ready to a GPU start.",
          response: null,
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. GENERATOR\nselector",
          response: "MAIN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. MAIN GEN",
          response: "Check ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. O2 CYL\nCLOSED",
          response: "Check OFF",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If O2 CYL CLOSED is ON:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. Open isolation valve of the oxygen cylinder in R.H. Karman.",
          response: null,
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. TEST\npush-button",
          response: "Press\nAudio / DE ICE SYSTEM lights / stick shaker",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. DUMP switch",
          response: "NORM / Guarded",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "19. LANDING GEAR\nlight / CHECK\nDOWN",
          response: "Test",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "20. MFD",
          response: "Initialize",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "21. Fuel onboard",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "a. Quantity",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "b. FUEL TANK\nSELECTOR",
          response: "L or R",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "22. Residual ITT",
          response: "Check",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If residual ITT > 150°C:",
        },
        {
          type: ChecklistItemType.Link,
          content: "23. Perform Motoring procedure",
          linkTarget: {
            checklistName: TbmAmplifiedChecklistNames.Motoring,
            checklistCategory: TbmChecklistCategory.Amplified,
          },
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: A start up procedure with an engine residual ITT above 150°C may generate an ITT exceedance. Particular monitoring of ITT will have to be performed during start up to ensure to keep the temperature within ITT envelope.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "24. VOLTS:\nBAT > 24.5 V /\nGPU ≈ 28 V",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "25. CAS display",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "26. PARK BRAKE",
          response: "Check ON\nLast check before proceeding to engine start",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "27. PARK BRAKE",
          response: "Check ON",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: PARK BRAKE appearance does not indicate that parking brake is set. For that, press on brake pedals before turning brake selector to the right.",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.EngineStart, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. STROBE switch",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. G3000",
          response: "DISPLAY BACKUP\nComposite mode",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: If there is a loss of MFD during start up sequence, that sequence will be ended using the left PFD in composite mode.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. IGNITION\nswitch",
          response: "AUTO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. AUX BP switch",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. AUX BOOST PMP\nON",
          response: "Check ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. FUEL PRESS",
          response: "Check OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Propeller\narea",
          response: "Clear",
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: If 5 seconds after having positioned the STARTER switch in ON position there is no start, interrupt starting attempt using the ABORT position of the STARTER switch.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. STARTER\nswitch",
          response: "ON\n2 sec then OFF",
        },
        { type: ChecklistItemType.PlainText, content: "Simultaneously:" },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Timer clock",
          response: "Start\nTo check\nstartup acceleration",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. STARTER",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. MAIN GEN",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: When THROTTLE is positioned on LO-IDLE before having obtained 13 % of Ng, there is a risk of overtemperature further to an excessive accumulation of fuel inside the combustion chamber before ignition.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: In case of starting with high residual ITT, an ITT decrease below 150°C (within starter operation limits) may allow to stay within the allowed ITT envelope during startup sequence.",
        },
        { type: ChecklistItemType.PlainText, content: "When" },
        {
          type: ChecklistItemType.PlainText,
          content: "- Ng about 13 % and,",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- ITT below 150°C and,",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- time below 20 seconds:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. THROTTLE",
          response: "LO-IDLE",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Abort starting procedure if:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- No ignition 10 seconds after having positioned THROTTLE to LO-IDLE,",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- lights on (max ITT < 870°C for more than 20 seconds, < 1000°C for more than 5 seconds),",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- Ng < 30 % after 30 seconds of starter use,",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- Ng < 50 % after 60 seconds of starter use,",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. THROTTLE",
          response: "CUT OFF",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. IGNITION\nswitch",
          response: "OFF or AUTO",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When ITT < 850°C:",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. STARTER\nswitch",
          response: "ABORT",
          justification: Justification.Indent4,
        },
        { type: ChecklistItemType.PlainText, content: "When" },
        {
          type: ChecklistItemType.PlainText,
          content: "- Ng > 50 % and,",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- 1 minute max:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: If the starter does not go off automatically, disengage it using the ABORT position of the STARTER switch.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. Starter",
          response: "Check OFF\nautomatically",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. STARTER",
          response: "Check OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. Engine\nparameters",
          response: "Check\n54 % ≤ Ng ≤ 58 %,\noil pressure and ITT\nin green sector",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.Motoring, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.PlainText,
          content:
            "To drain fuel accumulated inside the combustion chamber, a motoring procedure is required following an aborted start.",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "A 15-second dry motoring run is sufficient to clear any fuel pooled in the engine. The fuel is removed in liquid or vapor form, through an airflow intended to dry combustion chamber, turbines and exhaust nozzles.",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "To improve cooling of the bearing cavities and prevent oil coking after shutdown in high OAT [above 35° C (95° F)] environment, it is recommended to perform a 30-second dry motoring run.",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "It is possible that no trace of drainage be observed under engine, due to the drainage collector intended to prevent parking area from contamination.",
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: After any starting interrupt procedure, wait for engine total shutdown and wait at least 30 seconds before initiating a motoring.",
        },
        { type: ChecklistItemType.PlainText, content: "Engine controls" },
        {
          type: ChecklistItemType.Challenge,
          content: "1. MAN OVRD\ncontrol",
          response: "Full backward\n(notched)",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: When the engine is shut down, the THROTTLE must not be moved into the reverse area.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. THROTTLE",
          response: "CUT OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. IGNITION\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. IGNITION",
          response: "Check OFF",
        },
        { type: ChecklistItemType.PlainText, content: "Fuel" },
        {
          type: ChecklistItemType.Challenge,
          content: "5. FUEL TANK\nSELECTOR",
          response: "L or R",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. AUX BP switch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. AUX BOOST PMP\nON",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. FUEL PRESS",
          response: "Check OFF\nFuel pressure\nis necessary for\nlubrication of HP pump.",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Propeller area",
          response: "Clear",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "To clear fuel and vapor internally trapped:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. STARTER\nswitch",
          response: "ON\n2 sec then OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Simultaneously:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. Timer clock",
          response: "Start",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. STARTER",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. Motor",
          response: "For 15 sec. max",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. STARTER\nswitch",
          response: "ABORT\nThen OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. STARTER",
          response: "Check OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "To cool engine following shutdown in high temperature environment:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. STARTER\nswitch",
          response: "ON\n2 sec then OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Simultaneously:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. Timer clock",
          response: "Start",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. STARTER",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "19. Motor",
          response: "For 30 sec. max",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If ignition symptoms occur (ITT increasing):",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "20. IGNITION\nswitch",
          response: "Check OFF",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "21. THROTTLE",
          response: "Check CUT OFF",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "22. Continue motoring.",
          response: null,
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "23. STARTER\nswitch",
          response: "ABORT\nThen OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "24. STARTER",
          response: "Check OFF",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "FUEL panel" },
        {
          type: ChecklistItemType.Challenge,
          content: "25. AUX BP\nswitch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "26. AUX BOOST\nPMP ON",
          response: "Check OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "27. FUEL PRESS",
          response: "Check ON",
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.MotoringFollowedByEngineStart, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.PlainText,
          content:
            "Amplified procedures stated in starting engine sequences using airplane power or with GPU are also to be applied to hereunder procedure.",
        },
        {
          type: ChecklistItemType.PlainText,
          content:
            "Within starter operating limits (continuous max. 1 minute), it is possible to initiate a starting procedure from a motoring procedure.",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "This procedure will conserve the battery by taking advantage of first Ng acceleration.",
        },
        { type: ChecklistItemType.PlainText, content: "Engine controls" },
        {
          type: ChecklistItemType.Challenge,
          content: "1. MAN OVRD\ncontrol",
          response: "Full backward\n(notched)",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: When the engine is shut down, the THROTTLE must not be moved into the reverse area.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. THROTTLE",
          response: "CUT OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. IGNITION\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. IGNITION",
          response: "Check OFF",
        },
        { type: ChecklistItemType.PlainText, content: "Fuel" },
        {
          type: ChecklistItemType.Challenge,
          content: "5. FUEL TANK\nSELECTOR",
          response: "L or R",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. AUX BP switch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. AUX BOOST PMP\nON",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. FUEL PRESS",
          response: "Check OFF\nFuel pressure\nis necessary for\nlubrication of HP pump.",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Propeller\narea",
          response: "Clear",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. STARTER\nswitch",
          response: "ON\n2 sec then OFF",
        },
        { type: ChecklistItemType.PlainText, content: "Simultaneously:" },
        {
          type: ChecklistItemType.Challenge,
          content: "11. Timer clock",
          response: "Start",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. STARTER",
          response: "Check ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. Motor",
          response: "For 30 sec. max",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "After 20 seconds and if ITT < 150°C:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. IGNITION\nswitch",
          response: "AUTO",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. Ng",
          response: "Check > 13 %",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. THROTTLE",
          response: "LO-IDLE",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Monitor increase of:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. ITT",
          response: "max.:\n< 870°C for 20 sec max.\n< 1000°C for 5 sec max.",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. Ng",
          response: null,
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "19. Oil pressure",
          response: null,
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "20. OIL PRESS",
          response: "Check OFF",
          justification: Justification.Indent2,
        },
        { type: ChecklistItemType.PlainText, content: "When Ng > 50 %:" },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: If the starter does not go off automatically, disengage it using the ABORT position of the STARTER switch.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "21. Starter",
          response: "Check OFF\nautomatically",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "22. STARTER",
          response: "Check OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "23. Engine\nparameters",
          response: "Check\n54 % ≤ Ng ≤ 58 %,\noil pressure and\nITT in green sector",
        },
        { type: ChecklistItemType.PlainText, content: "Fuel panel" },
        {
          type: ChecklistItemType.Challenge,
          content: "24. AUX BP\nswitch",
          response: "AUTO",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "25. AUX BOOST\nPMP ON",
          response: "Check OFF",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "Electric power" },
        {
          type: ChecklistItemType.Challenge,
          content: "26. MAIN GEN",
          response: "Check OFF\nReset if necessary",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: MAIN GEN normally goes off as soon as STARTER goes off.",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If MAIN GEN does not go off:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "27. Ng",
          response: "Increase to\nmore than 70 %\nTo start main generator",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "28. Generator\nand battery AMPS",
          response: "Check charge\nOn EIS of MFD",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "29. Battery and\nESS. bus VOLTS",
          response: "Check\nvoltage ≈ 28 Volts\nOn EIS of MFD",
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.AfterEngineStartWithGPU, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. SOURCE\nselector",
          response: "BATT",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Electrical\nnetwork",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. GPU",
          response: "Disconnect",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Performed by ground personnel",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. GPU DOOR",
          response: "Check OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. GENERATOR\nselector",
          response: "MAIN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. MAIN GEN",
          response: "Check OFF",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: MAIN GEN normally goes off as soon as STARTER goes off.",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If MAIN GEN does not go off:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Ng",
          response: "Increase over 70 %",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "To start main generator",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Generator and\nbattery AMPS",
          response: "Check charge",
        },
        { type: ChecklistItemType.PlainText, content: "On EIS of MFD" },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Battery and\nESS. bus VOLTS",
          response: "Check\nvoltage ≈ 28 Volts",
        },
        { type: ChecklistItemType.PlainText, content: "On EIS of MFD" },
        {
          type: ChecklistItemType.Challenge,
          content: "10. CAS display",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. A/C switch",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. BLEED switch",
          response: "AUTO or MAX DIFF",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When ground personnel is cleared from propeller area:",
        },
        {
          type: ChecklistItemType.Link,
          content: "13. Perform After engine start procedure",
          linkTarget: {
            checklistName: TbmAmplifiedChecklistNames.AfterEngineStart,
            checklistCategory: TbmChecklistCategory.Amplified,
          },
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.AfterEngineStart, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: Generator load < 200 amps",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. THROTTLE",
          response: "LO-IDLE ▶ Flight IDLE",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Ng",
          response: "Check 70 % ± 2 %",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. OIL °C and\nOIL PSI",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. AUX BP switch",
          response: "AUTO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. FUEL SEL\nswitch",
          response: "AUTO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. SHIFT\npush-button",
          response: "Test\nVerify rotation\nof FUEL TANK\nSELECTOR",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. AP / TRIMS\nswitch",
          response: "ON\nThis initializes\nthe A/P system",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. PFD 1, MFD\nand PFD 2",
          response: "NORMAL mode",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Perform generator test:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. BLEED switch",
          response: "OFF\nTo unload the\ngenerator circuit",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. GENERATOR\nselector",
          response: "Check MAIN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. AMPS / VOLTS",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When MAIN LOAD < 80 amps:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. GENERATOR\nselector",
          response: "ST-BY",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. AMPS / VOLTS",
          response: "Check",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If the voltage on the ST-BY generator is low (close to 27 volts):",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. GENERATOR\nRESET ST-BY\npush-button",
          response: "Press\nTo reset\nST-BY\ngenerator",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. AMPS / VOLTS",
          response: "Check\nThe indicated\nvoltage should\nbe in the green\nrange",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. GENERATOR\nselector",
          response: "MAIN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. Oxygen",
          response: "Check\nVerify quantity\navailable for\nthe planned flight.",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "PFD 1, MFD and PFD 2",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Detailed control procedures of the avionics system are described in the GARMIN Integrated Flight Deck Pilot's Guide.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. Brightness",
          response: "Adjust",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "19. DISPLAY\nBACKUP\npush-button",
          response: "Check\nThen return to\nNORMAL mode",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "20. CAS",
          response: "Check\nCheck engine\nparameters",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "21. A/C switch",
          response: "As required",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: Cabin temperature will not be properly regulated when the A/C switch is set to OFF.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "22. TEMP\nselector",
          response: "Adjust",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "23. SEATS HTRS\nMASTER switch",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "24. BLEED switch",
          response: "AUTO or MAX DIFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "25. HOT AIR FLOW\ndistributor",
          response: "As required",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: The HOT AIR FLOW distributor is normally set turned fully to the right. If the windshield requires defogging, turn it fully to the left.",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.InFlightAvailableOxygenQuantity, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Oxygen\npressure",
          response: "Read",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Outside air\ntemperature\n(OAT)",
          response: "Read",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Determine the usable oxygen\npercent using the following chart",
          response: null,
          imagePath: ChecklistFilePaths.ASSETS_PATH + "/usable-oxygen.png",
        },
        {
          type: ChecklistItemType.Challenge,
          content:
            "4. Determine the oxygen duration\nin minutes by multiplying the\nvalues in the following table\nby the percent obtained with\nthe previous chart",
          response: null,
          imagePath: ChecklistFilePaths.ASSETS_PATH + "/oxygen-duration.png",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.BeforeTaxiing, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Stand-by\ninstruments",
          response: "Check",
        },
        { type: ChecklistItemType.PlainText, content: "Check de-ice system" },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Flight into known icing conditions is authorized only when all ice protection equipment are operating correctly. This equipment may be activated before takeoff, even during taxiing, in case of icing conditions on ground.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. PROP DE ICE\nswitch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Check illumination of the green\nlight located above the switch.",
          response: null,
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Illumination of the green light shows that electric power is supplied to blade root electric resistors. It is advised to wait at least a whole half cycle (90 seconds) to check that both blade heating systems are correctly supplied with electric power.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. PROP DE ICE\nswitch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. WINDSHIELD\nswitch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Check illumination of the green\nlights located above the switch\n(except if hot conditions).",
          response: null,
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: These lights may remain OFF if cabin temperature is very high, for example after a prolonged parking in hot conditions.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. WINDSHIELD\nswitch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Ng",
          response: "Increase > 80 %\nTo check\nAIRFRAME DE ICE",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Theoretically, necessary air bleed to inflate wing and empennage leading edges, as well as depression necessary to their deflation are sufficient when THROTTLE is positioned on Flight IDLE. However, it is advised for check to choose a Ng power > 80 % in order to obtain operation design pressure, which enables illuminating surely the two green lights and avoiding VACUUM LOW untimely alarms.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. AIRFRAME DE\nICE switch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content:
            "10. Visually check functioning\nof deicer boots during 1 total\ncycle and illumination of the two\ngreen lights located above the switch.",
          response: null,
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: The cycle lasts 67 seconds. Check both inflation impulses and illumination of each corresponding green light:",
        },
        {
          type: ChecklistItemType.Note,
          content: "- the first impulse inflates the external and middle wing boots,",
        },
        {
          type: ChecklistItemType.Note,
          content: "- the second impulse inflates the leading edge boots of empennages and inner wing.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. AIRFRAME DE\nICE switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. INERT SEP\nswitch",
          response: "ON\nKeep ON while\ntaxiing in\norder to avoid\ningestion of\nparticles by\nthe engine",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. Flight\ncontrols",
          response: "Check\nProper\noperation from\nstop to stop,\nfull deflection",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Check autopilot and electrical pitch trim:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. AP / TRIMS",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Detailed control procedures of autopilot and electrical pitch trim are described in the GARMIN Integrated Flight Deck Pilot's Guide.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. Pitch trim",
          response: "UP / DN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. Pitch trim",
          response: "Adjust in\ngreen range\nGraduated from\n12 to 37 %",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. Yaw trim",
          response: "L / R",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. Yaw trim",
          response: "Adjust in\ngreen range\nTakeoff range",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "19. Roll trim",
          response: "L / R",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "20. Roll trim",
          response: "Adjust at\nneutral position",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "21. FLAPS lever",
          response: "UP",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Perform MFD flight management",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "22. Weight\ncomputing",
          response: "Set / Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "23. FOB (fuel\non board)\nsynchronization",
          response: "Set",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If requested:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "24. FPL",
          response: "Set",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "25. LFE\nselection",
          response: "Done",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Landing Field Elevation selection is done on the touchscreen controller using either:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- automatically the destination airport of the flight plan,",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "or",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "- a manual entry by pressing: HOME, AIRCRAFT SYSTEMS, LFE and then MANUAL.",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "26. VHF/VOR/GPS",
          response: "Adjust / Test",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "27. Radar",
          response: "Adjust / Test",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "28.\nStormscope/\nAS/TAWS/Radio\naltimeter, if\ninstalled",
          response: "Adjust / Test",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "29. ADI/HSI on\nPFD1 / PFD2",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "30. Altimeter\nsetting",
          response: "Set / Check",
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: During feathering test, keep the spent time with the propeller RPM in the caution (yellow) range at a minimum.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "31. THROTTLE",
          response: "FEATHER twice\nFlight IDLE to\nLO-IDLE then\nFlight IDLE,\ntwice",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "32. EIS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "33. CAS display",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "34. Passenger\nbriefing",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "35. TAXI lights",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "36. PARK BRAKE",
          response: "OFF\nMake sure that\nchocks are\nremoved, if used",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "37. PARK BRAKE",
          response: "Check OFF",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.Taxiing, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: Generator load < 200 amps.",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: Avoid using reverse during taxiing.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Operation in the Beta (β) range / reverse is not restricted during ground operations. However, foreign particles (dust, sand, grass, gravel, etc...) may be blown into the air, ingested by the engine (above all if INERT SEP switch is turned OFF) and cause damage to the propeller.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. TAXI lights",
          response: "Check ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. THROTTLE",
          response: "As required",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: After initial acceleration, THROTTLE may be in the TAXI range sector, avoiding excessive movements in order to keep a constant ground speed.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Brakes",
          response: "Test",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Nose wheel\nsteering",
          response:
            "Check\nCheck that the control wheel\nmoves (roll) in the same\ndirection as the rudder\npedals due to the rudder /\naileron interconnect.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Flight\ninstruments",
          response:
            "Check\nCheck navigation and\ncommunication systems\nbefore or during taxiing,\ncheck gyroscopic instruments\non PFDs 1 / 2 and\nstand-by indicator during\nground turns.",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.BeforeLineUp, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: Generator load < 200 amps.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. PARK BRAKE",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. PARK BRAKE",
          response: "Check ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. THROTTLE",
          response: "Flight IDLE\nNg = 69 % ± 2 %",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. LDG lights",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. NAV switch",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. STROBE switch",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. IGNITION",
          response: "As required\nAUTO or ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. AUX BP switch",
          response: "AUTO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. FUEL SEL\nswitch",
          response: "AUTO",
        },
        { type: ChecklistItemType.PlainText, content: "DE ICE SYSTEM panel" },
        {
          type: ChecklistItemType.Challenge,
          content: "10. AIRFRAME DE\nICE switch",
          response: "As required",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. PROP DE ICE\nswitch",
          response: "As required",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. WINDSHIELD\nswitch",
          response: "As required",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. PITOT L HTR\nswitch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. PITOT R &\nSTALL HTR switch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. INERT SEP\nswitch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If icing conditions are foreseen:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. Perform\nprocedure",
          response: "Flight into\nknown icing\nconditions",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. Pitch",
          response: "TO\nAdjust inside green\nindex sector, depending\non the current\nbalance condition",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. Yaw",
          response: "TO\nAdjust inside\ngreen index sector",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "19. Roll",
          response: "TO\nAdjust at\nneutral position",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "20. FLAPS lever",
          response: "TO",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "21. Flight\ncontrols",
          response: "Check\nagain for proper\noperation from\nstop to stop,\nfull deflection",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "22. A/C switch",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "23. BLEED switch",
          response: "AUTO or MAX DIFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "24. LFE",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "25. FUEL gages",
          response: "Check quantity\nand imbalance",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: Do not take off if battery charge > 50 amps ± 4 amps.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: After starting engine with airplane power, a battery charge above 50 amps is normal. If this indication remains steady at a high value, it may be then a battery or generation system failure. Do not take off in these conditions.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "26. AMPS",
          response: "Check below 50\namps",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "27. BAT AMP",
          response: "Check OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "28. EIS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "29. CAS display",
          response: "Check\nAll messages OFF,\nexcept PARK BRAKE\nand, if used\nINERT SEP ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "30. Altimeter\nsetting",
          response: "Set / Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "31. Instruments\ndeparture\nsetting",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "32. SID",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "33. ALT SEL",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "34. XPDR",
          response: "Set",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "35. VHF/VOR/\nGPS/XPDR",
          response: "Adjust / Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "36. Stormscope/\nAS/TAWS/ADF,\nif installed",
          response: "Adjust / Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "37. Radar",
          response:
            "Adjust / Check\nOn ground, maintain radar\non STANDBY in order not to\ngenerate radiations\nprejudicial to outside persons.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "38. Radio\naltimeter, if\ninstalled",
          response: "Adjust / Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "39. Transponder\ncode",
          response: "Adjust / Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "40. Takeoff\ndistances",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "41. Rotation\nairspeed (VR)",
          response: "Check",
          imagePath: ChecklistFilePaths.ASSETS_PATH + "/rotation-airspeed.png",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "42. Pilot's /\nPassengers'belts",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "43. Passengers'table",
          response: "Stowed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "44. Engine\ninstruments",
          response:
            "Check\nAll engine parameters must\nbe in green range, except\npropeller RPM, which will be\nabout 1000 RPM or more with\nTHROTTLE at Flight IDLE.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "45. PARK BRAKE",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "46. PARK BRAKE",
          response: "Check OFF",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.NormalTakeoff, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.PlainText,
          content: "When lined up, on brakes:",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: If heavy precipitation, turn IGNITION and INERT SEP switches to ON.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. ADI / HSI /\nheadings",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Horizon",
          response: "Check attitude ≈ + 2°",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Horizon has been set so as to indicate a 2° nose up attitude, when airplane center of gravity is at a middle average.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. HSI. Heading.\nStand-by compass",
          response: "Check",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: The indication of the stand-by compass is disturbed when windshield deice systems are activated.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. OFF/TAXI/LDG\nswitch",
          response: "LDG",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Engine\ninstruments",
          response: "Check\nITT in green sector",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. CAS display",
          response: "Check\nAll messages OFF,\nexcept IGNITION and\nINERT SEP ON,\nif used",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "7 - Apply brakes and increase power.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. PROP RPM",
          response: "Check\ngreen sector",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Brakes",
          response: "Release",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. TRQ",
          response: "100 %",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Torque will be about 40 % to 60 % before brake release. For a normal takeoff, maximum torque (100 %) will be applied after brakes release.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. Rotation airspeed",
          response: null,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. Attitude",
          response: "10° Up",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When vertical speed is positive:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. Brakes",
          response: "Apply\nBriefly",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. LANDING GEAR\nlever",
          response: "UP\nAirspeed < 150 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: During the sequence:",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "- The amber caution light flashes. It indicates that the landing gear pump is running. It goes off when the 3 landing gears are up locked. GEAR UNSAFE red warning light ON and GEAR UNSAFE indicate an anomaly.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "- It is possible that the 3 landing gear position green indicator lights flash unevenly then go off at the end of the sequence.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. GEAR UNSAFE\nred warning\nlight and GEAR\nUNSAFE",
          response: "Check OFF\nAt the end\nof the sequence",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "In case of initial climb at Vx:",
        },
        {
          type: ChecklistItemType.Warning,
          content: "WARNING: It is recommended not to retract FLAPS to UP before 500 ft AGL.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. Airspeed",
          response: "100 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When airspeed above 115 KIAS:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. FLAPS lever",
          response: "UP",
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.ShortTakeoff, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.PlainText,
          content: "When lined up, on brakes:",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: If heavy precipitation, turn IGNITION and INERT SEP switches to ON.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. ADI / HSI /\nheadings",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Horizon",
          response: "Check attitude ≈ + 2°",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Horizon has been set so as to indicate a 2° nose up attitude, when airplane center of gravity is at a middle average.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. HSI. Heading.\nStand-by compass",
          response: "Check",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: The indication of the stand-by compass is disturbed when windshield deice systems are activated.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. OFF/TAXI/LDG\nswitch",
          response: "LDG",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Engine\ninstruments",
          response: "Check",
        },
        { type: ChecklistItemType.PlainText, content: "ITT in green sector" },
        {
          type: ChecklistItemType.Challenge,
          content: "6. CAS display",
          response: "Check\nAll messages OFF,\nexcept IGNITION and\nINERT SEP ON,\nif used",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "7 - Apply brakes and increase power.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. PROP RPM",
          response: "Check\ngreen sector",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. TRQ",
          response: "100 %",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. Brakes",
          response: "Release",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: On short runway, maximum torque will be applied before brakes release.",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "11 - Rotation airspeed",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Weight < 6579 lbs (2984 kg):",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. Attitude",
          response: "15° Up",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Weight > 6579 lbs (2984 kg):",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. Attitude",
          response: "12.5° Up",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When vertical speed is positive:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. Brakes",
          response: "Apply\nBriefly",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. LANDING\nGEAR lever",
          response: "UP\nAirspeed < 150 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: During the sequence:",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "- The amber caution light flashes. It indicates that the landing gear pump is running. It goes off when the 3 landing gears are up locked. GEAR UNSAFE red warning light ON and GEAR UNSAFE indicate an anomaly.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "- It is possible that the 3 landing gear position green indicator lights flash unevenly then go off at the end of the sequence.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. GEAR UNSAFE\nred warning\nlight and GEAR\nUNSAFE",
          response: "Check OFF\nAt the end of\nthe sequence",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "In case of initial climb at Vx:",
        },
        {
          type: ChecklistItemType.Warning,
          content: "WARNING: It is recommended not to retract FLAPS to UP before 500 ft AGL.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. Airspeed",
          response: "100 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When airspeed above 115 KIAS:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. FLAPS lever",
          response: "UP",
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.AfterTakeoff, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. LANDING GEAR\nlever",
          response: "Check UP",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. FLAPS lever",
          response: "Check UP",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. TRQ",
          response: "Check 100 % max",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Climb\nairspeed",
          response: "124 KIAS",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. EIS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. CAS display",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. DE ICE SYSTEM\npanel",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. INERT SEP\nswitch",
          response: "As required",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.Climb, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. ALT SEL",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Altimeters\nsetting",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Autopilot",
          response: "Check\nAutopilot status and\nyaw damper ON",
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: Observe TRQ / Ng / Np / ITT / OIL T° and PSI limitations. Use optimum torque and / or refer to tables.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. TRQ\nadjustment /\nITT / Ng",
          response: "Check",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Torque setting during climb must be adjusted according to engine operation tables. These tables give the max. climb power torque setting (MXCL).",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "For each engine, when torque is reduced below 100 % at high altitude according to the tables, during the final climb, reaching the maximum permitted Ng (104 %) is possible and the ITT will be approximately constant, giving a particular value of ITT.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "For a simplified engine operation during climb, power may be set first of all by torque, using 100 %, then, when the ITT typical value for climb is reached, by indicated ITT, using this particular value.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "The margin between this indicated ITT and 790°C (recommended ITT limit during continuous operation) will gradually reduce as flight time is performed.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. Climb\nairspeed",
          response: "124 KIAS",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. EIS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. CAS display",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Weather radar",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Pressurization",
          response: "Check",
        },
        { type: ChecklistItemType.PlainText, content: "A/C panel" },
        {
          type: ChecklistItemType.Challenge,
          content: "10. TEMP\nselector",
          response: "Adjust",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. FUEL gages",
          response: "Check",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Verify fuel quantity and imbalance, correct if necessary.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. AMPS / VOLTS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: If heavy precipitation, turn IGNITION and INERT SEP switches to ON.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. DE ICE\nSYSTEM panel",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. INERT SEP\nswitch",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. LDG lights",
          response: "As required",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.Cruise, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Altimeters\nsetting",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Autopilot",
          response: "Check\nAutopilot status and\nyaw damper ON",
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: Observe TRQ / Ng / Np / ITT / OIL T° and PSI limitations. Use optimum torque and / or refer to tables.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. TRQ\nadjustment /\nITT / Ng",
          response: "Check\nAdjust according to\nengine operation tables\nor to cruise index\non the PFDs",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Engine operation tables give torque to be applied according to OAT, in order not to exceed authorized maximum power. When INERT SEP switch is OFF, a more accurate setting of torque must then be performed according to cruise performance tables.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. EIS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. CAS display",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Pressurization",
          response: "Check",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Regularly check fuel gages for:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Consumption",
          response: null,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Expected fuel at destination",
          response: null,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Tank automatic change every 5 minutes",
          response: null,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. Imbalance (Max. imbalance 15 USG)",
          response: null,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When the cruise parameters are stabilized, after 4 min minimum:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. AMPS / VOLTS",
          response: "Check",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: If heavy precipitation, turn IGNITION and INERT SEP switches to ON.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. DE ICE\nSYSTEM panel",
          response: "As required",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. INERT SEP\nswitch",
          response: "As required",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. LDG lights",
          response: "As required",
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.BeforeDescent, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Briefing\nbefore approach",
          response: "Completed",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Altimeters\nsettings",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Pressurization",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. LFE",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. FUEL gages",
          response: "Check\nfor quantity\nand imbalance",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Fullest tank",
          response: "Select",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. AMPS / VOLTS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: If heavy precipitation, turn IGNITION and INERT SEP switches to ON.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. DE ICE SYSTEM\npanel",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Windshield\nmisting\nprotection system",
          response: "As required",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Prior to descent in moist conditions and to avoid canopy misting:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. HOT AIR FLOW\ndistributor",
          response: "Set to 12\no'clock position",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. WINDSHIELD\nswitch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If misting continues:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. HOT AIR FLOW\ndistributor",
          response: "Turn to\nthe left",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. INERT SEP\nswitch",
          response: "As required",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.Approach, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. Altimeters\nsettings (QNH)",
          response: "Set / Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Minimums",
          response: "Set / Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. COM / NAV /\nGPS",
          response: "Set / Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Pressurization",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. LFE",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. FUEL gages",
          response: "Check\nfor quantity\nand imbalance",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Fullest tank",
          response: "Select",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. AMPS / VOLTS",
          response: "Check",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: If heavy precipitation, turn IGNITION and INERT SEP switch to ON.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. DE ICE SYSTEM\npanel",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. Windshield\nmisting\nprotection system",
          response: "As required",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Prior to descent in moist conditions and to avoid canopy misting:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. HOT AIR FLOW\ndistributor",
          response: "Set to 12\no'clock position",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. WINDSHIELD\nswitch",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If misting continues:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. HOT AIR FLOW distributor",
          response: "Turn to\nthe left",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. INERT SEP\nswitch",
          response: "ON",
        },
        { type: ChecklistItemType.PlainText, content: "When below FL 100:" },
        {
          type: ChecklistItemType.Challenge,
          content: "15. LDG lights",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. Passenger's\nbriefing",
          response: "As required",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "17. Seats,\nbelts, harnesses",
          response: "Locked",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. Passenger's\ntable",
          response: "Stowed",
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.FinalOrDownwind, TbmChecklistCategory.Amplified, [
        { type: ChecklistItemType.PlainText, content: "Long final:" },
        {
          type: ChecklistItemType.Challenge,
          content: "1. Altimeters",
          response: "Check",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. FUEL gages",
          response: "Check\nfor quantity\nand imbalance",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Fullest tank",
          response: "Select\nMaximum tolerated\nimbalance is 15 USG",
        },
        { type: ChecklistItemType.PlainText, content: "When below FL 100:" },
        {
          type: ChecklistItemType.Challenge,
          content: "4. LDG lights",
          response: "ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. INERT SEP\nswitch",
          response: "ON",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When airspeed is below 178 KIAS:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. LANDING GEAR\nlever",
          response: "DN",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. 3 green\nindicator lights",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. GEAR UNSAFE\nred warning\nlight",
          response: "Check OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. GEAR UNSAFE",
          response: "Check OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. Amber light",
          response: "Check OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: During the sequence:",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "- The amber caution light flashes. It indicates that the landing gear pump is running. It goes off when the 3 landing gears are down locked. GEAR UNSAFE red warning light ON and GEAR UNSAFE indicate an anomaly.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "- It is possible that the 3 landing gear position green indicator lights flash unevenly then come ON at the end of the sequence.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. FLAPS lever",
          response: "TO\nAirspeed < 178 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. Radar Mode\nsoftkey",
          response: "STANDBY",
          justification: Justification.Indent1,
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.ShortFinal, TbmChecklistCategory.Amplified, [
        { type: ChecklistItemType.PlainText, content: "Stabilized approach" },
        {
          type: ChecklistItemType.Challenge,
          content: "1. LANDING GEAR\nlever",
          response: "Check\nDN and 3 green",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When airspeed is below 122 KIAS:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. FLAPS lever",
          response: "LDG",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: However, when autopilot is engaged, in APR mode, with coupled GS, FLAPS must be extended in landing position before crossing the OUTER MARKER.",
        },
        { type: ChecklistItemType.PlainText, content: "Without AP engaged:" },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Approach\nairspeed",
          response: "85 KIAS",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "With AP engaged:" },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Approach\nairspeed",
          response: "Above 85 KIAS",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: This is to avoid any vertical deviation in case of late FLAPS extension to LDG position in short final.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. AP / YD",
          response: "Disconnect\nBefore 200 ft",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: The pilot effort required to use the rudder pedals is reduced if the yaw damper is turned off. This is particularly significant when landing in a crosswind.",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.Landing, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Warning,
          content:
            "WARNING: Reduce power smoothly. Quickly reducing the power to idle during the flare may induce a pronounced deceleration which may lead to a drop down of the airplane.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. THROTTLE",
          response: "Flight IDLE",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: Avoid three-point landings. Adopt a positive flight attitude in order to touch runway first with main landing gear.",
        },
        { type: ChecklistItemType.PlainText, content: "After wheels touch:" },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: On snowy or dirty runway, it is better not to use reverse below 40 KIAS.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Reverse",
          response: "As required\nReverse may be\napplied as soon\nas the wheels\ntouch the ground",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: To avoid ingestion of foreign objects, come out of the reverse range as speed reduces and use the brakes if necessary for further deceleration.",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: High power reverse at low speed can throw loose material into the air, and can cause control problems and decrease the comfort of crew and passengers. If permitted by the runway length, it is better to adopt a moderate reverse.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Brakes",
          response: "As required",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: It is advised not to brake energetically, as long as speed has not reached 40 KIAS, as otherwise wheels may be locked.",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.GoAroundAPOff, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. GO AROUND\npush-button",
          response: "Press\nIt provides the\nmoving up of\nthe flight director\nto + 10°",
        },
        { type: ChecklistItemType.PlainText, content: "Simultaneously:" },
        {
          type: ChecklistItemType.Challenge,
          content: "2. THROTTLE",
          response: "T/O power",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: The airplane will tend to yaw to the left when power is applied. Right rudder pressure will be required to maintain coordinated straight flight until the rudder trim can be adjusted.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. Attitude",
          response: "10° Up",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. FLAPS lever",
          response: "TO",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "With weight below 6579 lbs (2984 kg)",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If airspeed has been maintained at 80 KIAS or more and TRQ 100 %, select",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "flaps to TO position as soon as the 10° Up attitude has been attained.",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When the vertical speed is positive and when airspeed is at or above 85 KIAS:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. LANDING GEAR\nlever",
          response: "UP\nAll warning\nlights OFF",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When airspeed is at or above 110 KIAS:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. FLAPS lever",
          response: "UP",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Climb\nairspeed",
          response: "As required",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "With weight above 6579 lbs (2984 kg)",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If airspeed has been maintained at 85 KIAS or more and TRQ 100 %, select",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "flaps to TO position as soon as the 10° Up attitude has been attained.",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When the vertical speed is positive and when airspeed is at or above 90 KIAS:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. LANDING GEAR\nlever",
          response: "UP\nAll warning\nlights OFF",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When airspeed is at or above 115 KIAS:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. FLAPS lever",
          response: "UP",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. Climb\nairspeed",
          response: "As required",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. TRQ",
          response: "As required",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.GoAroundAPOn, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. GO AROUND\npush-button",
          response: "Press\nAP remains ON\nwith the flight\ndirector moving up\nto + 10°.",
        },
        { type: ChecklistItemType.PlainText, content: "Simultaneously:" },
        {
          type: ChecklistItemType.Challenge,
          content: "2. THROTTLE",
          response: "T/O power",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. FLAPS lever",
          response: "TO",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "With weight below 6579 lbs (2984 kg)",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If airspeed has been maintained at 80 KIAS or more and TRQ 100 %, select",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "flaps to TO position as soon as the 10° Up attitude has been attained.",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When the vertical speed is positive and when airspeed is at or above 85 KIAS:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. LANDING GEAR\nlever",
          response: "UP\nAll warning\nlights OFF",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When airspeed is at or above 110 KIAS:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. FLAPS lever",
          response: "UP",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Climb\nairspeed",
          response: "As required",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "With weight above 6579 lbs (2984 kg)",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If airspeed has been maintained at 85 KIAS or more and TRQ 100 %, select",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "flaps to TO position as soon as the 10° Up attitude has been attained.",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When the vertical speed is positive and when airspeed is at or above 90 KIAS:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. LANDING GEAR\nlever",
          response: "UP\nAll warning\nlights OFF",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When airspeed is at or above 115 KIAS:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. FLAPS lever",
          response: "UP",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. Climb\nairspeed",
          response: "As required",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. TRQ",
          response: "As required",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.TouchAndGo, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.PlainText,
          content: "Before wheels touch:",
        },
        {
          type: ChecklistItemType.Warning,
          content:
            "WARNING: Reduce power smoothly. Quickly reducing the power to idle during the flare may induce a pronounced deceleration which may lead to a drop down of the airplane.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. Takeoff\ndistances",
          response: "Checked",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. Rotation\nairspeed (VR)",
          response: "Checked",
          imagePath: ChecklistFilePaths.ASSETS_PATH + "/rotation-airspeed.png",
          justification: Justification.Indent1,
        },
        { type: ChecklistItemType.PlainText, content: "After wheels touch:" },
        {
          type: ChecklistItemType.Challenge,
          content: "3. FLAPS lever",
          response: "TO",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. Elevator trim",
          response:
            "Green sector\nIt is faster to use manual\nelevator trim control than\nelectric one.\nEnsure that runway length\nis sufficient to complete\nthis sequence.",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Warning,
          content:
            "WARNING: Confirm that flaps have reached the TO position before increasing power. Do not increase power with full flaps, as airplane may lift off prematurely at low speed.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. THROTTLE",
          response: "T/O power",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If normal takeoff:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. Attitude",
          response: "10° Up",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "If short takeoff:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Weight < 6579 lbs (2984 kg)",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. Attitude",
          response: "15° Up",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Weight > 6579 lbs (2984 kg)",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. Attitude",
          response: "12.5° Up",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: The POH does not supply distances for touch and go. The pilot must decide whether the runway length is sufficient.",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.RunwayClear, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.PlainText,
          content: "Runway clear - airplane stopped",
        },
        {
          type: ChecklistItemType.Caution,
          content: "CAUTION: Generator load < 200 amps",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "1. TAXI lights",
          response: "ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. NAV switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. STROBE switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "DE ICE SYSTEM panel:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. AIRFRAME DE\nICE switch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. PROP DE ICE\nswitch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. WINDSHIELD\nswitch",
          response: "As required",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. PITOT L HTR\nswitch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. PITOT R &\nSTALL HTR switch",
          response: "OFF",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. INERT SEP\nswitch",
          response: "Check ON",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. Trims",
          response: "Reset to takeoff\nposition",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. FLAPS lever",
          response: "UP",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. A/C switch",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. XPDR",
          response: "Check GND",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. WX radar",
          response:
            "Check\nMaintain WX radar on\nstandby in order not to\ngenerate radiations\nprejudicial to outside\npersons. The WX radar is\nautomatically set to standby\nafter the touchdown.",
        },
      ]),
      new TbmChecklist(TbmAmplifiedChecklistNames.Shutdown, TbmChecklistCategory.Amplified, [
        {
          type: ChecklistItemType.Challenge,
          content: "1. PARK BRAKE",
          response: "Set ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "2. PARK BRAKE",
          response: "Check ON",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "3. EXT LIGHTS\npanel",
          response: "All OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "4. INT LIGHTS\npanel",
          response: "As required",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "5. OXYGEN switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "6. FUEL SEL\nswitch",
          response: "MAN",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "7. AP / TRIMS\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "8. A/C switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "9. SEATS HTRS\nMASTER switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "10. BLEED switch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "11. Check for cabin\ndepressurization (Δp = 0 Psi)",
          response: null,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "12. THROTTLE",
          response: "Flight IDLE\nFor 2 min",
        },
        {
          type: ChecklistItemType.Note,
          content:
            "NOTE: This allows the engine to stabilize at minimum obtainable ITT in order to minimize the likelihood of oil coking in the #3 bearing area.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "13. THROTTLE",
          response: "LO-IDLE\nFor 15 sec",
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: Keep THROTTLE on LO-IDLE position for 15 sec minimum before shutting down engine.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "14. THROTTLE",
          response: "CUT OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "15. INERT SEP\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "16. Radar Mode\nSoftkey",
          response: "OFF",
        },
        { type: ChecklistItemType.PlainText, content: "Fuel system check" },
        {
          type: ChecklistItemType.Challenge,
          content: "17. AUX BOOST\nPMP ON",
          response: "Check ON\nWait for AUX BP operation to be\nheard to confirm that\nthe AUX BP is functional.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "18. AUX BP\nswitch",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "19. GENERATOR\nselector",
          response: "OFF",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "When inertial separator is retracted, after approximately 40 sec:",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "20. SOURCE\nselector",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "21. Crash lever",
          response: "Pull down",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "22. FUEL TANK\nSELECTOR",
          response: "OFF",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "23. PARK BRAKE",
          response: "As required",
        },
        {
          type: ChecklistItemType.Caution,
          content:
            "CAUTION: In case of high OAT [above 35°C (95°F)], motoring for up to 30 seconds is required after engine shutdown to minimize oil coking and cool the engine bearings - refer to the Motoring procedure.",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "Shutdown stand-by instruments",
        },
        {
          type: ChecklistItemType.PlainText,
          content: "MD302 normal shutdown procedure:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content:
            "24. No pilot action required\nfor normal shutdown.\nTheMD302 will shut down\nautomatically within 60\nseconds following\nelectrical power shutdown",
          response: null,
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.PlainText,
          content: "MD302 manual shutdown procedure:",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Note,
          content: "NOTE: The MD302 can be manually shut down when in the discharge mode to conserve battery power.",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "25. Press and hold the\ncontrol knob for\napproximately 2 seconds.",
          response: null,
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content:
            "26. Turn the control knob to\nselect POWER OFF on the\nmenu and press the control\nknob to shut down\nthe standby\nattitude module.",
          response: null,
          justification: Justification.Indent2,
        },
      ]),
      new TbmChecklist(
        TbmAmplifiedChecklistNames.OutsideCheckAfterShutdown,
        TbmChecklistCategory.Amplified,
        [
          {
            type: ChecklistItemType.Challenge,
            content: "1. Oxygen\ncylinder (right\nwing fairing)",
            response: "Close",
          },
          {
            type: ChecklistItemType.Challenge,
            content: "2. Install air inlet and\nstatic port plugs, and\nexhaust and pitot covers.",
            response: null,
          },
          {
            type: ChecklistItemType.Note,
            content: "NOTE: Be careful of exhaust stubs temperature before installing covers.",
          },
          {
            type: ChecklistItemType.Note,
            content: "NOTE: 15 to 20 minutes after the engine shutdown, check engine oil level.",
          },
        ],
        true,
      ),
    ];
  }
}
