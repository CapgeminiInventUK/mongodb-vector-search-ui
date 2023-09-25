import { useState } from "react";
import Search from "./components/Search";
import Result from "./components/Result";
import {
  AppBar,
  Container,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";

const App: React.FC = () => {
  const [data, setData] = useState<
    { loc: string; text: string; score: number }[]
  >([]);

  const handleSearch = async (query: string) => {
    // Replace with actual API endpoint.
    const response = await fetch('http://localhost:3000/api/search', {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      
    const result = await response.json();
    
    setData(result);
  };

  const theme = createTheme({
    palette: {
      primary: { main: "#00674A" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MongoDB Vector Search
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MongoDB
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ paddingTop: 2 }}>
        <Search onSearch={handleSearch} />
      </Container>
      <Container sx={{ paddingTop: 2 }}>
        <Result data={data} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
