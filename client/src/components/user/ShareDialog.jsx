import React, {useState} from 'react'
import { makeStyles, Button, Typography, Paper } from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 200,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000c',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    width: '90%',
    maxWidth: '35rem',
    padding: '4%',
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
  },
  linkCollection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "1rem 0",
    '& > *': {
      margin: '0.2rem'
    }
  },
  url: {
    opacity: '0.6',
    maxWidth: "100%",
    wordWrap: "break-word",
    fontSize: "0.9rem",
    backgroundColor: '#000a',
    padding: '0.3rem'
  },
  message: {
    opacity: '0.6',
    maxWidth: "100%",
    fontSize: "0.9rem",
  }
}))

export default function ShareDialog({onClose}) {

  const classes = useStyles()

  const [message, setMessage] = useState(null)

  const openInNewTab = (url) => () => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  function getUrlWithParams(baseUrl, params){
    let url = baseUrl + "?"
    for (let [key, value] of Object.entries(params)) {
      url += key + "=" + encodeURIComponent(value) + "&"
    }
    return url.slice(0, -1)
  }

  const title = "Check out my Feel With Me profile to see how we match musically!"

  //const profileUrl = window.location.href
  const profileUrl = "https://feelwithme.net/user/5e78588c866b5110ced3f581"
  //const facebookShareLink = "https://www.facebook.com/sharer.php?u=" + encodedProfileURL
  const facebookShareLink = getUrlWithParams("https://www.facebook.com/sharer.php", {u: profileUrl})
  const twitterShareLink = getUrlWithParams("https://twitter.com/intent/tweet", {
    url: profileUrl,
    text: title,
    hashtags: "feelwithme,connect,relationships,match,music"
  })
  const redditShareLink = getUrlWithParams("https://reddit.com/submit", {
    url: profileUrl,
    title: title
  })

  function copyToClipboard(){
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(profileUrl).then(function() {
          setMessage("Copied To Clipboard :)")
        }, function() {
          setMessage("Copy Failed :(")
        });
      } else {
        setMessage("Feel With Me does not have permission to modify the clipboard")
      }
    })
  }

  const iconStyle = {marginRight: '0.5rem'}

  return (
    <div className={classes.root}>
      <Paper className={classes.dialog}>
        <Typography variant="h6">Share Your Profile</Typography>
        <div className={classes.linkCollection}>
          <Button fullWidth variant="contained" onClick={openInNewTab(facebookShareLink)}>Facebook</Button>
          <Button fullWidth variant="contained" onClick={openInNewTab(twitterShareLink)}>Twitter</Button>
          <Button fullWidth variant="contained" onClick={openInNewTab(redditShareLink)}>Reddit</Button>
          <Typography className={classes.url}>{profileUrl}</Typography>
          <Button onClick={copyToClipboard}><FileCopyIcon style={iconStyle}/> Copy</Button>
          {message ? <Typography className={classes.message}>{message}</Typography> : null}
        </div>
        <Button onClick={onClose}>Dismiss</Button>
      </Paper>
    </div>
  )
}
