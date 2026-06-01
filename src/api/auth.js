import api from "./axios"
export const login = async (data) => {
    const response = await api.post("/auth/login",data)
    // console.log(response.data);
    return response?.data // axios puts the response data in 'data' field

}


export const register_user=async(data)=>{
    const response=await api.post("/auth/register",data)
    return response?.data?.data
}


// The logout function sends a POST request to the server to invalidate the user's session or token, and then removes the token from local storage to effectively log the user out on the client side.
export const logout=async ()=>{
   await api.post('/auth/logout'); // Send a request to the server to invalidate the session or token
   localStorage.removeItem("token");
}