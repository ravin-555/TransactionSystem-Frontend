// Api to handle transaction reelated requests to the server
import api from "./axios";
export const Deposit=async (amount) => {
    try{

        const res=await api.post('/transactions/deposit', {amount});
        return res.data; // always remember axios response has the actual data in the 'data' field
    }catch(err){
        throw new Error("Failed while communicating with server!");
    }

}
export const Withdraw=async (amount) => {
    try{
        const res = await api.post('/transactions/withdraw',{amount})
        return res.data
    }catch(err){
        throw new Error("Failed while communicating with server!");
    }
}
export const transfer=async (data) => {
    const {amount,toUser}=data
    // 1. Generate a unique key (you can use the 'uuid' library or a random string)
    const idempotencyKey = crypto.randomUUID(); 
    try{
        const res = await api.post('/transactions/transfer',{amount,toUser},
            {
                headers:{
                    'Idempotency-Key': idempotencyKey // unique key to prevent duplicate transfers on retries
                }
            }
        )
        return res.data
    }catch(error){
        return error;
        throw new Error("Failed while communicating with server!",error);
    }
}

export const reverseTransaction=async (id) => {
    const Key = crypto.randomUUID();
    try{
        const res = await api.post(`/admin/transactions/${id}/reverse`,{},
            {
                headers:{
                    'Idempotency-Key': Key // unique key to prevent duplicate reversals on retries
                }
            }
        )

        return res.data?.data
    }catch(err){
        throw new Error("Failed while communicating with server!");
    }
}
    
