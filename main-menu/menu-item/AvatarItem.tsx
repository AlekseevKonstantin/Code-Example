import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { RouteComponentProps, withRouter } from 'react-router';
import getMixin from 'utils/mixins';
import { CABINET } from 'constants/routes';

export interface IAvatarItem extends Pick<RouteComponentProps, 'history'> {
  onOpenMenu?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    ...getMixin('flexRow', theme),
    padding: '12px',
    '&:hover': {
      cursor: 'pointer',
      '&  $title': {
        color: theme.palette.primary.main,
      },
    },
  },
  avatar: {
    width: '40px',
    height: '40px',
    transition: 'all .2s ease-in-out',
  },
  inner: {
    marginLeft: '10px',
  },
  title: {
    display: 'block',
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
}));

function AvatarItem(props: IAvatarItem): ReactElement {
  const { history, onOpenMenu } = props;
  const styles = useStyles();

  function handleOnClick() {
    history.push(CABINET);
  }

  return (
    <div
      role="link"
      aria-hidden="true"
      className={styles.root}
      onClick={handleOnClick}
      onMouseEnter={onOpenMenu}
    >
      <Avatar className={styles.avatar}>A</Avatar>
      <div className={styles.inner}>
        <span className={clsx(styles.title)}>Добрый день,</span>
        <span className={styles.title}>Пользователь</span>
      </div>
    </div>
  );
}

export default withRouter(AvatarItem);
