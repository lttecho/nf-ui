import React, { createContext } from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';

type SelectCallback = (selectedIndex: number) => void;

interface IMenuContext {
  curIndex: number;
  onSelect?: SelectCallback
}

export interface MenuProps {
  defaultIndex?: number; // 默认哪一个高亮
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback; // 点击回调函数
}

// 创建一个透传给子组件的context
export const MenuContext = createContext<IMenuContext>({ curIndex: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    children
  } = props;

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical'
  });

  const passedMenuContext: IMenuContext = {
    curIndex: 0
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedMenuContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
};

export default Menu;