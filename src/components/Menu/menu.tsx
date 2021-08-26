import React, { useState, createContext } from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';

type SelectCallback = (selectedIndex: number) => void;

// 定义menucontext的类型
interface IMenuContext {
  index: number;
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
export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    children,
    onSelect
  } = props;

  const [activeIndex, setActiveIndex] = useState(defaultIndex); // 用于保存当前活动项

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical'
  });

  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // 创建menucontext的具体数据
  const passedMenuContext: IMenuContext = {
    index: activeIndex ? activeIndex : 0,
    onSelect: handleClick
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