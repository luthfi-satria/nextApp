'use client';
import { useEffect, useRef, useState } from "react";
import { mainMenus } from "../data/constants";

export default function PageHeaderNav(){
    const [activeMenu, setActiveMenu] = useState<string>('');
    const OpenMenu = (index:string) => {
        setActiveMenu(index);
    }
    const menuRef = useRef(null);
    const handleClickOutside = (event:any) => {
        if(menuRef.current && !menuRef.current.contains(event.target)){
            setActiveMenu('');
        }
    };
    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [activeMenu]);
return (
        <div className="order-2 w-full items-center justify-between md:order-1 md:ml-5 md:flex md:w-auto active hidden">
            <ul className="font-body mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:text-sm md:font-medium space-x-0 md:space-x-4 lg:space-x-6 xl:space-x-8 navbar text-white relative">
                {
                        mainMenus?.map((items, index) => {
                        return (
                            <li className="dropdown hover:text-slate-200 relative px-2" key={`Menukey-${index}`}>
                                <button className="dropdown-toggle flex w-full items-center border-b border-gray-800 py-2 px-3 font-medium md:border-0 md:p-0" onClick={() => OpenMenu(`toggleMenuNav${index}`)} ref={menuRef} aria-description={`toggleMenuNav${index}`}>
                                    <i className={`fa ${items?.icon} mr-2`}></i>
                                    {items?.title}
                                    {(items?.children?.length > 0 ? (
                                        <i className={`fa ${activeMenu == `toggleMenuNav${index}` ? 'fa-caret-down' : 'fa-caret-right'} ml-2 text-xs`}></i>
                                    ) : '' )}
                                </button>
                                {
                                    (items?.children?.length > 0) ? (
                                        <div className={`dropdown-menu absolute top-6 left-4 text-slate-800 text-sm z-10 my-1 w-full list-none divide-y divide-gray-100 rounded bg-gray-800 md:bg-white shadow border border-slate-700 md:border-white dark:border-slate-700/50 dark:divide-gray-600 dark:bg-gray-900 md:w-44 ${activeMenu == `toggleMenuNav${index}` ? 'show' : 'hidden'}`}
                                        aria-description={`toggleMenuNav${index}`}>
                                            <ul className="py-1 active">
                                            {
                                                items?.children?.map((child, childKey) => {
                                                    return (
                                                            <li className="list hover:bg-slate-200 p-2" key={`child-${childKey}`}>
                                                                <a href={child?.url} className="block w-full">
                                                                    {child?.title}
                                                                </a>
                                                            </li>
                                                    )
                                                })
                                            }
                                            </ul>
                                        </div>        
                                    ) : ''
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}