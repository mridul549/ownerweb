import React, { useContext } from "react";
import RevenueChart from './RevenueChart'
import Dropdown from 'react-bootstrap/Dropdown';
import ChartContext from "../context/chart/chartContext";
import '../css/analytics.css'
import CompareChart from './CompareChart'
import ProductChart from './ProductChart'

export default function Analytics() {
    
    return (
        <div className="analyticsContainer" >
            <div className="d-flex flex-row justify-content-between" style={{width: "100%"}}>
                <div style={{width: "100%"}}>
                    <RevenueChart />
                </div>
                <div style={{width: "100%"}}>
                    <CompareChart />
                </div>
            </div>
            <div className="mt-3 shadow-sm" style={{width: "98.5%", borderRadius: "10px"}}>
                <ProductChart />
            </div>
        </div>
    )
}
