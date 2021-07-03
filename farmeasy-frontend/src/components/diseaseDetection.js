import React,{useState, useEffect} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './styles/navbar_styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import { CardMedia } from '@material-ui/core';

function DiseaseDetection() {
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const classes = useStyles();

    useEffect(()=>{
        if(url){
            fetch("localhost:5000/cropDiseaseDetection",{
                method:"post",
                headers:{
                    "Content-Type":"application/json" ,
                },
                body:JSON.stringify({
                    image_url : url ,
                }) 
                }).then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    // if(data.error)
                    // {
                    //     M.toast({html: data.error, classes:"#e53935 red darken-1"})
                    // }
                    // else{
                    //     M.toast({html:"Created Post successfully" , classes:"#43a047 green darken-1"})
                    // }
                }).catch(err=>{
                    console.log(err)
                })

        }
        console.log(image)
        console.log(url)
    },[image,url])



    const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","Instafam")
        data.append("cloud_name","abcd1234huy")
        fetch("https://api.cloudinary.com/v1_1/abcd1234huy/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
            console.log("route is hit")
        })
        .catch(err=>{
            console.log(err)
        })
       
      }



    return (
        <div style={{display:'flex', alignItems:'center' }}>
            <Card className={classes.diseaseroot}>
                
                <CardContent>
                    <Typography style={{marginBottom:'10px'}} variant="h5" >
                        <b>Disease Detection</b>
                    </Typography>
                    <Typography style={{marginBottom:'30px'}} color="textSecondary">
                        Just upload a clear image of a crop infection and we will predict the disease type!
                    </Typography>
                   

                    <Button style={{margin: '10px'}} size="large"variant="contained" component="label" >{ image ? "File Selected" : "Choose a file"} 
                    <input
                        type="file"
                        hidden
                        onChange={(e)=>setImage(e.target.files[0])}
                    /></Button>
                    <Button style={{margin: '10px'}} size='large' variant="contained"  onClick={()=>postDetails()}>Submit</Button>
                    
                </CardContent>
                <CardMedia>
                <img src="https://cdn.pixabay.com/photo/2013/07/13/11/31/man-158320__340.png" alt="image" width="200px" height="auto" />
                </CardMedia>
                 
            </Card>
            <img src="illustration1.png" maxWidth='500px' height='auto' alt="illustartion" />
        </div>
    )
}

export default DiseaseDetection
