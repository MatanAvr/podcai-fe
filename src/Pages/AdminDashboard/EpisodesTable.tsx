import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TEpisodeDB } from "../../Api/ApiTypesAndConsts";
import { Box, Divider, Typography } from "@mui/material";
import { ChangeEvent, ReactElement, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
// user_id: string;
// episode_name: string;
// link: string;
// articles_data: ArticleData[];
// prompt_tokens: number;
// completion_tokens: number;
// total_tokens: number;
// chat_gpt_summary: string;
// file_size: number;
// lambda_run_time: number;
// num_of_articles: number;
// categories: TTopics[];
// voice: TVoices[];
// country: TCountries;
// language: TLanguages;
// is_completed: boolean;
// engine: string;
// engine_model: string;

type Column = {
  id: "episodeName" | "progress" | "isCompleted" | "voice";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: string) => string;
};

const columns: readonly Column[] = [
  { id: "episodeName", label: "Episode name" },
  { id: "progress", label: "Progress", align: "center" },
  { id: "isCompleted", label: "Completed", align: "center" },
  { id: "voice", label: "Voice" },
];

type Data = {
  episodeName: string;
  progress: string;
  isCompleted: ReactElement;
  voice: string;
};

function createData(episode: TEpisodeDB): Data {
  return {
    episodeName: episode.episode_name,
    progress: "?" + "%",
    isCompleted: episode.is_completed ? (
      <CheckCircleRoundedIcon fontSize="small" color="success" />
    ) : (
      <RemoveCircleOutlineRoundedIcon fontSize="small" color="action" />
    ),
    voice: episode.voice,
  };
}

type EpisodesTableProps = {
  username: string;
  episodes: TEpisodeDB[];
};

export default function EpisodesTable({
  username,
  episodes,
}: EpisodesTableProps) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);
  const rows: Data[] = [];

  episodes.forEach((episode) => {
    const tempRow = createData(episode);
    rows.push(tempRow);
  });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="h5" color={"primary"} sx={{ textAlign: "center" }}>
        {username}'s episodes
      </Typography>
      <Divider />
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
        <TableContainer sx={{ maxHeight: 450 }}>
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
    </Box>
  );
}
