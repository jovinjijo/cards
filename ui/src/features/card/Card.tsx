import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardMedia, CircularProgress, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
});

interface CardProps {
  title: string;
  position: number;
  type: string;
}

export default function UserCard(props: CardProps) {
  const classes = useStyles();
  const { title, type } = props;

  // Create a state for storing whether the image is loaded or not
  const [loaded, setLoaded] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/* 'img' is used here instead of 'CardMedia' provided by Material-UI because CardMedia doesnt provide a callback when the image is loaded.
            We Show the image once the image is loaded. We hide the spinner once the image is loaded.
            'img' is not kept inside the ternary operator because the image would never load if it's kept inside */}
        <div
          style={{
            height: loaded ? "100%" : "0px",
          }}
        >
          <img
            width="100%"
            className={classes.media}
            src={`https://picsum.photos/seed/${type}/200/300`}
            alt={title}
            onLoad={() => setLoaded(true)}
          />
        </div>
        {loaded ? (
          <span />
        ) : (
          <div
            style={{
              height: loaded ? "0px" : "100%",
              minHeight: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
