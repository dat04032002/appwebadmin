import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import FromaddCustomer from './FromaddCustomer'
import { id } from 'date-fns/locale'

export default function Customers() {
  const [records, setRecords]= useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(12);
  const [isAdding, setIsAdding] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  var nf = new Intl.NumberFormat()
  
    useEffect(() => {
      const callApi = async () => {
          try {
              const response = await axios.get(`https://localhost:7084/api/Customers?pageNumber=${pageNumber}&pageSize=${pageSize}`);
              setRecords(response.data);
              console.log(response)
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      callApi();
  }, [pageNumber, pageSize]);
  
  const xoa= async(id)=>{
    var res= await axios.delete(`https://localhost:7084/api/Customers/${id}`)
    console.log(res)
  
    if(res.status===204){
      alert("Bạn đã xóa sản phẩm thành công")
    }else{
      alert(res.error)
    }
  }

  const openAddModal = () => {
    setShowModal(true);
    setIsAdding(true);
    setSelectedProduct(null);
  };

  const openEditModal = (product) => {
    setShowModal(true);
    setIsAdding(false);
    setSelectedProduct(product);
  };
  
  return (
    <div>
    	<div className="container flex justify-center mx-auto">
  <div className="flex flex-col">
    <div className="w-full">
    <div>
        <button onClick={openAddModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Thêm mới
          </button>
          {showModal && <FromaddCustomer onClose={() => setShowModal(false)} isAdding={isAdding} setIsAdding={setIsAdding} selectedProduct={selectedProduct} />}
        </div> 
     
      <div className="border-b border-gray-200 shadow mt-5">
     
        <table className="divide-y divide-green-400 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-2 text-xs text-gray-500">
                ID
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                Tên Khách Hàng
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                Địa Chỉ
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                Số Điện Thoại
              </th>    
              <th className="px-6 py-2 text-xs text-gray-500">
                Email
              </th>      
              <th className="px-6 py-2 text-xs text-gray-500">
                Password
              </th> 
              <th className="px-6 py-2 text-xs text-gray-500">
                Edit
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {records.map((e, i) => {
              return (
                <tr key={i} className="whitespace-nowrap">
                  <td className="px-6 py-4 text-sm text-gray-500">{e.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{e.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{e.address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{e.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-rose-500 ">{e.email}</td>
                  
                  <td className="px-6 py-4 text-sm text-rose-500 ">{e.password}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => openEditModal(e,id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 
                          2 0 112.828 
                          2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={()=>xoa(e.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 
                          4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
