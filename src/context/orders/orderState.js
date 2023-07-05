import { useState } from 'react'
import OrderContext from './orderContext'

const OrderState = (props) => {
    const [activeOrders, setActiveOrders] = useState([])
    const [readyOrders, setReadyOrders] = useState([])
    const [lastOrderDelivered, setLastOrderDelivered] = useState(0)

    return (
        <OrderContext.Provider value={{activeOrders, setActiveOrders ,readyOrders, setReadyOrders, lastOrderDelivered, setLastOrderDelivered}}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState