import {React, useState} from 'react'
import '../css/categoryIconList.css'

export default function CategoryIconList(props) {
    const [modal, setModal] = useState(true)

    const toggleModal = () => {
        setModal(!modal)
    }


    return (
        <>
            {modal && 
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-content">
                        <h2>Hi</h2>
                        <p>fheuwfowefhewofheiwfheowfohewfhoew</p>
                    </div>
                    <button className='closeBtn' onClick={toggleModal}>Close</button>
                </div>
            }
        </>
    ) 
}
