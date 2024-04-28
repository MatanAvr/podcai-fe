import {
  OutlinedInput,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { TTopics, MAX_NUM_OF_TOPICS } from "../../ConstAndTypes/consts";
import _ from "lodash";

interface MultiSelectProps {
  values: TTopics[];
  options: TTopics[];
  changeValuesHandler: (arg: TTopics[]) => void;
}

export default function MultiSelect({
  values,
  options,
  changeValuesHandler,
}: MultiSelectProps) {
  return (
    <FormControl>
      <Select
        multiple
        value={values}
        sx={{ minHeight: 65 }}
        onChange={(e) => {
          const newValues = e.target.value as TTopics[];
          changeValuesHandler(newValues);
        }}
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={_.capitalize(value)}
                onDelete={() => {
                  const newValues = [
                    ...values.filter((item) => item !== value),
                  ];
                  changeValuesHandler(newValues);
                }}
                deleteIcon={
                  <CancelIcon onMouseDown={(e) => e.stopPropagation()} />
                }
              />
            ))}
          </Stack>
        )}
      >
        {options.map((option) => {
          const isChosen = values.length && values.includes(option);
          const isDisabled = !isChosen && values.length === MAX_NUM_OF_TOPICS;
          return (
            <MenuItem
              key={option}
              value={option}
              disabled={isDisabled}
              sx={{ justifyContent: "space-between" }}
            >
              {_.capitalize(option)}
              {isChosen ? <CheckIcon color="info" /> : null}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
