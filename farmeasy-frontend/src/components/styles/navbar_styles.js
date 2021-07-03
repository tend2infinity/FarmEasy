import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: '50px'
    },
    appbar: {
        backgroundColor: '#545454',
    },
    imageGallery: {
        display: 'flex',
        height: '500px',
        flexDirection: 'column',
    },
    slideContainer: {
        display:'flex',
        flexDirection:'column',
        margin: '20px 0',
        padding: '20px',
        maxWidth: '700px',
        flex: '1 1 0'
    },
    cardroot: {
        width: 500,
        backgroundColor: '#BDD2B6',
        margin: '20px 15px',
        display: 'flex',
    },
    cardbullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    cardtitle: {
        fontSize: 14,
    },

    slideshowimage:{
        width: '100%',
        maxWidth:'1200px',
        height:'auto',
        borderRadius: '10px'
    },
    diseaseroot:{
        maxWidth: '70%',
        height: 'auto',
        backgroundColor: '#BDD2B6',
        margin: '50px',
        display: 'flex',
        marginLeft: '10%',
  

    },
    responsecard:{
        backgroundColor: '#BDD2B6',
        margin:'10px 25px',
        display: 'flex',
    }
  

}));

export default useStyles;