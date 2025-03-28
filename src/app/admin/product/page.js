"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AdminLayout from "@/app/AdminLayout";
import Swal from "sweetalert2"; 
import Addproductcategory from "../component/Addproductcategory";

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
      } else {
        await axios.post("https://api.therashtriya.com/api/product", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchProducts();
      handleCloseProduct();
    } catch (error) {
      alert("Error creating/updating product: " + error);
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
        Swal.fire("Deleted!", "The product has been deleted.", "success");
        fetchProducts();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
        console.error("Error deleting product:", error);
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

  return (
    <AdminLayout>
    <div className="container mx-auto">
      <button
        onClick={() => handleOpenProduct()}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
        Add Product
      </button>
      <div className="mt-6">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="text-left">
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Product Slug</th>
              <th className="border border-gray-300 px-4 py-2">MRP</th>
              <th className="border border-gray-300 px-4 py-2">Sell Price</th>
              <th className="border border-gray-300 px-4 py-2">(%)Disc</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.ProductID}>
                <td className="border border-gray-300 px-4 py-2">
                  {product.ProductImage && (
                    <img
                      src={product.ProductImage}
                      alt="Product"
                      className="h-16 w-16 object-cover"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.ProductName}<br/>
                  <Addproductcategory ProdID={product.ProductID}/>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                {product.Product_Slug}
                </td>
                <td className="border border-gray-300 px-4 py-2">
               <strike> ₹ {product.ProductMrp}</strike>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                ₹ {product.ProductPrice}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                0 %
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
      <Modal open={open} onClose={handleCloseProduct}>
        <Box
          sx={{
            minWidth: 200,
            maxWidth:800,
            bgcolor: "white",
            p: 4,
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
            className="w-full border px-3 py-2 rounded mb-4"
          />
          <Editor
            apiKey="9hjqys1r2up70nnvnczhz36wbrm1p8a2x6tnrzxl83ewf2d0"
            value={currentProduct.productDescription}
            onEditorChange={handleProductDescriptionChange}
            init={{
              height: 200,
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
          <input
            type="text"
            name="mrp"
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
          />
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

export default Product;
