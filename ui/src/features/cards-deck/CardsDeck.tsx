import React, { useCallback, useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import update from "immutability-helper";
import Card, { CardDetail } from "../card/Card";
import { apiCall } from "../../util/Util";

export default function CardsDeck() {
  const [cards, setCards] = useState<CardDetail[]>([]);

  useEffect(() => {
    const fn = async () => {
      try {
        const cards = await apiCall("/api/cards", "GET");
        setCards(cards);
      } catch (ex) {}
    };
    fn();
  }, []);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );

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
