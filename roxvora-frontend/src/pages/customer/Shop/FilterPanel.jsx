import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Radio,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { FiCheck, FiChevronDown, FiStar } from 'react-icons/fi';
import { THEME, formatPrice } from './ProductCard';

const Section = ({ title, active, onClear, children, defaultExpanded = true }) => (
  <Accordion
    disableGutters
    square
    elevation={0}
    defaultExpanded={defaultExpanded}
    sx={{
      bgcolor: 'transparent',
      '&:before': { display: 'none' },
      borderBottom: `1px solid ${THEME.line}`,
      '&:last-of-type': { borderBottom: 'none' },
    }}
  >
    <AccordionSummary
      expandIcon={<FiChevronDown size={18} />}
      sx={{ px: 0, minHeight: 52, '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 1, my: 1 } }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: THEME.ink }}>{title}</Typography>
      {active && <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: THEME.accent }} />}
    </AccordionSummary>
    <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
      {children}
      {active && onClear && (
        <Button
          size="small"
          onClick={onClear}
          sx={{ mt: 1, px: 0, textTransform: 'none', fontWeight: 600, color: THEME.accent, minWidth: 0 }}
        >
          Clear
        </Button>
      )}
    </AccordionDetails>
  </Accordion>
);

const CheckRow = ({ checked, onChange, label, count }) => (
  <FormControlLabel
    sx={{ mx: 0, width: '100%', '& .MuiFormControlLabel-label': { flex: 1, width: '100%' } }}
    control={
      <Checkbox
        size="small"
        checked={checked}
        onChange={onChange}
        sx={{ py: 0.6, color: '#9A9DA6', '&.Mui-checked': { color: THEME.ink } }}
      />
    }
    label={
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: 14, color: THEME.ink }}>{label}</Typography>
        {count !== undefined && <Typography sx={{ fontSize: 12, color: THEME.muted }}>{count}</Typography>}
      </Box>
    }
  />
);

const PriceSection = ({ value, min, max, onCommit }) => {
  const [local, setLocal] = useState(value);

  useEffect(() => setLocal(value), [value]);

  const commitInput = (index, raw) => {
    const n = Math.min(max, Math.max(min, Number(raw) || 0));
    const next = index === 0 ? [Math.min(n, local[1]), local[1]] : [local[0], Math.max(n, local[0])];
    setLocal(next);
    onCommit(next);
  };

  return (
    <Box>
      <Slider
        value={local}
        min={min}
        max={max}
        step={500}
        onChange={(_, v) => setLocal(v)}
        onChangeCommitted={(_, v) => onCommit(v)}
        valueLabelDisplay="off"
        disableSwap
        sx={{
          color: THEME.ink,
          mx: 0.5,
          width: 'calc(100% - 8px)',
          '& .MuiSlider-thumb': { width: 18, height: 18, bgcolor: '#fff', border: `2px solid ${THEME.ink}` },
          '& .MuiSlider-rail': { opacity: 1, bgcolor: THEME.line },
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        {[0, 1].map((i) => (
          <React.Fragment key={i}>
            {i === 1 && <Typography sx={{ fontSize: 13, color: THEME.muted }}>to</Typography>}
            <TextField
              size="small"
              type="number"
              value={local[i]}
              onChange={(e) => setLocal((p) => (i === 0 ? [e.target.value, p[1]] : [p[0], e.target.value]))}
              onBlur={(e) => commitInput(i, e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.querySelector('input')?.blur()}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                inputProps: { min, max, step: 500, 'aria-label': i === 0 ? 'Minimum price' : 'Maximum price' },
              }}
              sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: 14 } }}
            />
          </React.Fragment>
        ))}
      </Box>
      <Typography sx={{ fontSize: 12, color: THEME.muted, mt: 1 }}>
        {formatPrice(local[0])} – {formatPrice(local[1])}
      </Typography>
    </Box>
  );
};

const CATEGORY_PREVIEW = 6;

const FilterPanel = ({
  filters,
  options, // { categories:[{value,label,count}], sizes:[], colors:[{value,name}], availability:[{value,label}], ratings:[4,3,2] }
  priceBounds, // { min, max }
  onToggle,
  onPriceChange,
  onRatingChange,
  onClearGroup,
}) => {
  const [showAllCats, setShowAllCats] = useState(false);
  const cats = showAllCats ? options.categories : options.categories.slice(0, CATEGORY_PREVIEW);

  return (
    <Box>
      <Section
        title="Categories"
        active={filters.categories.length > 0}
        onClear={() => onClearGroup('categories')}
      >
        <FormGroup>
          {cats.map((c) => (
            <CheckRow
              key={c.value}
              label={c.label}
              count={c.count}
              checked={filters.categories.includes(c.value)}
              onChange={() => onToggle('categories', c.value)}
            />
          ))}
        </FormGroup>
        {options.categories.length > CATEGORY_PREVIEW && (
          <Button
            size="small"
            onClick={() => setShowAllCats((s) => !s)}
            sx={{ px: 0, mt: 0.5, textTransform: 'none', fontWeight: 600, color: THEME.accent, minWidth: 0 }}
          >
            {showAllCats ? 'Show less' : `Show ${options.categories.length - CATEGORY_PREVIEW} more`}
          </Button>
        )}
      </Section>

      <Section
        title="Price"
        active={filters.priceRange[0] !== priceBounds.min || filters.priceRange[1] !== priceBounds.max}
        onClear={() => onClearGroup('priceRange')}
      >
        <PriceSection value={filters.priceRange} min={priceBounds.min} max={priceBounds.max} onCommit={onPriceChange} />
      </Section>

      <Section title="Size" active={filters.sizes.length > 0} onClear={() => onClearGroup('sizes')}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {options.sizes.map((s) => {
            const on = filters.sizes.includes(s);
            return (
              <Button
                key={s}
                onClick={() => onToggle('sizes', s)}
                aria-pressed={on}
                sx={{
                  minWidth: 46,
                  height: 38,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: 13.5,
                  color: on ? '#fff' : THEME.ink,
                  bgcolor: on ? THEME.ink : 'transparent',
                  border: `1px solid ${on ? THEME.ink : THEME.line}`,
                  '&:hover': { bgcolor: on ? '#2A2C35' : THEME.soft },
                }}
              >
                {s}
              </Button>
            );
          })}
        </Box>
      </Section>

      <Section title="Colour" active={filters.colors.length > 0} onClear={() => onClearGroup('colors')}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
          {options.colors.map((c) => {
            const on = filters.colors.includes(c.value);
            const light = ['#ffffff', '#fff', '#fafafa'].includes(String(c.value).toLowerCase());
            return (
              <Tooltip key={c.value} title={c.name || c.value} arrow>
                <Box
                  role="checkbox"
                  aria-checked={on}
                  aria-label={c.name || c.value}
                  tabIndex={0}
                  onClick={() => onToggle('colors', c.value)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggle('colors', c.value)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: c.value,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${THEME.line}`,
                    boxShadow: on ? `0 0 0 2px #fff, 0 0 0 4px ${THEME.ink}` : 'none',
                    transition: 'box-shadow .15s',
                    '&:focus-visible': { outline: `2px solid ${THEME.accent}`, outlineOffset: 3 },
                  }}
                >
                  {on && <FiCheck size={15} color={light ? THEME.ink : '#fff'} />}
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Section>

      <Section
        title="Customer rating"
        active={!!filters.rating}
        onClear={() => onRatingChange(null)}
      >
        <FormGroup>
          {options.ratings.map((r) => (
            <FormControlLabel
              key={r}
              sx={{ mx: 0 }}
              control={
                <Radio
                  size="small"
                  checked={filters.rating === r}
                  onClick={() => onRatingChange(filters.rating === r ? null : r)}
                  onChange={() => {}}
                  sx={{ py: 0.6, color: '#9A9DA6', '&.Mui-checked': { color: THEME.ink } }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, fontSize: 14 }}>
                  {r} <FiStar size={13} style={{ fill: THEME.rating, color: THEME.rating }} /> &amp; above
                </Box>
              }
            />
          ))}
        </FormGroup>
      </Section>

      <Section
        title="Availability"
        active={filters.availability.length > 0}
        onClear={() => onClearGroup('availability')}
      >
        <FormGroup>
          {options.availability.map((a) => (
            <CheckRow
              key={a.value}
              label={a.label}
              checked={filters.availability.includes(a.value)}
              onChange={() => onToggle('availability', a.value)}
            />
          ))}
        </FormGroup>
      </Section>
    </Box>
  );
};

export default FilterPanel;