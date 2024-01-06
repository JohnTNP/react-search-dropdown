type Props = {
    name: string
    emoji: string
    code: string
}

export function CustomResultDisplay(props: Props): React.ReactElement {
    return (
        <div className="flex flex-col w-full cursor-pointer pl-2.5 hover:bg-teal-100 py-2"
            onClick={() => {document.getElementById(props.name)?.click()}} >
            <div className="flex w-full justify-between flex-row">
                <section>
                <p className="float-left w-48">{props.emoji} {props.name}</p>
                <p className="text-gray-500">Country: {props.code}</p>
                </section>
                <input id={props.name} onClick={(e) => {e.currentTarget.click()}} className="float-right w-4 mr-4 top-1/2 cursor-pointer" type="checkbox" />
            </div>
        </div>)
}