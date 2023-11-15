import { QueryFunction } from "@tanstack/react-query";
import { fileApiResponse } from "../types/apiResponse";
import { sortByType } from "../types/option";


const fetchFiles: QueryFunction<fileApiResponse, ["files", { sortBy: sortByType }]> = async ({ queryKey }) => {
    const [_, { sortBy }] = queryKey;
    const response = await fetch(`/api/files/${sortBy}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
}

export default fetchFiles; 