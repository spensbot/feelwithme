import React from 'react';
import List from '@material-ui/core/List';
import ListItem from './SpotifyListItem';

export default ({isMe, isTracks, items, me}) => {

    const title = isTracks? "Top Songs" : "Top Artists"
    let compareList = []
    if (!isMe){
        compareList = isTracks ? me.topTracks : me.topArtists 
    }

    return (
        <div>
            <h1>{title}</h1>
            <List>
                {items.map((item, index) => {
                    return <ListItem key={index} item={item} isMatch={isInList(item._id, compareList)}/>
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