import { expect, test } from 'vitest';
import { patternSearch } from '../patternSearch';

test('Search with euro for EUR', () => {
    const result = patternSearch('euro');
    expect(result).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: 'Euro' })]),
    );
});

test('Search with sin for SDG', () => {
    const result = patternSearch('sin');
    expect(result).toEqual(
        expect.arrayContaining([expect.objectContaining({ code: 'SGD' })]),
    );
});

test('Search with dollar for * Dollar', () => {
    const result = patternSearch('dollar');
    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ code: 'USD' }),
            expect.objectContaining({ code: 'SGD' }),
            expect.objectContaining({ code: 'AUD' }),
            expect.objectContaining({ code: 'HKD' }),
            expect.objectContaining({ code: 'NZD' }),
        ]),
    );
});
