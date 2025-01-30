'use client'
import { useEffect, useRef, useState } from "react";
import { buttonStyle, inputStyle, tableConfig } from "../../data/constants";

export default function TableFilterComponent({
    filterProps,
}: Readonly<{
    filterProps: FilterProps
}>){
    const toggleFilter = useRef(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropDownOptions:Array<number> = [5,10,50,100];

    const buildDropDownOptions = () => {
        const selector = [];
        for(const items of dropDownOptions){
            selector.push(<option key={`selector-${items}`} value={items}>{items}</option>)
        }
        return selector;
    }

    const buildSearchForm = () => {
        const search:any = [];
        const excludeForm:Array<string> = ['page','limit'];
        if(filterProps.enableFilter){
            const fields = filterProps.filterField;
            fields?.forEach((items) => {
                // console.log({
                //     obj: filterProps.filterObject,
                //     items: items,
                // });
                if(!excludeForm.includes(items)){
                    const defaultValue = (filterProps.filterObject && (items in filterProps.filterObject)) ? filterProps.filterObject[items] : '';
                    search.push(
                        <div className="py-2 px-5" key={`searchForm_${items}`}>
                            <label className={inputStyle.label}>{items}</label>
                            <input 
                                type="text" 
                                name={items} 
                                className={inputStyle.text} 
                                placeholder={`Search ${items}`}
                                value={defaultValue}
                                onChange={filterProps.inputEvent}
                            />
                        </div>
                    );
                }
            })
        }
        return search;
    }

    const closeFilterForm = (event:any) => {
        if(toggleFilter.current && !toggleFilter.current.contains(event.target)){
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeFilterForm);
        return () => {
            document.removeEventListener('mousedown', closeFilterForm);
        }
    },[toggleFilter]);
    return (
        <div className="pt-2 px-3">
            <div className="float-left">
                <label>
                    <select 
                    name="limit"
                    className="dataTable-selector rounded-md mr-1 border-[1px] border-solid border-gray-200 p-[6px] outline-none focus:border-gray-400" 
                    defaultValue={tableConfig.defaultLimit} 
                    onChange={(e) => filterProps.inputEvent(e, true)}
                    >
                        {buildDropDownOptions()}
                    </select>
                    Entries
                </label>
            </div>
            <div className="float-right relative">
                <button onClick={()=>setIsOpen(true)} className={buttonStyle.teal}>
                    <i className="fa fa-magnifying-glass mr-2"></i>
                    Filter
                </button>
                {isOpen ? (
                    <div className="absolute top-0 right-0 shadow-sm shadow-slate-500 bg-white rounded-sm min-w-80 z-[2]" ref={toggleFilter}>
                        <h2 className="font-medium border-b-[1px] border-b-slate-300 w-full p-3">Search</h2>
                        {buildSearchForm()}
                        <div className="py-2 px-3">
                            <div className="text-right">
                                <button type="reset" className={buttonStyle.red} onClick={filterProps.resetEvent}>Reset</button>
                                <button type="button" className={buttonStyle.green} onClick={filterProps.filterEvent}>Search</button>
                            </div>
                        </div>
                    </div>
                ) : ''}
            </div>
            <div className="clear-both"></div>
        </div>
    );
}