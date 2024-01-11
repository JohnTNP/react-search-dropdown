import { getMockData, dataModel } from '../data/mockData';

export function patternSearch(
    pattern: string | undefined,
    searchKey: keyof dataModel = 'name',
): dataModel[] {
    const data = getMockData();
    if (pattern) {
        const filteredData = data.filter((obj) => {
            return obj[searchKey].toUpperCase().includes(pattern.toUpperCase());
        });
        return filteredData;
    }
    return data;
}
