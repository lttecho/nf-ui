import React from 'react';
import classNames from 'classnames';

interface BaseDividerProps {
  dashed?: boolean; // 是否虚线
  type?: 'horizontal' | 'vertical';
  text?: string; // 文字内容
  orientation?: 'center' | 'left' | 'right';
  className?: string;
}

const Divider: React.FC<BaseDividerProps> = (props) => {
  const {
    dashed,
    type,
    text,
    orientation,
    className
  } = props;

  const classes = classNames('divider', classNames, {
    [`divider-${type}`]: type,
    ['divider-dashed']: dashed,
    ['divider-text']: text
  });

  return (
    <div className={classes}></div>
  );
};

Divider.defaultProps = {
  type: 'horizontal',
  orientation: 'center'
};

export default Divider;