import { useEffect, useState } from "react";
import { getalltransactions } from "../api/user";
import { reverseTransaction } from "../api/transaction";
import useTokenExpiry from "../hooks/useTokenExpiry";

export default function AdminPanel() {

    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const timeleft = useTokenExpiry();

    const fetchTransactions = async() => {
        const tx = await getalltransactions()
        setTransactions(tx);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // reverse transaction
    const handleReverse = async (id) => {
        try {
            const res=await reverseTransaction(id);
            alert("Transaction reversed successfully");
            fetchTransactions(); // refresh list after reversal

        } catch (err) {
            alert("Failed to reverse transaction");
        }
    };

    // filter
    const filtered = transactions?.filter(tx =>
        tx._id.includes(search)
    );

    return (
        <div className="p-4 space-y-4  text-gray-600 w-full">

            <h2 className="text-xl font-bold text-green-500">
                Admin Panel
            </h2>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by Transaction ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 w-full rounded max-w-3/6 bg-(--card) text-sm"
            />

            {/* Table */}
            <div className="bg-white rounded shadow overflow-x-auto">

                <table className="w-full text-sm">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered?.map(tx => (

                            <tr key={tx._id} className="border-t text-center">

                                <td className="p-2 text-xs">
                                    {tx._id.slice(0, 6)}...
                                </td>

                                <td>{tx.type}</td>

                                <td>₹ {tx.amount}</td>

                                <td>
                                    <span className="text-green-600">
                                        {tx.status || "Success"}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleReverse(tx._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-red-600 transition text-xs"
                                    >
                                        Reverse
                                    </button>
                                </td>

                            </tr>

                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}
