import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';

const ITEM_HEIGHT = 24;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const ListingFilters = ({ list, loading, setQueryData }) => {
  const [status, setStatus] = useState('open');
  const [labelFilters, setLabelFilters] = useState([]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleLabelChange = (event) => {
    const selectedLabels = Array.from(event.target.value);
    console.log({ selectedLabels });
    const selectedLabelsNames = selectedLabels.filter(
      (label) => label.name || label
    );
    setLabelFilters(selectedLabelsNames);
  };

  useEffect(() => {
    const labels = labelFilters.join(', ');
    setQueryData({
      labels: labels,
      state: status,
    });
  }, [status, labelFilters]);

  return (
    <Box>
      <FormControl sx={{ m: 1 }}>
        <ToggleButtonGroup
          value={status}
          exclusive
          size="small"
          disabled={loading}
          onChange={handleStatusChange}
          aria-label="status"
        >
          <ToggleButton value="open" aria-label="open">
            Open
          </ToggleButton>
          <ToggleButton value="closed" aria-label="closed">
            Closed
          </ToggleButton>
          <ToggleButton value="all" aria-label="all">
            All
          </ToggleButton>
        </ToggleButtonGroup>
      </FormControl>
      <FormControl sx={{ m: 1, w: '400px' }}>
        <InputLabel>Labels</InputLabel>
        <Select
          multiple
          autoWidth
          size="small"
          width="400px"
          sx={{ minWidth: 200 }}
          value={labelFilters}
          onChange={handleLabelChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {list
            .map((issue) => issue.labels.map((label) => label.name))
            .flat()
            .filter((label, index, self) => self.indexOf(label) === index)
            .map((labelName) => (
              <MenuItem key={labelName} value={labelName}>
                <Checkbox checked={labelFilters.includes(labelName)} />
                <ListItemText primary={labelName} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ListingFilters;
