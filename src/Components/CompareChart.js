import React, { useEffect, useContext, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip} from 'chart.js'
import ChartContext from "../context/chart/chartContext";
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/revenueChart.css'

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, Tooltip)


export default function Analytics() {
    const { chart2, setChart2 } = useContext(ChartContext)
    const [datesArray, setDatesArray] = useState([])

    function getDatesInMonth(year, month) {
        const dates = [];
        const lastDay = new Date(year, month, 0).getDate(); // Get the last day of the month
      
        for (let day = 1; day <= lastDay; day++) {
            dates.push(new Date(year, month - 1, day).getDate());
        }
        setDatesArray(dates)
    }

    const selectDateClick = (date) => {
        setChart2({...chart2, date: date})
    }

    const getByClick = (getBy) => {
        setChart2({getBy: getBy, year: 2023, month: new Date().getMonth()+1, date: new Date().getDate(), data: []})
    }

    const selectYearClick = (year) => {
        setChart2({...chart2, year: year})
    }

    const selectMonthClick = (month) => {
        getDatesInMonth(chart2?.year, month)
        setChart2({...chart2, month: month+1})
    }
    const data = {
        labels: chart2?.data?.result?.map((set) => set._id.outlet ),
        datasets: [
            {
                label: 'Comparison',
                data: chart2?.data?.result?.map((set) => set.totalPrice ) ,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderColor: '#fff',
                fill: true
            }
        ]
    }

    const options = {
        plugins: {
            legend: true,
            tooltip: {
                enable: true,
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const xLabel = context.chart.data.labels[context.dataIndex];
                        const yLabel = context.formattedValue || context.yLabel;
                        return `${label} (${xLabel}, ${yLabel})`;
                    }
                }
            }
            
        },
    }

    useEffect(() => {

        const fetchData = async () => {

            switch (chart2.getBy) {
                case 0:
                    const response = await fetch(`https://flavrapi.onrender.com/outlet/chart/compare/day?month=${chart2.month}&year=${chart2.year}&date=${chart2.date+2}`, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token')
                        }
                    })
                    const json = await response.json()
                    setChart2({...chart2, data: json})
                    break;
                case 1:
                    const response1 = await fetch(`https://flavrapi.onrender.com/outlet/chart/compare/month?year=${chart2.year}&month=${chart2.month}`, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token')
                        }
                    })
                    const json1 = await response1.json()
                    setChart2({...chart2, data: json1})
                    break;
                
                case 2:
                    const response2 = await fetch(`https://flavrapi.onrender.com/outlet/chart/compare/year?year=${chart2.year}`, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token')
                        }
                    })
                    const json2 = await response2.json()
                    setChart2({...chart2, data: json2})
                    break;

                default:
                    setChart2({...chart2, data: []})
                    break;
            }
            getDatesInMonth(2023,7)
        }
        fetchData()
    },[chart2.getBy, chart2.date, chart2.month, chart2.year, setChart2])

    return (
        <>
        <div className="" >
            <div className="chart1 shadow-sm p-3 pb-2" style={{width: "97%", borderRadius: "10px", border: "1px solid rgb(239, 238, 238)"}}>
                <div className="header mb- ">
                    <div className="head1 d-flex justify-content-between">
                        <h4 className="">Outlet Comparison</h4>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{}}>
                                {chart2?.getBy === 0 ? "Day Wise" :
                                    (chart2.getBy === 1 ? "Month Wise" : "Year Wise")
                                }
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className="menuItem" onClick={() => getByClick(0)} >Day Wise</Dropdown.Item>
                                <Dropdown.Item className="menuItem" onClick={() => getByClick(1)} >Month Wise</Dropdown.Item>
                                <Dropdown.Item className="menuItem" onClick={() => getByClick(2)} >Year Wise</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="head2 d-flex mt-2 justify-content-end">
                        {chart2?.getBy === 0 && 
                            <>
                                <Dropdown className="">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                        {chart2?.year}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="menuItem" onClick={() => selectYearClick(2023)} >2023</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown className="mx-2">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                    {
                                        (() => {
                                        switch (chart2.month) {
                                            case 1: return "January"
                                            case 2: return "February"
                                            case 3: return "March"
                                            case 4: return "April"
                                            case 5: return "May"
                                            case 6: return "June"
                                            case 7: return "July"
                                            case 8: return "August"
                                            case 9: return "September"
                                            case 10: return "October"
                                            case 11: return "November"
                                            case 12: return "December"
                                            default: return "Month"
                                        }
                                        })()
                                    }
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="">
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(0)} >January</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(1)} >February</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(2)} >March</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(3)} >April</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(4)} >May</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(5)} >June</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(6)} >July</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(7)} >August</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(8)} >September</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(9)} >October</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(10)} >November</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(11)} >December</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown className="">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                        {chart2?.date}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {datesArray.map((date) => {
                                            return <Dropdown.Item className="menuItem" onClick={() => selectDateClick(date)} >{date}</Dropdown.Item>
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        }
                        {chart2?.getBy === 1 && 
                            <>
                                <Dropdown className="mx-2">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                        {chart2?.year}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="menuItem" onClick={() => selectYearClick(2023)} >2023</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown className="">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                    {
                                        (() => {
                                        switch (chart2.month) {
                                            case 1: return "January"
                                            case 2: return "February"
                                            case 3: return "March"
                                            case 4: return "April"
                                            case 5: return "May"
                                            case 6: return "June"
                                            case 7: return "July"
                                            case 8: return "August"
                                            case 9: return "September"
                                            case 10: return "October"
                                            case 11: return "November"
                                            case 12: return "December"
                                            default: return "Month"
                                        }
                                        })()
                                    }
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="">
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(0)} >January</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(1)} >February</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(2)} >March</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(3)} >April</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(4)} >May</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(5)} >June</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(6)} >July</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(7)} >August</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(8)} >September</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(9)} >October</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(10)} >November</Dropdown.Item>
                                        <Dropdown.Item className="menuItem" onClick={() => selectMonthClick(11)} >December</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        }
                        {chart2?.getBy === 2 &&
                            <Dropdown className="mx-2">
                                <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                    {chart2?.year}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item className="menuItem" onClick={() => selectYearClick(2023)} >2023</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                    </div>
                </div>
                <div className="d-flex mt-2 justify-content-center" style={{height: "34vh"}}>
                    {chart2?.data?.result?.length!==0 ? 
                        <div className="chart11 d-flex justify-content-center" style={{width: "50%"}}>
                            <Doughnut data={data} options={options}> </Doughnut>
                        </div> :
                        <h6 className="" style={{color: "grey", marginTop: "10vh"}}>No data available</h6>
                    }
                </div>
            </div>
        </div>
        </>


    )
}
