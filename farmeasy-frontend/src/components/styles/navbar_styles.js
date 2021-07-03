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
        margin:'10px 35px',
        display: 'flex',
        padding:'8px 18px',
        justifyContent:'center'
    },
    imageresponsecard:{
        backgroundColor: '#BDD2B6',
        margin:'10px 35px',
        display: 'flex',
        flexDirection:'column',
        padding:'30px',
        justifyContent:'center'
    },
    listItemHeader: {
        fontWeight: 'bold',
        marginLeft:'50px'
    },
    listItemTextField: {
        width: '300px'
    },
    analyzationcard: {
        backgroundColor: '#BDD2B6',
        margin:'10px 35px',
        display: 'flex',
        maxWidth: '70%',
        height: 'auto',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    modalPaper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        flexBasis: '0'
    },
    modalParentContent: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    modalContent: {
        padding: '10px',
        margin: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: '1',
        flexBasis: '0',
        width: '140px',
        border: '2px solid #A8A8A8', '&:hover' :{
            border: '2px solid #0e70ad' },
        cursor: 'pointer',
        
    },
  

}));

export default useStyles;