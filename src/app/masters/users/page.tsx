'use client'

import { createContext, useEffect, useState } from "react";
import { ApiRes, UserCall, addUserConst, buildModalContent, buildModalFooter, buttonStyle, downloadCsvTemplate, exportCsv, exportJson, filterObj, initTable } from "./userState";
import CardsComponent from "../../components/cards/CardsComponent";
import TableComponent from "../../components/table/TableComponent";
import ModalComponent from "../../components/modal/ModalComponent";
import { AddUser } from "../../data/schemas";
import { ApiUser } from "../../data/apiPaths";
import { listStyle } from "../../data/constants";

export const UserContext = createContext<any>([]);
export default function MasterUsers(){
    const [params, setParams] = useState(filterObj);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalShow, setmodalShow] = useState<boolean>(false);
    const [cards, setCards] = useState<Array<Cards>>([]);
    const [apiResponse, setApiResponse] = useState<APIdataResponse>(ApiRes);
    const [isSearch, setIsSearch] = useState(true);
    const [addUser, setAddUser] = useState<AddUser>(addUserConst);
    const [importBtn, setImportBtn] = useState<boolean>(false);
    
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
    
    const ImportUser = async() => {
        const fileInput = (document.getElementById('importuser') as HTMLInputElement);
        if(fileInput && fileInput.files){
            const file = fileInput?.files[0];

            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(ApiUser.import,
            {
                method: 'POST',
                body: formData,
            }).then((results) => {
                return results.json();
            });
    
            if(response.code == 200){
                setIsLoading(true);
                setIsSearch(true);
            }
        }
    }
    return (
        <div id="main-container">
            <div className="w-full">
                <div className="text-right mr-6">
                    <button className={buttonStyle.green} onClick={newUser}>ADD USER</button>
                    <button className={buttonStyle.cyan} onClick={() => exportJson(apiResponse)}><i className="fa fa-download"></i> JSON</button>
                    <button className={buttonStyle.cyan} onClick={() => exportCsv(apiResponse)}><i className="fa fa-download"></i> CSV</button>
                    <div className="relative inline-block">
                        <button className={buttonStyle.white} data-dropdown-toggle="dropdown" onClick={() => setImportBtn(!importBtn)}>
                            <span className="inline-block">Import</span>
                            <i className="fa fa-gear ml-4"></i>
                        </button>
                        {importBtn ? (
                            <div id="dropdown" className="absolute top-8 right-1 z-10 border border-slate-400 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                <ul className="py-2 text-sm text-left text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <a href="#" className={listStyle.a} onClick={downloadCsvTemplate}>
                                            <i className="fa fa-download mr-1"></i>
                                            Download Template
                                        </a>
                                    </li>
                                    <li>
                                        <label className={listStyle.a} onChange={ImportUser}>
                                            <i className="fa fa-upload mr-1"></i>
                                            Import CSV File
                                            <input id="importuser" type="file" className="hidden" name="importuser"/>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        ) : ''}
                    </div>
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
                <UserContext.Provider value={[ApiUser, addUser, setAddUser, setIsSearch, setmodalShow]}>
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