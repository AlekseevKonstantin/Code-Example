import React, { ReactElement } from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { IObject } from 'types/object';
import { isLightTheme } from 'utils/theme';
import getIcon from 'utils/icons';
import getMixin from 'utils/mixins';
import { INode } from 'types/treeNode';
import emptyFunction from 'utils/emptyFunction';

export interface IDefaultAsideMenuItem {
  node: INode;
  classes?: Record<string, string>;
  onOpenMenu?: () => void | undefined;
  onOpenSubmenu?: (node: INode) => void | undefined;
  nowrap: boolean;
}

interface IStylesProps {
  iconHoverColor: string;
  nowrap: boolean | undefined;
}

const useStyles = makeStyles((theme) => ({
  root: {
    ...getMixin('flexRow', theme),
    justifyContent: 'space-between',
    padding: '12px 20px 12px 19px',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      '& svg.icon': {
        fill: ({ iconHoverColor }: IStylesProps) => iconHoverColor || '',
      },
      cursor: 'default',
    },
    '&.active': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  inner: {
    ...getMixin('flexRow', theme),
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  trigger: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  title: {
    display: 'block',
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    marginLeft: 18,
    whiteSpace: ({ nowrap }: IStylesProps) => (nowrap ? 'normal' : 'nowrap'),
  },
}));

const useIconBtnStyles = makeStyles({
  root: {
    position: 'static',
  },
});

const useIconButtonStyles = makeStyles((theme) => ({
  root: getMixin('iconAroundButton', theme),
}));

const useIconStyles = makeStyles((theme) => ({
  root: {
    fill: isLightTheme(theme) ? '#000' : theme.palette.text.secondary,
  },
}));

export default function DefaultItem(
  props: IDefaultAsideMenuItem
): ReactElement {
  const {
    node,
    classes = {},
    onOpenMenu = emptyFunction,
    onOpenSubmenu = emptyFunction,
  } = props;
  const { icon = '', iconHoverColor = '', title, children, nowrap } = node;
  const isActive = !!node.isActive;
  const isSubmenu = !!children;

  const styles = useStyles({ iconHoverColor, nowrap });
  const iconButtonStyles = useIconButtonStyles();
  const iconBtnStyles = useIconBtnStyles();
  const iconStyles = useIconStyles();

  function handleOnOpenSubmenu() {
    onOpenSubmenu(node);
  }

  return (
    <div
      aria-hidden="true"
      className={clsx(styles.root, classes.root, isActive && 'active')}
      onMouseEnter={onOpenMenu}
    >
      <div className={clsx(styles.inner, classes.inner)}>
        <button
          type="button"
          onClick={handleOnOpenSubmenu}
          className={styles.trigger}
        >
          {getIcon(icon, { className: 'icon', classes: iconStyles })}
        </button>
        <span className={clsx(styles.title, classes.title)}>{title}</span>
      </div>

      {isSubmenu && (
        <IconButton
          size="small"
          classes={iconBtnStyles}
          disableRipple
          onClick={handleOnOpenSubmenu}
        >
          {getIcon('angleRight', { classes: iconButtonStyles })}
        </IconButton>
      )}
    </div>
  );
}
