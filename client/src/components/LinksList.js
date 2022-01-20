import React from "react"
import {Link} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const LinksList = ({links}) => {
    if (!links.length){
        return <p className="center">Вы не ввели ссылку</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Изначальная</th>
                <th>Сокращенная</th>
                <th>Открыть</th>
            </tr>
            </thead>

            <tbody>
            { links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index+1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Открыть</Link>

                        </td>
                    </tr>
                )

            })}
            </tbody>
        </table>
    )
}