import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './styles/navbar_styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { CardMedia } from '@material-ui/core';
import { stateList } from '../utilities';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { FormControlLabel } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const API_KEY = 'c509a8a585ad4de295b110458210307'

function Recommendation() {
    const classes = useStyles();
    const [crop,setCrop] = useState("");
    const [state, setState] = useState('')
    const [district, setDistrict] = useState('')
    const [temp,setTemp] = useState(25);
    const [humidity , setHumidity] = useState(71)
    const [rainfall , setRainfall] = useState(103)
    const [modal, setModal] = useState(false)
    const toggleModalOpen = () => {
        setModal(true)

    }
    const toggleModalClose = () => {
        setModal(false)
    }
    const statearr = Object.keys(stateList)

    const handleStateChange = (event) => {
        setState(event.target.value)
    }
    const handleDistrictChange = (event) => {
        setDistrict(event.target.value)
    }

    function onSubmit(){
        if (district.length>0 && state.length  > 0) {
            fetch("https://api.weatherapi.com/v1/current.json?key="+API_KEY+"&q="+district+"&aqi=no", {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
                .then(data => {
                    setTemp(data.current.temp_c);
                    setHumidity(data.current.humidity);
                    setRainfall(data.current.precip_mm * 100);
                }).then(()=>{
                    fetch("/cropRecommendation", {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            'humidity': humidity,
                            'rainfall' : rainfall,
                            'temp' : temp
                        })
                    }).then(res => res.json())
                        .then(data => {
                            console.log(data)
                            setCrop(data.result)
                            toggleModalOpen()
                            console.log(crop)
                        }).catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        

        

        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20%', alignItems: 'center' }}>
            <Modal
                open={modal}
                onClose={toggleModalClose}
                className={classes.modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modal}>
                <div className={classes.modalPaper}>
                <Typography variant='h6' id="simple-modal-title">Youu Region has humidity of {humidity} ,Temperature of {temp} celsius and Rainfall of {rainfall} mm .
                Our recommended crop</Typography>
                <div className={classes.modalParentContent}>
                    <Typography variant="h3">
                        {crop}
                    </Typography>
                </div>
                    </div>

                </Fade>


            </Modal>



            <Card className={classes.analyzationcard}>
                <CardContent>
                    <Typography style={{ marginBottom: '10px' }} variant="h5" >
                        <b>Crop Recommendation</b>
                    </Typography>
                    <Typography style={{ marginBottom: '30px' }} color="textSecondary">
                        Select your preferred State and District and we will present the crop best Recommended to you based on the Previous Year Trend!
                    </Typography>
                    <ListItem>
                        <Typography variant="body1">
                            <ListItemText disableTypography primary="Select State" className={classes.listItemHeader} />
                        </Typography>
                    </ListItem>
                    <TextField
                        select
                        label="Select"
                        helperText="Please select a State"
                        variant="outlined"
                        size="small"
                        value={state}
                        onChange={handleStateChange}
                        className={classes.listItemTextField}
                        required={true}
                    >

                        {
                            statearr.map(item => {
                                return <MenuItem value={item} > {item} </MenuItem>
                            })
                        }
                    </TextField>

                    <ListItem>
                        <Typography variant="body1">
                            <ListItemText disableTypography primary="Select District" className={classes.listItemHeader} />
                        </Typography>
                    </ListItem>
                    <TextField
                        select
                        label="Select"
                        helperText="Please select a District"
                        variant="outlined"
                        size="small"
                        value={district}
                        onChange={handleDistrictChange}
                        className={classes.listItemTextField}
                        required={true}
                    >
                        {
                            state &&
                            stateList[state].map(item => {
                                console.log(item);
                                return <MenuItem value={item} > {item} </MenuItem>
                            })

                        }
                        <ListItem>
                            <Typography variant="body1">
                                <ListItemText disableTypography primary="Select a customization By year or by crops" className={classes.listItemHeader} />
                            </Typography>
                        </ListItem>
                        
                       
                    </TextField>
                        <Button style={{ margin: '10px' }} size='large' variant="contained" onClick={() => onSubmit()}>Submit</Button>
                </CardContent>
                <CardMedia>
                    <img src="https://cdn.pixabay.com/photo/2013/07/13/11/31/man-158320__340.png" alt="image" width="200px" height="auto" />
                </CardMedia>

            </Card>
        </div>)
}

export default Recommendation
