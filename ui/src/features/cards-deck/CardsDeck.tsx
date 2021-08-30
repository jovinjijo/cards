import React, { useCallback, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import update from "immutability-helper";
import Card from '../card/Card'

export default function CardsDeck() {
  const [cards, setCards] = useState([
    { type: "bank-draft", title: "Bank Draft", position: 0 },
    { type: "bill-of-lading", title: "Bill of Lading", position: 1 },
    { type: "invoice", title: "Invoice", position: 2 },
    { type: "bank-draft-2", title: "Bank Draft 2", position: 3 },
    { type: "bill-of-lading-2", title: "Bill of Lading 2", position: 4 },
  ]);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [cards],
  )

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Things you can do
      </Typography>
      <Grid container spacing={1}>
        {cards.map((item, idx) => (
          <Grid item xs={4} key={item.position}>
            <Card {...item} moveCard={moveCard} index={idx}></Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
