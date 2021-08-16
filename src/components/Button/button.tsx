import React from "react";
import classNames from "classnames";

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
    btnType?: ButtonType;
    href?: string,
    children: React.ReactNode;
}

const Button: React.FC<BaseButtonProps> = (props) => {
    const {
        btnType,
        disabled,
        size,
        href,
        children
    } = props;

    const classes = classNames('btn', {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    });

    if (btnType === ButtonType.Link && href) {
        return(
            <a
                className={classes}
                href={href}>
                children
            </a>
        );
    }
}