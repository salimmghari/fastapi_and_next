import React from 'react';

interface ButtonProps {
    className?: string | undefined;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
}

const Button = (props: ButtonProps): JSX.Element => {
    return (
        <button
            className={"w-full px-6 py-3 secondary-color primary-bg-color shadow-lg rounded-md " + props.className}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default Button;
