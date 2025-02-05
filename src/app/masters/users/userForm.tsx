'use client'
import { FormEvent, useContext, useState } from "react";
import {InputComponent, SelectComponent} from "../../components/common/InputComponent";
import { UserContext } from "./page";
import { AlertElements } from "../../components/common/TagGenerator";

export default function UserForm(){ 
    const genderOption = [
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'},
    ];
    
    const [ApiUser, addUser, setAddUser, setIsSearch, setmodalShow] = useContext(UserContext);
    const [showAlert, setShowAlert] = useState({
        code: 200,
        title: '',
        message: '',
    });

    const changeHandler = (e:any) => {
        setAddUser({...addUser, [e.target.name]: e.target.value});
    }

    const submitForm = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let urlPath = ApiUser.insert;
        let method = 'POST';
        if(Object.keys(addUser).includes('id')){
            urlPath = `${ApiUser.update}/${addUser.id}`;
            method = 'PUT';
            delete addUser.id;
        }

        const response = await fetch(urlPath, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addUser),
        }).then((results) => {
            return results.json();
        });

        if(response?.code != 200){
            setShowAlert({
                ...showAlert, 
                code: response.code, 
                title: 'Verification error', 
                message: `${response.message} ${response?.errorFields?.modelName}`
            });
            return false;
        }

        setIsSearch(true);
        setmodalShow(false);
        return true;
    }

    return (
        <form id="formUser" className="w-full" onSubmit={submitForm}>
            {showAlert.code != 200 ? (
                <AlertElements title={showAlert?.title} message={showAlert.message} />
            ) : ''}
            <InputComponent label="Email" name="email" value={addUser.email} placeholder="Enter email" onChangeEvent={changeHandler} />
            <InputComponent label="name" name="name" value={addUser.name} placeholder="Enter username" onChangeEvent={changeHandler} />
            <InputComponent label="Phone" name="phone" value={addUser.phone} placeholder="Enter phone number" onChangeEvent={changeHandler} />
            <SelectComponent label="Gender" name="gender" value={addUser.gender} option={genderOption} onChangeEvent={changeHandler}/>
            <InputComponent label="Address" name="address" value={addUser.address} placeholder="Enter your address" onChangeEvent={changeHandler}/>
        </form>
    );
}