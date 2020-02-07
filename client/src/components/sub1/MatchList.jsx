import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box'
import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestStates } from '../../redux/reducers'

const useStyles = makeStyles(theme => ({
    root: {

    },
    listItemText: {
        marginBottom: theme.spacing(-.5),
        padding: 0
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginRight: theme.spacing(2)
    },
    percentage: {
        fontSize: '2em'
    }
}))

function MatchListItem({ match }) {
    const classes = useStyles()

    const percentString = (match.weightedMatch * 100).toPrecision(2) + '%';
    const artistString = match.commonArtistCount + " Artists"
    const songString = match.commonSongCount + " Songs"
    const linkUrl = '/users/' + match._id

    return (
        <>
            <ListItem component={Link} to={linkUrl} button>
                <ListItemAvatar>
                    <Avatar className={classes.avatar} alt="match" src={match.imageUrl} />
                </ListItemAvatar>
                <Box flex="1 1 auto" display="flex" flexDirection="column" justifyContent="center">
                    <ListItemText className={classes.listItemText} primary={match.spotifyId} secondary={songString} />
                    <ListItemText secondary={artistString} />
                </Box>

                <Typography className={classes.percentage}>{percentString}</Typography>
            </ListItem>
            <Divider />
        </>
    )
}

function MatchList({ matches, requestState }) {
    if (requestState === requestStates.FETCHING) {
        return (
            <div className="song-list">
                <h1>Your Matches</h1>
                <CircularProgress />
            </div>
        )
    } else {

        return (
            <div className="song-list">
                <h1>Your Top Matches</h1>
                <List>
                    {matches.map((match, index) => {
                        return <MatchListItem key={index} match={match} />
                    })}
                </List>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    matches: state.matches.matches,
    requestState: state.matches.requestState
})

export default connect(
    mapStateToProps
)(MatchList)