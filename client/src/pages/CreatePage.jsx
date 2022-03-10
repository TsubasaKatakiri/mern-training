import React, {useState} from 'react';
import { useHttp } from './../hooks/http.hook';
import { useEffect, useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const auth=useContext(AuthContext);
    const {request}=useHttp();
    const history=useNavigate();
    const [link, setLink] = useState("");

    useEffect(() => {
        window.M.updateTextFields();
      }, [])

    const pressHandler=async event=>{
        if(event.key==="Enter"){
            try {
                const data=await request('/api/link/generate', "POST", {from: link}, {Authorization: `Bearer ${auth.token}`});
                console.log(data);
                history(`/detail/${data.link._id}`);
            } catch (err) {}
        }
    }

    return (
        <div className={"row"}>
            <div className={"col s8 offset-s2"} style={{paddingTop: "2rem"}}>
                <div className={"input-field"}>
                    <input id="link" type="text" name="link" onChange={(e)=>setLink(e.target.value)} value={link} onKeyPress={pressHandler}/>
                    <label htmlFor="link">Paste a link</label>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;