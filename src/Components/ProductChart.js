import React, { useEffect, useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, Tooltip} from 'chart.js'
import ChartContext from "../context/chart/chartContext";
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/revenueChart.css'

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, Tooltip)

export default function Analytics() {
    const { chart3, setChart3 } = useContext(ChartContext)
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
        setChart3({...chart3, date: date})
    }

    const getByClick = (getBy) => {
        setChart3({getBy: getBy, year: 2023, month: new Date().getMonth()+1, date: new Date().getDate(), data: []})
    }

    const selectYearClick = (year) => {
        setChart3({...chart3, year: year})
    }

    const selectMonthClick = (month) => {
        getDatesInMonth(chart3?.year, month)
        setChart3({...chart3, month: month+1})
    }
    const data = {
        labels: chart3?.data?.result?.map((set) => set._id ),
        datasets: [
            {
                label: 'Count',
                data: chart3?.data?.result?.map((set) => set.count ),
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }
        ]
    }

    const options = {
        indexAxis: 'y',
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
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Quantity Ordered"
                }
            },
            y: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Product"
                }
            },
        },
    }

    useEffect(() => {

        const fetchData = async () => {

            switch (chart3.getBy) {
                case 0:
                    const response = await fetch(`https://flavr.tech/outlet/chart/products/day?outletid=${localStorage.getItem('selectedOutlet')}&month=${chart3.month}&year=${chart3.year}&date=${chart3.date+2}`, {
                        method: "GET",
                    })
                    const json = await response.json()
                    setChart3({...chart3, data: json})
                    break;
                case 1:
                    const response1 = await fetch(`https://flavr.tech/outlet/chart/products/month?outletid=${localStorage.getItem('selectedOutlet')}&year=${chart3.year}&month=${chart3.month}`, {
                        method: "GET",
                    })
                    const json1 = await response1.json()
                    setChart3({...chart3, data: json1})
                    break;
                
                case 2:
                    const response2 = await fetch(`https://flavr.tech/outlet/chart/products/year?outletid=${localStorage.getItem('selectedOutlet')}&year=${chart3.year}`, {
                        method: "GET",
                    })
                    const json2 = await response2.json()
                    setChart3({...chart3, data: json2})
                    break;

                default:
                    setChart3({...chart3, data: []})
                    break;
            }
            getDatesInMonth(chart3.year,chart3.date)
        }
        fetchData()
    },[chart3.getBy, chart3.date, chart3.month, chart3.year, setChart3])

    return (
        <>
        <div className="" >
            <div className="chart1 p-3 pb-2" style={{width: "100%", borderRadius: "10px", border: "1px solid rgb(239, 238, 238)"}}>
                <div className="header mb- ">
                    <div className="head1 d-flex justify-content-between">
                        <h4 className="">Products Comparison</h4>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{}}>
                                {chart3?.getBy === 0 ? "Day Wise" :
                                    (chart3.getBy === 1 ? "Month Wise" : "Year Wise")
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
                        {chart3?.getBy === 0 && 
                            <>
                                <Dropdown className="mx-2">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                        {chart3?.year}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="menuItem" onClick={() => selectYearClick(2023)} >2023</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown className="">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                    {
                                        (() => {
                                        switch (chart3.month) {
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
                                <Dropdown className="mx-2">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                        {chart3?.date}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {datesArray.map((date) => {
                                            return <Dropdown.Item className="menuItem" onClick={() => selectDateClick(date)} >{date}</Dropdown.Item>
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        }
                        {chart3?.getBy === 1 && 
                            <>
                                <Dropdown className="mx-2">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                        {chart3?.year}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="menuItem" onClick={() => selectYearClick(2023)} >2023</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown className="">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                    {
                                        (() => {
                                        switch (chart3.month) {
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
                        {chart3?.getBy === 2 &&
                            <Dropdown className="mx-2">
                                <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                    {chart3?.year}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item className="menuItem" onClick={() => selectYearClick(2023)} >2023</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                    </div>
                </div>
                <div className="d-flex mt-2 justify-content-center">
                    <div className="chart11 d-flex justify-content-center" style={{width: "80%"}}>
                        <Bar data={data} options={options}> </Bar>
                    </div>
                </div>
            </div>
        </div>
        </>


    )
}
