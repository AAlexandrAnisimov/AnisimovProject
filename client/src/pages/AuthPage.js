import React, {useState, useEffect, useContext} from "react"
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {useAuth} from "../hooks/auth.hook"
import {AuthContext} from "../context/AuthContext"

export const AuthPage = () => {

    const auth = useContext(AuthContext)

    const {loading, error, request, clearError} = useHttp()

    const message = useMessage()

    const [form, setForm] = useState({
        email:'', password:''
    })

    useEffect(() =>{
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
            
        }
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s12 center-align">
                <h1>Сервис сокращения ссылок</h1>
            </div>
            <div className="col s6 offset-s3">
                <div className="card teal lighten-2">
                    <div className="card-content white-text">
                        <span className="card-title center-align">Авторизация</span>
                        <div>
                            <div className="input-field white-text">
                                <input className="input-text" placeholder="Введите email" id="email" type="text" name="email" value= {form.email} onChange={changeHandler}/>
                                    <label htmlFor="email"></label>
                            </div>
                            <div className="input-field white-text">
                                <input className="input-text" placeholder="Введите пароль" id="password" type="password" name="password" value= {form.password} onChange={changeHandler}/>
                                <label htmlFor="password"></label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action center-align">
                        <button className="btn cyan darken-4" style={{marginRight:10}} onClick={loginHandler} disabled={loading}>Войти</button>
                        <button className="btn deep-orange darken-3" onClick={registerHandler} disabled={loading}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}