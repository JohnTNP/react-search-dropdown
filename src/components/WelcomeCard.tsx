import { SearchBox } from './search/SearchBox';

export function WelcomeCard() {
    return (
        <div className="flex flex-col gap-y-5 rounded-md bg-white px-6 py-6 shadow-md shadow-gray-200">
            <SearchBox
                label="Async Search"
                description="With description and custom results display"
                mode="async"
            />
            <SearchBox
                label="Sync Search"
                description="With default display and search on focus"
                mode="sync"
                searchOnFocus
            />
            <SearchBox label="Disabled Async Search" mode="async" disabled />
        </div>
    );
}
