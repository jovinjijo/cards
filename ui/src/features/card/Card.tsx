import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Typography,
  CardContent,
  CardActionArea,
  Card,
} from "@material-ui/core";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
});

interface DragItem {
  title: string;
  position: number;
  type: string;
  index: number;
}

interface CardProps extends DragItem {
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export default function UserCard(props: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const { title, type, moveCard, index } = props;

  // Create a state for storing whether the image is loaded or not
  const [loaded, setLoaded] = React.useState(false);

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
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
    </div>
  );
}
