import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "../card/Card";

export default function CardsDeck() {

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Things you can do
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Card></Card>
        </Grid>
        <Grid item xs={4}>
          <Card></Card>
        </Grid>
        <Grid item xs={4}>
          <Card></Card>
        </Grid>
        <Grid item xs={4}>
          <Card></Card>
        </Grid>
        <Grid item xs={4}>
          <Card></Card>
        </Grid>
      </Grid>
    </div>
  );
}
