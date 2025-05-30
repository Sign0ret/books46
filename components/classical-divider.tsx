interface ClassicalDividerProps {
  text: string
}

export function ClassicalDivider({ text }: ClassicalDividerProps) {
  return (
    <div className="divider">
      <div className="divider-text font-serif">{text}</div>
    </div>
  )
}
