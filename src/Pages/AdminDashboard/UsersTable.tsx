import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TUserFromDB } from "../../ConstAndTypes/consts";

type UserTableProps = {
  users: TUserFromDB[];
};

interface Column {
  id: "name" | "email" | "voice" | "lastLogin";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string) => string;
}

//   user_id: string;
//   name: string;
//   email: string;
//   password: string;
//   num_of_articles: number;
//   categories: TTopics[];
//   country: TCountries[];
//   language: TLanguages;
//   salt: string;
//   voice: TVoices;
//   should_create_episode: boolean;
//   should_send_episode_email: boolean;
//   last_login: string;
//   subscription: TSubscription;
//   role: TRole;
//   stage: TStage;
//   login_with: string;
//   profile_pic: string;

const columns: readonly Column[] = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  {
    id: "voice",
    label: "Voice",
    // minWidth: 170,
    // align: "right",
    // format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "lastLogin",
    label: "Last login",
    // minWidth: 170,
    // align: "right",
    format: (value: string) => {
      const newVal = new Date(value).toString();
      console.log(value, newVal);
      return newVal;
    },
  },
];

interface Data {
  name: string;
  email: string;
  voice: string;
  lastLogin: string;
}

function createData(user: TUserFromDB): Data {
  return {
    name: user.name,
    email: user.email,
    voice: user.voice,
    lastLogin: formatDate(user.last_login),
  };
}

const formatDate = (date: string) => {
  console.log(date);
  const dateString = new Date(date).toDateString();
  const timeString = new Date(date).toLocaleTimeString();
  return `${dateString} ${timeString}`;
};

export default function UsersTable({ users }: UserTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows: Data[] = [];
  users.forEach((user) => {
    const tempRow = createData(user);
    rows.push(tempRow);
  });
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
        height: "fit-content",
      }}
    >
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
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
  );
}
