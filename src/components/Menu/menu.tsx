import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';

type SelectCallback = (selectedIndex: string) => void;

// 定义menucontext的类型
interface IMenuContext {
  index: string;
  mode?: MenuMode;
  defaultOpenSubMenu?: string[]; // 默认展开子菜单
  onSelect?: SelectCallback;
}

export interface MenuProps {
  defaultIndex?: string; // 默认哪一个高亮
  className?: string;
  mode?: MenuMode;
  defaultOpenSubMenu?: string[]; // 默认展开子菜单
  style?: React.CSSProperties;
  onSelect?: SelectCallback; // 点击回调函数
}

// 创建一个透传给子组件的context
export const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    children,
    defaultOpenSubMenu,
    onSelect
  } = props;

  const [activeIndex, setActiveIndex] = useState(defaultIndex); // 用于保存当前活动项

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  });

  const handleClick = (index: string) => {
    setActiveIndex(index); 
    if (onSelect) {
      onSelect(index);
    }
  };

  // 创建menucontext的具体数据
  const passedMenuContext: IMenuContext = {
    index: activeIndex ? activeIndex : '0',
    mode,
    defaultOpenSubMenu,
    onSelect: handleClick
  };

  // 循环渲染子组件menuitem
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        }); // 给MenuItem自动加上index
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="menuId">
      <MenuContext.Provider value={passedMenuContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenu: []
};

export default Menu;