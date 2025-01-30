'use client'

import { createContext, useEffect, useState } from "react";
import { ApiRes, UserCall, addUserConst, buildModalContent, buildModalFooter, buttonStyle, filterObj, generateAction, initTable } from "./userState";
import CardsComponent from "../../components/cards/CardsComponent";
import TableComponent from "../../components/table/TableComponent";
import ModalComponent from "../../components/modal/ModalComponent";
import { AddUser } from "../../data/schemas";

export const UserContext = createContext<any>([]);
export default function MasterUsers(){
    const [params, setParams] = useState(filterObj);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalShow, setmodalShow] = useState<boolean>(false);
    const [cards, setCards] = useState<Array<Cards>>([]);
    const [apiResponse, setApiResponse] = useState<APIdataResponse>(ApiRes);
    const [isSearch, setIsSearch] = useState(true);
    const [addUser, setAddUser] = useState<AddUser>(addUserConst);
    
    useEffect(() => {
        if(isSearch){
            UserCall(params, setApiResponse, setIsLoading);
        }
        setIsSearch(false);
    }, [isSearch]);

    const generateAction = (data: any, rowIndex: number) => {
        return (
            <td className="px-6 py-3" key={`rowAction${rowIndex}`}>
                <button type="button" className={`mr-1 ${buttonStyle.blue}`} onClick={() => editUser(data)}>Update</button>
                <button type="button" className={`mr-1 ${buttonStyle.red}`} onClick={() => deleteUser(data.id)}>Remove</button>
            </td>
        );
    }

    const newUser = () => {
        setAddUser(addUserConst);
        setmodalShow(!modalShow);
    }

    const editUser = (data:any) => {
        setAddUser({...addUser, ...data});
        setmodalShow(true);
        return data;
    }

    const deleteUser = async(id:number) => {
        const response = await fetch(`/api/users/delete/${id}`,
        {
            method: 'DELETE',
        }).then((results) => {
            return results.json();
        });

        if(response.code == 200){
            setIsSearch(true);
        }
        console.log('DELETE', response);
    }
    return (
        <div id="main-container">
            <div className="w-full">
                <div className="text-right mr-6">
                    <button className={buttonStyle.green} onClick={newUser}>ADD USER</button>
                </div>
            </div>
            <CardsComponent cardsData={cards}/>
            <TableComponent 
                title="User Table" 
                tableProps={initTable(isLoading, params, setParams, setIsSearch)} 
                data={apiResponse} 
                generateAction={generateAction}
            />
            {modalShow ? (
                <UserContext.Provider value={[addUser, setAddUser, setIsSearch, setmodalShow]}>
                    <ModalComponent 
                        modalContent={buildModalContent()} 
                        modalFooter={buildModalFooter(
                            () => setmodalShow(false)
                        )}
                    />
                </UserContext.Provider>
            ): ""}
        </div>
    );
}