
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import api from "../api/axios"

export default function Tsx_detail() {

  const { tsx_id } = useParams();
  const location = useLocation();

  // fallback-safe state
  const [tx, setTx] = useState(location.state?.transactions || null);

  if (!tx) {
    return (
      <div className="p-6 text-center text-gray-500">
        No details found for ID: <b>{tsx_id}</b>
      </div>
    );
  }

  // format values
  const formattedAmount = new Intl.NumberFormat("en-IN").format(tx.amount);
  const date = new Date(tx.date || tx.createdAt).toLocaleString();

  const isCredit = tx.type === "deposit";

  //  PDF FUNCTION
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("FinTrack Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Transaction ID: ${tsx_id}`, 20, 40);
    doc.text(`Type: ${tx.type}`, 20, 50);
    doc.text(`Amount: ₹ ${formattedAmount}`, 20, 60);
    doc.text(`Date: ${date}`, 20, 70);

    if (tx.toAccount) {
      doc.text(`To Account: ${tx.toAccount}`, 20, 80);
    }

    doc.text("Status: Success", 20, 90);

    doc.save(`transaction-${tsx_id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-start ">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-5">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl text-gray-800 font-semibold">Transaction Receipt</h2>
          <p className="text-xs text-gray-500">FinTrack</p>
        </div>

        {/* Amount Section */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">Amount</p>

          <h1
            className={`text-3xl font-bold ${isCredit ? "text-green-600" : "text-red-500"
              }`}
          >
            ₹ {formattedAmount}
          </h1>

          <span className="text-xs text-gray-500 capitalize">
            {tx.type}
          </span>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
            Success
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">

          <Row label="Transaction ID" value={tsx_id} />
          <Row label="Date" value={date} />
          <Row label="Type" value={tx.type} />
          <Row label="Amount" value={`₹ ${formattedAmount}`} />
          {/* if toAccount exists new row for it */}
          {tx.toAccount && (
            <Row label="To Account" value={tx.toAccount} />
          )}

        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">

          <button
            onClick={downloadPDF}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Download Receipt
          </button>

        </div>

      </div>
    </div>
  );
}


// reusable row component
function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="text-gray-500 text-bold">{label}</span>
      <span className="font-medium text-gray-500">{value}</span>
    </div>
  );
}
