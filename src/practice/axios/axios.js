import axios from "axios";
import { useState, useEffect, useRef } from "react";
import UseCustomHookAPI from "./useCustomHook"

function Render (){
    // const {data, loading} = UseCustomeHookAPI();
    const [posts, setPosts] = useState([])
    const [product, setProduct] = useState("")
    const [price, setPrice] = useState("")
    const [edit, setEdit] = useState(false)
    const formELement = useRef()
    const [putDataAPI, setputDataAPI] = useState()
    /* HÀM RENDER?CLEAR DATA */
    const render = () => {
        UseCustomHookAPI("GET").then(res => {
            setPosts(res.data)
            clearData()
        })
        console.log(`render`)
    }
    const clearData = () => {
        setProduct("")
        setPrice("")
        setputDataAPI("")
    }
    useEffect(()=>{
        render()
    },[])
    /* OPEN/CLOSE FORM */
    const openPopup = () => {
        formELement.current.style.display="block"
    }
    const closePopup = () => {
        formELement.current.style.display=null
    }
    /* HANDLE FORM DATA*/
    useState(()=>{
        UseCustomHookAPI("GET").then(res => {
            setPosts(res.data)
        })
    },[])
    const handleData = (data) => {
        openPopup()
        if(data){
            setEdit(true)
            setputDataAPI(data)
            setProduct(data.product)
            setPrice(data.price)
            console.log(`form edit`);
        } else {
            setEdit(false)
            clearData()
            console.log(`form creat`);
        }
    }   
    /* HANDLE CREATE/EDIT DATA*/
    const submitData = (e) => {
        e.preventDefault()
        const formData = {
            product: product,
            price: Number.parseInt(price)
        }
        if(!edit){
            UseCustomHookAPI("POST",formData).then(res => {
                if(res.status === 201) {
                    render()
                }
            })
        } else {
            console.log(product);
            console.log(price);
            UseCustomHookAPI("PUT",formData, putDataAPI).then(res => {
                if(res.status === 200) {
                    render()
                }
            })
        }
        // console.log(edit);
        // console.log(formData);
        
    }
    /* HANDLE DEL DATA*/
    const delData = (data) => {
        UseCustomHookAPI("DELETE",null,data).then(res => {
            if(res.status === 200) {
                render()
            }
        })
    }
    return (
        <div>
            <div className="covid-dashboard">
                <h1>Test Axios Dashboard</h1>
                <div>
                    <ul className="covid-dashboard-list">
                        {posts.map((data,index) => {
                            return (
                                <li key={index}>
                                    <div><span>{index + 1}</span></div>
                                    <div><span>{data.product}</span></div>
                                    <div><span>{data.price}</span></div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                handleData(data)
                                            }}
                                        >Edit</button>
                                        <button
                                            onClick={()=>delData(data)}
                                        >Del</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="covid-handle">
                <h1>Handle</h1>
                <button
                    onClick={() => {
                        handleData()
                    }}
                >Thêm mới</button>
                <form
                    onSubmit={(e)=>submitData(e)}
                    ref={formELement}
                    className="popup-creatData">
                    <div>
                        <label>Tên SP:</label>
                        <input
                            onChange={(e)=>setProduct(e.target.value)}
                            value={product}
                            required
                            placeholder='Tên Sản Phẩm'
                            type="text"
                        />
                    </div>
                    <div>
                        <label>Giá SP:</label>
                        <input
                            onChange={(e)=>setPrice(e.target.value)}
                            value={price}
                            required
                            placeholder='Giá Sản Phẩm'
                            type="number"
                        />
                    </div>
                    <button>{edit ? `Save` : `Create`}</button>
                    <button
                        onClick={closePopup}
                    >Close</button>
                </form>
            </div>
            
        </div>
    )
}
export default Render