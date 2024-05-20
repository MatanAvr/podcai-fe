import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TUserFromDB } from "../../Api/ApiTypesAndConsts";
import { Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface Column {
  id: "name" | "email" | "voice" | "lastLogin" | "episodes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  {
    id: "voice",
    label: "Voice",
  },
  {
    id: "lastLogin",
    label: "Last login",
    format: (value: string) => {
      const newVal = new Date(value).toString();
      return newVal;
    },
  },
  {
    id: "episodes",
    label: "Episodes",
    format: (value: string) => {
      const newVal = new Date(value).toString();
      return newVal;
    },
  },
];

interface Data {
  name: string;
  email: string;
  voice: string;
  lastLogin: string;
  episodes: string;
}

function createData(user: TUserFromDB): Data {
  return {
    name: user.name,
    email: user.email,
    voice: user.voice,
    lastLogin: formatDate(user.last_login),
    episodes: "",
  };
}

const formatDate = (date: string) => {
  const dateString = new Date(date).toDateString();
  const timeString = new Date(date).toLocaleTimeString();
  return `${dateString} ${timeString}`;
};

type EpisodesTableProps = {
  username: string;
  userId: string;
};

export default function EpisodesTable({
  username,
  userId,
}: EpisodesTableProps) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);
  const rows: Data[] = [];

  //   episodes.forEach((episode) => {
  //     const tempRow = createData(episode);
  //     rows.push(tempRow);
  //   });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography variant="h5" color={"primary"}>
        {username}'s episdoes
      </Typography>

      <Paper
        id="episodes-table-wrapper"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
          height: "fit-content",
        }}
      >
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="episodes table" size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <b>{column.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
