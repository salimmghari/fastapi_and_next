import React from 'react';

interface FieldProps {
    label: string;
    type?: string | undefined;
    placeholder: string;
    defaultValue?: string | undefined;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    multiLines?: boolean | undefined;
    children?: React.ReactNode;
}

const Field = (props: FieldProps): JSX.Element => {
    return (
        <div className="flex flex-col justify-start items-center">
            <label className="w-full mb-3 primary-color">
                {props.label}
            </label>
            {props.multiLines === true ? (
                <textarea
                    className="w-full mb-6 px-6 py-3 primary-color secondary-bg-color shadow-lg rounded-md primary-border"
                    style={{height: 200}}
                    placeholder={props.placeholder}
                    defaultValue={props.defaultValue}
                    onChange={props.onChange}
                ></textarea>
            ) : (
                <input
                    className="w-full mb-6 px-6 py-3 primary-color secondary-bg-color shadow-lg rounded-md primary-border"
                    type={props.type}  
                    placeholder={props.placeholder}
                    defaultValue={props.defaultValue}
                    onChange={props.onChange}            
                />
            )}
        </div>
    );
}

export default Field;
