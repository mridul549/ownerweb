import { React, useEffect, useState } from "react";
import OrderItem from './OrderItem'
import Spinner from './Spinner'
import '../css/orderHistory.css'
import {Modal} from 'react-bootstrap'

export default function OrderHistory() {
    const date = new Date()
    const [filter, setFilter] = useState({year: date.getFullYear(), month: date.getMonth()+1, date: date.getDate(), data: [], count: 0})
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const [loading, setLoading] = useState(false)
    const [datesArray, setDatesArray] = useState([])
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

    function getDatesInMonth(year, month) {
        const dates = [];

        const lastDay = new Date(year, month, 0).getDate(); // Get the last day of the month
        for (let day = 1; day <= lastDay; day++) {
            dates.push(day);
        }
        setDatesArray(dates)
    }

    const yearClick = (e) => {
        setFilter({...filter, year: e.target.value})
        console.log(e.target.value);
    }

    const monthClick = async (e) => {
        setFilter({...filter, month: e.target.value, day: null})
        getDatesInMonth(document.getElementById('year').value,e.target.value)
    }

    const dayClick = (e) => {
        setFilter({...filter, date: e.target.value})
        console.log(e.target.value);
    }

    useEffect(() => {
        document.title = "FlavR | Order History"
        const date = new Date()
        getDatesInMonth(filter.year,filter.month)
        const fetchData = async () => {
            setLoading(true)

            const response = await fetch(`http://localhost:3001/orders/getHistory/completed?outletid=${localStorage.getItem('selectedOutlet')}&date=${filter.date+2}&month=${filter.month}&year=${filter.year}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            })
            const json = await response.json()
            setLoading(false)
            setFilter({year: date.getFullYear(), month: date.getMonth()+1, date: date.getDate(), data: json.result, count: json.count})
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await fetch(`http://localhost:3001/orders/getHistory/completed?outletid=${localStorage.getItem('selectedOutlet')}&date=${Number(filter.date)+2}&month=${Number(filter.month)}&year=${Number(filter.year)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            })
            const json = await response.json()
            setFilter({...filter, data: json.result, count: json.count})
            setLoading(false)
        }
        fetchData()
    }, [filter.date])

    return (
        <>
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
                            action={3}
                            totalQuantity={isFullOrderModal.totalQuantity}
                            totalAmount={isFullOrderModal.totalAmount}
                            orderid={isFullOrderModal.orderid}
                            leftOver={false}
                        />
                    </div>
                </Modal.Body>
            </Modal>


        {loading ? 
            <div style={{marginTop: '40vh'}}>
                <Spinner />
            </div> :
            <>
                <div className="d-flex justify-content-between">
                    <div className="totalCount d-flex justify-content-between">
                        <p style={{marginRight: '5px'}}>Total Orders: </p>
                        <h4 style={{marginTop: "-2px", fontWeight: '600', color: "red"}}>{filter.count} </h4>
                    </div>
                    <div className="logoFlavr">
                        <img src="https://res.cloudinary.com/dokgv4lff/image/upload/v1688365848/flavr_l4bspc.png" style={{width: "100px", marginTop: '-25px'}} alt="" />
                    </div>
                    <div className="filters">
                        <p className="mx-1" style={{textAlign: "end", marginBottom: "0.2px"}}>Select Date</p>
                        <select onChange={yearClick} name="Year" id="year" value={filter.year} className="selectDown mx-1 " >
                            <option value="2023">2023</option>
                        </select>
                        <select onChange={monthClick} name="month" id="month" value={filter.month} className="selectDown mx-1 " >
                            {months.map((month, index) => {
                                return (<option value={index+1} key={month}>{month}</option>)
                            })}
                        </select>
                        <select onChange={dayClick} name="date" id="date" value={filter.date} className="selectDown mx-1 " >
                            {datesArray.map((date) => {
                                return (<option value={date} key={date}>{date}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <h2 style={{fontWeight: '600', color: '#004932'}}>Completed Orders</h2>
                    </div>

                    <div className="row">
                        {filter.data.length===0 ?
                            <div className="d-flex justify-content-center" style={{marginTop: '30vh'}}>
                                <p>No orders for this date</p> 
                            </div> :
                            filter.data.map((item) => {
                                return <div className="col-lg-4 my-2">
                                    <OrderItem 
                                        orderNumber={item.orderNumber} 
                                        createdAt={item.createdAt}
                                        products={item.products}
                                        action={3}
                                        totalQuantity={item.totalQuantity}
                                        totalAmount={item.totalPrice}
                                        orderid={item.orderid}
                                        leftOver={true}
                                        leftItemsHandler={() => handleOpenFullOrderModal(item.orderNumber, item.createdAt, item.products, 0, item.totalQuantity, item.totalPrice, item.orderid)}
                                    />
                                </div>
                            })
                        }
                    </div>

                </div>
            </>
        }
        </>
    )
}
