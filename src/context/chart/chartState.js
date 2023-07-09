import { useState } from 'react'
import ChartContext from './chartContext'

const ChartState = (props) => {
    /**
     * GetBy => 
     *      0 => day
     *      1 => month
     *      2 => year
     */

    const month = new Date().getMonth()+1
    const date = new Date().getDate()
    const [chart1, setChart1] = useState({getBy: 0, year: 2023, month: month, data: []})
    const [chart2, setChart2] = useState({getBy: 0, year: 2023, month: month, date: date, data: []})
    const [chart3, setChart3] = useState({getBy: 1, year: 2023, month: month, date: date, data: []})

    return (
        <ChartContext.Provider value={{chart1,setChart1,chart2,setChart2,chart3,setChart3}}>
            {props.children}
        </ChartContext.Provider>
    )
}

export default ChartState