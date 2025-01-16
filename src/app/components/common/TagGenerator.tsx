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

export {
    DivElements,
    UlElements,
    LiElements,
    BtnElements,
}