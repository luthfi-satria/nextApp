'use client'
import { useEffect, useState } from "react";
import CardsComponent from "../../components/cards/CardsComponent";
import TableComponent from "../../components/table/TableComponent";
import { buttonStyle, tableConfig } from "../../data/constants";

const APIConf = {
    headers: {
        'Content-Type': 'application/json',        
    }
}

export default function MasterUsers(){
    const filterObj = {
        page: '1',
        limit: tableConfig.defaultLimit,
        address:'',
        email:'',
        name:'',
        phone:'',
    }
    const [filter, setFilter] = useState(filterObj);
    const [isSearch, setIsSearch] = useState(true);

    const [userData, setUserData] = useState<APIdataResponse>();

    const cardList = [
        {title: 'card1 Title', counter:540},
        {title: 'card2 Title', counter:1000},
        {title: 'card3 Title', counter:20},
        {title: 'card4 Title', counter:878},
    ];

    const UserCall = async():Promise<APIdataResponse> => {
        const response = await fetch('/api/users/lists?'+new URLSearchParams(filter),{
            headers: APIConf.headers,
            method: 'GET',
        }).then((response) => {
            return response.json();
        }).catch((e) => {
            console.log('ERROR ', e);
        });
        const data = response;
        setUserData(data?.data);        
        return data?.data;
    }

    useEffect(() => {
        if(filter && isSearch){
            UserCall();
        }
        setIsSearch(false);
    }, [filter, isSearch]);

    const searchChangeEvent = (e:any) => {
        setFilter({...filter, [e.target.name]: e.target.value});
        return e;
    }
    const searchEvent = (e:any) => {
        setIsSearch(true);
    }

    const resetSearch = () => {
        setFilter({...filter, ...filterObj});
        setIsSearch(true);
    }

    const fieldFilter = () => {
        let Obj = Object.keys(filter);
        Obj = Obj.filter((items) => items !== 'address');
        return Obj;
    }

    const table:tableProps = {
        props: {
            id: 'table-user'
        },
        data: userData,
        columnToHide:['image','address','id'],
        hasAction: true,
        filter: {
            enableFilter: true,
            filterObject: filter,
            filterField: fieldFilter(),
            inputEvent: searchChangeEvent,
            filterEvent: searchEvent,
            resetEvent: resetSearch,
        }
    }

    const generateAction = (data: any, rowIndex: number) => {
        return (
            <td className="px-6 py-3" key={`rowAction${rowIndex}`}>
                <button type="button" className={`mr-1 ${buttonStyle.blue}`}>View</button>
                <button type="button" className={`mr-1 ${buttonStyle.green}`}>Edit</button>
            </td>
        );
    }

    return (
        <div id="main-container">
            <CardsComponent cardsData={cardList}/>
            <TableComponent title="User Table" tableProps={table} generateAction={generateAction}/>
        </div>
    );
}