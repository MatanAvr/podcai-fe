import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TUserFromDB } from "../../Api/ApiTypesAndConsts";
import { IconButton, Typography } from "@mui/material";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { ChangeEvent, ReactElement, useState } from "react";
import UserEpisodeModal from "../../Components/UI/UserEpisodeModal";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import { ArchiveUserModal } from "../../Components/UI/ArchiveUserModal";
import useDeleteUserById from "../../Hooks/useDeleteUserById";

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

type Column = {
  id:
    | "name"
    | "email"
    | "stage"
    | "lastLogin"
    | "generate"
    | "sendEmail"
    | "episodes"
    | "archive";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: string) => string;
};

const columns: readonly Column[] = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "stage", label: "Stage" },
  { id: "generate", label: "Generate", align: "center" },
  { id: "sendEmail", label: "Send email", align: "center" },
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
  },
  {
    id: "archive",
    label: "Archive",
  },
];

type Data = {
  name: string;
  email: string;
  stage: string;
  generate: ReactElement;
  sendEmail: ReactElement;
  lastLogin: string;
  episodes: ReactElement;
  archive: ReactElement;
};

const formatDate = (date: string) => {
  const dateString = new Date(date).toDateString();
  return dateString;
};

type UserTableProps = {
  users: TUserFromDB[];
};

export default function UsersTable({ users }: UserTableProps) {
  const { mutate: deleteUserById } = useDeleteUserById();

  const [userIdToDelete, setUserIdToDelete] = useState<string | undefined>(
    undefined
  );
  const [userNameToDelete, setUserNameToDelete] = useState<string | undefined>(
    undefined
  );

  const [userIdToShow, setUserIdToShow] = useState<string | undefined>(
    undefined
  );
  const [userNameToShow, setUserNameToShow] = useState<string | undefined>(
    undefined
  );
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);
  const rows: Data[] = [];
  users.forEach((user) => {
    const tempRow = createData(user);
    rows.push(tempRow);
  });
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const deleteUserByIdHandler = (userId: string) => {
    deleteUserById(userId);
    setUserIdToDelete(undefined);
    setUserNameToDelete(undefined);
  };

  function createData(user: TUserFromDB): Data {
    return {
      name: user.name,
      email: user.email,
      stage: user.stage,
      generate: user.should_create_episode ? (
        <CheckCircleRoundedIcon fontSize="small" color="success" />
      ) : (
        <RemoveCircleOutlineRoundedIcon fontSize="small" color="action" />
      ),
      sendEmail: user.should_send_episode_email ? (
        <CheckCircleRoundedIcon fontSize="small" color="success" />
      ) : (
        <RemoveCircleOutlineRoundedIcon fontSize="small" color="action" />
      ),
      lastLogin: formatDate(user.last_login),
      episodes: (
        <IconButton
          onClick={() => {
            setUserIdToShow(user.user_id);
            setUserNameToShow(user.name);
          }}
        >
          <FormatListBulletedRoundedIcon />
        </IconButton>
      ),
      archive: (
        <IconButton
          onClick={() => {
            setUserIdToDelete(user.user_id);
            setUserNameToDelete(user.name);
          }}
        >
          <ArchiveRoundedIcon />
        </IconButton>
      ),
    };
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography variant="h5" color={"primary"}>
        All users table
      </Typography>

      <Paper
        id="users-table-wrapper"
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "fit-content",
        }}
      >
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="all users table" size="small">
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
                            {value}
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
      {userIdToShow && userNameToShow && (
        <UserEpisodeModal
          userId={userIdToShow}
          username={userNameToShow}
          onClose={() => {
            setUserIdToShow(undefined);
            setUserNameToShow(undefined);
          }}
        />
      )}
      {userIdToDelete && userNameToDelete && (
        <ArchiveUserModal
          title="Confirm user archive"
          message={`Are you sure you want to archive ${userNameToDelete}?`}
          onConfirm={() => {
            deleteUserByIdHandler(userIdToDelete);
          }}
          onClose={() => {
            setUserIdToDelete(undefined);
            setUserNameToDelete(undefined);
          }}
        />
      )}
    </>
  );
}
