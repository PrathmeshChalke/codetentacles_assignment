import React, { useEffect, useState } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Loader, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { fetchUsers, deleteUser } from "../api/Auth";

export default function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { title: "Sr No", dataIndex: "srno", key: "srno" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone No", dataIndex: "phoneno", key: "phoneno" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Action",
      render: (item) => (
        <div className="flex gap-1 text-center justify-center">
          <button onClick={() => handleDelete(item.id)}>
            <Trash2 color="#ff0000" size={16} />
          </button>
        </div>
      ),
      key: "action",
      width: 90,
    },
  ];

  const getUsers = async () => {
    setLoading(true);
    try {
      const users = await fetchUsers();
      const formattedData = users?.data?.map((user, index) => ({
        srno: index + 1,
        name: user.name,
        email: user.email,
        phoneno: user.phoneNumber,
        gender: user.gender,
        id: user.id, // Ensure ID is available for deletion
      }));
      setData(formattedData);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        timer: 2000,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(userId);
          Swal.fire("Deleted!", "User has been deleted.", "success");
          getUsers(); // Re-fetch the user list after deletion
        } catch (error) {
          Swal.fire("Error", error, "error");
        }
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg mt-14">
        <h3 className="text-[1.125rem] font-semibold">List</h3>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg">
          <div className="flex justify-end mb-3 p-2">
            <Link
              to="/Stepperform"
              className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
            >
              Add Users
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="text-center">
                <p className="mt-2">Loading...</p>
              </div>
            </div>
          ) : (
            <Table cols={columns} data={data} />
          )}
        </div>
      </div>
    </Layout>
  );
}
