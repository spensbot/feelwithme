import React, {useEffect, useState, useRef} from 'react';
import List from '@material-ui/core/List';
import ListItem from './SpotifyListItem';
import { makeStyles, Button, Typography, Box, ButtonGroup } from '@material-ui/core';
import Spacer from '../basic/Spacer';

const useStyles = makeStyles(theme => ({
    title: {
        position: 'sticky',
        top: '3.5rem',
        zIndex: '10',
        backgroundColor: theme.palette.background.default,
        padding: '0.5rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        padding: '0'
    }
}))


export default function SpotifyList({isMe, isTracks, items, me}) {

    const [limit, setLimit] = useState(10)

    const classes = useStyles()

    const title = isTracks? "Songs" : "Artists"
    let compareList = []
    if (!isMe){
        compareList = isTracks ? me.topTracks : me.topArtists 
    }

    const titleRef = useRef();

    function updateHeader() {
        const headerHeight = document.getElementById('header').offsetHeight
        titleRef.current.style.top = `${headerHeight}px`
    }

    useEffect(() => {
        updateHeader()
        window.addEventListener('resize', updateHeader)

        //Cleanup function, called when component un-mounts
        return () => {
            window.removeEventListener('resize', updateHeader)
        } 
    }, [])

    return (
        <div>
            <div className={classes.title} ref={titleRef}>
                <Typography variant="h4" className={classes.title}>{title}</Typography>
                <div>
                    <ButtonGroup>
                        <Button variant={limit === 10 ? "contained" : "outlined"} className={classes.button} onClick={() => setLimit(10)}>10</Button>
                        <Button variant={limit === 25 ? "contained" : "outlined"} className={classes.button} onClick={() => setLimit(25)}>25</Button>
                        <Button variant={limit === 50 ? "contained" : "outlined"} className={classes.button} onClick={() => setLimit(50)}>50</Button>
                    </ButtonGroup>
                </div>
            </div>
            <Spacer percent={30} />
            <List>
                {items.map((item, index) => {
                    if (index < limit) {
                        return <ListItem key={index} isTrack={isTracks} index={index} item={item} isMatch={isInList(item.id, compareList)}/>
                    }
                    else return null
                })}
            </List>
            <Box display="flex" justifyContent="center">
            {/* {
                expanded
                ? 
                <Button onClick={() => setExpanded(false)}>Show Less -</Button>
                :
                <Button onClick={() => setExpanded(true)}>Show More +</Button>
            } */}
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