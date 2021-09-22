import React, { ReactElement, memo, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ITreeNode } from 'types/treeNode';
import { TInputOnchangeType } from 'types/handlers';
import Collapse from 'components/Collapse';
import getMixin from 'utils/mixins';
import getIcon from 'utils/icons';
import { isLightTheme } from 'utils/theme';
import { TextField } from '@material-ui/core';
import { IObject } from 'types/object';
import useClientSize from 'hooks/useClientSize';
import MenuItem from './index';
import { emptyFunction } from '../utils';

interface ISearchResultProps {
  tree: Array<ITreeNode>;
  searchPattern: string;
}

interface ISearchMenuItemProps extends ISearchResultProps {
  isOpen: boolean;
  onChangePattern: (event: TInputOnchangeType) => void;
  onOpenMenu?: undefined | (() => void);
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '13px',
    marginBottom: 32,
  },
  inner: {
    ...getMixin('flexRow', theme),
    height: 36,
    minWidth: 36,
    backgroundColor: isLightTheme(theme)
      ? theme.palette.background.paper
      : theme.palette.grey.A400,
    borderRadius: 36,
    padding: '2px 2px 2px 3px',
  },
  iconWrapper: {
    ...getMixin('flexCentered', theme),
    minWidth: 30,
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: () =>
      isLightTheme(theme) ? theme.palette.grey[300] : theme.palette.grey[800],
  },
  icon: {
    width: 24,
    height: 24,
    color: theme.palette.primary.main,
  },
  result: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.tooltip + 10,
    backgroundColor: theme.palette.background.paper,
  },
}));

const useTextfieldStyles = makeStyles({
  root: {
    margin: 0,
    marginLeft: 10,
    marginRight: 18,
    '& .MuiInput-input': {
      paddingTop: 3,
      paddingBottom: 3,
      border: 'none',
    },

    '& .MuiInput-underline': {
      '&:before': {
        border: 'none !important',
      },
      '&:after': {
        border: 'none !important',
      },
    },
  },
});

const useEmptyResultStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '23px',
    lineHeight: '34px',
    color: theme.palette.text.disabled,
    textAlign: 'center',
    padding: '40px 20px 20px',
  },
}));

function isTitle(node: ITreeNode, searchPattern: string): boolean {
  const { title } = node;
  return title && title.search(searchPattern) > -1;
}

function getResults(
  searchData: Array<ITreeNode>,
  searchPattern: string
): Array<ReactElement> {
  let result: Array<ReactElement> = [];

  searchData.forEach((node) => {
    const { children, title, id } = node;

    if (children) {
      if (isTitle(node, searchPattern)) {
        result = [
          ...result,
          <MenuItem node={{ type: 'header', title }} key={id} />,
        ];
      }
      result = [...result, ...getResults(children, searchPattern)];
    } else if (isTitle(node, searchPattern)) {
      result = [...result, <MenuItem node={node} key={id} />];
    }
  });

  return result;
}

function EmptyResult(): ReactElement {
  const emptyResultStyles = useEmptyResultStyles();
  return (
    <div className={emptyResultStyles.root}>
      По вашему запросу ничего не найдено
    </div>
  );
}

function SearchResult({
  tree,
  searchPattern,
}: ISearchResultProps): ReactElement {
  const result = getResults(tree, searchPattern);
  return <>{result.length > 0 ? result : <EmptyResult />}</>;
}

function equalsearchResultFunc(prev: IObject, next: IObject): boolean {
  return prev.searchPattern === next.searchPattern || next.searchPattern === '';
}

const MemoizedSearchResult = memo(SearchResult, equalsearchResultFunc);

export default function SearchItem(props: ISearchMenuItemProps): ReactElement {
  const { tree, isOpen, searchPattern, onChangePattern, onOpenMenu } = props;
  const styles = useStyles();
  const textfieldStyles = useTextfieldStyles();
  const resultRef: React.RefObject<HTMLDivElement> = useRef(null);
  const { height } = useClientSize(resultRef);

  return (
    <div className={styles.root} onMouseEnter={onOpenMenu}>
      <div className={styles.inner}>
        <div className={styles.iconWrapper}>
          {getIcon('search', { className: styles.icon })}
        </div>
        <TextField
          fullWidth
          margin="normal"
          classes={textfieldStyles}
          placeholder="Поиск в меню"
          value={searchPattern}
          onChange={onChangePattern}
          onClick={emptyFunction}
        />
      </div>
      <div ref={resultRef} className={styles.result}>
        <Collapse
          isOpen={isOpen}
          direction="vrt"
          minSize={0}
          maxSize={height - 52}
        >
          <MemoizedSearchResult tree={tree} searchPattern={searchPattern} />
        </Collapse>
      </div>
    </div>
  );
}
