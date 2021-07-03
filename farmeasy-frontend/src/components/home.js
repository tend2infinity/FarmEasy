import React from 'react'
import Navbar from './navbar'
import ImageGallery from './imageGallery'
import Cutlet from './cutlet'
import useMediaQuery from '@material-ui/core/useMediaQuery';

function Home() {
    var matches = useMediaQuery('(min-width:900px)');
    console.log(matches);
    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center' }}>
            <ImageGallery />
            <Cutlet />
            </div>
           
        </div>
    )
}

export default Home
