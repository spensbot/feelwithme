import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';
import CommonIndicator from './CommonIndicator'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(2),
    },
    number: {
        fontSize: '1.5em',
        fontWeight: 'lighter'
    }
}))

function BasicListItem({item, isMatch}) {
    const classes = useStyles()
    const spotifyUrl = item.spotifyUrl;

    let imageUrl
    let secondary
    if (item.imageUrl){ //Artist
        imageUrl = item.imageUrl
        secondary = "Popularity " + item.popularity 
        secondary = ""
    } else { //Song
        imageUrl = item.album.imageUrl
        secondary = item.artists[0].name
    }

    return (
    <>
        <ListItem button component="a" href={spotifyUrl} target="_blank">
            <ListItemAvatar>
                <Avatar className={classes.avatar} alt="song" src={imageUrl}/>
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={secondary}/>
            {isMatch ? <CommonIndicator /> : null}
        </ListItem>
        <Divider />
    </>
    )
}

function BasicList({isMainUser, isSongs, items, mainUser}) {

    const title = isSongs ? "Top Songs" : "Top Artists"
    let compareList = []
    if (!isMainUser){
        compareList = isSongs ? mainUser.user.topSongs : mainUser.user.topArtists 
    }

    return (
        <div>
            <h1>{title}</h1>
            <List>
                {items.map((item, index) => {
                    return <BasicListItem key={index} item={item} isMatch={isInList(item._id, compareList)}/>
                })}
            </List>
        </div>
    )
}

function isInList(id, list){
    const match = list.find(item => {
        return (item._id === id)
    })
    if (match === undefined) {
        return false
    } else {
        return true
    }
}

const mapStateToProps = state => ({
    mainUser: state.mainUser
})

export default connect (
    mapStateToProps
)(BasicList)