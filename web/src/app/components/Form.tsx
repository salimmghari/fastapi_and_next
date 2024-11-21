import React from 'react';

interface FormProps {
    action: (formData: FormData) => void;
    children?: React.ReactNode;
}

const Form = (props: FormProps): JSX.Element => {
  return (
    <form 
        className="w-full p-10 secondary-bg-color rounded-md primary-border shadow-lg"
        action={props.action}
    >
      {props.children}
    </form>
  );
}

export default Form;
