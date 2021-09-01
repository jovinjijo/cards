import React, { useCallback, useEffect, useState } from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import update from "immutability-helper";
import Card, { CardDetail } from "../card/Card";
import { apiCall, useInterval } from "../../util/Util";

export default function CardsDeck() {
  // cards is used to store the list of cards. When cards are rearranged, the order of cards change
  const [cards, setCards] = useState<CardDetail[]>([]);
  // saving is used to indicate whether the application is saving the data to backend or not
  const [saving, setSaving] = useState(false);
  // lastSaved stores the last saved date
  const [lastSaved, setLastSaved] = useState(new Date().toLocaleString());
  // cardsDirty is used to indicate whether the cards order was changed and needs saving
  const [cardsDirty, setCardsDirty] = useState(false);

  // Call the backend to get all cards initially
  useEffect(() => {
    const fn = async () => {
      try {
        const cards = await apiCall("/api/cards", "GET");
        // Sort the cards according to position before setting the state
        cards.sort((a: CardDetail, b: CardDetail) => a.position - b.position);
        setCards(cards);
      } catch (ex) {}
    };
    fn();
  }, []);

  // Call the backend every 5 seconds to update the positions, if it was updated
  useInterval(async () => {
    if (cardsDirty) {
      try {
        setSaving(true);
        await apiCall(
          "/api/cards",
          "PATCH",
          // Set the position attribute to the index of the card
          cards.map((card, idx) => ({ ...card, position: idx }))
        );
        setCardsDirty(false);
        setLastSaved(new Date().toLocaleString());
      } finally {
        // Set saving to false after a second so that the Spinner shows for 1 second instead of ~100 ms
        setTimeout(() => setSaving(false), 1000);
      }
    }
  }, 5000);

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
      // Whenever the order is changed, set cardsDirty to true so that it saves it
      setCardsDirty(true);
    },
    [cards]
  );

  return (
    <div>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ height: "3rem" }}
      >
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            Things you can do
          </Typography>
        </Grid>
        <Grid item>
          {saving ? (
            <CircularProgress color="secondary" size="1.5rem" />
          ) : (
            <Typography>Last Saved : {lastSaved}</Typography>
          )}
        </Grid>
      </Grid>

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
