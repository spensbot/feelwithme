import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: "center",
        padding: theme.spacing(5)
    }
}))

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span>Made with <span role="img" aria-label="heart emoji">❤️</span> in Portland, OR</span>
        </div>
    )
}