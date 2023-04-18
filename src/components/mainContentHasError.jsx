// import React from 'react'
import LocationInfo from './LocationInfo'
import ResidentCard from './ResidentCard'
import './styles/mainContentHasError.css'

const MainContentHasError = () => {

    return (
        <>
            <div className='residentError'>
                <h2 className='residentError__message'>✖️ You must provide an id from 1 to 126 🥺</h2>
                <img className="residentError__gif" src="/notfound.gif" alt="locationNotExist" />
            </div>
        </>
    )
}

export default MainContentHasError