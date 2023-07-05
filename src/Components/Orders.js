import React, { useEffect, useState, useContext } from "react";
import '../css/orders.css'
import OrderItem from "./OrderItem";
import {db} from '../config/firebase'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import OrderContext from "../context/orders/orderContext";
import {Modal} from 'react-bootstrap'


export default function Orders() {
    // Firebase
    const orderCollection = collection(db, 'Order')
    const {activeOrders, setActiveOrders, readyOrders, setReadyOrders, lastOrderDelivered } = useContext(OrderContext)

    const [pendinConfOrders, setPendingConfOrders] = useState([])
    const [time, setTime] = useState('')

    const [isFullOrderModal, setIsFullOrderModal] = useState({
        state: false, 
        orderNumber: 0, 
        createdAt: '', 
        products: [], 
        action: 0, 
        totalQuantity: 0, 
        totalAmount: 0, 
        orderid: ''
    })

    const handleCloseFullOrderModal = () => {
        setIsFullOrderModal({
            state: false, 
            orderNumber: 0, 
            createdAt: '', 
            products: [], 
            action: 0, 
            totalQuantity: 0, 
            totalAmount: 0, 
            orderid: ''
        })
    }

    const handleOpenFullOrderModal = (orderNumber, createdAt, products, action, totalQuantity, totalAmount, orderid) => {
        setIsFullOrderModal({
            state: true, 
            orderNumber: orderNumber, 
            createdAt: createdAt, 
            products: products, 
            action: action, 
            totalQuantity: totalQuantity, 
            totalAmount: totalAmount, 
            orderid: orderid
        })
    }

    
    const getTime = () => {
        setInterval(() => {
            var currentTime = new Date();
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes().toString().padStart(2, '0');
            var seconds = currentTime.getSeconds().toString().padStart(2, '0');
            var ampm = hours >= 12 ? 'PM' : 'AM';

            // Convert hours to 12-hour format
            hours = hours % 12 || 12;
            currentTime = hours.toString().padStart(2, '0') + ':' + minutes + ':' + seconds + ' ' + ampm;
            setTime(currentTime)
        }, 1000)
    }

    async function orders() {
        const q1 = query(orderCollection, where("outlet", "==", localStorage.getItem('selectedOutlet')), where("status", "==", "PAYMENT_RECIEVED"));
        const q2 = query(orderCollection, where("outlet", "==", localStorage.getItem('selectedOutlet')), where("status", "==", "ORDER_CONFIRMED"));
        const q3 = query(orderCollection, where("outlet", "==", localStorage.getItem('selectedOutlet')), where("status", "==", "READY"));
        
        onSnapshot(q1, (querySnapshot) => {
            const orders = [];
            querySnapshot.forEach((doc) => {
            orders.push(doc.data());
            });
            // Process the orders as needed
            setPendingConfOrders(orders);
        });

        const unQ2 = onSnapshot(q2, (querySnapshot) => {
            const orders = [];
            querySnapshot.forEach((doc) => {
                orders.push(doc.data());
            });

            // Process the orders as needed
            setActiveOrders(orders) 
        });

        const unQ3 = onSnapshot(q3, (querySnapshot) => {
            const orders = [];
            querySnapshot.forEach((doc) => {
                orders.push(doc.data());
            });

            // Process the orders as needed
            setReadyOrders(orders) 
        });

        setTimeout(() => {
            unQ2()
            unQ3()
        }, 5000)
    }
    
    const startQ1Interval = () => {
        setInterval(() => {
            const q1 = query(
                orderCollection,
                where("outlet", "==", localStorage.getItem('selectedOutlet')),
                where("status", "==", "PAYMENT_RECIEVED")
            );
            onSnapshot(q1, (querySnapshot) => {
                const orders = [];
                querySnapshot.forEach((doc) => {
                orders.push(doc.data());
                });
                // Process the orders as needed
                setPendingConfOrders(orders);
            });
        }, 60000);
    }
    
    useEffect(() => {
        getTime()
        orders()
        startQ1Interval()
    },[])
    
    return (
        <div>
            {/* Complete order modal */}
            <Modal show={isFullOrderModal.state} onHide={handleCloseFullOrderModal}>
                <Modal.Header className="d-flex justify-content-between">
                    <div><p></p></div>
                    <div>
                        <Modal.Title style={{textAlign: 'center'}}>Full Order</Modal.Title>
                    </div>
                    <div>
                        <button type="button" className="btn-close" onClick={handleCloseFullOrderModal}></button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex modalItem justify-content-center mt-5 mb-3">
                        <OrderItem 
                            orderNumber={isFullOrderModal.orderNumber} 
                            createdAt={isFullOrderModal.createdAt}
                            products={isFullOrderModal.products}
                            action={isFullOrderModal.action}
                            totalQuantity={isFullOrderModal.totalQuantity}
                            totalAmount={isFullOrderModal.totalAmount}
                            orderid={isFullOrderModal.orderid}
                            leftOver={false}
                        />
                    </div>
                </Modal.Body>
            </Modal>



            <div className="topRow d-flex justify-content-between">
                <div className="currentOrderNo d-flex justify-content-between">
                    <p className="mx-2">Last Order delivered: </p> 
                    <h4 style={{marginTop: "-2px"}}>#{lastOrderDelivered} </h4>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dokgv4lff/image/upload/v1688365848/flavr_l4bspc.png" style={{width: "85px", marginTop: "-30px"}} alt="" />
                </div>
                <div>
                    <h5>{time}</h5>
                </div>
            </div>
            <div className="orderContainer container-fluid mt-3 d-flex justify-content-center align-items-center">
                <div className="orderPartition shadow-sm col-md-4 d-flex justify-content-center">
                    <div>
                        <div className="d-flex justify-content-center">
                            <h3 className="orderHeading">Pending Confimation ({pendinConfOrders.length}) </h3>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            {pendinConfOrders.length!==0 ? pendinConfOrders.map((orderitem) => {
                                return <div className="orderitem my-2">
                                    <OrderItem 
                                        orderNumber={orderitem.orderNumber} 
                                        createdAt={orderitem.createdAt}
                                        products={orderitem.products}
                                        action={0}
                                        totalQuantity={orderitem.totalQuantity}
                                        totalAmount={orderitem.totalPrice}
                                        orderid={orderitem.orderid}
                                        leftOver={true}
                                        leftItemsHandler={() => handleOpenFullOrderModal(orderitem.orderNumber, orderitem.createdAt, orderitem.products, 0, orderitem.totalQuantity, orderitem.totalPrice, orderitem.orderid)}
                                    />
                                </div>
                            }) : <p className="d-flex justify-content-center" style={{fontWeight: "400", marginTop: "40vh"}} >No orders pending for confirmation</p>}
                        </div>
                    </div>
                </div>
                <div className="orderPartition shadow-sm col-md-4 d-flex justify-content-center">
                    <div>
                        <div className="d-flex justify-content-center">
                            <h3 className="orderHeading">Active Orders ({activeOrders.length}) </h3>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            {activeOrders.length!==0 ? activeOrders.map((orderitem) => {
                                return <div className="orderitem my-2">
                                    <OrderItem 
                                        orderNumber={orderitem.orderNumber} 
                                        createdAt={orderitem.createdAt}
                                        products={orderitem.products}
                                        action={1}
                                        orderid={orderitem.orderid}
                                    />
                                </div>
                            }) : <p className="d-flex justify-content-center" style={{fontWeight: "400", marginTop: "40vh"}}>No active orders</p>}
                        </div>
                    </div>
                </div>
                <div className="orderPartition shadow-sm col-md-4 d-flex justify-content-center">
                    <div>
                        <div className="d-flex justify-content-center">
                            <h3 className="orderHeading">Ready Orders ({readyOrders.length}) </h3>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            {readyOrders.length!==0 ? readyOrders.map((orderitem) => {
                                return <div className="orderitem my-2">
                                    <OrderItem 
                                        orderNumber={orderitem.orderNumber} 
                                        createdAt={orderitem.createdAt}
                                        products={orderitem.products}
                                        action={2}
                                        orderid={orderitem.orderid}
                                    />
                                </div>
                            }) : <p className="d-flex justify-content-center" style={{fontWeight: "400", marginTop: "40vh"}}>No orders ready for delivery</p>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
