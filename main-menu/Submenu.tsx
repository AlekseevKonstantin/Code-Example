import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TChildrenProps } from 'types/childrenProp';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import getIcon from 'utils/icons';
import { INode } from 'types/treeNode';
import Collapse from 'components/Collapse';
import getMixin from 'utils/mixins';
import { isLightTheme } from 'utils/theme';
import emptyFunction from '../../utils/emptyFunction';

interface ISubmenuProps {
  node?: INode;
  children?: TChildrenProps;
  id?: string;
  onClose?: (node: INode) => void;
  level?: number;
}

interface IStylesProps {
  level: number;
  isOpen: boolean;
}

const useStyles = makeStyles((theme) => ({
  submenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: ({ level }: IStylesProps) => theme.zIndex.tooltip + level,
    height: '100%',
    backgroundColor: isLightTheme(theme) ? '#fff' : theme.palette.grey.A400,
    borderTopWidth: ({ isOpen }: IStylesProps) => (isOpen ? 1 : 0),
    borderTopStyle: 'solid',
    borderTopColor: isLightTheme(theme)
      ? theme.palette.grey[300]
      : theme.palette.grey.A400,
    borderLeftWidth: ({ isOpen }: IStylesProps) => (isOpen ? 1 : 0),
    borderLeftStyle: 'solid',
    borderLeftColor: isLightTheme(theme)
      ? theme.palette.grey[300]
      : theme.palette.grey.A400,
    transition: 'border .1s',
  },
  inner: {
    width: '100%',
    height: '100%',
    padding: '10px',
  },
}));

const useContainerStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
  },
});

const useHeaderStyles = makeStyles((theme) => ({
  root: {
    margin: '0 0 0 10px',
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    fontSize: '1rem',
  },
}));

const useIconButtonStyles = makeStyles((theme) => ({
  root: getMixin('iconAroundButton', theme),
}));

const useButtonStyles = makeStyles({
  root: {
    position: 'static',
  },
});

function Submenu(props: ISubmenuProps): ReactElement {
  const { children, id, node, onClose = emptyFunction, level = 1 } = props;
  const { isOpen = false, title } = node ?? {};
  const styles = useStyles({ level, isOpen });
  const headerStyles = useHeaderStyles();
  const containerStyles = useContainerStyles();
  const iconButtonStyles = useIconButtonStyles();
  const buttonStyles = useButtonStyles();

  function handleOnClose() {
    onClose(node || ({} as INode));
  }

  return (
    <div id={`submenu-${id}`} className={styles.submenu}>
      <Collapse isOpen={isOpen} minSize={0} maxSize={260}>
        <div className={styles.inner}>
          <div className={containerStyles.header}>
            <IconButton
              size="small"
              classes={buttonStyles}
              onClick={handleOnClose}
              disableRipple
            >
              {getIcon('angleLeft', { classes: iconButtonStyles })}
            </IconButton>
            <Typography
              noWrap
              variant="h5"
              color="textPrimary"
              align="left"
              classes={headerStyles}
            >
              {title}
            </Typography>
          </div>
          {children}
        </div>
      </Collapse>
    </div>
  );
}

export default Submenu;
