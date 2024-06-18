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


class ChecklistItem:
    def __init__(self,
                 item_type: ChecklistItemType,
                 content: str,
                 response: str | None = None,
                 link_target: str | None = None,
                 blanks_below: int = 0,
                 justification: Justification = Justification.Left):
        self.item_type = item_type
        self.content = content
        self.response = response
        self.link_target = link_target
        self.blanks_below = blanks_below
        self.justification = justification

    def __str__(self):
        justification = f", justification: {self.justification}" if self.justification != Justification.Left else ''
        if self.item_type == ChecklistItemType.Challenge:
            return f"{{ type: {self.item_type}, content: '{self.content}', response: {self.response}{justification} }},"
        if (self.item_type == ChecklistItemType.Warning 
                or self.item_type == ChecklistItemType.Caution 
                or self.item_type == ChecklistItemType.Note):
            return f"{{ type: {self.item_type}, content: '{self.content}'{justification} }},"
        if self.item_type == ChecklistItemType.Subtitle or self.item_type == ChecklistItemType.PlainText:
            return f"{{ type: {self.item_type}, content: '{self.content}'{justification} }},"

    def __repr__(self):
        return self.__str__()


with open('input.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

lines = [x for x in lines if not x.startswith('>>')]

checklist_items: list[ChecklistItem] = []

i = 0
while i < len(lines):
    if lines[i].strip() == '▲ WARNING ▲':
        item_type = ChecklistItemType.Warning
        content = ''
        i += 1
        first = True
        while lines[i].strip() != '▲':
            if first:
                content += f"WARNING: {lines[i].strip()}"
                first = False
            else:
                content += f" {lines[i].strip()}"
            i += 1

        checklist_items.append(ChecklistItem(item_type, content))
        i += 1
        continue

    if lines[i].strip() == '▲ CAUTION ▲':
        item_type = ChecklistItemType.Caution
        content = ''
        i += 1
        first = True
        while lines[i].strip() != '▲':
            if first:
                content += f"CAUTION: {lines[i].strip()}"
                first = False
            else:
                content += f" {lines[i].strip()}"
            i += 1

        checklist_items.append(ChecklistItem(item_type, content))
        i += 1
        continue

    if lines[i].strip() == '● NOTE ●':
        item_type = ChecklistItemType.Note
        content = ''
        i += 1
        first = True
        while lines[i].strip() != '●':
            if first:
                content += f"NOTE: {lines[i].strip()}"
                first = False
            else:
                content += f" {lines[i].strip()}"
            i += 1

        checklist_items.append(ChecklistItem(item_type, content))
        i += 1
        continue

    if ' .' in lines[i]:
        item_type = ChecklistItemType.Challenge
        level = (len(lines[i]) - len(lines[i].lstrip())) // 4
        if level > 0:
            justification = Justification[f"Indent{level}"]
        else:
            justification = Justification.Left

        content = lines[i].replace(' -', '.')
        if content.strip().startswith(' '):
            if (len(checklist_items)
                    and checklist_items[-1].item_type == ChecklistItemType.Challenge
                    and not checklist_items[-1].content[0].isdigit()):
                letter = chr(ord(checklist_items[i - 1].content[0]) + 1)
            else:
                letter = 'a'
            content = content.replace(' .', f"{letter}.", 1)
        content = content.split(' .')
        content = [x.strip() for x in content if x]

        for j in range(len(content)):
            last_space = 0
            line_len = 0
            for k in range(len(content[j])):
                if content[j][k] == '\\':
                    line_len = -1
                line_len += 1
                if content[j][k] == ' ':
                    last_space = k
                if line_len > 16:
                    content[j] = content[j][:last_space] + '\\n' + content[j][last_space + 1:]
                    line_len = k - last_space
                    last_space = k

        response = f"'{content[1]}'" if len(content) > 1 else 'null'

        checklist_items.append(ChecklistItem(item_type=item_type,
                                             content=content[0],
                                             response=response,
                                             justification=justification))
        i += 1
        continue

    level = (len(lines[i]) - len(lines[i].lstrip())) // 4
    if level > 0:
        justification = Justification[f"Indent{level}"]
    else:
        justification = Justification.Left
    checklist_items.append(ChecklistItem(ChecklistItemType.PlainText, lines[i].strip().replace(' :', ':'), justification=justification))
    i += 1

for i in range(len(checklist_items)):
    print(checklist_items[i])
