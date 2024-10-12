import React from "react";

const CancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-500">Payment Canceled</h1>
      <p className="mt-4">You canceled the payment. Please try again later.</p>
    </div>
  );
};

export default CancelPage;
