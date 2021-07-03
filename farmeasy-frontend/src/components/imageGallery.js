import React from 'react';
import useStyles from './styles/navbar_styles';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';

function ImageGallery() {
    const fadeImages = [
        'https://cdn.pixabay.com/photo/2017/06/11/02/05/wheat-2391348_960_720.jpg',
        'https://cdn.pixabay.com/photo/2020/03/03/03/56/farmers-4897451_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/11/14/03/50/farmer-1822530_960_720.jpg',
        'https://cdn.pixabay.com/photo/2020/07/23/01/09/field-5430070_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/11/14/04/17/buffalo-1822574_960_720.jpg'
    ];
    const classes = useStyles();
    return (
        <div className={classes.slideContainer}>
            <Fade duration='3000'>
                {
                    fadeImages.map((each, index) =>
                    <div key={index} className="each-fade">
                    <div className="image-container">
                        <img src={each} className={classes.slideshowimage}  />
                    </div>
                    </div>
                    )
                }

            </Fade>
        </div>
    )
}

export default ImageGallery


