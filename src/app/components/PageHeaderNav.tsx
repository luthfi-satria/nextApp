'use client';
import { useEffect, useRef, useState } from "react";
import { mainMenus } from "../data/constants";

export default function PageHeaderNav(){
    const menuRef = useRef<any>(null);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
    }}, []);
    
    const handleClick = (e:any) => {
        if (menuRef.current === null){
          menuRef.current = e.currentTarget;
          e.currentTarget.nextElementSibling.style.display = "block";
          e.currentTarget.lastChild.classList.remove('fa-caret-right')
          e.currentTarget.lastChild.classList.add('fa-caret-down');
        } else { 
          menuRef.current.nextElementSibling.style.display="none";
          menuRef.current.lastChild.classList.remove('fa-caret-down')
          menuRef.current.lastChild.classList.add('fa-caret-right');
          menuRef.current = null;
        }
    }
    const handleClickOutside = (e:any) => {
        if (menuRef.current != null &&
            !menuRef.current.contains(e.target) &&
            !menuRef.current.parentNode.contains(e.target))
        {
          menuRef.current.nextElementSibling.style.display = "none"; 
          menuRef.current.lastChild.classList.remove('fa-caret-down')
          menuRef.current.lastChild.classList.add('fa-caret-right');
          menuRef.current = null
        }
    }
    return (
        <div className="order-2 w-full items-center justify-between md:order-1 md:ml-5 md:flex md:w-auto active hidden">
            <ul className="font-body mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:text-sm md:font-medium space-x-0 md:space-x-4 lg:space-x-6 xl:space-x-8 navbar text-white relative">
                {
                        mainMenus?.map((items, index) => {
                        return (
                            <li 
                                id={`toggleMenuNav${index}`} 
                                className="dropdown hover:text-slate-200 relative px-2" 
                                key={`Menukey-${index}`}
                            >
                                <button 
                                    className="dropdown-toggle flex w-full items-center border-b border-gray-800 py-2 px-3 font-medium md:border-0 md:p-0" 
                                    onClick={(e) => handleClick(e)} 
                                    ref={menuRef} 
                                    aria-controls="navbar-multi-level" 
                                    aria-expanded="false"
                                >
                                    <i className={`fa ${items?.icon} mr-2`}></i>
                                    {items?.title}
                                    {(items?.children?.length > 0 ? (
                                        <i className={`fa fa-caret-right ml-2 text-xs`}></i>
                                    ) : '' )}
                                </button>
                                {items?.children?.length > 0 ? (
                                    <div className={`dropdown-menu absolute top-6 left-4 text-slate-800 text-sm z-10 my-1 w-full list-none divide-y divide-gray-100 rounded bg-gray-800 md:bg-white shadow border border-slate-700 md:border-white dark:border-slate-700/50 dark:divide-gray-600 dark:bg-gray-900 md:w-44 hidden`}>
                                        <ul className="py-1 active">
                                            {items?.children?.map((child, childKey) => {
                                                return (
                                                    <li className="list hover:bg-slate-200 p-2" key={`child-${childKey}`}>
                                                        <a href={child?.url} className="block w-full">
                                                            {child?.title}
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ) : ""}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}