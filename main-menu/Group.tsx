import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TChildrenProps } from 'types/childrenProp';

const useStyles = makeStyles({
  group: {
    position: 'relative',
    height: '100%',
  },
});

export default function AsideMenuItemGroup({
  children,
}: TChildrenProps): ReactElement {
  const styles = useStyles();
  return (
    <div id="group" className={styles.group}>
      {children}
    </div>
  );
}
