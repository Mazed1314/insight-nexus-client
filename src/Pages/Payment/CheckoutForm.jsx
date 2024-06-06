import { CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  return (
    <>
      <form className="border rounded-md bg-gray-200 p-4 mt-5">
        <CardElement
          className="bg-slate-100 p-2 "
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm mt-4 bg-blue-600 text-white"
          type="submit"
        >
          Pay
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
