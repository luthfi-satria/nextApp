const DivElements = ({children,divProp}: Readonly<{
    children: React.ReactNode;
    divProp: {[key:string]:any};
}>) => {
    return (
        <>
            <div {...divProp}>
                {children}
            </div>
        </>
    );
}

const UlElements = ({children,props}: Readonly<{
    children: React.ReactNode;
    props: {[key:string]:any};
}>) => {
    return (<><ul {...props}>{children}</ul></>);
}

const LiElements = ({children,props}: Readonly<{
    children: React.ReactNode;
    props: {[key:string]:any};
}>) => {
    return (<><li {...props} key={props?.key}>{children}</li></>);
}

const BtnElements = ({children,props}: Readonly<{
    children: React.ReactNode;
    props: {[key:string]:any};
}>) => {
    return (<><button {...props}>{children}</button></>);
}

const AlertElements = ({title, message}:Readonly<{
    title: string,
    message: string,
}>) => {
    return (
        <div className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <div className="alert-body w-4/5">
                <div className="font-bold mr-2">{title}</div>
                {message}
            </div>
            <div className="relative text-right w-1/5 h-auto">
                <button type="button" className="" data-dismiss-target="#alert-1" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export {
    DivElements,
    UlElements,
    LiElements,
    BtnElements,
    AlertElements,
}