// import React from 'react';
// import Field from '../components/Field';
// import Button from '../components/Button';

// export interface NoteInterface {
//     _id: string;
//     title: string;
//     body: string;
//     createdAt: string;
// }

// interface NoteProps {
//     id?: string| undefined;
//     title?: string | undefined;
//     body?: string | undefined;
//     onTitleChange: React.ChangeEventHandler<HTMLInputElement>;
//     onBodyChange: React.ChangeEventHandler<HTMLTextAreaElement>;
//     create?: React.MouseEventHandler<HTMLButtonElement> | undefined;
//     update?: React.MouseEventHandler<HTMLButtonElement> | undefined;
//     delete?: React.MouseEventHandler<HTMLButtonElement> | undefined;
//     children?: any;
// }

// const Note = (props: NoteProps): JSX.Element => {
//     return (
//         <div 
//             className="w-full mb-8 p-8 secondary-bg-color rounded-md primary-border shadow-lg"
//             id={props.id}
//         >
//             <Field 
//                 label="Title:"
//                 type="text"
//                 placeholder="The title"
//                 defaultValue={props.title}
//                 onChange={props.onTitleChange}
//             />
//             <Field
//                 label="Body:"
//                 placeholder="The body"
//                 defaultValue={props.body}
//                 onChange={props.onBodyChange}
//                 multiLines={true}
//             />
//             {props.create ? (
//                 <Button
//                     className="success-bg-color secondary-color"
//                     onClick={props.create}    
//                 >
//                     Create
//                 </Button>
//             ) : null}
//             {props.update ? (
//                 <Button
//                     className="mb-6 warning-bg-color secondary-color"
//                     onClick={props.update}    
//                 >
//                     Update
//                 </Button>
//             ) : null}
//             {props.delete ? (
//                 <Button
//                     className="danger-bg-color secondary-color"
//                     onClick={props.delete}    
//                 >
//                     Delete
//                 </Button>
//             ) : null}
//         </div>
//     );
// }

// export default Note;
