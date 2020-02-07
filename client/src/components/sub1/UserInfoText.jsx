import React from 'react'
import { setEditInfo, patchUserInfo } from '../../redux/actions'
import { connect } from 'react-redux'
import { Button, Box, Divider, TextField, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
    spacedButton: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    nameField: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}))


function UserInfoText({isMainUser, viewedUser, editInfo, setEditInfo, patchUserInfo}){
    const classes = useStyles()

    const editMode = (isMainUser && editInfo.isEditing)

    const nameBlock = editMode ?
        (<TextField label="Name" fullWidth={true} value={editInfo.name} onChange={e => setEditInfo(null, e.target.value, null)}/>):
        (<Typography variant="h4">{viewedUser.user.fwmDisplayName}</Typography>)

    const bioBlock = editMode ? 
        (<TextField label="Bio" value={editInfo.bio} onChange={e => setEditInfo(null, null, e.target.value)} multiline rows="4"/>):
        (<>
            <Divider />
            <p>{viewedUser.user.fwmBio || "This User Hasn't Created A Bio Yet"}</p>
        </>)

    let buttonsBlock = (<Button variant="contained">message</Button>)
    if (editMode) {
        buttonsBlock = (
            <>
                <Button variant="contained" onClick={() => setEditInfo(false, null, null)} className={classes.spacedButton}>cancel</Button>
                <Button variant="contained" onClick={() => patchUserInfo(editInfo.name, editInfo.bio)}>save</Button>
            </>
        )
    } else if (isMainUser) {
        buttonsBlock = (<Button variant="contained" onClick={() => setEditInfo(true, viewedUser.user.fwmDisplayName, viewedUser.user.fwmBio)}>edit info</Button>)
    }

    return (
        <Box display="flex" flexDirection="column" flex="1 1 0">
            <Box className={classes.nameField} display="flex" justifyContent="space-between" alignItems="center">
                <Box flex='1 1 auto'>
                    {nameBlock}
                </Box>
                {buttonsBlock}
            </Box>
            {bioBlock}
        </Box>
    )
}

const mapStateToProps = state => ({
    editInfo: state.editInfo,
})
const mapDispatchToProps = dispatch => ({
    setEditInfo: (isEditing, name, bio) => dispatch(setEditInfo(isEditing, name, bio)),
    patchUserInfo: (name, bio) => dispatch(patchUserInfo(name, bio))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoText)