import React, {useEffect, useState, useRef} from 'react';
import List from '@material-ui/core/List';
import ListItem from './SpotifyListItem';
import { makeStyles, Button, Typography, Box } from '@material-ui/core';
import Spacer from '../basic/Spacer';
import LoadingPage from '../basic/LoadingPage';

const limit = 10

const useStyles = makeStyles(theme => ({
    title: {
        position: 'sticky',
        top: '3rem',
        zIndex: '10',
        backgroundColor: theme.palette.background.default,
        padding: '0.5rem'
    }
}))


export default function SpotifyList({isMe, isTracks, items, me}) {

    const [expanded, setExpanded] = useState(false)

    const classes = useStyles()

    const title = isTracks? "Top Songs" : "Top Artists"
    let compareList = []
    if (!isMe){
        compareList = isTracks ? me.topTracks : me.topArtists 
    }

    let headerHeight = '50' //pixels

    const titleRef = useRef();

    function onLoad() {
        headerHeight = document.getElementById('header').offsetHeight
        titleRef.current.style.top = "300px"
    }

    useEffect(() => {
        window.addEventListener('load', onLoad)

        return window.removeEventListener('load', onLoad)
    }, [])

    return (
        <div>
            <div className={classes.title} ref={titleRef}>
                <Typography variant="h4" className={classes.title}>{title}</Typography>
            </div>
            <Spacer percent={30} />
            <List>
                {items.map((item, index) => {
                    if (index < limit || expanded) {
                        return <ListItem key={index} index={index} item={item} isMatch={isInList(item.id, compareList)}/>
                    }
                })}
            </List>
            <Box display="flex" justifyContent="center">
            {
                expanded
                ? 
                <Button onClick={() => setExpanded(false)}>Show Less -</Button>
                :
                <Button onClick={() => setExpanded(true)}>Show More +</Button>
            }
            </Box>

        </div>
    )
}

function isInList(id, list){
    const match = list.find(item => {
        return (item.id === id)
    })
    if (match === undefined) {
        return false
    } else {
        return true
    }
}