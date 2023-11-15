"use client"

import { useState } from "react"
import { Option, sortByType } from "./types/option"
import { useQuery } from "@tanstack/react-query"
import fetchFiles from "./services/fetchFiles"

const options: Option[] = [
  {
    value: "created_at",
    name: "Sort by Created At",
    selected: true
  },
  {
    value: "file_name_asc",
    name: "Sort by File Name Ascending",
    selected: false
  },
  {
    value: "file_name_desc",
    name: "Sort by File Name Descending",
    selected: false
  }
]

export default function Home() {
  const [selected, setSelected] = useState(options[0].value)

  const { status, data } = useQuery({ queryKey: ['files', { sortBy: selected }], queryFn: fetchFiles, staleTime: Infinity })

  if (status === "pending") return (<div>loading...</div>)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <select value={selected} onChange={(e) => setSelected(e.target.value as sortByType)} className="p-4 text-black rounded-xl">
        {options.map((option) => (
          <option key={option.value} value={option.value} selected={option.selected}>{option.name}</option>
        ))}
      </select>

      <div className="grid grid-cols-2 items-center justify-center gap-4 mt-10 w-1/2">
        {data?.data.map((file, index) => (
          <div key={index} className="flex flex-col items-center justify-center border-cyan-300 border-2 bg-violet-700 rounded-xl p-4">
            <h1 className="text-white">{file.fileName}</h1>
            <p className="text-white">{file.createdAt}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
