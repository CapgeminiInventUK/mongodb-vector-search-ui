// src/components/Result.tsx

import React from "react";
import { calculateColor, calculateTextColor } from "../utils/colourUtils";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface ResultProps {
  data: { loc: string; text: string; score: number }[];
}

const Result: React.FC<ResultProps> = ({ data }) => {
  if (data.length === 0) return <div></div>;

  data.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  });
    
    
    

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Text</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
                  {data.map((row) => {
              
                      const bgColor = calculateColor(row.score);
                    const rgbValues = bgColor.slice(4, -1).split(',').map(Number) as [number, number, number];
                    const textColor = calculateTextColor({
                        r: rgbValues[0],
                        g: rgbValues[1],
                        b: rgbValues[2],
                    });
                      
              return (
                  <TableRow
                      style={{ verticalAlign: "top" }}
                      key={row.loc} // Change to id
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                      <TableCell component="th" scope="row">
                          <a href={row.loc}>{row.loc}</a>
                      </TableCell>
                      <TableCell component="th" scope="row">
                          {row.text}
                      </TableCell>

                      <TableCell>
                          <Chip
                              sx={{
                                  borderRadius: 2,
                                  minWidth: 108,
                                  color: textColor,
                                  background: bgColor,
                              }}
                              label={row.score}
                              variant="filled" />
                      </TableCell>
                  </TableRow>
              );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Result;
