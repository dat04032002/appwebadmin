import React from 'react'
import {X} from'lucide-react'; 
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
function FromAddPC( {onClose,isAdding, setIsAdding,selectedProduct}) {

   
    const [Addcategory, setAddcategory] = useState([]);
    const [inputvalue, setInputvalue] = useState({
      productcategory: '',
      image: '',
      description: ''
    });
    const [selectedFile, setSelectedFile] = useState(null); // Lưu trữ file đã chọn
  
    const onchaneinput = (event) => {
      setInputvalue({ ...inputvalue, [event.target.name]: event.target.value });
    };
  
    const onchaneinputcata = (event) => {
      setInputvalue({ ...inputvalue, categoryID: event.target.value });
    };
  
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
      
        console.log("file", file);
      };
      
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.table(inputvalue);
      try {
        const formData = new FormData(); 
       
        formData.append('file', selectedFile); 
        formData.append('image', "anh");
        formData.append('productcategory', inputvalue.productcategory); 
        formData.append('description', inputvalue.description);
        formData.append('id', 0);
        console.log("from", formData)
  
        const res = await axios.post('https://localhost:7084/api/ProductCategories', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        console.log(res);
        if (res.status === 204) {

         
        } else {
          alert(res.data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
   
  
    useEffect(() => {
      if (selectedProduct) {
        setInputvalue(selectedProduct);
      }
    }, [selectedProduct]);
  
    const handleSubmitUpdate = async (event) => {
      event.preventDefault();
      try {
        const formData = new FormData(); 
       
        formData.append('file', selectedFile?selectedFile:null); 
        formData.append('image', inputvalue.image);
        formData.append('productcategory', inputvalue.productcategory); 
        formData.append('description', inputvalue.description);
        formData.append('id', inputvalue.id);
        const res = await axios.put(`https://localhost:7084/api/ProductCategories/${inputvalue.id}`, formData);
        console.log(res);
        if (res.status === 204) {
          alert('Bạn đã sửa sản phẩm thành công');
         
        } else {
          alert(res.data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
  return (
    <div  className='justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm '>
        <div className="border rounded-lg border-gray-300 p-4 bg-white">
        <div className="flex justify-end">
          <div onClick={onClose}><X size={30} /></div>
        </div>
            <form className="w-full max-w-lg bg-slate-100">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Loại Sản Phẩm:
                        </label>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            id="grid-first-name" 
                            type="text" 
                            name="productcategory"
                            value={inputvalue.productcategory}
                            onChange={onchaneinput}
                        />                  
                    </div>
                    
              
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Image file:
                        </label>
                       
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="grid-last-name"
                            type="file"
                            name="Image"
                            onChange={handleFileChange} 
                        />
                    </div>
                    {inputvalue.image &&
                
                    <div className="w-full md:w-1/2 px-3">
                   
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Image:
                        </label>
                       <img src={`https://localhost:7084/image/${inputvalue.image}`}  className=' w-32' />
                       
                    </div>}
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full h-40 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Chú Thích
                        </label>
                        <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"                                                   
                            value={inputvalue.description} 
                            name="description" 
                            onChange={onchaneinput} 
                        />                  
                    </div>                
                      
                </div>  
                <div className='flex justify-end'>
                        {isAdding ? (
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10" onClick={handleSubmit}>
                                THÊM MỚI
                            </button>
                        ) : (
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10" onClick={handleSubmitUpdate}>
                                CẬP NHẬT
                            </button>
                        )}
                    </div>         
            </form>
        </div>
    </div>
  )
}

export default FromAddPC