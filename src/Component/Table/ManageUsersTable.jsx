import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
// import { FaRegEye } from "react-icons/fa";

const ManageUsersTable = ({ user }) => {
  const { email, name, photoURL, role } = user;
  console.log(photoURL);
  return (
    <tr className="hover:bg-gray-50 border-b py-1">
      <td className="px-3">
        <img
          src={photoURL}
          alt="table navigate ui"
          className="h-16 w-20 object-cover bg-gray-300"
        />
      </td>
      <td className="px-3 text-lg font-medium">{name}</td>
      <td className="px-3">{email}</td>
      <td className="px-3 text-lg font-medium">{role}</td>
      <td className="px-3 text-lg font-medium">
        <span className="flex gap-1">
          {/* <NavLink className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white">
            <FaRegEye />
          </NavLink> */}
          <NavLink className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white">
            <FiEdit />
          </NavLink>
          <NavLink
            //   onClick={() => handleDelete(_id)}
            className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
          >
            <MdOutlineDelete className="text-xl" />
          </NavLink>
        </span>
      </td>
    </tr>
  );
};

ManageUsersTable.propTypes = {
  user: PropTypes.object,
};
export default ManageUsersTable;
