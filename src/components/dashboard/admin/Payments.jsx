import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";

const Payments = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments`);
      return data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00B03B",
      cancelButtonColor: "#FF6161",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/payments/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>Payments</title>
      </Helmet>
      <div className="flex justify-start my-4">
        Total Payment : {payments.length}
      </div>
      <table className="shadow-md border mx-auto border-gray-200 my-6">
        {/* head */}
        <thead>
          <tr className="bg-black text-white">
            <th className="py-4 px-6 text-lg text-left border-b">Sl</th>
            <th className="py-4 px-6 text-lg text-left border-b">Date</th>
            <th className="py-4 px-6 text-lg text-left border-b">Email</th>
            <th className="py-4 px-6 text-lg text-left border-b">Price</th>
            <th className="py-4 px-6 text-lg border-b text-end">
              TransactionId
            </th>
            <th className="py-4 px-6 text-lg border-b text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment, index) => (
            <tr key={payment._id} className="hover:bg-gray-50 border-b py-1">
              <th>{index + 1}</th>
              <td className="px-3 py-2">{payment.date}</td>
              <td className="px-3 text-lg font-medium">{payment.email}</td>
              <td className="px-3">{payment.price}</td>
              <td className="px-3 text-lg font-medium">
                {payment.transactionId}
              </td>
              <td className="px-3 text-lg font-medium">
                <NavLink
                  onClick={() => handleDelete(payment._id)}
                  className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                >
                  <MdOutlineDelete className="text-xl" />
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
