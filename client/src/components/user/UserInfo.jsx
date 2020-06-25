import React, {useState} from "react"
import { makeStyles } from "@material-ui/core"
import UserInfoText from "./UserInfoText"
import EditIcon from '@material-ui/icons/Edit'
import ImageEditDialog from './ImageEditDialog'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  userInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  userImage: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    marginRight: theme.spacing(5),
    position: 'relative',
    //borderRadius: '50%',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  imageEditButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    background: '#000a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fffc',
    opacity: 0,
    '&:hover': {
      opacity: 1
    },
    zIndex: 1
  },
  editIcon: {
    marginRight: '0.5rem'
  }
}));

export default ({ isMe, user }) => {
  const classes = useStyles()

  const [isImageEdit, setIsImageEdit] = useState(false)

  return (
    <div className={classes.userInfo}>
      <div className={classes.userImage}>
        {user.imageUrl
          ? <img className={classes.image} src={user.imageUrl} alt={user.displayName} />
          : <AccountCircleIcon className={classes.image} />
        }

        {isMe ?
          <div className={classes.imageEditButton} onClick={() => setIsImageEdit(true)}>
          <EditIcon className={classes.editIcon}/><p>Edit</p>
          </div>
          : null
        }
      </div>
      

      <UserInfoText isMe={isMe} user={user} />
      {isImageEdit ? <ImageEditDialog user={user} onClose={() => setIsImageEdit(false)} /> : null}
    </div>
  );
};
