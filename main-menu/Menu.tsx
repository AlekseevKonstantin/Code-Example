import React, { ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { TChildrenProps } from 'types/childrenProp';
import { IObject } from 'types/object';
import Collapse from 'components/Collapse';
import AsideServiceButtons from 'views/asides/service-buttons';
import { isLightTheme } from 'utils/theme';
import { emptyFunction } from './utils';

interface IMenuProps {
  node?: IObject;
  children?: TChildrenProps;
  onClose?: () => void | undefined;
  onCloseAside?: () => void | undefined;
  isMobile: boolean;
  onFix?: () => void;
  isLeftAsideFix: boolean;
}

interface IStylesProps {
  isOpen: boolean;
}

const useStyles = makeStyles((theme) => ({
  menu: {
    position: 'relative',
    height: '100%',
    backgroundColor: ({ isOpen }: IStylesProps) => {
      const color = isLightTheme(theme)
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
      const alpha = isOpen ? 0.9 : 1;
      return fade(color, alpha);
    },
  },
}));

const useCollapseStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 0,
    },
  },
}));

export default function Menu(props: IMenuProps): ReactElement {
  const {
    children,
    node = {},
    onClose,
    onCloseAside = emptyFunction,
    isMobile,
    onFix = emptyFunction,
    isLeftAsideFix,
  } = props;
  const { isOpen = false } = node;
  const styles = useStyles({ isOpen });
  const collapseStyles = useCollapseStyles();

  const [isEndTransition, setIsEndTransition] = useState<boolean>(!isOpen);

  function handleOnEntering() {
    setIsEndTransition(false);
  }

  function handleOnExit() {
    setIsEndTransition(true);
  }

  return (
    <div
      id="menu"
      className={styles.menu}
      onMouseLeave={isMobile || isLeftAsideFix ? undefined : onClose}
    >
      <AsideServiceButtons
        isCloseVisible={isOpen && isMobile && !isEndTransition}
        isMobile={!isOpen || isMobile || isEndTransition}
        isFix={isLeftAsideFix}
        onFix={onFix}
        onClose={isMobile ? onCloseAside : emptyFunction}
      />
      <Collapse
        isOpen={isOpen}
        minSize={isMobile ? 0 : 60}
        maxSize={320}
        classes={collapseStyles}
        onEntered={handleOnEntering}
        onExit={handleOnExit}
      >
        {children}
      </Collapse>
    </div>
  );
}
