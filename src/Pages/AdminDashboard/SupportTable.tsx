import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { SupportMessageType } from "../../Api/ApiTypesAndConsts";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton, Typography } from "@mui/material";
import { ChangeEvent, ReactElement, useState } from "react";
import { GenericModal } from "../../Components/UI/GenericModal";
import useDeleteSupportMessage from "../../Hooks/useDeleteSupportMessage";

type Column = {
  id: "id" | "email" | "subject" | "message" | "delete";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string) => string;
};

const columns: readonly Column[] = [
  { id: "id", label: "Id" },
  { id: "email", label: "Email" },
  {
    id: "subject",
    label: "Subject",
  },
  {
    id: "message",
    label: "Message",
    format: (value: string) => {
      const newVal = new Date(value).toString();
      return newVal;
    },
  },
  {
    id: "delete",
    label: "Delete",
    format: (value: string) => {
      const newVal = new Date(value).toString();
      return newVal;
    },
  },
];

type Data = {
  id: number;
  email: string;
  subject: string;
  message: string;
  delete: ReactElement;
};

const formatDate = (date: string) => {
  const dateString = new Date(date).toDateString();
  const timeString = new Date(date).toLocaleTimeString();
  return `${dateString} ${timeString}`;
};

type SupportTableProps = {
  supportMessages: SupportMessageType[];
};

export default function SupportTable({ supportMessages }: SupportTableProps) {
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);
  const { mutate: deleteSupportMessageById } = useDeleteSupportMessage();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);
  const rows: Data[] = [];

  function createData(supportMessage: SupportMessageType): Data {
    return {
      id: supportMessage.id,
      email: supportMessage.email,
      subject: supportMessage.subject,
      message: supportMessage.message,
      delete: (
        <IconButton
          onClick={() => {
            setIdToDelete(supportMessage.id);
          }}
        >
          <DeleteRoundedIcon />
        </IconButton>
      ),
    };
  }
  supportMessages.forEach((message) => {
    const tempRow = createData(message);
    rows.push(tempRow);
  });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteMessageHandler = (idToDelete: number) => {
    deleteSupportMessageById(idToDelete);
  };

  return (
    <>
      <Typography variant="h5" color={"primary"}>
        Support messages
      </Typography>
      <Paper
        id="support-table-wrapper"
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "fit-content",
        }}
      >
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="Support messages table" size="small">
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
      {idToDelete && (
        <GenericModal
          title="Confirm support message deletion"
          message={`Are you sure you want to delete support message with id ${idToDelete}?`}
          onConfirm={() => deleteMessageHandler(idToDelete)}
          onClose={() => {
            setIdToDelete(undefined);
          }}
        />
      )}
    </>
  );
}
