import axios from "axios";

const UseCustomHookAPI = (method, body, data) => {
    const urlAPI = "http://localhost:3000/covid-dashboard"
    return (
        axios({
            method: method,
            url: data ? `${urlAPI}/${data.id}` : urlAPI,   
            data: body
        }).catch(err => {
            console.log(err)
        })
    )
}
export default UseCustomHookAPI;