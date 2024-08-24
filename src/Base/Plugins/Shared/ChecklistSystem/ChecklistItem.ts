import { Subject } from "@microsoft/msfs-sdk";
import { ChecklistCategory, ChecklistNames } from "@base/Shared";

/** The possible checklist item types */
export enum ChecklistItemType {
  Challenge = "Challenge",
  Text = "Text",
  Link = "Link",
}

/** The possible states of a checklist item */
export enum ChecklistItemState {
  Incomplete = "Incomplete",
  Completed = "Completed",
  NotApplicable = "NotApplicable",
}

export enum Justification {
  Left = "left",
  Indent1 = "indent1",
  Indent2 = "indent2",
  Indent3 = "indent3",
  Indent4 = "indent4",
  Center = "center",
  Right = "right",
}

export enum ChecklistItemInteractionType {
  Checkbox = "checkbox",
  ScrollStop = "scrollStop",
  NoScrollStop = "noScrollStop",
  Link = "link",
}

export type LinkTarget<Names, Category> = {
  checklistName: Names;
  checklistCategory: Category;
};

/** A checklist item */
export class ChecklistItem<Names = ChecklistNames, Category = ChecklistCategory> {
  public readonly state = Subject.create(
    this.type === ChecklistItemType.Challenge ? ChecklistItemState.Incomplete : ChecklistItemState.NotApplicable,
  );

  /**
   * Creates a newChecklistItem
   * @param type The type of the checklist item
   * @param content The content of the checklist item
   * @param response The response to a challenge (may be undefined or null)
   * @param color The text color of the item
   * @param fontSize The font size of the item
   * @param linkTarget The target checklist to link to (optional)
   * @param blanksBelow The number of blank lines to add below the item (optional, defaults to 0, max 10)
   * @param justification The justification of the text (optional, defaults to Left)
   * @param imagePath The path of image to display below the item (optional)
   * @param interactionType The interaction type of the item (optional)
   */
  public constructor(
    public readonly type: ChecklistItemType,
    public readonly content: string,
    public readonly color: string,
    public readonly fontSize: number,
    public readonly response: string | undefined = undefined,
    public readonly linkTarget: LinkTarget<Names, Category> | undefined = undefined,
    public readonly blanksBelow: number = 0,
    public readonly justification: Justification | undefined,
    public readonly imagePath: string | undefined = undefined,
    public readonly interactionType: ChecklistItemInteractionType | undefined = undefined,
  ) {
    // check for validity of properties for the different types
    if (type === ChecklistItemType.Challenge) {
      if (justification === Justification.Center) {
        throw new Error("Challenges cannot have a center justification.");
      }
      if (justification === Justification.Right) {
        throw new Error("Challenges cannot have a right justification.");
      }
    }

    if (type === ChecklistItemType.Link) {
      if (linkTarget === undefined) {
        throw new Error("Links must have a link target.");
      }

      if (imagePath !== undefined) {
        throw new Error("Links item cannot have a image.");
      }
    }

    if (blanksBelow < 0 || blanksBelow > 10) {
      throw new Error("The number of blanks below must be between 0 and 10.");
    }

    // assign default interaction type
    if (interactionType === undefined) {
      switch (type) {
        case ChecklistItemType.Challenge:
          this.interactionType = ChecklistItemInteractionType.Checkbox;
          break;
        case ChecklistItemType.Text:
          this.interactionType = ChecklistItemInteractionType.ScrollStop;
          break;
        case ChecklistItemType.Link:
          this.interactionType = ChecklistItemInteractionType.Link;
          break;
        default:
          this.interactionType = ChecklistItemInteractionType.ScrollStop;
          break;
      }
    }
  }
}

/** An interface describing a Checklist Challenge Item */
export interface ChecklistChallengeItemData {
  /** The type of checklist item */
  type: ChecklistItemType.Challenge;
  /**
   * The content of the checklist item.
   * Add <br> to create a new line.
   */
  content: string;
  /**
   * The response to the challenge (optional)
   * Add <br> to create a new line.
   */
  response?: string;
  /**
   * The color of the challenge item
   */
  color: string;
  /**
   * The font size of the challenge item
   */
  fontSize: number;
  /**
   * The number of blank lines to add below the item (optional, defaults to 0, max 10)
   */
  blanksBelow?: number;
  /**
   * The justification of the text (optional, defaults to Left, cannot be Center or Right)
   */
  justification?: Justification;
  /**
   * The path of image to display below the item (optional)
   */
  imagePath?: string;
}

/** An interface describing a Checklist Text Item */
export interface ChecklistTextItemData {
  /** The type of checklist item */
  type: ChecklistItemType.Text;
  /**
   * The content of the checklist item.
   * Add <br> to create a new line.
   */
  content: string;
  /**
   * The color of the text item
   */
  color: string;
  /**
   * The font size of the text item
   */
  fontSize: number;
  /**
   * The number of blank lines to add below the item (optional, defaults to 0, max 10)
   */
  blanksBelow?: number;
  /**
   * The justification of the text (optional, defaults to Left)
   */
  justification?: Justification;
  /**
   * The path of image to display below the item (optional)
   */
  imagePath?: string;
}

/** An interface describing a Checklist Link Item */
export interface ChecklistLinkItemData<Names = ChecklistNames, Category = ChecklistCategory> {
  /** The type of checklist item */
  type: ChecklistItemType.Link;
  /**
   * The content of the checklist item.
   * Add <br> to create a new line.
   */
  content: string;
  /**
   * The target checklist to link to.
   */
  linkTarget: LinkTarget<string, Category>;
  /**
   * The color of the link item
   */
  color: string;
  /**
   * The font size of the link item
   */
  fontSize: number;
  /**
   * The number of blank lines to add below the item (optional, defaults to 0, max 10)
   */
  blanksBelow?: number;
  /**
   * The justification of the text (optional, defaults to Left)
   */
  justification?: Justification;
}

/** An interface describing an checklist item */
export type ChecklistItemData<Names = ChecklistNames, Category = ChecklistCategory> = (
  | ChecklistChallengeItemData
  | ChecklistTextItemData
  | ChecklistLinkItemData<Names, Category>
) & { interactionType?: ChecklistItemInteractionType };
