import { Button, TextField, Grid, Box } from "@mui/material";
import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleClick = () => {
    onSearch(query);
  };

  return (
    <Box m={2} component="form" noValidate autoComplete="off">
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="top"
      >
        <Grid item xs={10} justifyContent="start" >
          <TextField
            fullWidth
            hiddenLabel
            label="Search value"
            id="filled-hidden-label-normal"
            variant="outlined"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            sx={{
              boxShadow: 0,
              height: "56px",
            }}
            variant="contained"
            onClick={handleClick}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
