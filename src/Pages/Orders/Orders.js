import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const {user,logout}=useContext(AuthContext)
    const [orders,setOrders] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:5000/orders?email=${user?.email}`,{
            headers:{
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })//specific user tar order dekte
        .then(res=>{
            if(res.status === 401 || res.status === 403){
                logout()
            }
            return res.json()
        })
        .then(data=>{
            setOrders(data)
        })
    },[user?.email])

    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure,you want to cancel this order');
        if(proceed){
            fetch(`http://localhost:5000/orders/${id}`,{
                method:'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.deletedCount > 0){
                    alert('deleted successfully')
                    const remaining = orders.filter(odr => odr._id !== id);
                    setOrders(remaining)
                }
                console.log(data);
            })
        }
    }
    const handleUpdateStatus = id =>{
        fetch(`http://localhost:5000/orders/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status: 'Approved'})
        })
        .then(res=>res.json())
        .then(data=> {
            console.log(data);
            if(data.modifiedCount > 0){
                const remaining = orders.filter(odr => odr._id !== id);
                const approving = orders.find(odr=> odr._id === id);
                approving.status = 'Approved'

                const newOrders = [approving, ...remaining]
                setOrders(newOrders)
            }
        })
    }

    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
	<h2 className="mb-4 text-2xl font-semibold text-black">you have {orders.length} orders</h2>
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			<colgroup>
				<col/>
				<col/>
				<col/>
				<col/>
				<col/>
				<col className="w-24"/>
			</colgroup>
			<thead className="dark:bg-gray-700">
				<tr className="text-left">
					<th className="p-3">Name</th>
					<th className="p-3">Email</th>
					<th className="p-3">Phone</th>
					<th className="p-3">Product name</th>
					<th className="p-3">Product image</th>
					<th className="p-3 ">Amount</th>
					<th className="p-3">Status</th>
					<th className="p-3">Action</th>
				</tr>
			</thead>
			<tbody>
                {
				orders.map(order=><OrderRow
                key={order._id}
                order={order}
                handleDelete={handleDelete}
                handleUpdateStatus={handleUpdateStatus}
                ></OrderRow>)
}
			</tbody>
		</table>
	</div>
</div>
        </div>
    );
};

export default Orders;