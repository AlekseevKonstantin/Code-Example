import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { isLightTheme } from 'utils/theme';

const useStyles = makeStyles((theme) => ({
  logo: {
    display: 'block',
    width: '100%',
    padding: '12px',
  },
  image: {
    display: 'block',
    width: '100%',
    height: '47px',
    background: () => {
      return isLightTheme(theme)
        ? 'url("/logo/logo-long-wt.png") left center no-repeat'
        : 'url("/logo/logo-long-dt.png") left center no-repeat';
    },
    backgroundSize: 'auto 100% !important',
  },
}));

export default function LogoItem(): ReactElement {
  const styles = useStyles();

  return (
    <a href="logo" className={styles.logo} aria-label="logo">
      <span aria-hidden="true" className={styles.image} />
    </a>
  );
}
