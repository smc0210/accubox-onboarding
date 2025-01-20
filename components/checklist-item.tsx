import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ChecklistItem as ChecklistItemType } from "@/lib/types"

interface ChecklistItemProps {
  item: ChecklistItemType
  onToggle: (id: string, completed: boolean) => void
  indent?: number
  completedItems: Set<string>
}

export function ChecklistItem({
  item,
  onToggle,
  indent = 0,
  completedItems
}: ChecklistItemProps) {
  const { id, title, link, items } = item
  const isCompleted = completedItems.has(id)

  return (
    <div className="space-y-2">
      <div
        className="flex items-center space-x-2"
        style={{ marginLeft: `${indent * 1.5}rem` }}
      >
        <Checkbox
          id={id}
          checked={isCompleted}
          onCheckedChange={(checked) => onToggle(id, checked as boolean)}
        />
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {link ? (
            <Link
              href={link}
              className="text-blue-500 hover:underline"
              target={item.target || '_blank'}
              rel={item.rel || 'noopener noreferrer'}
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </label>
      </div>
      {items && items.length > 0 && (
        <div className="space-y-2">
          {items.map((subItem) => (
            <ChecklistItem
              key={subItem.id}
              item={subItem}
              onToggle={onToggle}
              indent={indent + 1}
              completedItems={completedItems}
            />
          ))}
        </div>
      )}
    </div>
  )
}