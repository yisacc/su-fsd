import { sortByType } from "@/app/types/option";
import path from "path";
import fs from "fs";
import { parse } from "csv-parse";
import { FileData } from "@/app/types/apiResponse";


const sortByCreatedAt = (files: FileData[]) => {
    return files.sort((currentFile, nextFile) =>
        currentFile.createdAt.localeCompare(nextFile.createdAt, undefined,
            {
                numeric: true,
            })
    )
}

const sortByFileNameAscending = (files: FileData[]) => {
    return files.sort((currentFile, nextFile) => {
        let currentFileName = currentFile.fileName.replace(/^0+/, '');
        let nextFileName = nextFile.fileName.replace(/^0+/, '');
        return currentFileName.localeCompare(nextFileName, undefined,
            {
                numeric: true,
            })
    }

    )
}

const sortByFileNameDescending = (files: FileData[]) => {
    return files.sort((currentFile, nextFile) => {
        let currentFileName = currentFile.fileName.replace(/^0+/, '');
        let nextFileName = nextFile.fileName.replace(/^0+/, '');
        return nextFileName.localeCompare(currentFileName, undefined,
            {
                numeric: true,
            })
    }
    )
}

const sorter = (files: FileData[], sortBy: sortByType) => {
    switch (sortBy) {
        case "created_at":
            return sortByCreatedAt(files);
        case "file_name_asc":
            return sortByFileNameAscending(files);
        case "file_name_desc":
            return sortByFileNameDescending(files);
        default:
            return files;
    }
}

export async function GET(
    req: Request,
    { params }: { params: { sortBy: sortByType } }
) {

    const { sortBy } = params;
    const csvData: any[] = [];
    const csvFilePath = path.join(process.cwd(), "public", "data.csv");
    try {
        const parsedData = fs.createReadStream(csvFilePath)
            .pipe(parse({
                delimiter: ';'
            }));

        for await (const record of parsedData) {
            csvData.push(record);
        }
        const files: FileData[] = csvData.map((file) => {
            return {
                createdAt: file[0],
                fileName: file[1]
            }
        }
        )
        const sortedFiles = sorter(files, sortBy);
        return Response.json({ data: sortedFiles, status: 200 })
    } catch (error) {
        return Response.json({ data: [], status: 500 })
    }

}