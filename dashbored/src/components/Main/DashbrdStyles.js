import { makeStyles } from '@material-ui/core/styles';
const DashbrdStyles = makeStyles((theme) => ({
    send: { color: '#2391e9', margin: theme.spacing(1) },
    sendTo: { color: '#000000', margin: theme.spacing(1) },
    recipient:
    {
        padding: '3px 15px',
        fontSize: '10px',
        height: '28px',
        backgroundColor: 'white',
        color: '#0068a9',
        boxShadow: '0px 1px 4px -2px #383838'
    },
    closebtn: {
        color: 'red',
        marginLeft: '2px',
        fontSize: '16px',

    },
    contactIcon: {
        color: '#bfbfbf',
        marginRight: '5px',
        fontSize: '17px'
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fabProgress: {
        color: '#0091ea',
        position: 'absolute',
        left: '7px',

        zIndex: 1,
    },
    LinkOffIcon: {
        marginLeft: '4px',
        color: '#FF9800'
    },
    LinkOnIcon: {
        marginLeft: '4px',
        color: 'green'
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    TransPaper: {
        width: 230,
    },
    orange: {
        backgroundColor: 'orange'
    },
    transMenu: {
        fontSize: '12px'
    }
}));
export default DashbrdStyles;