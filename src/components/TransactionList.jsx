import { useEffect,useState } from "react";
import { Funnel } from "lucide-react";
import { set } from "mongoose/lib/driver";
import { now } from "mongoose";
import Tooltip from "./Tooltip";
import { Link } from "react-router-dom";


export default function TransactionList({ transactions }) {
    const [filter, setFilter] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState(transactions) //initially all transactions are shown in the list, when filter is applied then filtered list is shown.

    // compare createdAt with current date and filter value to maintain filtered list by date.


    useEffect(() => {
console.log("Filter :",filter)
console.log("Transaction :",filteredTransactions)
      filter=="" && setFilteredTransactions(transactions) //if filter is all then show all transactions

      if(filter!=""){
        const present= new Date()
        const filtered=transactions.filter((tx)=>{
            const trnsx_date=new Date(tx.createdAt)
            const diffTime= Math.abs(present-trnsx_date) // in millisecond
            const diffDay=Math.ceil(diffTime/(1000*86400)) // no of day
            return diffDay <= filter // return trnsx whose created date is in the filter day diff

        })
        setFilteredTransactions(filtered)
      }

    }, [transactions,filter]);
    
    return (
        <div className=" mt-16 bg-white/5 rounded-xl p-5 shadow-md border-b border-white/40">
            <div className="flex items-center justify-between mb-4 ">
                <h3 className=" text-2xl text-green-500 font-bold mb-3">Recent Transactions</h3>
                <div className="filter flex items-center pr-2 gap-3  border border-border rounded-md py-1 px-1">
                    <Tooltip text="Filter">
                    <Funnel className="text-gray-500 stroke-white" />
                    </Tooltip>
                    <select
                        value={filter}
onChange={(e) => {console.log(e) 
                            setFilter(e.target.value)}}
                        className=" cursor-pointer  text-slate-500 border border-white/10 rounded-md py-2 px-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="" key={"0"}>All</option>
                        <option value="15" key={"15"}>15 days</option>
                        <option value="30" key={"30"}>30 days</option>
                    </select>
                </div>
            </div>
            

            {filteredTransactions.length === 0 ? (
                <p className="text-muted text-sm ">No transactions yet</p>
            ) : (
                <ul className="space-y-2 text-slate-200 ">
                    {filteredTransactions.map((tx) => (
                    
                        <li
                            key={tx._id}
                            className="flex justify-between text-sm border-b border-border pb-1"
                        >
                            <span>{tx.type}</span>
                            <span className="">{tx.createdAt}</span>
                            <span
                                className={
                                    tx.type === "credit"
                                        ? "text-(--sucess)"
                                        : "text-(--danger)"
                                }
                            >
                                Rs. {tx.amount}
                            </span>
                            <Link to={`/transactions/details/${tx._id}`} state={{transactions: tx}} className="hover:text-blue-500 hover:border-b">
                                View Details
                            </Link>
                        </li>
                    
                    ))}
                </ul>
            )}
        </div>
    );
}


  
