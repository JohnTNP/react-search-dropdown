import { usePopper } from 'react-popper';
import { DropdownWindow } from './DropdownWindow';
import { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { CgSpinner } from 'react-icons/cg';
import { dataModel } from '../../data/mockData';
import { patternSearch } from '../../utils/patternSearch';
import { useDebounce } from '../../hooks/useDebounce';

type Props = {
    /** Input Label */
    label: string;
    /** Input Description */
    description?: string;
    /** Search Mode: Async or Sync */
    mode: 'async' | 'sync';
    /** Search on Focus */
    searchOnFocus?: boolean;
    /** Disabled input*/
    disabled?: boolean;
};

export function SearchBox(props: Props) {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [input, setInput] = useState<string>();
    const debounceValue: string = useDebounce(input, 500);

    // Searching
    const [isResultShown, setResultShown] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<dataModel[] | undefined>();

    // Popper
    const [referenceElement, setReferenceElement] =
        useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
        null,
    );
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-start',
    });
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Handle Click Event
    useEffect(() => {
        function handler(e: MouseEvent): void {
            if (dropdownRef.current == null) return;
            if (inputRef.current == null) return;
            const isNotClickedOnResult = !dropdownRef.current.contains(
                e.target as Node,
            );
            const isNotClickedOnSearhInput = !inputRef.current.contains(
                e.target as Node,
            );
            if (isNotClickedOnResult && isNotClickedOnSearhInput) {
                setResultShown(false);
            }
        }
        document.addEventListener('mousedown', handler);
    }, []);

    // Async Search
    if (props.mode == 'async') {
        // Enter Loading state when start typing.
        useEffect(() => {
            setLoading(true);
        }, [input]);
        useEffect(() => {
            if (input == undefined || input == '') {
                setResultShown(true);
                setLoading(false);
                return;
            }
            setResultShown(true);
            setSearchResult(patternSearch(input));
            setLoading(false);
        }, [debounceValue]);
    }

    // Sync Search
    if (props.mode == 'sync') {
        useEffect(() => {
            setSearchResult(patternSearch(input));
        }, [input]);
    }

    return (
        <div className="w-full flex-col gap-y-1 text-left font-sans text-sm">
            <label className="text-gray-500">{props.label}</label>
            <div ref={setReferenceElement} className="relative select-none">
                <div className="absolute left-2 top-2">
                    <IoIosSearch size={22} color="gray" />
                </div>
                <input
                    id="search-input"
                    name="search-input"
                    ref={inputRef}
                    className={`text-md h-10 w-full rounded-lg border-2 pl-8 outline-teal-500 transition-all ${
                        props.disabled ? 'cursor-not-allowed' : null
                    }`}
                    type="text"
                    placeholder={'Type to begin searching'}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    onFocus={(e) => {
                        if (props.searchOnFocus) {
                            setInput(e.target.value);
                            setResultShown(true);
                        }
                    }}
                    onBlur={(e) => {
                        if (isResultShown) {
                            e.currentTarget.focus();
                        }
                    }}
                    disabled={props.disabled}
                    spellCheck={false}
                />
                {isLoading && (
                    <div className="absolute right-2 top-2 animate-spin">
                        <CgSpinner size={22} color="gray" />
                    </div>
                )}
            </div>
            <label className="text-gray-500">{props.description}</label>
            <div ref={dropdownRef}>
                <div
                    ref={setPopperElement}
                    style={{
                        zIndex: 100,
                        marginTop: 1,
                        width: `${inputRef.current?.clientWidth}px`,
                        ...styles.popper,
                    }}
                    {...attributes.popper}
                >
                    <DropdownWindow
                        mode={props.mode}
                        searchResult={searchResult}
                        isResultShown={isResultShown}
                    />
                </div>
            </div>
        </div>
    );
}
