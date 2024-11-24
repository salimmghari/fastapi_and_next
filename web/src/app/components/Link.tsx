'use client';

import React from 'react';
import {useRouter} from 'next/navigation';

interface LinkProps {
    path: string;
    children?: React.ReactNode;
}

const Link = (props: LinkProps): JSX.Element => {
    const router = useRouter();

    return (
        <p 
            className="mb-6 info-color text-base cursor-pointer text-center"
            onClick={() => router.push(props.path)}
        >
            {props.children}
        </p>

    );
}

export default Link;
