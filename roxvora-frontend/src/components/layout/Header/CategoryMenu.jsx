import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// import { prefetchCatalog } from '../api/catalogApi';
import { prefetchCatalog } from "../../../api/CatalogApi"
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Divider,
  Grow,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  useMediaQuery,
} from '@mui/material';

import { alpha, keyframes } from '@mui/material/styles';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

/* ------------------------------------------------------------------ */
/* Data + helpers (kept outside the component so they are not rebuilt) */
/* ------------------------------------------------------------------ */

export const SUB_CATEGORIES = {
  Women: ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Knitwear'],
  Men: ['Tops', 'Bottoms', 'Outerwear', 'Shoes'],
  Kids: ['Boys', 'Girls', 'Baby', 'Toys'],
  Accessories: ['Accessories', 'Bags', 'Shoes'],
  Sale: ['Up to 50%', 'Up to 70%', 'Clearance', 'Final Sale'],
  'New Arrivals': ['This Week', 'Trending', 'Best Sellers', 'Coming Soon'],
};



const OPEN_DELAY_MS = 60; // tiny delay so a mouse passing over does not flicker
const CLOSE_DELAY_MS = 140; // grace period to travel from button to menu

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/%/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const itemIn = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
`;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const CategoryMenu = ({
  category,
  isActive = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { pathname } = useLocation();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const menuId = useId();

  const anchorRef = useRef(null);
  const timerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [focusFirstItem, setFocusFirstItem] = useState(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const closeMenu = useCallback(() => {
    clearTimer();
    setOpen(false);
    setFocusFirstItem(false);
  }, [clearTimer]);

  // Follow the parent when it controls the active state.
  useEffect(() => {
    if (isActive) {
      setOpen(true);
    } else {
      closeMenu();
    }
  }, [isActive, closeMenu]);

  // Close the moment the route changes, so the next page feels instant.
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Never leave a pending timer behind.
  useEffect(() => clearTimer, [clearTimer]);

  // Safe to return early now: every hook above has already run.
  if (!category || typeof category !== 'object') return null;

  const { label = '', href = '/shop', icon: Icon } = category;
  if (typeof label !== 'string' || !label.trim()) return null;

  const categoryHref = typeof href === 'string' && href.trim() ? href : '/shop';
  const subs = SUB_CATEGORIES[label] || [];
  const hasSubs = subs.length > 0;
  const isSectionActive =
    pathname === categoryHref || pathname.startsWith(`${categoryHref}/`);

  /* ---------------------------- handlers --------------------------- */

  const handleEnter = () => {
    if (onMouseEnter) onMouseEnter();
    if (!canHover || !hasSubs) return;
    clearTimer();
    timerRef.current = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
  };

  const handleLeave = () => {
    if (onMouseLeave) onMouseLeave();
    if (!canHover || !hasSubs) return;
    clearTimer();
    timerRef.current = setTimeout(closeMenu, CLOSE_DELAY_MS);
  };

  const handleButtonClick = (event) => {
    // Touch devices: first tap opens the menu instead of navigating away.
    if (hasSubs && !canHover) {
      event.preventDefault();
      setOpen((previous) => !previous);
    }
  };

  const handleButtonKeyDown = (event) => {
    if (!hasSubs) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusFirstItem(true);
      setOpen(true);
    } else if (event.key === 'Escape') {
      closeMenu();
    }
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      closeMenu();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      if (anchorRef.current) anchorRef.current.focus();
    }
  };

  const handleClickAway = (event) => {
    // Clicking the trigger itself is handled by the trigger's own onClick.
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    closeMenu();
  };

  /* ----------------------------- render ---------------------------- */

  return (
    <Box
      sx={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <ButtonBase
        ref={anchorRef}
        component={RouterLink}
        to={categoryHref}
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        aria-haspopup={hasSubs ? 'menu' : undefined}
        aria-expanded={hasSubs ? open : undefined}
        aria-controls={hasSubs && open ? menuId : undefined}
        focusRipple
        sx={(theme) => ({
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          px: 1.5,
          py: 1,
          borderRadius: 2,
          fontFamily: 'inherit',
          fontSize: '0.9rem',
          fontWeight: 500,
          lineHeight: 1.2,
          color:
            open || isSectionActive
              ? theme.palette.text.primary
              : theme.palette.text.secondary,
          backgroundColor:
            open || isActive
              ? alpha(theme.palette.text.primary, 0.06)
              : 'transparent',
          transition: theme.transitions.create(['background-color', 'color'], {
            duration: 180,
          }),
          '&:hover': {
            color: theme.palette.text.primary,
            backgroundColor: alpha(theme.palette.text.primary, 0.06),
          },
          '&.Mui-focusVisible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
          },
        })}
      >
        {Icon && (
          <Box
            component={Icon}
            aria-hidden="true"
            sx={{ width: 18, height: 18, flexShrink: 0 }}
          />
        )}

        {label}

        {hasSubs && (
          <ExpandMoreRoundedIcon
            aria-hidden="true"
            sx={{
              fontSize: 18,
              transition: 'transform 220ms cubic-bezier(0.2, 0.7, 0.2, 1)',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
            }}
          />
        )}
      </ButtonBase>

      {hasSubs && (
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          transition
          modifiers={[{ name: 'offset', options: { offset: [0, 0] } }]}
          sx={(theme) => ({ zIndex: theme.zIndex.appBar + 1 })}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              timeout={{ enter: 200, exit: 120 }}
              style={{
                transformOrigin: placement.startsWith('bottom')
                  ? 'top left'
                  : 'bottom left',
              }}
            >
              {/* The top padding is an invisible bridge so the hover never breaks */}
              <Box sx={{ pt: 1 }}>
                <Paper
                  elevation={0}
                  sx={(theme) => ({
                    minWidth: 232,
                    py: 1,
                    overflow: 'hidden',
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: `0 18px 40px -12px ${alpha(
                      theme.palette.common.black,
                      0.22,
                    )}, 0 2px 6px ${alpha(theme.palette.common.black, 0.06)}`,
                  })}
                >
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <MenuList
                      id={menuId}
                      autoFocusItem={open && focusFirstItem}
                      onKeyDown={handleListKeyDown}
                      aria-label={`${label} subcategories`}
                      sx={{ p: 0 }}
                    >
                      {subs.map((sub, index) => {
                        const to = `${categoryHref}/${slugify(sub)}`;
                        const isCurrent = pathname === to;

                        const catSlug = categoryHref.split('/').filter(Boolean).pop();

                        const prefetchSubCategory = () => {
                          prefetchCatalog(catSlug, slugify(sub));
                        };

                        return (
                          <MenuItem
                            key={sub}
                            component={RouterLink}
                            to={to}
                            onClick={closeMenu}
                            // onMouseEnter={prefetchSubCategory}
                            // onFocus={prefetchSubCategory}
                            // onTouchStart={prefetchSubCategory}
                            aria-current={isCurrent ? 'page' : undefined}
                            sx={(theme) => ({
                              position: 'relative',
                              mx: 1,
                              px: 1.5,
                              py: 1,
                              gap: 1,
                              minHeight: 0,
                              borderRadius: 2,
                              color: isCurrent
                                ? theme.palette.text.primary
                                : theme.palette.text.secondary,
                              animation: `${itemIn} 260ms cubic-bezier(0.2, 0.7, 0.2, 1) both`,
                              animationDelay: `${60 + index * 35}ms`,
                              transition: theme.transitions.create(
                                ['background-color', 'color'],
                                { duration: 150 },
                              ),
                              '& .menu-arrow': {
                                opacity: 0.4,
                                transition:
                                  'transform 200ms cubic-bezier(0.2, 0.7, 0.2, 1), opacity 200ms',
                              },
                              '&:hover, &.Mui-focusVisible': {
                                color: theme.palette.text.primary,
                                backgroundColor: alpha(
                                  theme.palette.text.primary,
                                  0.05,
                                ),
                              },
                              '&:hover .menu-arrow, &.Mui-focusVisible .menu-arrow':
                              {
                                opacity: 1,
                                transform: 'translateX(3px)',
                              },
                              '&.Mui-focusVisible': {
                                outline: `2px solid ${theme.palette.primary.main}`,
                                outlineOffset: -2,
                              },
                              '@media (prefers-reduced-motion: reduce)': {
                                animation: 'none',
                                '& .menu-arrow': { transition: 'none' },
                              },
                              // Marker for the page the user is currently on
                              '&::before': isCurrent
                                ? {
                                  content: '""',
                                  position: 'absolute',
                                  left: 0,
                                  top: 8,
                                  bottom: 8,
                                  width: 3,
                                  borderRadius: 2,
                                  backgroundColor: theme.palette.primary.main,
                                }
                                : undefined,
                            })}
                          >
                            <ChevronRightRoundedIcon
                              className="menu-arrow"
                              aria-hidden="true"
                              sx={{ fontSize: 18 }}
                            />
                            <ListItemText
                              primary={sub}
                              primaryTypographyProps={{
                                fontSize: '0.92rem',
                                fontWeight: isCurrent ? 600 : 400,
                              }}
                              sx={{ m: 0 }}
                            />
                          </MenuItem>

                        );
                      })}

                      <Divider sx={{ my: 1 }} />

                      <MenuItem
                        component={RouterLink}
                        to={categoryHref}
                        onClick={closeMenu}
                        sx={(theme) => ({
                          mx: 1,
                          px: 1.5,
                          py: 1,
                          gap: 1,
                          minHeight: 0,
                          borderRadius: 2,
                          color: theme.palette.primary.main,
                          '&:hover .view-all-arrow': {
                            transform: 'translateX(4px)',
                          },
                          '&.Mui-focusVisible': {
                            outline: `2px solid ${theme.palette.primary.main}`,
                            outlineOffset: -2,
                          },
                        })}
                      >
                        <ListItemText
                          primary={`View all ${label}`}
                          primaryTypographyProps={{
                            fontSize: '0.88rem',
                            fontWeight: 600,
                          }}
                          sx={{ m: 0 }}
                        />
                        <ArrowForwardRoundedIcon
                          className="view-all-arrow"
                          aria-hidden="true"
                          sx={{
                            fontSize: 18,
                            transition: 'transform 200ms',
                            '@media (prefers-reduced-motion: reduce)': {
                              transition: 'none',
                            },
                          }}
                        />
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Box>
            </Grow>
          )}
        </Popper>
      )}
    </Box>
  );
};

export default CategoryMenu;