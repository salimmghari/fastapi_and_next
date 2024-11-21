import React from 'react';

interface TitleProps {
    children?: React.ReactNode;
}

const Title = (props: TitleProps): JSX.Element => {
    return (
        <h2 className="text-2xl mb-6 text-center">
            {props.children}
        </h2>
    );
}

export default Title;
