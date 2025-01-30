import { FormEvent, useContext, useState } from "react";
import {InputComponent, SelectComponent} from "../../components/common/InputComponent";
import { UserContext } from "./page";
import { AlertElements } from "../../components/common/TagGenerator";

export default function UserForm(){ 
    const genderOption = [
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'},
    ];
    
    const [addUser, setAddUser, setIsSearch, setmodalShow] = useContext(UserContext);
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
        const response = await fetch('/api/users/add', {
            method: 'POST',
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
            <InputComponent label="Email" name="email" value="" placeholder="Enter email" onChangeEvent={changeHandler} />
            <InputComponent label="name" name="name" value="" placeholder="Enter username" onChangeEvent={changeHandler} />
            <InputComponent label="Phone" name="phone" value="" placeholder="Enter phone number" onChangeEvent={changeHandler} />
            <SelectComponent label="Gender" name="gender" value={"Male"} option={genderOption} onChangeEvent={changeHandler}/>
            <InputComponent label="Address" name="address" value="" placeholder="Enter your address" onChangeEvent={changeHandler}/>
        </form>
    );
}