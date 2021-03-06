import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
  Large = 'large',
  Small = 'small'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: 'primary' | 'default' | 'danger' | 'link';
  href?: string,
  children: React.ReactNode;
}

// 添加button和a上的所有属性
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    href,
    children,
    ...restProps
  } = props;

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  });

  if (btnType === ButtonType.Link && href) {
    return(
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
};

export default Button;