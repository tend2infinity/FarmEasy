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
import { crops } from '../utilities';
import BarChart from 'react-bar-chart';
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function Analyzation() {
    const margin = { top: 0, right:5, bottom: 20, left: 30 };

    const classes = useStyles();
    const [state, setState] = useState('')
    const [district, setDistrict] = useState('')
    const [yearcheck, setYearcheck] = useState(false)
    const [cropcheck, setCropcheck] = useState(false)
    const [year, setYear] = useState('')
    const [crop, setCrop] = useState('')
    const [details, setDetails] = useState([])
    const [chartDisplay, setChartDisplay] = useState(false)
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        title:{
            text: "Simple Column Chart with Index Labels"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: details
        }]
    }

    const handleStateChange = (event) => {
        setState(event.target.value)
    }
    const handleDistrictChange = (event) => {
        setDistrict(event.target.value)
    }
    const handleYearCheck = () => {
        setYearcheck(!yearcheck)
        setCropcheck(false)
    }
    const handleCropCheck = () => {
        setCropcheck(!cropcheck)
        setYearcheck(false)
    }
    const handlYearChange = (event) => {
        setYear(event.target.value)
    }
    const handleCropChange = (event) => {
        setCrop(event.target.value)
    }

    const statearr = Object.keys(stateList)

    const postDetails = () => {
        if (crop.length > 0) {
            fetch("/cropProductionByYear", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'crop': crop,
                    'district': district,
                    'state': state
                })
            }).then(res => res.json())
                .then(data => {
                    let temp = data.map(oData => {
                        return {
                            'text': oData.crop_year,
                            'value': oData['p/a']
                        }
                    });
                    console.log(temp);
                    setDetails(temp);
                    setChartDisplay(true);
                }).catch(err => {
                    console.log(err)
                })
        } else if (year.length > 0) {
            fetch("/cropProduction", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'state': state,
                    'district': district,
                    'year': parseInt(year)
                })
            }).then(res => res.json())
                .then(data => {
                    let temp = data.map(oData => {
                        if(oData['p/a']>0){
                            return {
                                'text': oData.crop,
                                'value': oData['p/a']
                            }
                        }else{
                            return ;
                        }
                    });
                    console.log(temp);
                    setDetails(temp);
                    setChartDisplay(true);
                }).catch(err => {
                    console.log(err)
                })
        }

    }



    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20%', alignItems: 'center', justifyContent: 'center' }}>
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
                                return <MenuItem value={item} > {item} </MenuItem>
                            })

                        }



                    </TextField>
                    <ListItem>
                        <Typography variant="body1">
                            <ListItemText disableTypography primary="Select a customization By year or by crops" className={classes.listItemHeader} />
                        </Typography>
                    </ListItem>
                    <FormGroup style={{ marginLeft: '150px' }} row>
                        <FormControlLabel
                            control={<Checkbox checked={yearcheck} onChange={handleYearCheck} name="checkyear" />}
                            label="Year"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={cropcheck} onChange={handleCropCheck} name="checkcrop" />}
                            label="Crop"
                        />
                    </FormGroup>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {yearcheck &&
                            <TextField
                                select
                                label="Select"
                                helperText="Please select an Year"
                                variant="outlined"
                                size="small"
                                value={year}
                                onChange={handlYearChange}
                                className={classes.listItemTextField}
                                required={true}
                                style={{ marginLeft: "150px" }}
                            >

                                <MenuItem value="1997"> 1997 </MenuItem>
                                <MenuItem value="1998"> 1998 </MenuItem>
                                <MenuItem value="1999"> 1999 </MenuItem>
                                <MenuItem value="2000"> 2000 </MenuItem>
                                <MenuItem value="2001"> 2001 </MenuItem>
                                <MenuItem value="2002"> 2002 </MenuItem>
                                <MenuItem value="2003"> 2003 </MenuItem>
                                <MenuItem value="2004"> 2004 </MenuItem>
                                <MenuItem value="2005"> 2005 </MenuItem>
                                <MenuItem value="2006"> 2006 </MenuItem>
                                <MenuItem value="2007"> 2007 </MenuItem>
                                <MenuItem value="2008"> 2008 </MenuItem>
                                <MenuItem value="2009"> 2009 </MenuItem>
                                <MenuItem value="2010"> 2010 </MenuItem>
                                <MenuItem value="2011"> 2011 </MenuItem>
                                <MenuItem value="2012"> 2012 </MenuItem>
                                <MenuItem value="2013"> 2013 </MenuItem>
                                <MenuItem value="2014"> 2014 </MenuItem>
                                <MenuItem value="2015"> 2015 </MenuItem>

                            </TextField>
                        }

                        {
                            cropcheck &&
                            <TextField
                                select
                                label="Select"
                                helperText="Please select a Crop"
                                variant="outlined"
                                size="small"
                                value={crop}
                                onChange={handleCropChange}
                                className={classes.listItemTextField}
                                required={true}
                                style={{ marginLeft: "150px" }}
                            >
                                {
                                    crops.map(item => {
                                        return <MenuItem value={item}>{item}</MenuItem>
                                    })
                                }


                            </TextField>

                        }

                        <Button style={{ margin: '10px', width: '200px' }} size='large' variant="contained" onClick={() => postDetails()}>Submit</Button>

                    </div>

                </CardContent>

                <CardMedia>
                    <img src="https://cdn.pixabay.com/photo/2013/07/13/11/31/man-158320__340.png" alt="image" width="200px" height="auto" />
                </CardMedia>

            </Card>
            <div>
                {
                    chartDisplay ? (details.length > 0 ?
                            <BarChart ylabel='Production per unit Area'
                                width={1500}
                                height={500}
                                margin={margin}
                                style={{width : '500px',color:'red'}}
                                data={details} />
                        : <Typography>No details Found! </Typography>) : null
                }
            </div>
        </div>
    )
}

export default Analyzation
