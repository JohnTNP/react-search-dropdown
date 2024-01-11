import { useEffect, useState } from 'react';
import { dataModel } from '../../data/mockData';
import { CustomResultDisplay } from './CustomResultDisplay';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
    /** */
    isResultShown: boolean;
    mode: 'sync' | 'async';
    /** Set loading state for async search */
    searchResult: dataModel[] | undefined;
};

export function DropdownWindow(props: Props) {
    const [searchResult, setSearchResult] = useState<typeof props.searchResult>(
        props.searchResult,
    );

    useEffect(() => {
        setSearchResult(props.searchResult);
    }, [props.searchResult]);

    function defaultResultDisplay(name: string) {
        return (
            <div
                key={name}
                className="flex w-full cursor-pointer justify-between py-2 pl-2.5 hover:bg-blue-100"
                onClick={() => {
                    document.getElementById(name)?.click();
                }}
            >
                <p className="w-48 text-wrap text-left">{name}</p>
                <input
                    id={name}
                    onClick={(e) => {
                        e.currentTarget.click();
                    }}
                    className="top-1/2 mr-4 w-4 cursor-pointer select-none text-right"
                    type="checkbox"
                />
            </div>
        );
    }

    return (
        <AnimatePresence>
            {props.isResultShown && (
                <motion.div
                    initial={{ opacity: 0, display: 'none' }}
                    animate={{ opacity: 1, display: 'block' }}
                    exit={{ opacity: 0, display: 'none' }}
                >
                    <div className="max-h-60 w-full overflow-y-scroll text-wrap bg-white shadow-md [&>*:nth-child(odd)]:bg-gray-50">
                        {searchResult?.map((result) => (
                            <div key={result.name}>
                                {props.mode == 'async' ? (
                                    <CustomResultDisplay
                                        name={result.name}
                                        emoji={result.emoji}
                                        code={result.code}
                                    />
                                ) : (
                                    defaultResultDisplay(result.name)
                                )}
                            </div>
                        ))}
                        {searchResult?.length == 0 && (
                            <div className="flex w-full py-2 pl-2.5">
                                <p className="w-48 text-wrap text-left text-gray-500">
                                    No results were found
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
