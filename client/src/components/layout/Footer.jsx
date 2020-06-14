import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        padding: theme.spacing(3),
        backgroundColor: '#0002'
    },
    links: {
        '& a': {
            color: '#888',
            textDecoration: 'none'
        },
        color: '#888'
    }
}))

export default function Footer(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span>Made with <span role="img" aria-label="heart emoji">❤️</span> in Portland, OR</span>
            <div className={classes.links}>
                <Link to="/terms">Terms & Conditions</Link>
                <span> | </span>
                <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
        </div>
    )
}