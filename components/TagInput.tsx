"use client"
import { useState, KeyboardEvent } from "react"
import { X } from "lucide-react"

type Props = {
  value: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

export default function TagInput({ value, onChange, placeholder }: Props) {
  const [input, setInput] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const trimmed = input.trim().replace(/,$/, "")
      if (trimmed && !value.includes(trimmed)) {
        onChange([...value, trimmed])
      }
      setInput("")
    } else if (e.key === "Backspace" && input === "") {
      onChange(value.slice(0, -1))
    }
  }

  const remove = (item: string) => {
    onChange(value.filter(v => v !== item))
  }

  return (
    <div className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-3 py-2 flex flex-wrap gap-2 focus-within:border-primary transition">
      {value.map((item, i) => (
        <span key={i} className="flex items-center gap-1 text-xs bg-primary/20 text-primary border border-primary/30 rounded-full px-3 py-1">
          {item}
          <button type="button" onClick={() => remove(item)} className="hover:text-white transition">
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        className="flex-1 min-w-24 bg-transparent outline-none text-gray-200 text-sm py-1"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
      />
    </div>
  )
}