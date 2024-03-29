import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { isLightTheme } from 'utils/theme';
import { INode } from 'types/treeNode';

export interface IHeaderMenuItem {
  node: INode;
}

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: () =>
      isLightTheme(theme) ? theme.palette.grey[300] : theme.palette.grey[900],
    color: () =>
      isLightTheme(theme) ? theme.palette.grey.A400 : theme.palette.grey[300],
    fontSize: '.75rem',
    padding: '7px 10px 7px 20px',
    overflow: 'hidden',
  },
}));

export default function HeaderItem({
  node,
}: IHeaderMenuItem): ReactElement {
  const { title } = node;
  const styles = useStyles();

  return <div className={styles.header}>{title}</div>;
}
