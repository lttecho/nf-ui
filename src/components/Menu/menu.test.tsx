import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const defaultProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test-menu'
};

const verticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
};

// 渲染组件
const renderMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <li>li-node</li>
    </Menu>
  );
};

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(renderMenu(defaultProps));
    menuElement = wrapper.getByTestId('menuId');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test-menu');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(defaultProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith(1);
  });

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(renderMenu(verticalProps));
    const menuElement = wrapper.getByTestId('menuId');
    expect(menuElement).toHaveClass('menu-vertical');
  });
});