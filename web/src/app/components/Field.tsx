import React from 'react';

interface FieldProps {
    label: string;
    type?: string | undefined;
    name: string;
    placeholder: string;
    defaultValue?: string | undefined;
    multiLines?: boolean | undefined;
    children?: React.ReactNode;
}

const Field = async (props: FieldProps): Promise<JSX.Element>=> {
    return (
        <div className="flex flex-col justify-start items-center">
            <label className="w-full mb-3 primary-color">
                {props.label}
            </label>
            {props.multiLines === true ? (
                <textarea
                    className="w-full mb-6 px-6 py-3 primary-color secondary-bg-color shadow-lg rounded-md primary-border"
                    style={{height: 200}}
                    name={props.name}
                    placeholder={props.placeholder}
                    defaultValue={props.defaultValue}
                ></textarea>
            ) : (
                <input
                    className="w-full mb-6 px-6 py-3 primary-color secondary-bg-color shadow-lg rounded-md primary-border"
                    type={props.type}  
                    name={props.name}
                    placeholder={props.placeholder}
                    defaultValue={props.defaultValue}
                />
            )}
        </div>
    );
}

export default Field;
