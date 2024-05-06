import {FSComponent, registerPlugin} from "@microsoft/msfs-sdk";
import {
  AbstractG3000GtcPlugin,
  GtcService, GtcViewKeys,
  GtcViewLifecyclePolicy
} from "@microsoft/msfs-wtg3000-gtc";
import {TbmChecklistGtcMfdHomePage, TbmChecklistGtcPage} from "./index";
import {TbmChecklistGtcViewKeys} from "../GtcService/TbmChecklistGtcViewKeys";

export class TbmChecklistGtcPlugin extends AbstractG3000GtcPlugin {
  /** @inheritdoc */
  public registerGtcViews(gtcService: GtcService) {
    gtcService.registerView(GtcViewLifecyclePolicy.Static, GtcViewKeys.MfdHome, 'MFD', function (service, mode, index) {
      return (
        <TbmChecklistGtcMfdHomePage
          gtcService={service}
          controlMode={mode}
          displayPaneIndex={index}
          supportPerfPage={false}
        />
      );
    });
    gtcService.registerView(GtcViewLifecyclePolicy.Persistent, TbmChecklistGtcViewKeys.Checklist, 'MFD', function (service, mode, index) {
      return (
        <TbmChecklistGtcPage
          gtcService={service}
          controlMode={mode}
          displayPaneIndex={index}
        />
      );
    });
  }
}

registerPlugin(TbmChecklistGtcPlugin);