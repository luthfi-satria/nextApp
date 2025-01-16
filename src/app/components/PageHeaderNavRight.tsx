import Image from "next/image";

export default function PageHeaderNavRight(){
    return (
        <>
            <div className="order-1 ml-auto flex items-center md:order-2">
                <div className="mr-2 lg:mr-0 dropdown relative">
                    <button type="button" className="dropdown-toggle flex items-center rounded-full text-sm focus:bg-none focus:ring-0 dark:focus:ring-0 md:mr-0" aria-expanded="false" data-dropdown-toggle="userMenus">
                        <Image 
                            src="/assets/images/avatar/userDefault.png"
                            className="size-8 rounded-full"
                            alt="user photo"
                            width={32}
                            height={32}
                        />
                        <span className="ml-2 hidden text-left xl:block">
                            <span className="block font-medium text-gray-400">Username</span>
                            <span className="-mt-1 block text-sm font-medium text-gray-500">Rules</span>
                        </span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right z-50 my-1 list-none divide-y divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800 hidden" id="userMenus">
                        <div className="py-3 px-4">
                            <span className="block text-sm font-medium text-gray-900 dark:text-white">
                                Fullname
                            </span>
                        </div>
                        <ul className="py-1" aria-labelledby="userMenus">
                            <li>
                                <a href="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white">
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a href="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white">
                                    Sign Out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}