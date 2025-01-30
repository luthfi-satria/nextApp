import { inputStyle } from "../../data/constants";

export default function UserForm(){    
    return (
        <form id="formUser" className="w-full">
            <div className="py-2">
                <label className={inputStyle.label}>Field</label>
                <input 
                    type="text" 
                    name={`items`} 
                    className={inputStyle.text} 
                    placeholder={`Search ${`items`}`}
                    value={`defaultValue`}
                />
            </div>
        </form>
    );
}