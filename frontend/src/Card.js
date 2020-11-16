//import React and the relevent components from material ui
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

//create styles variable for card compoenent
const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    minHeight: 600,
  },
});

//use functional components to create a card and set it as the default export.
export default function DisplayCard(props) {

  //bring in the styles variable
  const classes = useStyles();


  //this components display a card and uses props passed down to it from the Display component
  return (
    <div>
      <Card className={classes.root}>
      <CardActionArea className="content">
        <CardMedia
          component="img"
          alt="Artist Artwork"
          height="250"
          image={props.coverImage}
          title="Artist Cover Image"
          className="coverImage"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.trackName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.artistName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="outlined" color="primary">
          <Link color="inherit"  href={props.artistViewURL} target="_blank" rel="noopener noreferrer">View Artist</Link>
        </Button>
        <Button variant="outlined" color="primary">
          <Link color="inherit" href={props.trackViewURL} target="_blank" rel="noopener noreferrer">View Track</Link>
        </Button>
        <Button variant="outlined" color="primary" type="button" onClick={(e) => props.favourite(e, props.id, props.artistName, props.trackName)}>
          Add to favourite
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}
