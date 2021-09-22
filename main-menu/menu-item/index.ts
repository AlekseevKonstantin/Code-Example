import React, { ReactElement, DependencyList, memo } from 'react';
import { IObject } from 'types/object';
import { ITreeNode } from 'types/treeNode';
import { TInputOnchangeType } from 'types/handlers';
import { compose, withState, withHandlers, withEffect } from 'hocs';
import DefaultItem from './Defaulttem';
import LogoItem from './LogoItem';
import AvatarItem from './AvatarItem';
import HeaderItem from './HeaderItem';
import SearchItem from './SearchItem';
import config from '../config';

interface IHandlerProps {
  tree: Array<ITreeNode>;
  isOpen: boolean;
  searchPattern: string;
  setState: (value: IObject) => void;
}

function EqualTitleFunction(prev: IObject, next: IObject): boolean {
  return prev.node.title === next.node.title;
}

function EqualTypeFunction(prev: IObject, next: IObject): boolean {
  return prev.node.type === next.node.type;
}

/* SearchItem */

let timer: ReturnType<typeof setTimeout>;
const initState = { tree: config, isOpen: false, searchPattern: '' };
const handlers = {
  onChangePattern: ({ setState }: IHandlerProps) => (
    event: TInputOnchangeType
  ) => {
    const searchPattern = event.target.value;
    setState((prevState: IObject) => ({ ...prevState, searchPattern }));
  },
};

// eslint-disable-next-line
function effect(props: IObject): any {
  const { searchPattern, setState, isOpen } = props;

  clearTimeout(timer);
  timer = setTimeout(() => {
    if (!searchPattern && !isOpen) return;
    const isOpenFlag = searchPattern.length > 0;
    setState((prevState: IObject) => ({ ...prevState, isOpen: isOpenFlag }));
  }, 400);

  return () => clearTimeout(timer);
}

function depts(props: IObject): DependencyList {
  const { searchPattern } = props;
  return [searchPattern];
}

const SearchMenuItem = compose(
  withState(initState),
  withEffect(effect, depts),
  withHandlers(handlers)
)(SearchItem);

/*  DefaultItem  */

const MemoizedDefaultItem = memo(DefaultItem, EqualTitleFunction);
const MemoizedLogoItem = memo(LogoItem, EqualTypeFunction);
const MemoizedHeaderItem = memo(HeaderItem, EqualTitleFunction);

const itemType: IObject = {
  default: MemoizedDefaultItem,
  logo: MemoizedLogoItem,
  avatar: AvatarItem,
  header: MemoizedHeaderItem,
  search: SearchMenuItem,
};

export default function MenuItem(props: IObject): ReactElement | null {
  const { node } = props;
  const { type = 'default' } = node;
  const Item = itemType[type];

  return Item ? React.createElement(Item, { ...props }) : null;
}
