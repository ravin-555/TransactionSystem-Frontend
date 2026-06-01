// A component about user accounts details
import React from 'react'
import Tooltip from './Tooltip'
import { User, CreditCard, Copy, ShieldCheck, Mail } from 'lucide-react'

export default function Accounts({ user }) {
    const copyAccount = () => {
        navigator.clipboard.writeText(user?.accountNumber || null);
    }

    return (
        <div className=" bg-white/2 p-5  border-b-5 rounded-b-3xl space-y-4 animate-in fade-in duration-200">

            {/* User */}
            <div className="name flex items-start gap-3">

                <div className="bg-indigo-100 p-2 rounded-xl">
                    <User className="text-indigo-600" size={18} />
                </div>

                <div>
                    <p className="text-xs text-gray-200">
                        Full Name
                    </p>

                    <p className="font-medium ">
                        {user?.name}
                    </p>
                </div>

            </div>

            {/* Account */}
            <div className=" accountNo flex items-start justify-between">

                <div className="flex gap-3">

                    <div className="bg-purple-100 p-2 rounded-xl">
                        <CreditCard className="text-purple-600" size={18} />
                    </div>

                    <div>
                        <p className="text-xs text-gray-200">
                            Account Number
                        </p>

                        <p className="font-medium ">
                            {user?.accountNumber}
                        </p>
                    </div>

                </div>
                <Tooltip text="Copy">

                    <button
                        onClick={copyAccount}
                        className="text-gray-400 cursor-pointer hover:text-white transition"
                    >
                        <Copy size={18} />
                    </button>
                </Tooltip>

            </div>
            {/* email */}
            <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-xl">
                    <Mail className='text-red-500' size={18} />
                </div>
                <div>
                    <p className='text-xs text-gray-200'>e-mail</p>
                    <p className='font-medium '>{user?.email}</p>
                </div>
            </div>

            {/* Security */}
            <div className="flex items-start gap-3">

                <div className="bg-green-100 p-2 rounded-xl">
                    <ShieldCheck className="text-green-600" size={18} />
                </div>

                <div>
                    <p className="text-xs text-gray-200">
                        Security Status
                    </p>

                    <p className="font-medium  text-green-600">
                        Protected
                    </p>
                </div>

            </div>

        </div>
    )
}

