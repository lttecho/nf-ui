import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const openSubmenu = context.defaultOpenSubMenu as Array<string>;
  const isOpend = (index && context.mode === 'vertical') ? openSubmenu.includes(index) : false;
  const [ menuOpen, setMenuOpen ] = useState(isOpend); // 控制下拉菜单的展开收起

  const classes = classNames('menu-item sub-menu', className, {
    'is-active': context.index === index
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 阻止点击事件向下传递
    setMenuOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};
  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true); },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false); }
  } : {};

  // 循环渲染子组件menuitem
  const renderChildren = () => {
    const menuChildClasses = classNames('sub-menu-child', {
      'menu-opened': menuOpen
    });
    const childrenComponent =  React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if(displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem');
      }
    });
    return (
      <ul className={menuChildClasses}>
        { childrenComponent }
      </ul>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="sub-menu-title" {...clickEvents}>
        { title }
      </div>
      { renderChildren() }
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
