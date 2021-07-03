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



function Analyzation() {
    const classes = useStyles();
    const [state, setState] = useState('')
    const [district, setDistrict] = useState('')
    const [yearcheck, setYearcheck] = useState(false)
    const [cropcheck, setCropcheck] = useState(false)

    const handleStateChange = (event) => {
        setState(event.target.value)
    }
    const handleDistrictChange = (event) => {
        setDistrict(event.target.value)
    }
    const handleYearCheck = () =>{
        setYearcheck(!yearcheck)
    }
    const handleCropCheck = () =>{
        setCropcheck(!cropcheck)
    }

    const statearr = Object.keys(stateList)
    console.log(statearr)
    
    const postDetails = () =>{
        console.log("hii")
    }



    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20%', alignItems: 'center' }}>
            <Card className={classes.analyzationcard}>
                <CardContent>
                    <Typography style={{ marginBottom: '10px' }} variant="h5" >
                        <b>Crop Analyzation</b>
                    </Typography>
                    <Typography style={{ marginBottom: '30px' }} color="textSecondary">
                        Select your preferred State and District and we will present the crop analysis trend with two customizable options by "year" or by "crop"!
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
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox checked={yearcheck} onChange={handleYearCheck} name="checkyear" />}
                            label="Year"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={cropcheck} onChange={handleCropCheck} name="checkcrop" />}
                            label="Crop"
                        />
                        </FormGroup>
                        <Button style={{ margin: '10px' }} size='large' variant="contained" onClick={() => postDetails()}>Submit</Button>
                </CardContent>
                <CardMedia>
                    <img src="https://cdn.pixabay.com/photo/2013/07/13/11/31/man-158320__340.png" alt="image" width="200px" height="auto" />
                </CardMedia>

            </Card>
        </div>
    )
}

export default Analyzation
