import React from 'react'
import spinner from '../Spinner.gif'

function Spinner () {
  return (
    <div>
        <img src={spinner} alt="spin" style={{width: "50px", marginTop: "20px"}} />
    </div>
  )
}

export default Spinner