import { inputStyle } from "../../data/constants";

export const InputComponent = ({
    label='', 
    name='', 
    value='', 
    placeholder = '',
    onChangeEvent
}:Readonly<{
    label: string,
    name: string,
    value: any,
    placeholder: string,
    onChangeEvent: any
}>) => {
    return (
        <div className="py-2" key={`input${name}`}>
            <label className={inputStyle.label}>{label}</label>
            <input 
                type="text" 
                name={name} 
                className={inputStyle.text} 
                placeholder={placeholder}
                defaultValue={value}
                onChange={onChangeEvent}
            />
        </div>
    );
}

type SelectObject = {
    label: string,
    value: any,
}

export const SelectComponent = ({
    label='', 
    name='', 
    value='', 
    option=[],
    onChangeEvent,
}:Readonly<{
    label: string,
    name: string,
    value: any,
    option: Array<SelectObject> | [],
    onChangeEvent: any
}>) => {
    return (
        <div className="py-2" key={`input${name}`}>
            <label className={inputStyle.label}>{label}</label>
            <select name={name} className={inputStyle.text} defaultValue={value} onChange={onChangeEvent}>
                {option && option.map((items,key) => {
                    return (<option value={items.value} key={`${name}selection${key}`}>{items.label}</option>)
                })}
            </select>
        </div>
    );
}