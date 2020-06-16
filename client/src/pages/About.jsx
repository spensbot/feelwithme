import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import config from "../config";
import { Box } from "@material-ui/core";
import Spacer from "../components/basic/Spacer";
import StepSection from '../components/about/StepSection'
import spotifyLogo from '../images/Spotify_Logo_RGB_Green.png'
import matchesExample from '../images/Matches.png'
import matchedArtists from '../images/MatchedArtists.jpg'
import dancing from '../images/Dancing1.jpeg'
import listening from '../images/listening.jpeg'
import ContainerBreakout from '../components/basic/ContainerBreakout'

const useStyles = makeStyles(theme => ({
  paragraphHeader: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3)
  },
  fancy: {
    fontFamily: 'Dancing Script, Cursive',
    fontSize: '2rem'
  },
  stepsOuter: {
    backgroundColor: '#0001',
    width: '500%',
    marginLeft: '-200%',
    margin: '3rem 0 3rem -200%',
    overflow: 'hidden'
  },
  stepsInner: {
    width: '20%',
    margin: '0 auto',
    padding: '5rem 0',
  }
}));

export default ({ dontUseHeader }) => {
  const classes = useStyles();

  return (
    <div>
      <Layout dontUseHeader={dontUseHeader}>
        <Spacer />
        <Typography variant="h3"> Connections Through Music </Typography>
        {/* <Typography variant="h5"> That's what <span className={classes.fancy}>Feel With Me</span> is all about</Typography> */}
        <Typography variant="h5"> That's what we're about.</Typography>
        <Box flexDirection="row" margin="3rem 0" display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
          <img width="100%" src={dancing} style={{maxWidth: "25rem"}} />
          <img width="100%" src={listening} style={{maxWidth: "25rem"}}/>
        </Box>
        <Typography variant="h5">Lets see how it works...</Typography>

        <ContainerBreakout backgroundColor="#0001" marginY="3rem" paddingY="3rem">
          <StepSection num={1} title="Login" description="This gives us access to your top 50 songs and artists" imageSrc={spotifyLogo} imageAlt="Spotify Logo"/>
          <Spacer />
          <StepSection num={2} title="Connect" description='You are "Matched" with other users based on your favorite songs and artists.' imageSrc={matchesExample} imageAlt="Matches Example"/>
          <Spacer />
          <StepSection num={3} title="Discover" description="Once logged in, you can view other users profiles to see how you match! Shared interests are highlighted in green." imageSrc={matchedArtists} imageAlt="Matched Artists Example" />
        </ContainerBreakout>
        <Typography element="h3" variant="h4">
          Backed by an advanced algorithm
        </Typography>
        <br />
        <Typography element="p">
          Our servers work hard to deliver the best matches.
        </Typography>
        <br />
        {/* <Typography
          element="h3"
          variant="h4"
        >
          Brought to you by cute robots
        </Typography>
        <br />
        <Typography element="p">
          Okay, maybe the're not that cute... But nonetheless, our servers
          work hard to bring you the best matches.
        </Typography> */}
        
        <Box width="100%" display="flex" justifyContent="center">
          <Box maxWidth="30rem">
            <img
              src={config.homeRoute + "/images/Computers At Work.png"}
              alt="Computers At Work"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
        <Spacer />
        <Typography variant="h4" gutterBottom>
          How did it start?
        </Typography>
        <Typography element="p">
          Music is one of the most important things in the world to me,
          and I'm always looking for new songs to fall in love with.
          Years ago, I had an idea: If I could collect the top 10 songs of everyone
          in the world, there must be some people who share 9 out of 10 with me.
          If I haven't heard their 10th song, I need to, because it's definitely
          a banger.
        </Typography>
        <Spacer percent={50}/>
        <Typography variant="h5" gutterBottom>
          It wasn't possible until now
        </Typography>
        <Typography element="p">
          Today, with the proliferation of online streaming, most people can
          populate our database with their top 50 songs and artists by simply
          logging in.
        </Typography>
        <Spacer />
      </Layout>
    </div>
  );
};


//--------------------------------     OLD VERSION     --------------------------------

// export default ({ dontUseHeader }) => {
//   const classes = useStyles();

//   return (
//     <div>
//       <Layout dontUseHeader={dontUseHeader}>
//         <Spacer />
//         <Typography element="h1" variant="h2">
//           What is Feel With Me?
//         </Typography>
//         <br />
//         <p> Feel With Me is all about connecting people who love the same music. It's also a great tool for finding new music. </p>
//         <p> Lets see how it works </p>
//         <Spacer />
//         <StepSection num={1} title="Login With Spotify" description="This gives us access to your top 50 songs and artists" imageSrc={spotifyLogo} imageAlt="Spotify Logo"/>
//         <Spacer />
//         <StepSection num={2} title="Connect" description='You are "Matched" with other users based on shared songs and artists. When you find that person that gets your music taste, send them a message!' imageSrc={matchesExample} imageAlt="Matches Example"/>
//         <Spacer />
//         <StepSection num={3} title="Discover" description="Once logged in, you can view anyone's profile. Shared interests are marked with a green check. " imageSrc={matchedArtists} imageAlt="Matched Artists Example" />
//         <Spacer />
//         <Typography element="h3" variant="h4">
//           Backed by an advanced algorithm
//         </Typography>
//         <br />
//         <Typography element="p">
//           Our servers work hard to deliver the best matches.
//         </Typography>
//         <br />
//         {/* <Typography
//           element="h3"
//           variant="h4"
//         >
//           Brought to you by cute robots
//         </Typography>
//         <br />
//         <Typography element="p">
//           Okay, maybe the're not that cute... But nonetheless, our servers
//           work hard to bring you the best matches.
//         </Typography> */}
        
//         <Box width="100%" display="flex" justifyContent="center">
//           <Box maxWidth="30rem">
//             <img
//               src={config.homeRoute + "/images/Computers At Work.png"}
//               alt="Computers At Work"
//               width="100%"
//               height="100%"
//             />
//           </Box>
//         </Box>
//         <Spacer />
//         <Typography
//           element="h2"
//           variant="h3"
//         >
//           How did it start?
//         </Typography>
//         <br />
//         <Typography element="p">
//           Music is one of the most important things in the world to me. When I
//           find the right song, there is no better feeling. But there are{" "}
//           <Link href="https://twitter.com/PigsAndPlans/status/1123598968162795526">
//             40,000 songs uploaded to spotify every day
//           </Link>
//           , and it hurts to think of all the good music I will never find. A
//           while ago, I had an idea: If I collected the top 10 songs of everyone
//           in the world, there must be some people who share 9 out of 10 with me.
//           If I haven't heard that 10th song, I need to, because it's definitely
//           a banger.
//         </Typography>
//         <Spacer />
//         <Typography element="h3" variant="h4">
//           And thus, Feel With Me was born.
//         </Typography>
//         <br />
//         <Typography element="p">
//           Today, with the proliferation of Spotify, people can
//           populate my database with their top 50 songs and artists by simply
//           logging in.
//         </Typography>
//         <br />

//       </Layout>
//     </div>
//   );
// };
