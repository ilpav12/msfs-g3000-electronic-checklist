import {Subject} from "@microsoft/msfs-sdk";
import {ChecklistNames} from "@base/Shared";

/** The possible checklist item types */
export enum ChecklistItemType {
  Challenge = 'Challenge',
  Warning = 'Warning',
  Caution = 'Caution',
  Note = 'Note',
  Subtitle = 'Subtitle',
  PlainText = 'PlainText',
  Link = 'Link',
  Branch = 'Branch',
  BranchItem = 'BranchItem',
}

/** The possible states of a checklist item */
export enum ChecklistItemState {
  Incomplete = 'Incomplete',
  Completed = 'Completed',
  NotApplicable = 'NotApplicable',
}

export enum Justification {
  Left = 'Left',
  Indent1 = 'Indent1',
  Indent2 = 'Indent2',
  Indent3 = 'Indent3',
  Indent4 = 'Indent4',
  Center = 'Center',
  Right = 'Right',
}

export enum ChecklistItemInteractionType {
  Checkbox,
  ScrollStop,
  NoScrollStop,
  Link,
}

/** A checklist item */
export class ChecklistItem {
  public readonly state = Subject.create(this.type === ChecklistItemType.Challenge || this.type === ChecklistItemType.BranchItem ? ChecklistItemState.Incomplete : ChecklistItemState.NotApplicable);

  /**
   * Creates a newChecklistItem
   * @param type The type of the checklist item
   * @param content The content of the checklist item
   * @param response The response to a challenge (may be undefined or null)
   * @param linkTarget The target checklist to link to (optional)
   * @param blanksBelow The number of blank lines to add below the item (optional, defaults to 0, max 10)
   * @param justification The justification of the text (optional, defaults to Left)
   * @param imagePath The path of image to display below the item (optional)
   * @param interactionType The interaction type of the item (optional)
   * @param branchItems The items of a branch (optional)
   */
  public constructor(
    public readonly type: ChecklistItemType,
    public readonly content: string,
    public readonly response: string | undefined | null = undefined,
    public readonly linkTarget: ChecklistNames | undefined = undefined,
    public readonly blanksBelow: number = 0,
    public readonly justification: Justification | undefined,
    public readonly imagePath: string | undefined = undefined,
    public readonly interactionType: ChecklistItemInteractionType | undefined = undefined,
    public readonly branchItems: ChecklistItem[] | undefined = undefined,
  ) {
    // check for validity of properties for the different types
    if (type === ChecklistItemType.Challenge) {
      if (response === undefined) {
        throw new Error('Challenges must have response with a string or null value.');
      }
      if (justification === Justification.Center) {
        throw new Error('Challenges cannot have a center justification.');
      }
      if (justification === Justification.Right) {
        throw new Error('Challenges cannot have a right justification.');
      }
    }

    if (type === ChecklistItemType.Link) {
      if (linkTarget === undefined) {
        throw new Error('Links must have a link target.');
      }

      if (imagePath !== undefined) {
        throw new Error('Links item cannot have a image.');
      }
    }

    if (type === ChecklistItemType.Branch) {
      if (justification !== Justification.Left) {
        throw new Error('Branches must have a left justification.');
      }

      if (imagePath !== undefined) {
        throw new Error('Branches cannot have a image.');
      }

      if (branchItems === undefined) {
        throw new Error('Branches must have branch items.');
      }

      if (branchItems.length < 2) {
        throw new Error('Branches must have at least two branch items.');
      }
    }

    if (type === ChecklistItemType.BranchItem) {
      if (linkTarget === undefined) {
        throw new Error('Branch items must have a link target.');
      }

      if (justification !== Justification.Left) {
        throw new Error('Branch items must have a left justification.');
      }

      if (imagePath !== undefined) {
        throw new Error('Branch items cannot have a image.');
      }
    }

    if (blanksBelow < 0 || blanksBelow > 10) {
      throw new Error('The number of blanks below must be between 0 and 10.');
    }

    if (type === ChecklistItemType.Warning || type === ChecklistItemType.Caution || type === ChecklistItemType.Note) {
      if (justification === undefined) {
        this.justification = Justification.Center;
      }
    }

    // assign default interaction type
    switch (type) {
      case ChecklistItemType.Challenge:
        this.interactionType = ChecklistItemInteractionType.Checkbox;
        break;
      case ChecklistItemType.Warning || ChecklistItemType.Caution || ChecklistItemType.Note || ChecklistItemType.PlainText || ChecklistItemType.Branch:
        this.interactionType = ChecklistItemInteractionType.ScrollStop;
        break;
      case ChecklistItemType.Subtitle:
        this.interactionType = ChecklistItemInteractionType.NoScrollStop;
        break;
      case ChecklistItemType.Link || ChecklistItemType.BranchItem:
        this.interactionType = ChecklistItemInteractionType.Link;
        break;
      default:
        this.interactionType = ChecklistItemInteractionType.ScrollStop;
        break;
    }
  }
}

/** An interface describing a Checklist Challenge Item */
export interface ChecklistChallengeItemData {
  /** The type of checklist item */
  type: ChecklistItemType.Challenge
  /**
   * The content of the checklist item.
   * Add \n to create a new line.
   */
  content: string;
  /**
   * The response to the challenge (optional)
   * Add \n to create a new line.
   */
  response?: string | null;
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

/** An interface describing a Checklist Warning Item */
export interface ChecklistWarningItemData {
  /** The type of checklist item */
  type: ChecklistItemType.Warning
  /**
   * The content of the checklist item.
   * Add \n to create a new line.
   */
  content: string;
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

/** An interface describing a Checklist Caution Item */
export interface ChecklistCautionItemData {
  /** The type of checklist item */
  type: ChecklistItemType.Caution
  /**
   * The content of the checklist item.
   * Add \n to create a new line.
   */
  content: string;
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

/** An interface describing a Checklist Note Item */
export interface ChecklistNoteItemData {
  /** The type of checklist item */
  type: ChecklistItemType.Note
  /**
   * The content of the checklist item.
   * Add \n to create a new line.
   */
  content: string;
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

/** An interface describing a Checklist Subtitle Item */
export interface ChecklistSubtitleItemData {
  /** The type of checklist item */
  type: ChecklistItemType.Subtitle
  /**
   * The content of the checklist item.
   * Add \n to create a new line.
   */
  content: string;
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

/** An interface describing a Checklist Plain Text Item */
export interface ChecklistPlainTextItemData {
  /** The type of checklist item */
  type: ChecklistItemType.PlainText
  /**
   * The content of the checklist item.
   * Add \n to create a new line.
   */
  content: string;
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
export interface ChecklistLinkItemData<T = ChecklistNames> {
  /** The type of checklist item */
  type: ChecklistItemType.Link
  /**
   * The content of the checklist item.
   * Add \n to create a new line.
   */
  content: string;
  /**
   * The target checklist to link to.
   */
  linkTarget: T;
  /**
   * The number of blank lines to add below the item (optional, defaults to 0, max 10)
   */
  blanksBelow?: number;
  /**
   * The justification of the text (optional, defaults to Left)
   */
  justification?: Justification;
}

/** An interface describing a Checklist Branch Item */
export interface ChecklistBranchItemData {
  /** The type of checklist item */
  type: ChecklistItemType.Branch
  /**
   * The content of the checklist item.
   * Add \n to create a new line.
   */
  content: string;
  /**
   * The number of blank lines to add below the item (optional, defaults to 0, max 10)
   */
  blanksBelow?: number;
  /**
   * The items of the branch
   */
  branchItems: ChecklistBranchItemData[];
}

/** An interface describing a Checklist Branch Item */
export interface ChecklistBranchItemData<T = ChecklistNames> {
  /** The type of checklist item */
  type: ChecklistItemType.Branch
  /**
   * The content of the checklist item.
   * Add \n to create a new line.
   */
  content: string;
  /**
   * The target sub-checklist to link to.
   */
  linkTarget: T;
}

/** An interface describing an checklist item */
export type ChecklistItemData<T = ChecklistNames> =
  (ChecklistChallengeItemData |
    ChecklistWarningItemData |
    ChecklistCautionItemData |
    ChecklistNoteItemData |
    ChecklistSubtitleItemData |
    ChecklistPlainTextItemData |
    ChecklistLinkItemData<T> |
    ChecklistBranchItemData<T>) &
  { interactionType?: ChecklistItemInteractionType };