import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './styles/navbar_styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

function Cutlet() {
    const classes = useStyles();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 0' }}>
            <Card className={classes.cardroot}>
                <CardContent>

                    <Typography variant="h5" >
                        <b>Crop Analyzation</b>
                    </Typography>
                    <Typography style={{margin: '15px 15px'}} color="textSecondary">
                        On the basis of all the external factor like terrain, rainfall, fertility, soil and other factors we will put a detailed analysis of all the crops
                    </Typography>
                        <Button size="large">Read More</Button>
                        <Link to='/analyzation'> <Button variant="contained" size="large">Explore!</Button></Link>
                </CardContent>
                <img src="https://cdn.pixabay.com/photo/2013/07/13/11/31/man-158320__340.png" alt="image" width="200px" height="auto" />
            </Card>

            <Card className={classes.cardroot}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <b>Crop Recommendation</b>
                    </Typography>
                    <Typography style={{margin: '15px 15px'}} color="textSecondary" >
                        On the basis of region and climatic condition we predict the agricultural crop with the best fertility rate!
                    </Typography>
                        <Button size="large">Read More</Button>
                        <Link to='/recommendation'><Button variant="contained" size="large">Explore!</Button></Link>


                </CardContent>
                <img src="https://image.freepik.com/free-vector/organic-flat-farming-profession-illustration_23-2148899111.jpg" alt="image" width="200px" height="auto" />

            </Card>
            <Card className={classes.cardroot}>
                <CardContent>
                    <Typography className={classes.cardtitle} color="textSecondary" gutterBottom>

                    </Typography>
                    <Typography variant="h5" component="h2">
                        <b>Disease Detection</b>
                    </Typography>
                    <Typography style={{margin: '15px 15px'}} color="textSecondary">
                        We will detect if your crops are infected by some disease or not by inspecting the pictures which we will get from the client!
                    </Typography>
                    <Button  size="large">Read More</Button>
                        <Link to='/diseasedetection'><Button variant="contained" size="large">Explore!</Button></Link>
                        
                    
                </CardContent>
                <img src="https://image.freepik.com/free-photo/farmer-holds-rice-hand_1150-6063.jpg" alt="image" width="200px" height="auto" />

            </Card>
        </div>
    )
}

export default Cutlet
