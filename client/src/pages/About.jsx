import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";


const useStyles = makeStyles(theme => ({
  paragraphHeader: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3)
  }
}));

function About() {
  const classes = useStyles();

  return (
    <div>
      <Layout>
        <Typography
          element="h1"
          variant="h3"
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
          element="h1"
          variant="h3"
          className={classes.paragraphHeader}
        >
          How did it start?
        </Typography>
        <Typography element="p">
          Music is one of the most important things in the world to me. When I
          find the right song, there is no better feeling. (I don't know why,
          but the songs that move me most always end up being sad). As I age, it
          is harder to find songs that make the same impact. But there are{" "}
          <Link href="https://twitter.com/PigsAndPlans/status/1123598968162795526">
            40,000 songs uploaded to spotify every day
          </Link>
          , and it hurts to think of all the good music I will never find. In my
          last year of college, I had an idea: If I create a list of the top 10
          songs of everyone in the world, there must be some people who share 9
          out of 10 with me. If I haven't heard that 10th song, I need to,
          because I would surely love it.
        </Typography>
        <br />
        <Typography element="p">
          That was 5 years ago. I tried implementing the idea then, but I had no
          idea what I was doing. Today, I recently learned web development, and
          the proliferation of Spotify means many people can populate my
          database with their top 50 songs and artists by simply logging in.
        </Typography>
      </Layout>
    </div>
  );
}

export default About;
