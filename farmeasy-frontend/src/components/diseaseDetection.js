import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './styles/navbar_styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CardMedia } from '@material-ui/core';
import { DiseaseLabels } from '../utilities';



function DiseaseDetection() {
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const classes = useStyles();
    const [result, setResults] = useState([])


    useEffect(() => {
        if (url) {
            fetch("/cropDiseaseDetection", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image_url: url,
                })
            }).then(res => res.json())
                .then(data => {
                    setResults(data.result.reverse())
                }).catch(err => {
                    console.log(err)
                })

        }
        console.log(image)
        console.log(url)
    }, [image, url])



    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "Instafam")
        data.append("cloud_name", "abcd1234huy")
        fetch("https://api.cloudinary.com/v1_1/abcd1234huy/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
                console.log("route is hit")
            })
            .catch(err => {
                console.log(err)
            })

    }



    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20%', alignItems: 'center' }}>
            <Card className={classes.diseaseroot}>

                <CardContent>
                    <Typography style={{ marginBottom: '10px' }} variant="h5" >
                        <b>Disease Detection</b>
                    </Typography>
                    <Typography style={{ marginBottom: '30px' }} color="textSecondary">
                        Just upload a clear image of a crop infection and we will predict the disease type!
                    </Typography>


                    <Button style={{ margin: '10px' }} size="large" variant="contained" component="label" >{image ? "File Selected" : "Choose a file"}
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setImage(e.target.files[0])}
                        /></Button>
                    <Button style={{ margin: '10px' }} size='large' variant="contained" onClick={() => postDetails()}>Submit</Button>

                </CardContent>
                <CardMedia>
                    <img src="https://cdn.pixabay.com/photo/2013/07/13/11/31/man-158320__340.png" alt="image" width="200px" height="auto" />
                </CardMedia>

            </Card>
            <div style={{ display: 'flex', alignItems: 'center' }}>

                {url ? <Card className={classes.imageresponsecard}><img src={url} width="350px" height="auto" /></Card> : 
                '' }
                {
                    result.length>0 ? (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '30px' }}>

                    <Typography variant='h5'><b>Expected Diseases</b></Typography>
                    {
                        result.map(i => {
                            return (

                                <Card className={classes.responsecard}>
                                    <Typography variant="subtitle1">
                                         {DiseaseLabels[i]}
                                    </Typography>
                                </Card>

                            )
                        })
                    }
                </div>) : null
                }
                
            </div>

        </div>
    )
}

export default DiseaseDetection
