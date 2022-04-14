import React, { useEffect, memo, useState } from 'react'
import { Formik } from 'formik'

function Input({value}) {
    const [data, setData] = useState({})
    useEffect(()=>{
        switch (value) {
            case "username":
                setData({
                    title: "Username:",
                    type: "text",
                    id: value,
                    name: value,
                    placeholder: "Enter your username"
                })
                break;
            case "tel":
                setData({
                    title: "Telephone:",
                    type: "number",
                    id: value,
                    name: value,
                    placeholder: "Enter your tel"
                })
                break;
            case "email":
                setData({
                    title: "Email:",
                    type: "email",
                    id: value,
                    name: value,
                    placeholder: "Enter your email"
                })
                break;
            case "password":
                setData({
                    title: "Password:",
                    type: "password",
                    id: value,
                    name: value,
                    placeholder: "Enter your password"
                })
                break;
            case "re-password":
                setData({
                    title: "Re-password:",
                    type: "password",
                    id: value,
                    name: value,
                    placeholder: "Enter your re-password"
                })
                break;
            default:
                break;
        }
        console.log(`re-render Input`);
    },[]) 
  return (
    <div>
        <label>{data.title}</label>
        <input
            type={data.type}
            name={data.name}
            id={data.id}
            placeholder={data.placeholder}
            required
        />
    </div>
  )
}

export default Input