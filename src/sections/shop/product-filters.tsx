import { useState, useEffect, useCallback } from 'react';

import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

import axios, { endpoints } from 'src/utils/axios';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { ICategory, IProductFilters, IProductFilterValue } from 'src/types/product';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  //
  filters: IProductFilters;
  onFilters: (name: string, value: IProductFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
  //
  ratingOptions: string[];
};

// ------------------------------------

const filterOptionsDefault: { tags: string[]; categories: ICategory[] } = {
  tags: [],
  categories: [],
};

// ------------------------------------

export default function ProductFilters({
  open,
  onOpen,
  onClose,
  //
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  ratingOptions,
}: Props) {
  const [filterOptions, setFilterOptions] = useState(filterOptionsDefault);
  // ------------------------------------
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(endpoints.product.categories_tags);
      if (data)
        setFilterOptions({
          categories: data.categories as unknown as ICategory[],
          tags: data.tags as unknown as string[],
        });
    })();
  }, []);
  // ------------------------------------

  const marksLabel = [...Array(21)].map((_, index) => {
    const value = index * 100;

    const firstValue = index === 0 ? `$${value}` : `${value}`;

    return {
      value,
      label: index % 4 ? '' : firstValue,
    };
  });

  const handleFilterCategory = useCallback(
    (newValue: string) => {
      onFilters('category', newValue);
    },
    [onFilters]
  );

  const handleFilterTag = useCallback(
    (newValue: string) => {
      onFilters('tag', newValue);
    },
    [onFilters]
  );

  const handleFilterPriceRange = useCallback(
    (event: Event, newValue: number | number[]) => {
      onFilters('priceRange', newValue as number[]);
    },
    [onFilters]
  );

  const handleFilterRating = useCallback(
    (newValue: string) => {
      onFilters('rating', newValue);
    },
    [onFilters]
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Filters
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={onResetFilters}>
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderCategory = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Category
      </Typography>
      {filterOptions.categories.map((option) => (
        <FormControlLabel
          key={option._id}
          control={
            <Radio
              checked={option._id === filters.category}
              onClick={() => handleFilterCategory(option._id)}
            />
          }
          label={option.title}
          sx={{
            ...(option.title === 'all' && {
              textTransform: 'capitalize',
            }),
          }}
        />
      ))}
    </Stack>
  );

  const renderTags = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Tag
      </Typography>
      {filterOptions.tags.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Radio checked={option === filters.tag} onClick={() => handleFilterTag(option)} />
          }
          label={option}
          sx={{
            ...(option === 'all' && {
              textTransform: 'capitalize',
            }),
          }}
        />
      ))}
    </Stack>
  );

  const renderPrice = (
    <Stack>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Price
      </Typography>

      <Stack direction="row" spacing={5} sx={{ my: 2 }}>
        <InputRange type="min" value={filters.priceRange} onFilters={onFilters} />
        <InputRange type="max" value={filters.priceRange} onFilters={onFilters} />
      </Stack>

      <Slider
        value={filters.priceRange}
        onChange={handleFilterPriceRange}
        step={5}
        min={0}
        max={2000}
        marks={marksLabel}
        getAriaValueText={(value) => `$${value}`}
        valueLabelFormat={(value) => `$${value}`}
        sx={{
          alignSelf: 'center',
          width: `calc(100% - 24px)`,
        }}
      />
    </Stack>
  );

  const renderRating = (
    <Stack spacing={2} alignItems="flex-start">
      <Typography variant="subtitle2">Rating</Typography>

      {ratingOptions.map((item, index) => (
        <Stack
          key={item}
          direction="row"
          onClick={() => handleFilterRating(item)}
          sx={{
            borderRadius: 1,
            cursor: 'pointer',
            typography: 'body2',
            '&:hover': { opacity: 0.48 },
            ...(filters.rating === item && {
              pl: 0.5,
              pr: 0.75,
              py: 0.25,
              bgcolor: 'action.selected',
            }),
          }}
        >
          <Rating readOnly value={4 - index} sx={{ mr: 1 }} /> & Up
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        {renderHead}

        <Divider />

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderCategory}
            {renderTags}
            {renderPrice}
            {renderRating}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

type InputRangeProps = {
  type: 'min' | 'max';
  value: number[];
  onFilters: (name: string, value: IProductFilterValue) => void;
};

function InputRange({ type, value, onFilters }: InputRangeProps) {
  const min = value[0];

  const max = value[1];

  const handleBlurInputRange = useCallback(() => {
    if (min < 0) {
      onFilters('priceRange', [0, max]);
    }
    if (min > 200) {
      onFilters('priceRange', [200, max]);
    }
    if (max < 0) {
      onFilters('priceRange', [min, 0]);
    }
    if (max > 200) {
      onFilters('priceRange', [min, 200]);
    }
  }, [max, min, onFilters]);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
      <Typography
        variant="caption"
        sx={{
          flexShrink: 0,
          color: 'text.disabled',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightSemiBold',
        }}
      >
        {`${type} ($)`}
      </Typography>

      <InputBase
        fullWidth
        value={type === 'min' ? min : max}
        onChange={(event) =>
          type === 'min'
            ? onFilters('priceRange', [Number(event.target.value), max])
            : onFilters('priceRange', [min, Number(event.target.value)])
        }
        onBlur={handleBlurInputRange}
        inputProps={{
          step: 10,
          min: 0,
          max: 200,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
        sx={{
          maxWidth: 48,
          borderRadius: 0.75,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          [`& .${inputBaseClasses.input}`]: {
            pr: 1,
            py: 0.75,
            textAlign: 'right',
            typography: 'body2',
          },
        }}
      />
    </Stack>
  );
}
