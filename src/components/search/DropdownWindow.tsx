import { useEffect, useState } from "react"
import { dataModel } from "../../data/mockData"
import { CustomResultDisplay } from "./CustomResultDisplay"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
    /** */
    isResultShown: boolean
    mode: 'sync' | 'async'
    /** Set loading state for async search */
    searchResult: dataModel[] | undefined
}


export function DropdownWindow(props: Props) {
    const [searchResult, setSearchResult] = useState<typeof props.searchResult>(props.searchResult)

    useEffect(() => {
        setSearchResult(props.searchResult)
    }, [props.searchResult])

    function defaultResultDisplay(name: string) {
        return (
            <div key={name}
                className="flex w-full justify-between cursor-pointer pl-2.5 hover:bg-blue-100 py-2"
                onClick={() => { document.getElementById(name)?.click() }}>
                <p className="text-left text-wrap w-48">{name}</p>
                <input id={name}  onClick={(e) => {e.currentTarget.click()}}  className="select-none text-right mr-4 cursor-pointer w-4 top-1/2" type="checkbox" />
            </div>)
    }

    return (
        <AnimatePresence>
            {props.isResultShown &&
                <motion.div
                    initial={{ opacity: 0, display: 'none' }}
                    animate={{ opacity: 1, display: 'block' }}
                    exit={{ opacity: 0, display: 'none' }}
                >
                    <div className='bg-white w-full text-wrap shadow-md max-h-60 overflow-y-scroll [&>*:nth-child(odd)]:bg-gray-50'>
                        {searchResult?.map((result) =>
                            <div key={result.name}>
                                {props.mode == 'async' ?
                                    <CustomResultDisplay name={result.name} emoji={result.emoji} code={result.code} />
                                    : defaultResultDisplay(result.name)
                                }
                            </div>
                        )}
                        {(searchResult?.length == 0) &&
                            <div
                                className="flex w-full pl-2.5 py-2">
                                <p className="text-left text-gray-500 text-wrap w-48">No results were found</p>
                            </div>
                        }
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}