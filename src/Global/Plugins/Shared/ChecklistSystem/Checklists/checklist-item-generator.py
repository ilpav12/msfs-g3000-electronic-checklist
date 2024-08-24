import argparse
import json
import re
from enum import StrEnum


class ChecklistItemType(StrEnum):
    Challenge = 'ChecklistItemType.Challenge',
    Text = 'ChecklistItemType.Text',
    Link = 'ChecklistItemType.Link',


class Justification(StrEnum):
    left = 'Justification.Left',
    indent1 = 'Justification.Indent1',
    indent2 = 'Justification.Indent2',
    indent3 = 'Justification.Indent3',
    indent4 = 'Justification.Indent4',
    center = 'Justification.Center',
    right = 'Justification.Right',


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
                f"    checklistName: {aircraft}{category_sanitizer(self.category_name)}ChecklistNames.{category_sanitizer(self.checklist_name)},\n"
                f"    checklistCategory: {aircraft}ChecklistCategory.{category_sanitizer(self.category_name)},\n"
                f"  }},\n")

    def __repr__(self):
        return self.__str__()


class ChecklistItem:
    def __init__(self,
                 item_type: ChecklistItemType,
                 content: str,
                 color: str,
                 font_size: int,
                 response: str | None = None,
                 link_target: LinkTarget | None = None,
                 blanks_below: int = 0,
                 justification: Justification | None = None,
                 interaction_type: ChecklistItemInteractionType | None = None):
        self.item_type = item_type
        self.content = content
        self.color = color
        self.font_size = font_size
        self.response = response
        self.link_target = link_target
        self.blanks_below = blanks_below
        self.justification = justification
        self.interaction_type = interaction_type

    def __str__(self):
        result =  f'{{\n'
        result += f'  type: {self.item_type},\n'
        result += f'  content: "{self.content}",\n'
        result += f'  color: "{self.color}",\n'
        result += f'  fontSize: {self.font_size},\n'
        result += f'  response: "{self.response}",\n' if self.response else ''
        result += f'{self.link_target}' if self.link_target else ''
        result += f'  blanksBelow: {self.blanks_below},\n' if self.blanks_below > 0 else ''
        result += f'  justification: {self.justification},\n' if self.justification != Justification.left else ''
        result += f'  interactionType: {self.interaction_type},\n' if self.interaction_type else ''
        result += f'}},'
        return result

    def __repr__(self):
        return self.__str__()


def category_sanitizer(string: str) -> str:
    return re.sub(r'\W+', '', string.title())


parser = argparse.ArgumentParser(description='Generate checklist items from a text file.')
parser.add_argument('-f', '--file', type=str, help='The file to read from.')
args = parser.parse_args()
aircraft = args.file.split('/')[-1].split('.')[0]

if args.file.endswith('.txt'):
    with open(args.file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    lines = [x for x in lines if not x.startswith('>>')]

    checklist_items: list[ChecklistItem] = []

    i = 0
    category = None
    while i < len(lines):
        if lines[i].startswith('# '):
            category = lines[i].strip()
            print("return [")
            i += 1
            continue

        if lines[i].startswith('## '):
            print(f"new {aircraft}Checklist({aircraft}{category_sanitizer(category)}ChecklistNames.{category_sanitizer(lines[i].strip())}, {aircraft}ChecklistCategory.{category_sanitizer(category)}, [")
            i += 1
            continue

        if lines[i].strip() == 'End of procedure.':
            print("]),")
            i += 1
            continue

        if lines[i].strip() == '▲ WARNING ▲':
            content = '< WARNING >'
            i += 1
            while lines[i].strip() != '▲':
                content += f"<br>{lines[i].strip()}"
                i += 1

            print(ChecklistItem(item_type=ChecklistItemType.Text,
                                content=content,
                                color='red',
                                font_size=15,
                                justification=Justification.center))

            i += 1
            continue

        if lines[i].strip() == '▲ CAUTION ▲':
            content = '< CAUTION >'
            i += 1
            while lines[i].strip() != '▲':
                content += f"<br>{lines[i].strip()}"
                i += 1

            print(ChecklistItem(item_type=ChecklistItemType.Text,
                                content=content,
                                color='yellow',
                                font_size=15,
                                justification=Justification.center))
            i += 1
            continue

        if lines[i].strip() == '● NOTE ●':
            content = '< NOTE >'
            i += 1
            while lines[i].strip() != '●':
                content += f"<br>{lines[i].strip()}"
                i += 1

            print(ChecklistItem(item_type=ChecklistItemType.Text,
                                content=content,
                                color='white',
                                font_size=15,
                                justification=Justification.center))
            i += 1
            continue

        level = (len(lines[i]) - len(lines[i].lstrip())) // 4
        if level > 0:
            justification = Justification[f"indent{level}"]
        else:
            justification = Justification.left

        if lines[i].strip().startswith('_'):
            print(ChecklistItem(item_type=ChecklistItemType.Text,
                                content=lines[i].strip().replace('_', ''),
                                color='white',
                                font_size=18))
            i += 1
            continue

        if ' .' in lines[i]:
            item_type = ChecklistItemType.Challenge

            content = [x.strip() for x in lines[i].split(' - ')[1].split(' .') if x]
            response = content[1] if len(content) > 1 else 'null'

            print(ChecklistItem(item_type=item_type,
                                content=content[0],
                                color='white',
                                font_size=15,
                                response=response,
                                justification=justification))
            i += 1
            continue

        print(ChecklistItem(item_type=ChecklistItemType.Text,
                            content=lines[i].strip(),
                            color='white',
                            font_size=15,
                            justification=justification,
                            interaction_type=ChecklistItemInteractionType.NoScrollStop))
        i += 1

elif args.file.endswith('.json'):
    with open(args.file, 'r') as file:
        data = json.load(file)


    def str_sanitizer(string: str) -> str:
        return string.replace('\n', '<br>').replace('"', '\\"')


    checklist_categories = []
    for group in data['groups']:
        checklist_categories.append(group['name'])
        category = group['name']
        checklist_names = []
        print("---------------------------------- " + category + " ----------------------------------")
        print("return [")
        for checklist in group['checklists']:
            checklist_names.append(checklist['name'])
            print(f"new {aircraft}Checklist({aircraft}{category_sanitizer(category)}ChecklistNames.{category_sanitizer(checklist['name'])}, {aircraft}ChecklistCategory.{category_sanitizer(category)}, [")
            for entry in checklist['entries']:
                entry_type = next((entry_type for entry_type in data['entryTypes'] if entry_type['name'] == entry['type']), None)
                print(ChecklistItem(item_type=ChecklistItemType.Challenge if entry_type['interaction'] == 'checkbox' else ChecklistItemType.Link if entry_type['interaction'] == 'link' else ChecklistItemType.Text,
                                    content=str_sanitizer(entry['text']),
                                    color=entry_type['color'],
                                    font_size=entry_type['fontSize'],
                                    response=str_sanitizer(entry['response']) if 'response' in entry else None,
                                    link_target=LinkTarget(data['groups'][entry['linkedChecklist']['group']]['name'],
                                                           data['groups'][entry['linkedChecklist']['group']]['checklists'][entry['linkedChecklist']['checklist']]['name']) if 'linkedChecklist' in entry else None,
                                    blanks_below=entry['blanksBelow'] if 'blanksBelow' in entry else 0,
                                    justification=Justification[entry['justification']] if 'justification' in entry else Justification.left,
                                    interaction_type=ChecklistItemInteractionType.NoScrollStop if entry_type['interaction'] == 'noScrollStop' else None))
            print("])," if checklist['name'] != group['checklists'][-1]['name'] else "], true),")
        print("]")
        print(f'export enum {aircraft}{category_sanitizer(category)}ChecklistNames {{')
        for checklist_name in checklist_names:
            print(f"  {category_sanitizer(checklist_name)} = '{checklist_name}',")
        print("}")

    print(f"export enum {aircraft}ChecklistCategory {{")
    for category in checklist_categories:
        print(f"  {category_sanitizer(category)} = '{category}',")
    print("}")
