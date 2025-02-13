import React, { useEffect, useState } from "react";
import Table from "../../component/VTable";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import { fetchProductList } from "../../api/Auth";

export default function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { title: "Sr No", dataIndex: "srno", key: "srno" },
    { title: "Product Name", dataIndex: "name", key: "name" },
    {
      title: "Product Image",
      dataIndex: "productimg",
      key: "productimg",
      render: (image) => (
        <div className="m-auto flex justify-center">
          <img
            src={image || "/assets/image/shirt.webp"}
            alt="productimg"
            width="50px"
            height="50px"
            className="rounded"
          />
        </div>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  const getProducts = async () => {
    setLoading(true);
    try {
      const products = await fetchProductList();
      const formattedData = products?.data?.map((product, index) => ({
        srno: index + 1,
        name: product.name,
        productimg: product.image,
        description: product.description,
        price: `Rs.${product.price}/-`,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg mt-14">
        <h3 className="text-[1.125rem] font-semibold">Product</h3>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg">
          <div className="flex justify-end mb-3 p-2">
            <Link
              to="/Add-product"
              className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
            >
              Add Product
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <p>Loading...</p>
            </div>
          ) : (
            <Table cols={columns} data={data} />
          )}
        </div>
      </div>
    </Layout>
  );
}
