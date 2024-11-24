import React from 'react';

interface ButtonProps {
    className?: string | undefined;
    type?: "submit" | "reset" | "button" | undefined;
    name?: string | undefined;
    value?: string | undefined;
    children?: React.ReactNode;
}

const Button = async (props: ButtonProps): Promise<JSX.Element> => {
    return (
        <button 
            type={props.type} 
            name={props.name} 
            value={props.value}
            className={"w-full px-6 py-3 secondary-color primary-bg-color shadow-lg rounded-md " + props.className}
        >
            {props.children}
        </button>
    );
}

export default Button;
