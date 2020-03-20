import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import config from "../config";
import { Box } from "@material-ui/core";

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
        <Typography
          element="h1"
          variant="h2"
          className={classes.paragraphHeader}
        >
          What is Feel With Me?
        </Typography>
        <Typography element="p">
          Feel with me "matches" spotify users based on their top 50 songs and
          artists. This way, you can connect with people who care about the same
          music as you. This is also a great tool for finding new music.
        </Typography>
        <Typography
          element="h3"
          variant="h4"
          className={classes.paragraphHeader}
        >
          Backed by an advanced algorithm
        </Typography>
        <Typography element="p">
          Okay, maybe it's not that advanced... But nonetheless, our servers
          work hard to bring you the best matches.
        </Typography>
        <Box width="100%" mt="1rem" display="flex" justifyContent="center">
          <Box maxWidth="30rem">
            <img
              src={config.homeRoute + "/images/Computers At Work.png"}
              alt="Computers At Work"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
        <Typography
          element="h2"
          variant="h3"
          className={classes.paragraphHeader}
        >
          How did it start?
        </Typography>
        <Typography element="p">
          Music is one of the most important things in the world to me. When I
          find the right song, there is no better feeling. But as I age, it gets
          harder to find songs that make the same impact. However, there are{" "}
          <Link href="https://twitter.com/PigsAndPlans/status/1123598968162795526">
            40,000 songs uploaded to spotify every day
          </Link>
          , and it hurts to think of all the good music I will never find. A
          while ago, I had an idea: If I collected the top 10 songs of everyone
          in the world, there must be some people who share 9 out of 10 with me.
          If I haven't heard that 10th song, I need to, because it's definitely
          a banger.
        </Typography>
        <br />
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
