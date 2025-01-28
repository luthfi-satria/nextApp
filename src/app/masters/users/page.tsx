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
    const [params, setParams] = useState(filterObj);

    const cardList:Array<Cards> = [];
    const [cards, setCards] = useState<Array<Cards>>(cardList);

    const ApiRes:APIdataResponse = {
        limit: parseInt(params.limit),
        page: parseInt(params.page),
        totalPage:0,
        total: 0,
        totalFiltered: 0,
        results: [],
    }
    const [apiResponse, setApiResponse] = useState<APIdataResponse>(ApiRes);
    const [isSearch, setIsSearch] = useState(true);
    
    const fieldFilter = () => {
        let Obj = Object.keys(params);
        Obj = Obj.filter((items) => items !== 'address');
        return Obj;
    }

    const table:tableProps = {
        props: {
            id: 'table-user'
        },
        columnToHide:['image','address','id'],
        hasAction: true,
        filter: {
            enableFilter: true,
            filterObject: params,
            filterField: fieldFilter(),
            inputEvent: (e:any) => {
                setParams({...params, [e.target.name]: e.target.value});
                return e;
            },
            filterEvent: () => {
                setParams({...params, page: '1'});
                setIsSearch(true);
            },
            resetEvent: () => {
                setParams({...params, ...filterObj});
                setIsSearch(true);
            },
            paginationEvent: (page:number) => {
                setParams({...params, page: page.toString()});
                setIsSearch(true);
            },
        }
    };

    useEffect(() => {
        if(isSearch){
            UserCall();
        }
        setIsSearch(false);
    }, [isSearch]);

    const UserCall = async() => {
        const response = await fetch('/api/users/lists?'+new URLSearchParams(params),{
            headers: APIConf.headers,
            method: 'GET',
        }).then((result) => {
            return result.json();
        }).catch((e) => {
            console.log('ERROR ', e);
        });
        setApiResponse(response?.data);
        return response?.data;
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
            <CardsComponent cardsData={cards}/>
            <TableComponent 
                title="User Table" 
                tableProps={table} 
                data={apiResponse} 
                generateAction={generateAction}
            />
        </div>
    );
}