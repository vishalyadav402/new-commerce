"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AdminLayout from "@/app/AdminLayout";
import Swal from "sweetalert2"; 
import Addproductcategory from "../component/Addproductcategory";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Image from "next/image";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    productName: "",
    Product_Slug:"",
    productDescription: "",
    productImage: null,
    ProductMrp:"",
    price: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://api.therashtriya.com/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleProductDescriptionChange = (content) => {
    setCurrentProduct({ ...currentProduct, productDescription: content });
  };

  const handleProductImageChange = (e) => {
    setCurrentProduct({ ...currentProduct, productImage: e.target.files[0] });
  };

  const handleSubmitProduct = async () => {
    const formData = new FormData();
    formData.append("productName", currentProduct.productName);
    formData.append("Product_Slug", currentProduct.Product_Slug);
    formData.append("productDescription", currentProduct.productDescription);
    formData.append("ProductMrp", currentProduct.ProductMrp);
    formData.append("price", currentProduct.price);
    if (currentProduct.productImage) {
      formData.append("productImage", currentProduct.productImage);
    }

    try {
      if (editingProduct) {
        await axios.put(
          `https://api.therashtriya.com/api/product/${editingProduct.ProductID}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Product Updated Successfully.")
      } else {
        await axios.post("https://api.therashtriya.com/api/product", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product Added Successfully.")
      }
      fetchProducts();
      handleCloseProduct();
    } catch (error) {
      console.log("Error creating/updating product: " + error);
      toast.error("Failed to Add / Update Product.");
    }
  };

  
  const handleDeleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`https://api.therashtriya.com/api/product/${id}`);
        // Swal.fire("Deleted!", "The product has been deleted.", "success");
        toast.success("The product has been deleted.");
        fetchProducts();
      } catch (error) {
        // Swal.fire("Error!", "Failed to delete the product.", "error");
        console.error("Error deleting product:", error);
        toast.error("Error deleting product.")
      }
    }
  };
  

  const handleOpenProduct = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setCurrentProduct({
        productName: product.ProductName,
        Product_Slug: product.Product_Slug,
        productDescription: product.ProductDescription,
        productImage: null,
        ProductMrp : product.ProductMrp,
        price: product.ProductPrice,
      });
    } else {
      setEditingProduct(null);
      setCurrentProduct({
        productName: "",
        Product_Slug: "",
        productDescription: "",
        productImage: null,
        ProductMrp:"",
        price: "",
      });
    }
    setOpen(true);
  };

  const handleCloseProduct = () => {
    setOpen(false);
    setEditingProduct(null);
    setCurrentProduct({
      productName: "",
      Product_Slug: "",
      productDescription: "",
      productImage: null,
      ProductMrp:"",
      price: "",
    });
  };

  // Calculate Discount Percentage
  const calculateDiscount = () => {
    const { ProductMrp, price } = currentProduct;
    const mrp = parseFloat(ProductMrp);
    const sellingPrice = parseFloat(price);
    if (!isNaN(mrp) && !isNaN(sellingPrice) && mrp > sellingPrice) {
      return Math.round(((mrp - sellingPrice) / mrp) * 100);
    }
    return null;
  };
  return (
    <AdminLayout>
    <div className="container mx-auto mt-20">
      <button
        onClick={() => handleOpenProduct()}
        className="bg-green-700 text-white px-4 mx-2 md:mx-0 py-2 rounded hover:bg-green-800">
        Add Product
      </button>
      <div className="mt-6">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="text-left">
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Slug</th>
              <th className="border border-gray-300 px-4 py-2">MRP</th>
              <th className="border border-gray-300 px-4 py-2">SP</th>
              <th className="border border-gray-300 px-4 py-2">Discount</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...products].reverse().map((product) => (
              <tr key={product.ProductID}>
                <td className="border border-gray-300 px-4 py-2">
                  {product.ProductImage && (
                    <Image
                      src={product.ProductImage}
                      alt={product.ProductName}
                      height={100}
                      width={100}
                      className="h-20 w-20 object-cover rounded-xl shadow-lg bg-white px-3 py-1"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-[0.6rem] md:text-sm leading-none">
                  {product.ProductName}  <Addproductcategory ProdID={product.ProductID}/>
                </td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-[0.6rem] md:text-sm leading-none">
                {product.Product_Slug}
                </td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-[0.7rem] md:text-sm leading-none">
               <strike>{product.ProductMrp}</strike>
                </td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-[0.7rem] md:text-sm">
                {product.ProductPrice}
                </td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-[0.7rem] md:text-sm leading-none">
                {product.ProductMrp && product.ProductPrice ? `${Math.round(((product.ProductMrp - product.ProductPrice) / product.ProductMrp) * 100)}%` : "0%"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                <div className="flex space-x-2">
                <button
                  onClick={() => handleOpenProduct(product)}
                  className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.ProductID)}
                  className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-800"
                >
                  Delete
                </button>
              </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding/Editing Product */}
      <Modal open={open} className="overflow-scroll" onClose={handleCloseProduct}>
        <Box
          sx={{
            minWidth: 200,
            maxWidth:800,
            bgcolor: "white",
            p: 2,
            mx: "auto",
            mt: 10,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-4">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>
          <span>
            <button onClick={handleCloseProduct} className="bg-gray-300 px-2 py-1 rounded-sm text-sm text-white">skip</button>
          </span>
          </div>

          <input
            type="text"
            name="productName"
            value={currentProduct.productName}
            onChange={handleProductChange}
            placeholder="Product Name"
            className="w-full border px-3 py-2 rounded mb-4"
          />
           <input
            type="text"
            name="Product_Slug"
            value={currentProduct.Product_Slug}
            onChange={handleProductChange}
            placeholder="Product Slug"
            className="w-full bg-gray-100 border px-3 py-2 rounded mb-4"
            disabled="true"
          />
          <Editor
            apiKey="9hjqys1r2up70nnvnczhz36wbrm1p8a2x6tnrzxl83ewf2d0"
            value={currentProduct.productDescription}
            onEditorChange={handleProductDescriptionChange}
            init={{
              height: 400,
              menubar: false,
              plugins: "link image code",
              toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright | code",
            }}
          />
          <div className="my-4">
          <span className="font-semibold">Upload Product Image</span>
          <input
            type="file"
            onChange={handleProductImageChange}
            className="w-full border px-3 py-2 rounded"
          />
          </div>
          {/* <input
            type="text"
            name="ProductMrp"
            value={currentProduct.ProductMrp}
            onChange={handleProductChange}
            placeholder="MRP"
            className="w-full border px-3 py-2 rounded mb-4"
          />
          <input
            type="text"
            name="price"
            value={currentProduct.price}
            onChange={handleProductChange}
            placeholder="Price"
            className="w-full border px-3 py-2 rounded mb-4"
          /> */}
      <div className="justify-start md:space-x-2">
      <input
        type="text"
        name="ProductMrp"
        value={currentProduct.ProductMrp}
        onChange={handleProductChange}
        placeholder="MRP"
        className="border px-3 py-2 rounded mb-4"
      />
      <input
        type="text"
        name="price"
        value={currentProduct.price}
        onChange={handleProductChange}
        placeholder="Price"
        className="border px-3 py-2 rounded mb-4"
      />
      {calculateDiscount() !== null && (
        <p className="text-green-600 font-medium">
          Discount: {calculateDiscount()}% OFF
        </p>
      )}
    </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmitProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            >
              Submit
            </button>
            <button
              onClick={handleCloseProduct}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
    </AdminLayout>
  );
};

export default dynamic(() => Promise.resolve(Product), { ssr: false });
