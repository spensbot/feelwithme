import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import config from "../config";
import { Box } from "@material-ui/core";
import Spacer from "../components/basic/Spacer";

const useStyles = makeStyles(theme => ({
  paragraphHeader: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3)
  }
}));

export default ({ dontUseHeader }) => {
  const classes = useStyles();

  return (
    <div>
      <Layout dontUseHeader={dontUseHeader}>
        <Spacer />
        <Typography
          element="h1"
          variant="h2"
        >
          What is Feel With Me?
        </Typography>
        <br />
        <Typography element="p">
          Feel with me "matches" spotify users based on their top 50 songs and
          artists. This way, you can connect with people who care about the same
          music as you. This is also a great tool for finding new music.
        </Typography>
        <Spacer />
        <Typography
          element="h3"
          variant="h4"
        >
          Backed by an advanced algorithm
        </Typography>
        <br />
        <Typography element="p">
          Okay, maybe it's not that advanced... But nonetheless, our servers
          work hard to bring you the best matches.
        </Typography>
        <br />
        <Typography
          element="h3"
          variant="h4"
        >
          Brought to you by cute robots
        </Typography>
        <br />
        <Typography element="p">
          Okay, maybe the're not that cute... But nonetheless, our servers
          work hard to bring you the best matches.
        </Typography>
        
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
        <Typography
          element="h2"
          variant="h3"
        >
          How did it start?
        </Typography>
        <br />
        <Typography element="p">
          Music is one of the most important things in the world to me. When I
          find the right song, there is no better feeling. But there are{" "}
          <Link href="https://twitter.com/PigsAndPlans/status/1123598968162795526">
            40,000 songs uploaded to spotify every day
          </Link>
          , and it hurts to think of all the good music I will never find. A
          while ago, I had an idea: If I collected the top 10 songs of everyone
          in the world, there must be some people who share 9 out of 10 with me.
          If I haven't heard that 10th song, I need to, because it's definitely
          a banger.
        </Typography>
        <Spacer />
        <Typography element="h3" variant="h4">
          And thus, Feel With Me was born.
        </Typography>
        <br />
        <Typography element="p">
          Today, with the proliferation of Spotify, people can
          populate my database with their top 50 songs and artists by simply
          logging in.
        </Typography>
        <br />

      </Layout>
    </div>
  );
};
