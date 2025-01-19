import { ChecklistItem, ChecklistSection } from "../types"

// 특정 ID를 가진 항목과 그 부모를 찾는 함수
export function findItemAndParent(
  sections: ChecklistSection[],
  targetId: string
): { item: ChecklistItem; parent?: ChecklistItem; section?: ChecklistSection } | null {
  for (const section of sections) {
    const result = findItemAndParentInItems(section.items, targetId)
    if (result) {
      return { ...result, section }
    }
  }
  return null
}

function findItemAndParentInItems(
  items: ChecklistItem[],
  targetId: string,
  parent?: ChecklistItem
): { item: ChecklistItem; parent?: ChecklistItem } | null {
  for (const item of items) {
    if (item.id === targetId) {
      return { item, parent }
    }
    if (item.items) {
      const result = findItemAndParentInItems(item.items, targetId, item)
      if (result) {
        return result
      }
    }
  }
  return null
}

// 모든 하위 항목의 ID를 가져오는 함수
export function getAllChildrenIds(item: ChecklistItem): string[] {
  const ids: string[] = []
  if (item.items) {
    for (const child of item.items) {
      ids.push(child.id)
      ids.push(...getAllChildrenIds(child))
    }
  }
  return ids
}

// 모든 형제 항목이 완료되었는지 확인하는 함수
export function areAllSiblingsCompleted(
  items: ChecklistItem[],
  completedItems: Set<string>
): boolean {
  return items.every(item => completedItems.has(item.id))
}