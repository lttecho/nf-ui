import React, { useState } from 'react';
import classNames from 'classnames';

export enum AlertType {
  Info = 'info',
  Success = 'success',
  Warn = 'warn',
  Error = 'error'
}

interface BaseAlertProps {
  className?: string;
  type?: 'info' | 'success' | 'warn' | 'error';
  message?: string; // 警告提示内容
  description?: string; // 警告提示的辅助性文字介绍
  closable?: boolean; // 默认不显示关闭按钮
  closeTex?: string; // 关闭显示的内容
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    className,
    type,
    message,
    description,
    closable,
    closeTex
  } = props;

  const classes = classNames('alert', className, {
    [`alert-${type}`]: type 
  });

  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return visible ? (
    <div className={classes}>
      <div className="left">
        <div>{message}</div>
        <div>{description}</div>
      </div>
      <div className="right">
        {
          closable && <span className="close-txt" onClick={handleClose}>{ closeTex ? closeTex : 'x'}</span>
        }
      </div>
      
    </div>
  ) : null;
};

Alert.defaultProps = {
  type: AlertType.Success,
  message: '',
  closable: false
};

export default Alert;