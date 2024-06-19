import {FSComponent, registerPlugin} from "@microsoft/msfs-sdk";
import {
  AbstractG3000GtcPlugin,
  GtcService,
  GtcViewKeys,
  GtcViewLifecyclePolicy
} from "@microsoft/msfs-wtg3000-gtc";
import {ChecklistFilePaths} from "@base/Shared";
import {
  ChecklistGtcMfdHomePage,
  ChecklistGtcPage,
  ChecklistGtcPlugin,
  ChecklistGtcViewKeys
} from "@base/GTC";
import {LongitudeChecklistCategory} from "../Shared/ChecklistSystem/LongitudeChecklist";
import {AbbrevChecklists, NormalChecklists} from "../Shared/ChecklistSystem/Checklists";
import {LongitudeChecklistRepository} from "../Shared/ChecklistSystem/LongitudeChecklistRepository";

export class LongitudeChecklistGtcPlugin extends ChecklistGtcPlugin {
  /** @inheritdoc */
  public registerGtcViews(gtcService: GtcService) {
    gtcService.registerView(GtcViewLifecyclePolicy.Static, GtcViewKeys.MfdHome, 'MFD', function (service, mode, index) {
      return (
        <ChecklistGtcMfdHomePage
          gtcService={service}
          controlMode={mode}
          displayPaneIndex={index}
          supportPerfPage={true}
        />
      );
    });
    gtcService.registerView(GtcViewLifecyclePolicy.Persistent, ChecklistGtcViewKeys.Checklist, 'MFD', function (service, mode, index) {
      const normalChecklists = NormalChecklists.getChecklists();
      const abbrevChecklists = AbbrevChecklists.getChecklists();
      const checklistRepository = new LongitudeChecklistRepository(
        service.bus,
        [
          ...normalChecklists,
          ...abbrevChecklists,
        ],
        normalChecklists[0],
      );
      return (
        <ChecklistGtcPage
          gtcService={service}
          controlMode={mode}
          displayPaneIndex={index}
          checklistCategories={[
            LongitudeChecklistCategory.Normal,
            LongitudeChecklistCategory.Abbrev,
          ]}
          checklistRepository={checklistRepository}
        />
      );
    });
  }
}

registerPlugin(LongitudeChecklistGtcPlugin);

export class ChecklistGtcCssPlugin extends AbstractG3000GtcPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/LongitudeChecklistGtcPlugins.css`);
  }
}

registerPlugin(ChecklistGtcCssPlugin);