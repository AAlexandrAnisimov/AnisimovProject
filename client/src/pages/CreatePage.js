import React, {useContext, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const history = useHistory()
    const [link, setLink] = useState('')

    const pressHandler = async event =>{
        if (event.key === 'Enter'){
            try{
                const data = await request('/api/link/gen', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`})
                history.push(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }
    }

    return (
        <div class="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field white-text">
                    <input placeholder="Вставьте ссылку" id="link" type="text" name="link" value={link} onChange={e => setLink(e.target.value)} onKeyPress={pressHandler}/>
                    <label htmlFor="email"></label>
                </div>
            </div>
        </div>
    )
}