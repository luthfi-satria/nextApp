import { FormEvent, MouseEvent } from "react";
import { buttonStyle, tableConfig } from "../../data/constants"
import { AddUser } from "../../data/schemas";
import UserForm from "./userForm";

const APIConf = {
    headers: {
        'Content-Type': 'application/json',        
    }
}

const filterObj = {
    page: '1',
    limit: tableConfig.defaultLimit,
    address:'',
    email:'',
    name:'',
    phone:'',
}

const addUserConst:AddUser = {
    email: '',
    name: '',
    address: '',
    gender: 'Male',
    phone: '',
}

const cardList:Array<Cards> = [];

const ApiRes:APIdataResponse = {
    limit: parseInt(filterObj.limit),
    page: parseInt(filterObj.page),
    totalPage:0,
    total: 0,
    totalFiltered: 0,
    results: [],
}

const fieldFilter = () => {
    let Obj = Object.keys(filterObj);
    Obj = Obj.filter((items) => items !== 'address');
    return Obj;
}

const initTable = (
    isLoading:boolean, 
    params:any, 
    setParams:any, 
    setIsSearch:any, 
):tableProps => {
    return {
        props: {
            id: 'table-user'
        },
        head: ['email','username','phone','gender'],
        columnToHide:['image','address','id'],
        hasAction: true,
        isLoading: isLoading,
        filter: {
            enableFilter: true,
            filterObject: params,
            filterField: fieldFilter(),
            inputEvent: (e:any, isSearch:boolean) => {
                setParams({...params, [e.target.name]: e.target.value});
                if(isSearch){
                    setIsSearch(true);
                }
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
    }
};

const generateAction = (data: any, rowIndex: number) => {
    return (
        <td className="px-6 py-3" key={`rowAction${rowIndex}`}>
            <button type="button" className={`mr-1 ${buttonStyle.blue}`}>Update</button>
            <button type="button" className={`mr-1 ${buttonStyle.red}`}>Remove</button>
        </td>
    );
}

const buildModalContent = () => {
    return <UserForm/>
}

const buildModalFooter = (closeModal:any) => {
    return (
        <>
            <button type="submit" form="formUser" className={buttonStyle.teal}>Submit</button>
            <button className={buttonStyle.red} onClick={closeModal}>Close</button>
        </>
    );
}

const UserCall = async(params:any,setApiResponse:any,setIsLoading:any) => {
    const response = await fetch('/api/users/lists?'+new URLSearchParams(params),{
        headers: APIConf.headers,
        method: 'GET',
    }).then((result) => {
        return result.json();
    }).catch((e) => {
        console.log('ERROR ', e);
    });
    setApiResponse(response?.data);
    setIsLoading(false);
    return response?.data;
}

export{
    addUserConst,
    filterObj,
    ApiRes,
    initTable,
    buttonStyle,
    generateAction,
    buildModalContent,
    buildModalFooter,
    UserCall,
}