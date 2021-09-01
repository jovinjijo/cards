# Frontend

Frontend is built on React using [create-react-app](https://create-react-app.dev/). Material-UI is used for components in the UI. For deployment, the React app is built and static HTML files are served using NGINX. The backend calls are proxied to the backend API.

## Components

### Card

It's used to render a card. It shows an image as well as the title of the Card.

[Implementation](./src/features/card/Card.tsx)
### Cards Deck

It's used to render all the cards and allow drag and drop of cards

[Implementation](./src/features/cards-deck/CardsDeck.tsx)

### Image Dialog

It's used to show the overlay with the image of the card when a card is clicked.

[Implementation](./src/features/image-dialog/ImageDialog.tsx)

### Other features

 - [picsum.photos](picsum.photos) is used to display images based on a random seed of card type
 - Requests to Backend are proxied to backend using NGINX. More details [here](./nginx/default.conf.template) and [here](./Dockerfile)