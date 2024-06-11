import React, { useEffect } from "react";

const PageTitle = ({ heading, subHeading }) => {

    useEffect(() => {
        document.title = 'FlavR | Login'
    }, [])
}

export default PageTitle