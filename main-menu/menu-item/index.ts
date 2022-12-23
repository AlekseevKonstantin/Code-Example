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

function effect(props: IObject): void {
  const { searchPattern, setState, isOpen } = props;

  clearTimeout(timer);
  timer = setTimeout(() => {
    if (!searchPattern && !isOpen) return;
    const isOpenFlag = searchPattern.length > 0;
    setState((prevState: IObject) => ({ ...prevState, isOpen: isOpenFlag }));
  }, 400);
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

/* menu items */

const itemType: IObject = {
  default: DefaultItem,
  logo: LogoItem,
  avatar: AvatarItem,
  header: HeaderItem,
  search: SearchMenuItem,
};

export function MenuItem(props: IObject): ReactElement | null {
  const { node } = props;
  const { type = 'default' } = node;
  const Item = itemType[type];

  return Item ? React.createElement(Item, { ...props }) : null;
}

export default memo(
  MenuItem,
  (prev: IObject, next: IObject) =>
    prev.node.title === next.node.title && prev.node.type === next.node.type
);
