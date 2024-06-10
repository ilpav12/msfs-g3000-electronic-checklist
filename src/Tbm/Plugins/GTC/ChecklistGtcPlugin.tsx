import {FSComponent, registerPlugin} from "@microsoft/msfs-sdk";
import {
  AbstractG3000GtcPlugin,
  GtcService,
  GtcViewKeys,
  GtcViewLifecyclePolicy,
  GtcViewProps
} from "@microsoft/msfs-wtg3000-gtc";
import {ChecklistFilePaths} from "@base/Shared";
import {
  ChecklistGtcMfdHomePage,
  ChecklistGtcPage,
  ChecklistGtcPlugin,
  ChecklistGtcViewKeys
} from "@base/GTC";
import {TbmChecklistCategory} from "../Shared/ChecklistSystem/TbmChecklist";
import {NormalChecklistNames, NormalChecklists} from "../Shared/ChecklistSystem/Checklists";
import {TbmChecklistRepository} from "../Shared/ChecklistSystem/TbmChecklistRepository";

export class TbmChecklistGtcPlugin extends ChecklistGtcPlugin {
  /** @inheritdoc */
  public registerGtcViews(gtcService: GtcService) {
    gtcService.registerView(GtcViewLifecyclePolicy.Static, GtcViewKeys.MfdHome, 'MFD', function (service, mode, index) {
      return (
        <ChecklistGtcMfdHomePage
          gtcService={service}
          controlMode={mode}
          displayPaneIndex={index}
          supportPerfPage={false}
        />
      );
    });
    gtcService.registerView(GtcViewLifecyclePolicy.Persistent, ChecklistGtcViewKeys.Checklist, 'MFD', function (service, mode, index) {
      const normalChecklists = NormalChecklists.getChecklists();
      const checklistRepository = new TbmChecklistRepository(
        service.bus,
        [...normalChecklists],
        normalChecklists[0],
      );
      return (
        <ChecklistGtcPage
          gtcService={service}
          controlMode={mode}
          displayPaneIndex={index}
          checklistCategories={[
            { name: TbmChecklistCategory.Normal, checklistNames: NormalChecklistNames },
          ]}
          checklistRepository={checklistRepository}
        />
      );
    });
  }
}

registerPlugin(TbmChecklistGtcPlugin);

export class ChecklistGtcCssPlugin extends AbstractG3000GtcPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/TbmChecklistGtcPlugins.css`);
  }
}

registerPlugin(ChecklistGtcCssPlugin);