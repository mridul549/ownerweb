import React, { useState, useContext } from "react";
import "../css/orderitem.css";
import {db} from '../config/firebase'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import OrderContext from "../context/orders/orderContext";
import {Modal} from 'react-bootstrap'

export default function OrderItem(props) {
    const [loadingInBtn, setLoadingInBtn] = useState({state: false, role: 0})
    const orderCollection = collection(db, 'Order')
    const { setActiveOrders, setReadyOrders, setLastOrderDelivered } = useContext(OrderContext)

    const [isRejectionModal, setIsRejectionModal] = useState({state: false})

    const handleOpenRejectionModal = () => {
        setIsRejectionModal({state: true})
    }

    const handleCloseRejectionModal = () => {
        setIsRejectionModal({state: false})
    }

    const q2Listener = () => {
        const q2 = query(orderCollection, where("outlet", "==", localStorage.getItem('selectedOutlet')), where("status", "==", "ORDER_CONFIRMED"));

        const activeQuery = onSnapshot(q2, (querySnapshot) => {
            const orders = [];
            querySnapshot.forEach((doc) => {
                orders.push(doc.data());
            });
    
            // Process the orders as needed
            setActiveOrders(orders) 
        });

        setTimeout(() => {
            activeQuery()
        }, 10000)
    }

    const q3Listener = () => {
        const q3 = query(orderCollection, where("outlet", "==", localStorage.getItem('selectedOutlet')), where("status", "==", "READY"));

        const readyQuery = onSnapshot(q3, (querySnapshot) => {
            const orders = [];
            querySnapshot.forEach((doc) => {
                orders.push(doc.data());
            });

            // Process the orders as needed
            setReadyOrders(orders) 
        });

        setTimeout(() => {
            readyQuery()
        }, 10000)

    }

    const confirmHandler = async (isConfirm, role) => {
        // setLoadingInBtn({state: true, role: role})
        // q2Listener()
        // q3Listener()

        if(!isConfirm){
            setIsRejectionModal({state: true})
        }

        // setTimeout(() => {
        //     setLoadingInBtn({state: false, role: 0})
        // }, 3000)
        // const response = await fetch("https://flavr.tech/orders/orderconfrej", {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": "Bearer " + localStorage.getItem('token')
        //     },
        //     body: JSON.stringify({orderid: props.orderid, outletid: localStorage.getItem('selectedOutlet'), isConfirm: isConfirm})
        // })
        // const json = await response.json()

        // if(json.message === "Order successfully confirmed and sent for futher processing."){
        //     setTimeout(() => {
        //         setLoadingInBtn({state: false, role: 0})
        //     }, 1000)
        // }
    }

    const readyHandler = async (role) => {
        setLoadingInBtn({state: true, role: role})
        q2Listener()
        q3Listener()

        const response = await fetch("https://flavr.tech/orders/orderReady", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({orderid: props.orderid, outletid: localStorage.getItem('selectedOutlet')})
        })
        const json = await response.json()

        if(json.message === "Order marked ready and shifted from active to ready in outlet"){
            setTimeout(() => {
                setLoadingInBtn({state: false, role: 0})
            }, 1000)
        }
    }

    const deliverHandler = async (role) => {
        setLoadingInBtn({state: true, role: role})
        q3Listener()

        const response = await fetch("https://flavr.tech/orders/deliverOrder", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({orderid: props.orderid, outletid: localStorage.getItem('selectedOutlet')})
        })
        const json = await response.json()

        if(json.message === "Order marked completed and shifted from active array to completed in outlet"){
            setLastOrderDelivered(props.orderNumber)
            setLoadingInBtn({state: false, role: 0})
        }
    }

    return (
        <div>
            <Modal show={isRejectionModal.state} onHide={handleCloseRejectionModal}>
                <Modal.Header className="d-flex justify-content-between">
                    <div><p></p></div>
                    <div>
                        <Modal.Title style={{textAlign: 'center'}}>Reject Order</Modal.Title>
                    </div>
                    <div>
                        <button type="button" className="btn-close" onClick={handleCloseRejectionModal}></button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="rejectBody d-flex flex-column justify-content-center align-items-center">
                        <div className="rejectHead my-3">
                            <h3>Reason for rejection</h3>
                        </div>
                        <div className="reasonBody">
                            <form action="">
                                <div className="row reasons">
                                    <div className="col-md-2">
                                        <input class="form-check-input" type="radio"  name="reason1" id="reason1" />
                                    </div>
                                    <div className="col-md-10">
                                        <label htmlFor="">Outlet not accepting order</label>
                                    </div>
                                    <div className="col-md-2">
                                        <input class="form-check-input" type="radio" name="reason2" id="reason2" />
                                    </div>
                                    <div className="col-md-10">
                                        <label htmlFor="">One or more items not available</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            <div className="card container orderCard">
                <div className="header d-flex mt-3 mx-2 justify-content-between">
                    <div className="orderNumber">
                        <h5>Order #{props.orderNumber === 0 ? '-' : props.orderNumber} </h5>
                    </div>
                    <div className="time">
                        <p>{props.createdAt}</p>
                    </div>
                </div>
                <div className="itemsHeading my-1 d-flex justify-content-between">
                    <div>
                        <p style={{color: "#004932"}}>₹ {props.totalAmount} </p>
                    </div>
                    <div>
                        <h5>Items</h5> 
                    </div>
                    <div>
                        <p style={{color: "#004932"}}>x {props.totalQuantity} </p>
                    </div>
                </div>
                <div className="orderItems">
                    <div className="row orderitem d-flex justify-content-between">
                        {/* If left over items are not to be shown */}

                        {props.products && props.leftOver && props.products.map((product,i) => {
                            if(i<=2) {
                                return (<>
                                    <div className="col-lg-10" key={product.productName}>
                                        <h5>{product.productName} {product.variant !== 'default' && `(${product.variant})`}</h5>
                                    </div>
                                    <div className="col-lg-2">
                                        <h5>x {product.quantity} </h5>
                                    </div>
                                </> )
                            }
                            else if(i===3) {
                                return <button className="btn leftItems" onClick={props.leftItemsHandler} style={{width: "50%"}}>
                                    +{props.products.length-3} more items...
                                </button>
                            }
                            return null
                        })}

                        {/* If left over items are to be shown */}
                        {props.products && !props.leftOver && props.products.map((product,i) => {
                            return (<>
                                <div className="col-lg-10" key={product.productName}>
                                    <h5>{product.productName} {product.variant !== 'default' && `(${product.variant})`}</h5>
                                </div>
                                <div className="col-lg-2">
                                    <h5>x {product.quantity} </h5>
                                </div>
                            </> )
                        })}
                    </div>
                </div>
                <div className=" p-3">
                    {props.action === 0 ?
                        <div className="d-flex justify-content-between">
                            <div className="">
                                <button disabled={loadingInBtn.state && (loadingInBtn.role===0 || loadingInBtn.role===1)} className="btn actionBtns confirmBtn" onClick={() => confirmHandler(true, 0)}>
                                    {loadingInBtn.state && loadingInBtn.role===0 && <span class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>}
                                    Confirm 
                                </button>
                            </div>
                            <div className="">
                                <button disabled={loadingInBtn.state && (loadingInBtn.role===0 || loadingInBtn.role===1)} className="btn actionBtns rejectBtn" onClick={() => confirmHandler(false, 1)}>
                                    {loadingInBtn.state && loadingInBtn.role===1 && <span class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>}
                                    Reject 
                                </button>
                            </div>
                        </div> :
                        (props.action === 1 ? 
                            <div className="d-flex justify-content-center">
                                <button disabled={loadingInBtn.state && loadingInBtn.role===2} onClick={() => readyHandler(2)} className="btn actionBtns confirmBtn" style={{width: "100%"}}>
                                    {loadingInBtn.state && loadingInBtn.role===2 && <span class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>}
                                    Ready to deliver
                                </button>
                            </div> :
                            (props.action === 2 ?
                                <div className="">
                                    <button disabled={loadingInBtn.state && loadingInBtn.role===3} onClick={() => deliverHandler(3)} className="btn actionBtns confirmBtn" style={{width: "100%"}}>
                                        {loadingInBtn.state && loadingInBtn.role===3 && <span class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>}
                                        Delivered
                                    </button>
                                </div> : ''
                            )
                        )
                    }

                </div>
            </div>
        </div>
    );
}
