import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "../card/Card";

export default function CardsDeck() {
  const data = [
    { type: "bank-draft", title: "Bank Draft", position: 0 },
    { type: "bill-of-lading", title: "Bill of Lading", position: 1 },
    { type: "invoice", title: "Invoice", position: 2 },
    { type: "bank-draft-2", title: "Bank Draft 2", position: 3 },
    { type: "bill-of-lading-2", title: "Bill of Lading 2", position: 4 },
  ];

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Things you can do
      </Typography>
      <Grid container spacing={1}>
        {data.map((item) => (
          <Grid item xs={4} key={item.position}>
            <Card {...item}></Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
