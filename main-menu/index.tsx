import React, { ReactElement, useState, memo, useEffect } from 'react';
import AsideMenuItem from 'views/main-menu/menu-item';
import { fillNode, setValuesToChildren, traversalTree } from 'utils/tree';
import { INode } from 'types/treeNode';
import Recursive, { IRecursiveProps } from 'components/Recursive';
import { handleOnClose, handleOnFix } from 'views/asides/handlers';
import Menu from './Menu';
import Submenu from './Submenu';
import Group from './Group';
import data from './config';
import { ILeftAside } from '../asides/left';

const fixKey: Record<string, string> = {
  true: 'fix',
  false: '',
};

function equalFunction(prev: IRecursiveProps, next: IRecursiveProps): boolean {
  return prev.data === next.data;
}

const MemoizedRecursive = memo(Recursive, equalFunction);

export default function MainMenu(props: ILeftAside): ReactElement {
  const { side, globalState, setGlobalState } = props;
  const { isOpenLeftAside, isMobile, isLeftAsideFix } = globalState;
  const [state, setState] = useState<Array<INode>>(data);

  const propsState = {
    side,
    state: globalState,
    setState: setGlobalState,
  };

  /* срабатывает если перешли на мобильную версию или открыли/закрыли меню из navbar-а */
  useEffect(() => {
    if (isMobile) toggleMainMenu(isOpenLeftAside);
  }, [isOpenLeftAside, isMobile]);

  /* реализация обработчика событий открытия/закрытия главного меню */
  function toggleMainMenu(active: boolean) {
    fillNode(state[0], { isOpen: active });
    setValuesToChildren(state, { isVisible: active });
    toggleVisibleSubmenu(active);
    setState([...state]);
  }

  /* реализует скрытие/открытие подменю когда главное меню закрывется/открывается */
  function getCloseSubmenuCallback(active: boolean) {
    return function closeSubmenuCallback(node: INode) {
      const { wrapper, isOpen, isMustOpen } = node;
      if (wrapper === 'submenu' && (isOpen || isMustOpen)) {
        fillNode(node, { isOpen: active, isMustOpen: !active });
      }
    };
  }

  function toggleVisibleSubmenu(active: boolean) {
    traversalTree(state, getCloseSubmenuCallback(active));
  }

  /* закрывает открытое подменю при открытии другого подменю */
  function toggleSubmenuCallback(node: INode) {
    const { wrapper } = node;
    if (wrapper === 'submenu') {
      fillNode(node, { isOpen: false, isMustOpen: false });
    }
  }

  /* реализует открытие/закрытие подменю */
  function toggleSubmenu(active: boolean) {
    return function toggleSubmenuHandler(node: INode) {
      if (!!node.children && node.children.length > 0) {
        traversalTree(state, toggleSubmenuCallback);
        fillNode(node, { isOpen: active });
        setValuesToChildren([node], { isVisible: active });
        setState([...state]);
      }
    };
  }

  function handleOnCloseMenu() {
    toggleMainMenu(false);
  }

  function handleOnOpenMenu() {
    toggleMainMenu(true);
  }

  const wrappers = {
    menu: (
      <Menu
        onClose={handleOnCloseMenu}
        onCloseAside={handleOnClose(propsState)}
        onFix={handleOnFix(propsState)}
        isMobile={isMobile}
        isLeftAsideFix={isLeftAsideFix}
      />
    ),
    submenu: <Submenu onClose={toggleSubmenu(false)} />,
    group: <Group />,
  };

  const key = isMobile
    ? 'mobile'
    : `fullscreen${fixKey[isLeftAsideFix.toString()]}`;

  return (
    <MemoizedRecursive
      key={key}
      level={1}
      data={state}
      wrappers={wrappers}
      Component={
        <AsideMenuItem
          onOpenMenu={isMobile ? undefined : handleOnOpenMenu}
          onOpenSubmenu={toggleSubmenu(true)}
        />
      }
    />
  );
}
