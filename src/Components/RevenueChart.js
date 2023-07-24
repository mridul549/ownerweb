import React, { useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip} from 'chart.js'
import ChartContext from "../context/chart/chartContext";
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/revenueChart.css'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

export default function Analytics() {
    const { chart1, setChart1 } = useContext(ChartContext)
    
    const getByClick = (getBy) => {
        console.log(getBy);
        setChart1({getBy: getBy, year: 2023, month: new Date().getMonth()+1})
    }

    const selectYearClick = (year) => {
        setChart1({...chart1, year: year})
    }

    const selectMonthClick = (month) => {
        setChart1({...chart1, month: month+1})
    }
    const data = {
        labels: chart1?.data?.result?.map((set) => set._id ),
        datasets: [
            {
                label: 'Revenue',
                data: chart1?.data?.result?.map((set) => set.totalPrice ) ,
                backgroundColor: '#a3c4b2',
                borderColor: '#a3c4b2',
                pointBorderColor: '#a3c4b2',
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
        scales: {
            x: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: chart1?.data?.xLabel
                }
            },
            y: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: chart1?.data?.yLabel
                }
            }
        }
    }

    useEffect(() => {

        const fetchData = async () => {

            switch (chart1.getBy) {
                case 0:
                    const response = await fetch(`https://flavr.tech/outlet/chart/revenue/day?outletid=${localStorage.getItem('selectedOutlet')}&month=${chart1.month}&year=${chart1.year}`, {
                        method: "GET",
                    })
                    const json = await response.json()
                    setChart1({...chart1, data: json})
                    break;
                case 1:
                    const response1 = await fetch(`https://flavr.tech/outlet/chart/revenue/month?outletid=${localStorage.getItem('selectedOutlet')}&year=${chart1.year}`, {
                        method: "GET",
                    })
                    const json1 = await response1.json()
                    setChart1({...chart1, data: json1})
                    break;
                
                case 2:
                    const response2 = await fetch(`https://flavr.tech/outlet/chart/revenue/year?outletid=${localStorage.getItem('selectedOutlet')}`, {
                        method: "GET",
                    })
                    const json2 = await response2.json()
                    setChart1({...chart1, data: json2})
                    break;

                default:
                    setChart1({...chart1, data: []})
                    break;
            }

        }
        fetchData()
    },[chart1.getBy, chart1.month, chart1.year, setChart1])

    return (
        <>
        <div className="" >
            <div className="chart1 shadow-sm p-3" style={{width: "97%", borderRadius: "10px", border: "1px solid rgb(239, 238, 238)"}}>
                <div className="header mb- ">
                    <div className="head1 d-flex justify-content-between">
                        <h4 className="">Revenue Generated</h4>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{}}>
                                {chart1?.getBy === 0 ? "Day Wise" :
                                    (chart1.getBy === 1 ? "Month Wise" : "Year Wise")
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
                        {chart1?.getBy === 0 && 
                            <>
                                <Dropdown className="mx-2">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                        {chart1?.year}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="menuItem" onClick={() => selectYearClick(2023)} >2023</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown className="">
                                    <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                    {
                                        (() => {
                                        switch (chart1.month) {
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
                        {chart1?.getBy === 1 && 
                            <Dropdown className="">
                            <Dropdown.Toggle className="menuBtnToggle" id="dropdown-basic" style={{}}>
                                {chart1?.year}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className="menuItem" onClick={() => selectYearClick(2023)} >2023</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        }
                    </div>
                </div>
                <div className="chart11" style={{height: "34vh"}}>
                    <Line
                        data={data}
                        options={options}
                    >
                    </Line>
                </div>
            </div>
        </div>
        </>


    )
}
