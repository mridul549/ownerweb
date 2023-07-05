import { useState } from 'react'
import SidebarContext from './sidebarContext'

const SidebarState = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <SidebarContext.Provider value={{sidebarOpen, setSidebarOpen}}>
            {props.children}
        </SidebarContext.Provider>
    )
}

export default SidebarState