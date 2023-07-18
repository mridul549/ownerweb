import { useState } from 'react'
import OutletContext from './outletContext'

const OutletState = (props) => {
    const [formstate, setformstate] = useState({
        outletname: "",
        addressline1: "",
        city: "",
        pincode: "",
        state: "",
        country: "",
        monopen: "",
        monclose: "",
        tueopen: "",
        tueclose: "",
        wedopen: "",
        wedclose: "",
        thuropen: "",
        thurclose: "",
        friopen: "",
        friclose: "",
        satopen: "",
        satclose: "",
        sunopen: "",
        sunclose: "",
        outletImage: null,
    });

    return (
        <OutletContext.Provider value={{formstate, setformstate}}>
            {props.children}
        </OutletContext.Provider>
    )
}

export default OutletState