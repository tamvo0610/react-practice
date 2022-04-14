import React, { useState } from 'react'
import Input from './Input'
import { Formik, useFormik } from 'formik'

function ValidateForm() {
    const formik = useFormik({
        initialValues: {
            username: "",
            tel: "",
            email: "",
            password: "",
            confirmPassword: ""
            
        },
        onSubmit: values => {
            console.log(values);
        },
        validate: values => {
            let errors = {}
            /* Const error mess */
            const errorMess = "Dữ liệu bắt buộc"
            const errorMessEmail = "Định dạng mail không hợp lệ"
            const errorMessPass = "Độ dài tối thiểu 6 đến 15 kí tự gồm ít nhất 1 chữ cái in hoa"
            const errorConfirmPassword =  "Mật khẩu nhập vào không chính xác"
            /* Regex */
            const regexEmail = new RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")
            const regexPass = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,15}$")      
            /* Check */
            const checkEmail = regexEmail.test(values.email)
            const checkPass = regexPass.test(values.password)
            const checkConfirmPass = values.confirmPassword === values.password
            /* Handle Error */
            errors.username =  values.username ? "" : errorMess;
            errors.tel = values.tel ? "" : errorMess;
            errors.email = values.email ? (checkEmail ? "" : errorMessEmail) : errorMess;
            errors.password = values.password ? (checkPass ? "" : errorMessPass) : errorMess;
            errors.confirmPassword = values.confirmPassword ? (checkConfirmPass ? "" : errorConfirmPassword) : errorMess;
            return errors
        }
    })
    return (
        <form 
            onSubmit={formik.handleSubmit}
            className='submit-form'>
            <h2>Validate Form</h2>
            {/* <Input value={"username"} />
            <Input value={"tel"} />
            <Input value={"email"} />
            <Input value={"password"} />
            <Input value={"re-password"} /> */}
            <div>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    onChange={formik.handleChange} value={formik.values.name}
                    
                />
                <span className='error-mess'>{formik.errors.username}</span>
            </div>
            <div>
                <label>Telephone</label>
                <input
                    type="number"
                    name="tel"
                    id="tel"
                    placeholder="Enter your tel"
                    onChange={formik.handleChange} value={formik.values.tel}
                />
                <span className='error-mess'>{formik.errors.tel}</span>
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    onChange={formik.handleChange} value={formik.values.email}
                />
                <span className='error-mess'>{formik.errors.email}</span>
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={formik.handleChange} value={formik.values.password}
                />
                <span className='error-mess'>{formik.errors.password}</span>
            </div>
            <div>
                <label>Re-password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword "
                    placeholder="Re-enter your password"
                    onChange={formik.handleChange} value={formik.values.confirmPassword}
                />
                <span className='error-mess'>{formik.errors.confirmPassword}</span>
            </div>
            <button>Submit</button>
        </form>
    )
}

export default ValidateForm