// to get user data and load dashboard from get req to the server
import api from "./axios";

export const getuserdata=async() => {
    try{
        const res=await api.get('/auth/user');
        return res.data?.data;
    }catch(err){
        throw new Error(err.message);
        
    }
}
export const gettransactions=async () => {
    try {
        const res=await api.get('/transactions/history');
        return res.data?.data;
    } catch (error) {
        throw new Error(err.message);
        
    }
}
export const getalltransactions=async () => {
    try {
        const res=await api.get('/admin/transactions/history');
        return res.data?.data;
    } catch (error) {
        throw new Error(err.message);
        
    }
}