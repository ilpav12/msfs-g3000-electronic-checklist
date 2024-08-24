import { Checklist, ChecklistCategory } from "@base/Shared/ChecklistSystem/Checklist";
import { ChecklistItemType, Justification } from "@base/Shared/ChecklistSystem/ChecklistItem";

export enum ItemsShowcaseChecklistNames {
  ItemsTypes = "Items Types",
  Justifications = "Justifications",
  BlanksBelow = "Blanks Below",
}

/** A utility class to generate showcase checklist data. */
export class ItemsShowcaseChecklists {
  /**
   * Generates the normal showcase data.
   * @returns An array of showcase checklists.
   **/
  public static getChecklists(): Checklist[] {
    return [
      new Checklist(ItemsShowcaseChecklistNames.ItemsTypes, ChecklistCategory.ItemsShowcase, [
        {
          type: ChecklistItemType.Challenge,
          content: "Challenge with response",
          color: "white",
          fontSize: 15,
          response: "Response",
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Challenge without response",
          color: "white",
          fontSize: 15,
        },
        {
          type: ChecklistItemType.Text,
          content: "Text",
          color: "white",
          fontSize: 15,
        },
        {
          type: ChecklistItemType.Link,
          content: "Link to checklist (Justifications)",
          color: "cyan",
          fontSize: 15,
          linkTarget: {
            checklistName: ItemsShowcaseChecklistNames.Justifications,
            checklistCategory: ChecklistCategory.ItemsShowcase,
          },
        },
      ]),
      new Checklist(ItemsShowcaseChecklistNames.Justifications, ChecklistCategory.ItemsShowcase, [
        {
          type: ChecklistItemType.Challenge,
          content: "Challenge",
          color: "white",
          fontSize: 15,
          response: "Response",
          justification: Justification.Left,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Challenge",
          color: "white",
          fontSize: 15,
          response: "Response",
          justification: Justification.Indent1,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Challenge",
          color: "white",
          fontSize: 15,
          response: "Response",
          justification: Justification.Indent2,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Challenge",
          color: "white",
          fontSize: 15,
          response: "Response",
          justification: Justification.Indent3,
        },
        {
          type: ChecklistItemType.Challenge,
          content: "Challenge",
          color: "white",
          fontSize: 15,
          response: "Response",
          justification: Justification.Indent4,
        },
      ]),
      new Checklist(
        ItemsShowcaseChecklistNames.BlanksBelow,
        ChecklistCategory.ItemsShowcase,
        [
          {
            type: ChecklistItemType.Challenge,
            content: "Challenge",
            color: "white",
            fontSize: 15,
            response: "Response",
            blanksBelow: 0,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Challenge",
            color: "white",
            fontSize: 15,
            response: "Response",
            blanksBelow: 1,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Challenge",
            color: "white",
            fontSize: 15,
            response: "Response",
            blanksBelow: 2,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Challenge",
            color: "white",
            fontSize: 15,
            response: "Response",
            blanksBelow: 3,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Challenge",
            color: "white",
            fontSize: 15,
            response: "Response",
            blanksBelow: 4,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Challenge",
            color: "white",
            fontSize: 15,
            response: "Response",
            blanksBelow: 5,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Challenge",
            color: "white",
            fontSize: 15,
            response: "Response",
            blanksBelow: 6,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Challenge",
            color: "white",
            fontSize: 15,
            response: "Response",
            blanksBelow: 7,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Challenge",
            color: "white",
            fontSize: 15,
            response: "Response",
            blanksBelow: 8,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Challenge",
            color: "white",
            fontSize: 15,
            response: "Response",
            blanksBelow: 9,
          },
          {
            type: ChecklistItemType.Challenge,
            content: "Challenge",
            color: "white",
            fontSize: 15,
            response: "Response",
            blanksBelow: 10,
          },
        ],
        true,
      ),
    ];
  }
}
