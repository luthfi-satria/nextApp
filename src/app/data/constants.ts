const mainMenus = [
    {
        title: 'Homepage',
        icon: 'fa-home',
        props: {important:true},
        url: '/',
        children: [],
    },
    {
        title: 'Masters',
        icon: 'fa-database',
        props: {important:true},
        url: '/masters',
        children: [
            {
                title: 'Users',
                icon: 'fa-user-alt',
                props: {important:false},
                url: '/masters/users',
            },
            {
                title: 'Language',
                icon: 'fa-flag',
                props: {important:false},
                url: '/masters/language',
            },
        ],
    },
    {
        title: 'Hotels',
        icon: 'fa-building',
        props: {important:true},
        url: '/hotels',
        children: [
            {
                title: 'Booking',
                icon: 'fa-building',
                props: {important:false},
                url: '/hotels/booking',
            },
            {
                title: 'Special deals',
                icon: 'fa-plane',
                props: {important:false},
                url: '/hotels/special-deals',
            },            
        ],
    },
];

const tableConfig = {
    defaultLimit: '10',
};

const tableStyle = {
    table: 'w-full text-sm text-left text-gray-500 dark:text-gray-400 dataTable-table h-auto',
    header: 'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400',
    rowHeader: 'border-none align-bottom text-left px-6 py-3',
    body: 'min-h-[200px]',
    rowBody: 'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700/50',
}

const buttonStyle = {
    blue: "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-3 py-1 text-center mr-2 mb-2",
    green: "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded text-sm px-3 py-1 text-center mr-2 mb-2",
    cyan: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded text-sm px-3 py-1 text-center mr-2 mb-2",
    teal: "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded text-sm px-3 py-1 text-center mr-2 mb-2",
    red: "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded text-sm px-3 py-1 text-center mr-2 mb-2" 
}

const inputStyle = {
    label: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize',
    text: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400 outline-none",
}

export{
    mainMenus,
    buttonStyle,
    tableConfig,
    tableStyle,
    inputStyle,
}