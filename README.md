# MongoDB Vector Search UI

This is a simple UI for searching vectors in MongoDB. It uses the [MongoDB Vector Search API](https://www.mongodb.com/docs/atlas/atlas-search/knn-beta/) to search for vectors in a collection.

Configure and run the server in the `/server` folder and the UI in the `/ui` folder. You can enter a string to search. The code will convert the string to a vector and search for the closest vectors in the collection.

## Usage

- Clone this repository
- Run `npm install`
- Copy `.env.example` to `.env` and fill in the values in the `/server` folder
- Run `npm run dev --workspace=server` and `npm run dev --workspace=ui`
- Go to `http://localhost:3000` in your browser

> For now running `npm run dev --workspaces` does not run both apps at the same time. You will need to run them in separate terminals.

## Example

![screenshot](images/example.png)
