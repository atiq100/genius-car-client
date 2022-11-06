import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const OrderRow = ({order,handleDelete,handleUpdateStatus}) => {
    const {_id,email,phone,serviceName,price,customer,service,status}= order
    const [orderService,setOrderService]=useState()
    useEffect(()=>{
        fetch(`http://localhost:5000/services/${service}`)
        .then(res=>res.json())
        .then(data=>setOrderService(data))
    },[service])

    
    return (
        
            <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
					<td className="p-3">
						<p>{customer}</p>
					</td>
					<td className="p-3">
						<p>{email}</p>
					</td>
                    <td className="p-3">
						<p>{phone}</p>
					</td>
					<td className="p-3">
						<p>{serviceName}</p>
					</td>
                    <td className="p-3">
						
                            <div className='w-24 rounded'>
                                {
                                    orderService?.img &&
                                    <img src={orderService.img} alt=""  />
                                }
                            </div>
                      
					</td>
					
					<td className="p-3 ">
						<p>${price}</p>
					</td>
					<td className="p-3 ">
						<span className="btn btn-sm px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
							<span onClick={ () => handleUpdateStatus(_id)}>{status ? status:'Pending'}</span>
						</span>
					</td>
                    <td className="p-3 ">
						<span className="px-3 py-1 font-semibold curso">
							<span><button  onClick={() => handleDelete(_id)}>❌</button></span>
						</span>
					</td>
				</tr>
        
    );
};

export default OrderRow;