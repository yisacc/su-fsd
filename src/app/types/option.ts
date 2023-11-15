export type sortByType = "created_at" | "file_name_asc" | "file_name_desc"

export interface Option {
    value: sortByType,
    name: string,
    selected: boolean
}