'use client'

import { useEffect, useState } from "react";
import { ApiRes, UserCall, buildModalContent, buildModalFooter, buttonStyle, filterObj, generateAction, initTable } from "./userState";
import CardsComponent from "../../components/cards/CardsComponent";
import TableComponent from "../../components/table/TableComponent";
import ModalComponent from "../../components/modal/ModalComponent";

export default function MasterUsers(){
    const [params, setParams] = useState(filterObj);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalShow, setmodalShow] = useState<boolean>(false);
    const [cards, setCards] = useState<Array<Cards>>([]);
    const [apiResponse, setApiResponse] = useState<APIdataResponse>(ApiRes);
    const [isSearch, setIsSearch] = useState(true);
    useEffect(() => {
        if(isSearch){
            UserCall(params, setApiResponse, setIsLoading);
        }
        setIsSearch(false);
    }, [isSearch]);

    return (
        <div id="main-container">
            <div className="w-full">
                <div className="text-right mr-6">
                    <button className={buttonStyle.green} onClick={() => setmodalShow(!modalShow)}>ADD USER</button>
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
                <ModalComponent 
                    modalContent={buildModalContent()} 
                    modalFooter={buildModalFooter(() => setmodalShow(false))}
                />
            ): ""}
        </div>
    );
}