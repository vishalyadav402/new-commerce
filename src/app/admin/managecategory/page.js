"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/app/AdminLayout';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
// import ToggleOnIcon from '@mui/icons-material/ToggleOn';
// import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { Box, Modal } from '@mui/material';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSubcategory, setIsEditingSubcategory] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ CategoryID: null, CategoryName: '', CategoryImage: null, Slug: '' });
  const [currentSubcategory, setCurrentSubcategory] = useState({ SubcategoryID: null, SubcategoryName: '', SubcategoryImage: null, CategoryID: '', Slug: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get('https://api.therashtriya.com/api/categories');
    setCategories(response.data);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, '-')      // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ''); // Remove all non-alphanumeric characters except hyphens
  };

  const handleOpen = (category = { CategoryID: null, CategoryName: '', CategoryImage: null, Slug: '' }) => {
    setIsEditing(Boolean(category.CategoryID));
    setCurrentCategory(category);
    setOpen(true);
  };

  const handleOpenSubcategory = (subcategory = { SubcategoryID: null, SubcategoryName: '', SubcategoryImage: null, CategoryID: '', Slug: '' }) => {
    setIsEditingSubcategory(Boolean(subcategory.SubcategoryID));
    setCurrentSubcategory(subcategory);
    setOpenSubcategory(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCategory({ CategoryID: null, CategoryName: '', CategoryImage: null, Slug: '' });
  };

  const handleCloseSubcategory = () => {
    setOpenSubcategory(false);
    setCurrentSubcategory({ SubcategoryID: null, SubcategoryName: '', SubcategoryImage: null, CategoryID: '', Slug: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
      Slug: name === 'CategoryName' ? generateSlug(value) : prevCategory.Slug
    }));
  };

  const handleChangeSubcategory = (e) => {
    const { name, value } = e.target;
    setCurrentSubcategory((prevSubcategory) => ({
      ...prevSubcategory,
      [name]: value,
      Slug: name === 'SubcategoryName' ? generateSlug(value) : prevSubcategory.Slug
    }));
  };

  const handleFileChange = (e) => {
    setCurrentCategory({ ...currentCategory, CategoryImage: e.target.files[0] });
  };

  const handleFileChangeSubcategory = (e) => {
    setCurrentSubcategory({ ...currentSubcategory, SubcategoryImage: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('categoryName', currentCategory.CategoryName);
    formData.append('slug', currentCategory.Slug);
    if (currentCategory.CategoryImage) {
      formData.append('image', currentCategory.CategoryImage);
    }

    if (isEditing) {
      await axios.put(`https://api.therashtriya.com/api/category/${currentCategory.CategoryID}`, formData);
      console.log("category updated")
    } else {
      await axios.post('https://api.therashtriya.com/api/category', formData);
    }
    fetchCategories();
    handleClose();
  };

  const handleSubmitSubcategory = async () => {
    const formData = new FormData();
    formData.append('subcategoryName', currentSubcategory.SubcategoryName);
    formData.append('categoryID', currentSubcategory.CategoryID);
    formData.append('slug', currentSubcategory.Slug);

    if (currentSubcategory.SubcategoryImage) {
      formData.append('image', currentSubcategory.SubcategoryImage);
    }

    if (isEditingSubcategory) {
      await axios.put(`https://api.therashtriya.com/api/subcategory/${currentSubcategory.SubcategoryID}`, formData);
    } else {
      await axios.post('https://api.therashtriya.com/api/subcategory', formData);
    }
     alert("Sub category updated successfully.")
    fetchCategories();
    handleCloseSubcategory();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://api.therashtriya.com/api/category/${id}`);
    fetchCategories();
  };

  const handleDeleteSubcategory = async (id) => {
    await axios.delete(`https://api.therashtriya.com/api/subcategory/${id}`);
    fetchCategories();
  };

// update category status
  const updateCategoryStatus = async (id, status) => {
    const url = `https://api.therashtriya.com/api/category/status/${id}`;
    try {
        const response = await axios.put(url, { status });
        console.log('Response:', response.data);
        fetchCategories();
        return response.data;
    } catch (error) {
        console.error('Error updating category status:', error);
        throw error;
    }
};

// update subcategory status
const updateSubCategoryStatus = async (id, status) => {
  const url = `https://api.therashtriya.com/api/subcategory/status/${id}`;

  try {
      const response = await axios.put(url, { status });
      console.log('Response:', response.data);
      fetchCategories();
      return response.data;
  } catch (error) {
      console.error('Error updating category status:'+ error);
      throw error;
  }finally{
    fetchCategories();
    console.log("updated")
  }
};

const [expandedCategory, setExpandedCategory] = useState(null);

const toggleCategory = (categoryID) => {
  setExpandedCategory(expandedCategory === categoryID ? null : categoryID);
};
  return (
    <AdminLayout>
    <div className="container mx-auto">
      <div className="flex mb-4">
        <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded mr-2" onClick={() => handleOpen()}>Add Category</button>
        <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded" onClick={() => handleOpenSubcategory()}>Add Subcategory</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className='text-left'>
            <tr>
            <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Slug</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {categories.map(category => (
              <React.Fragment key={category.CategoryID}>
                <tr>
                <td className="py-2 px-4 border-b">
                    <img src={category.CategoryImage} alt={category.CategoryName} className="w-12 h-12" />
                  </td>
                  <td className="py-2 px-4 border-b font-medium"> <KeyboardArrowRightIcon fontSize='medium' color='info'/> {category.CategoryName}</td>
                  <td className="py-2 px-4 border-b text-gray-400">{category.Cat_Slug}</td>
                  <td className="py-2 px-4 border-b flex">
                    <button className= {category.cat_isActive =="true" ? "bg-orange-700 hover:bg-orange-800 text-white px-2 py-1 rounded mr-2 text-sm font-semibold":"bg-gray-400 hover:bg-gray-600 text-white px-2 py-1 rounded mr-2 text-sm font-semibold"} onClick={()=>updateCategoryStatus(category.CategoryID)}>{category.cat_isActive =="true" ? "Online":"Offline"}</button>
                    <button className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 mr-2" onClick={() => handleOpen(category)}><EditNoteIcon/></button>
                    <button className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-800" onClick={() => handleDelete(category.CategoryID)}><DeleteForeverIcon/></button>
                  </td>
                </tr>

                {category.Subcategories.map(subcategory => (
                  <tr key={subcategory.SubcategoryID}>
                     <td className="py-2 px-4 border-b">
                      <img src={subcategory.SubcategoryImage} alt={subcategory.SubcategoryName} className="w-12 h-12" />
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700"> <KeyboardDoubleArrowRightIcon color='warning'/> {subcategory.SubcategoryName}</td>
                    <td className="py-2 px-4 border-b text-gray-400">{subcategory.subCat_Slug}</td>
                    <td className="py-2 px-4 border-b flex">
                     {category.cat_isActive =="false"?
                      <>
                      <button className="bg-gray-400 hover:bg-gray-600 text-white px-2 py-1 rounded mr-2 text-sm font-semibold">Offline</button>
                      </>
                      :
                      <>
                      <button className= {subcategory.subcat_isActive =="true" ? "bg-orange-700 hover:bg-orange-800 text-white px-2 py-1 rounded mr-2 text-sm font-semibold":"bg-gray-400 hover:bg-gray-600 text-white px-2 py-1 rounded mr-2 text-sm font-semibold"} onClick={()=>updateSubCategoryStatus(subcategory.SubcategoryID)}>{subcategory.subcat_isActive =="true" ? "Online":"Offline"}</button>
                      </>
                      }
                      <button className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 mr-2" onClick={() => handleOpenSubcategory({...subcategory, CategoryID: category.CategoryID})}><EditNoteIcon/></button>
                      <button className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-800" onClick={() => handleDeleteSubcategory(subcategory.SubcategoryID)}><DeleteForeverIcon/></button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))} */}
            {categories.map((category) => (
          <React.Fragment key={category.CategoryID}>
            <tr className="bg-gray-100 border-b">
              <td className="py-2 px-4">
                <img src={category.CategoryImage} alt={category.CategoryName} className="w-12 h-12" />
              </td>
              <td className="py-2 px-4 font-medium self-center">
                <div className='flex'>
                <button
                  className="mr-2 focus:outline-none"
                  onClick={() => toggleCategory(category.CategoryID)}
                >
                  {expandedCategory === category.CategoryID ? "▼" : "▶"}
                </button>
                <KeyboardArrowRightIcon fontSize="medium" color="info" /> {category.CategoryName}
                </div>
              </td>
              <td className="py-2 px-4 text-gray-400">{category.Cat_Slug}</td>
              <td className="py-2 px-4 self-center">
                <div className='flex'>
                <button
                  className={
                    category.cat_isActive === "true"
                      ? "bg-orange-700 hover:bg-orange-800 text-white px-2 py-1 rounded mr-2 text-sm font-semibold"
                      : "bg-gray-400 hover:bg-gray-600 text-white px-2 py-1 rounded mr-2 text-sm font-semibold"
                  }
                  onClick={() => updateCategoryStatus(category.CategoryID)}
                >
                  {category.cat_isActive === "true" ? "Online" : "Offline"}
                </button>
                <button className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 mr-2" onClick={() => handleOpen(category)}>
                  <EditNoteIcon />
                </button>
                <button className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-800" onClick={() => handleDelete(category.CategoryID)}>
                  <DeleteForeverIcon />
                </button>
                </div>
              </td>
            </tr>

            {expandedCategory === category.CategoryID &&
              category.Subcategories.map((subcategory) => (
                <tr key={subcategory.SubcategoryID} className="bg-gray-50 border-b">
                  <td className="py-2 px-4">
                    <img src={subcategory.SubcategoryImage} alt={subcategory.SubcategoryName} className="w-12 h-12" />
                  </td>
                  <td className="py-2 px-4 text-gray-700 self-center">
                  <div className='flex'><KeyboardDoubleArrowRightIcon color="warning" /> {subcategory.SubcategoryName}</div>
                  </td>
                  <td className="py-2 px-4 text-gray-400 self-center">{subcategory.subCat_Slug}</td>
                  <td className="py-2 px-4 self-center">
                  <div className='flex'>
                    {category.cat_isActive === "false" ? (
                      <button className="bg-gray-400 hover:bg-gray-600 text-white px-2 py-1 rounded mr-2 text-sm font-semibold">Offline</button>
                    ) : (
                      <button
                        className={
                          subcategory.subcat_isActive === "true"
                            ? "bg-orange-700 hover:bg-orange-800 text-white px-2 py-1 rounded mr-2 text-sm font-semibold"
                            : "bg-gray-400 hover:bg-gray-600 text-white px-2 py-1 rounded mr-2 text-sm font-semibold"
                        }
                        onClick={() => updateSubCategoryStatus(subcategory.SubcategoryID)}
                      >
                        {subcategory.subcat_isActive === "true" ? "Online" : "Offline"}
                      </button>
                    )}
                    <button className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 mr-2" onClick={() => handleOpenSubcategory({ ...subcategory, CategoryID: category.CategoryID })}>
                      <EditNoteIcon />
                    </button>
                    <button className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-800" onClick={() => handleDeleteSubcategory(subcategory.SubcategoryID)}>
                      <DeleteForeverIcon />
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
          </React.Fragment>
        ))}
          </tbody>
        </table>
      </div>

      {/* {open && ( */}
        <Modal open={open} onClose={handleClose}>
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
          <div className='flex justify-between'>
            <h2 className="text-lg font-bold">{isEditing ? 'Edit Category' : 'Add Category'}</h2>
            <span>
            <button onClick={handleClose} className="bg-gray-300 px-2 py-1 rounded-sm text-sm text-white">skip</button>
          </span>
          </div>
            {/* category */}
            <input
              type="text"
              placeholder="Category Name"
              name="CategoryName"
              value={currentCategory.CategoryName}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full mt-2"
            />
            <input
              type="text"
              placeholder="Slug"
              name="Slug"
              value={!currentCategory.Slug?currentCategory.Cat_Slug:currentCategory.Slug}
              // currentCategory.Cat_Slug
              className="border border-gray-300 p-2 w-full mt-2"
              disabled
            />
            <input type="file" onChange={handleFileChange} className="mt-2" />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={handleSubmit} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">{isEditing ? 'Update' : 'Add'}</button>
              <button onClick={handleClose} className="bg-gray-300 text-white px-2 py-1 rounded hover:bg-gray-400">Cancel</button>
            </div>
        </Box>
        </Modal>
      {/* )} */}

        <Modal open={openSubcategory} onClose={handleClose}>
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
          <div className='flex justify-between'>
            <h2 className="text-lg font-bold">{isEditingSubcategory ? 'Edit Subcategory' : 'Add Subcategory'}</h2>
            <span>
            <button onClick={handleClose} className="bg-gray-300 px-2 py-1 rounded-sm text-sm text-white">skip</button>
          </span>
          </div>
            <input
              type="text"
              placeholder="Subcategory Name"
              name="SubcategoryName"
              value={currentSubcategory.SubcategoryName}
              onChange={handleChangeSubcategory}
              className="border border-gray-300 p-2 w-full mt-2"
            />
            <input
              type="text"
              placeholder="Slug"
              name="Slug"
              value={currentSubcategory.Slug}
              className="border border-gray-300 p-2 w-full mt-2"
              disabled
            />
            <select
              name="CategoryID"
              value={currentSubcategory.CategoryID}
              onChange={handleChangeSubcategory}
              className="border border-gray-300 p-2 w-full mt-2"
            >
              {categories.map(category => (
                <option key={category.CategoryID} value={category.CategoryID}>{category.CategoryName}</option>
              ))}
            </select>
            <input type="file" onChange={handleFileChangeSubcategory} className="mt-2" />
            <div className="mt-4 flex justify-end">
              <button onClick={handleCloseSubcategory} className="bg-gray-300 text-white px-2 py-1 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleSubmitSubcategory} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 ml-2">{isEditingSubcategory ? 'Update' : 'Add'}</button>
            </div>
          </Box>
        </Modal>

    {/* open modal popup */}
        </div>
    </AdminLayout>
  );
};

export default ManageCategory;