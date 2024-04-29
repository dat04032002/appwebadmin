import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FromAdd from './FromAdd.jsx';
import unidecode from 'unidecode';

export default function Products() {
  const [records, setRecords] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(12);
  const [isAdding, setIsAdding] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  var nf = new Intl.NumberFormat();

  const callApi = async () => {
    try {
      const response = await axios.get(`https://localhost:7084/api/Products/GETALL`);
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    callApi();
  }, [pageNumber, pageSize]);
  useEffect(() => {
    callApi();
  }, [showModal]);
  const xoa = async (id) => {
    var res = await axios.delete(`https://localhost:7084/api/Products/${id}`);
    console.log(res);
    alert('Bạn đã xóa sản phẩm thành công');
    callApi();
    setSearchTerm('');
  };

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

  useEffect(() => {
    if (searchTerm === '') {
      callApi();
    } else { 
      const filteredData = [...records].filter(product =>
        unidecode(product.name.toLowerCase()).includes(unidecode(searchTerm.toLowerCase()))
      );
      setRecords(filteredData);
    }
  }, [searchTerm]); 

  return (
    <div className="container flex justify-center mx-auto">
      <div className="flex flex-col">
        <div className="w-full">
          <div className='flex'>
            <div>
            <button onClick={openAddModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Thêm mới
              </button>
              {showModal && <FromAdd onClose={() =>  setShowModal(false)}  isAdding={isAdding} setIsAdding={setIsAdding} selectedProduct={selectedProduct} />}
            </div>                    
            <div className='max-w-md ml-auto'>
              <div className=" flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden ">
                  <div className="grid place-items-center h-full w-12 text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                  </div>
                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 "
                    type="text"
                    id="search"
                    placeholder="Search by name" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}                  
                  /> 
                </div>
            </div>
          </div>

          <div className="border-b border-gray-200 shadow mt-5">
            <table className="divide-y divide-green-400">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-2 text-xs text-gray-500">
                    ID
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">
                     Image
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">
                    Quantity
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">                 
                    Price
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
                {records.map((product, index) => (
                  <tr key={index} className="whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500">{product.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <img src={`https://localhost:7084/image/${product.image}`} alt={product.name} className="w-16" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{product.quantity}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-rose-500">{nf.format(product.price)} đ</td>
                    <td className="px-6 py-4">
                      <button onClick={() => openEditModal(product)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => xoa(product.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
