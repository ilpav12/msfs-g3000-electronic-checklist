import argparse
import json
from enum import StrEnum


class ChecklistItemType(StrEnum):
    Challenge = 'ChecklistItemType.Challenge',
    Warning = 'ChecklistItemType.Warning',
    Caution = 'ChecklistItemType.Caution',
    Note = 'ChecklistItemType.Note',
    Subtitle = 'ChecklistItemType.Subtitle',
    PlainText = 'ChecklistItemType.PlainText',
    Link = 'ChecklistItemType.Link',
    Branch = 'ChecklistItemType.Branch',
    BranchItem = 'ChecklistItemType.BranchItem',


class Justification(StrEnum):
    Left = 'Justification.Left',
    Indent1 = 'Justification.Indent1',
    Indent2 = 'Justification.Indent2',
    Indent3 = 'Justification.Indent3',
    Indent4 = 'Justification.Indent4',
    Center = 'Justification.Center',
    Right = 'Justification.Right',


class ChecklistItemInteractionType(StrEnum):
    Checkbox = 'ChecklistItemInteractionType.Checkbox',
    ScrollStop = 'ChecklistItemInteractionType.ScrollStop',
    NoScrollStop = 'ChecklistItemInteractionType.NoScrollStop',
    Link = 'ChecklistItemInteractionType.Link',


class LinkTarget:
    def __init__(self, category_name: str, checklist_name: str):
        self.category_name = category_name
        self.checklist_name = checklist_name

    def __str__(self):
        return (f"  linkTarget: {{\n"
                f"    checklistName: '{self.checklist_name}',\n"
                f"    checklistCategory: '{self.category_name}',\n"
                f"  }},\n")

    def __repr__(self):
        return self.__str__()


class ChecklistItem:
    def __init__(self,
                 item_type: ChecklistItemType,
                 content: str,
                 response: str | None = None,
                 link_target: LinkTarget | None = None,
                 blanks_below: int = 0,
                 justification: Justification = Justification.Left,
                 interaction_type: ChecklistItemInteractionType | None = None):
        self.item_type = item_type
        self.content = content
        self.response = response
        self.link_target = link_target
        self.blanks_below = blanks_below
        self.justification = justification
        self.interaction_type = interaction_type

    def __str__(self):
        justification = f", justification: {self.justification}" if self.justification != Justification.Left else ''
        if ((self.item_type == ChecklistItemType.Warning
                or self.item_type == ChecklistItemType.Caution
                or self.item_type == ChecklistItemType.Note) and self.justification == Justification.Center):
            justification = ''
        blanks_below = f", blanks_below: {self.blanks_below}" if self.blanks_below != 0 else ''
        interaction_type = f", interactionType: {self.interaction_type}" if self.interaction_type is not None else ''

        if self.item_type == ChecklistItemType.Challenge:
            return f"{{ type: {self.item_type}, content: '{self.content}', response: {self.response}{justification}{blanks_below}{interaction_type} }},"
        if (self.item_type == ChecklistItemType.Warning
                or self.item_type == ChecklistItemType.Caution
                or self.item_type == ChecklistItemType.Note
                or self.item_type == ChecklistItemType.Subtitle
                or self.item_type == ChecklistItemType.PlainText):
            return f"{{ type: {self.item_type}, content: '{self.content}'{justification}{blanks_below}{interaction_type} }},"
        if self.item_type == ChecklistItemType.Link:
            justification = f"  justification: {self.justification},\n" if self.justification != Justification.Left else ''
            blanks_below = f"  blanks_below: {self.blanks_below},\n" if self.blanks_below != 0 else ''
            return (f"{{\n"
                    f"  type: {self.item_type},\n"
                    f"  content: '{self.content}',\n"
                    f"{self.link_target}"       
                    f"{justification}"
                    f"{blanks_below}"
                    f"{interaction_type}"
                    f"}},")

    def __repr__(self):
        return self.__str__()


parser = argparse.ArgumentParser(description='Generate checklist items from a text file.')
parser.add_argument('-f', '--file', type=str, help='The file to read from.')
args = parser.parse_args()

with open(args.file, 'r') as file:
    data = json.load(file)


def str_sanitizer(string: str, keep_line_breaks: bool = True) -> str:
    if keep_line_breaks:
        return (" ".join((string.replace("\n", "\\n")
                                .replace(" \\n", "\\n")
                                .replace("\\n ", "\\n")).split()))
    return "\\n".join([" ".join(s.split()) for s in string.split('\n\n')])


for group in data['groups']:
    category = group['name']
    for checklist in group['checklists']:
        print(f"---- {category} - {checklist['name']} ----")
        for entry in checklist['entries']:
            entry_justification = Justification[str(entry['justification']).capitalize()] if 'justification' in entry else Justification.Left
            entry_blanks_below = entry['blanksBelow'] if 'blanksBelow' in entry else 0
            match entry['type']:
                case 'Challenge':
                    entry_response = f"'{str_sanitizer(entry['response'])}'" \
                        if 'response' in entry and entry['response'] != '' \
                        else 'null'
                    print(ChecklistItem(ChecklistItemType.Challenge,
                                        str_sanitizer(entry['text']),
                                        entry_response,
                                        blanks_below=entry_blanks_below,
                                        justification=entry_justification))
                case 'Subtitle':
                    print(ChecklistItem(ChecklistItemType.Subtitle,
                                        str_sanitizer(entry['text']),
                                        blanks_below=entry_blanks_below,
                                        justification=entry_justification))
                case 'Sub Step':
                    print(ChecklistItem(ChecklistItemType.PlainText,
                                        str_sanitizer(entry['text']),
                                        blanks_below=entry_blanks_below,
                                        justification=entry_justification))
                case 'Plain Text':
                    print(ChecklistItem(ChecklistItemType.PlainText,
                                        str_sanitizer(entry['text'], False),
                                        blanks_below=entry_blanks_below,
                                        justification=entry_justification))
                case 'WARNING':
                    print(ChecklistItem(ChecklistItemType.Warning,
                                        'WARNING',
                                        blanks_below=entry_blanks_below,
                                        justification=entry_justification,
                                        interaction_type=ChecklistItemInteractionType.NoScrollStop))
                case 'Warning Text':
                    print(ChecklistItem(ChecklistItemType.Warning,
                                        str_sanitizer(entry['text'], False),
                                        blanks_below=entry_blanks_below,
                                        justification=entry_justification))
                case 'CAUTION':
                    print(ChecklistItem(ChecklistItemType.Caution,
                                        'CAUTION',
                                        blanks_below=entry_blanks_below,
                                        justification=entry_justification,
                                        interaction_type=ChecklistItemInteractionType.NoScrollStop))
                case 'Caution Text':
                    print(ChecklistItem(ChecklistItemType.Caution,
                                        str_sanitizer(entry['text'], False),
                                        blanks_below=entry_blanks_below,
                                        justification=entry_justification))
                case 'NOTE':
                    print(ChecklistItem(ChecklistItemType.Note,
                                        'NOTE',
                                        blanks_below=entry_blanks_below,
                                        justification=entry_justification,
                                        interaction_type=ChecklistItemInteractionType.NoScrollStop))
                case 'Note Text':
                    print(ChecklistItem(ChecklistItemType.Note,
                                        str_sanitizer(entry['text'], False),
                                        blanks_below=entry_blanks_below,
                                        justification=entry_justification))
                case 'Link':
                    entry_link_target = LinkTarget(data["groups"][entry['linkedChecklist']['group']]['name'],
                                                   data["groups"][entry['linkedChecklist']['group']]['checklists'][entry['linkedChecklist']['checklist']]['name'])
                    print(ChecklistItem(ChecklistItemType.Link,
                                        str_sanitizer(entry['text']),
                                        link_target=entry_link_target,
                                        blanks_below=entry_blanks_below,
                                        justification=entry_justification))
                case 'Break':
                    print(ChecklistItem(ChecklistItemType.PlainText,
                                        str_sanitizer(entry['text']),
                                        blanks_below=entry_blanks_below,
                                        justification=Justification.Center,
                                        interaction_type=ChecklistItemInteractionType.NoScrollStop))
                case _:
                    quit(f"Unknown type: {entry['type']}")
        print()
