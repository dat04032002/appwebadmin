import React from 'react'
import {X} from'lucide-react'; 
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function FromaddOrder( {onClose,isAdding, setIsAdding,selectedProduct}) {
    const location = useParams();
    const [inputvalue, setInputvalue] = useState({});

  
    const onchaneinput = (event) => {
      setInputvalue({ ...inputvalue, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        if (selectedProduct) {
          setInputvalue(selectedProduct);
        }
      }, [selectedProduct]);
      

    const handleSubmit=async (event)=>{
        event.preventDefault();
        var res = await axios.post('https://localhost:7084/api/Orders',inputvalue)
        console.log(res)
        if(res.status === 201){
          alert("Bạn đã thêm đơn hàng thành công")
        }
        else{
          alert(res.data.error)
        }
      }
    const handleSubmitUpdate = async (event) => {
      event.preventDefault();
      try {
      
        const res = await axios.put(`https://localhost:7084/api/Orders/${inputvalue.id}`, inputvalue);
        console.log(res);
        if (res.status === 204) {
          alert('Bạn đã sửa đơn hànhg thành công');
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
                        Tên Khách Hàng:
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="grid-first-name" 
                        type="text" 
                        name="fullname"
                        value={inputvalue.fullname}
                        onChange={onchaneinput}
                    />                  
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Ngày Đặt Hàng:
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                       id="grid-last-name" 
                       type="date"
                       name="orderdate"
                       value={inputvalue.orderdate}
                       onChange={onchaneinput}
                    />
                    </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Tổng giá trị đơn hàng:
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="grid-first-name" 
                        type="number" 
                        name="priceSum"
                        value={inputvalue.priceSum}
                        onChange={onchaneinput}
                    />                  
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Địa chỉ:
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                       id="grid-last-name" 
                       type="text"
                       name="address"
                       value={inputvalue.address}
                       onChange={onchaneinput}
                    />
                    </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Số điện thoại:
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="grid-first-name" 
                        type="number" 
                        name="phoneNumber"
                        value={inputvalue.phoneNumber}
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

