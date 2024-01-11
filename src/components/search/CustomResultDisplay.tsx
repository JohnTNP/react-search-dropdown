type Props = {
    name: string;
    emoji: string;
    code: string;
};

export function CustomResultDisplay(props: Props): React.ReactElement {
    return (
        <div
            className="flex w-full cursor-pointer flex-col py-2 pl-2.5 hover:bg-teal-100"
            onClick={() => {
                document.getElementById(props.name)?.click();
            }}
        >
            <div className="flex w-full flex-row justify-between">
                <section>
                    <p className="float-left w-48">
                        {props.emoji} {props.name}
                    </p>
                    <p className="text-gray-500">Country: {props.code}</p>
                </section>
                <input
                    id={props.name}
                    onClick={(e) => {
                        e.currentTarget.click();
                    }}
                    className="top-1/2 float-right mr-4 w-4 cursor-pointer"
                    type="checkbox"
                />
            </div>
        </div>
    );
}
