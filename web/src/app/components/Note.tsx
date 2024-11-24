import React from 'react';
import {cookies} from 'next/headers';
import {revalidatePath} from 'next/cache';
import Form from './Form';
import Field from './Field';
import Button from './Button';

export interface NoteInterface {
    id: number;
    title: string;
    body: string;
    user_id: number;
    created_at: string;
}

interface NoteProps {
    id?: number | undefined;
    title?: string | undefined;
    body?: string | undefined;
    new: boolean;
    children?: React.ReactNode;
}

const Note = async (props: NoteProps): Promise<JSX.Element> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    async function handleNote(formData: FormData) {
        'use server';
        if (formData.get('action') === 'create') {
            try {
                await fetch('http://127.0.0.1:8000/api/notes/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        title: formData.get('title'),
                        body: formData.get('body')
                    })
                })
            } catch (error) {
                console.error(error);
            } finally {
                revalidatePath('/');
            }
        } else if (formData.get('action') === 'update') {
            try {
                await fetch(`http://127.0.0.1:8000/api/notes/${props.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        title: formData.get('title'),
                        body: formData.get('body')
                    })
                })
            } catch (error) {
                console.error(error);
            } finally {
                revalidatePath('/');
            }
        } else if (formData.get('action') === 'delete') {
            try {
                await fetch(`http://127.0.0.1:8000/api/notes/${props.id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            } catch (error) {
                console.error(error);
            } finally {
                revalidatePath('/'); 
            }
        }
    }

    return (
        <Form action={handleNote}>
            <Field 
                label="Title:"
                type="text"
                name="title"
                placeholder="The title"
                defaultValue={props.title}
            />
            <Field 
                label="Body:"
                name="body"
                placeholder="The Body"
                defaultValue={props.body}
                multiLines={true}
            />
            {props.new === true ? (
                <Button type="submit" name="action" value="create" className="success-bg-color secondary-color">Create</Button>
            ) : (
                <>
                    <Button type="submit" name="action" value="update" className="mb-6 warning-bg-color secondary-color">Update</Button>
                    <Button type="submit" name="action" value="delete" className="danger-bg-color secondary-color">Delete</Button>    
                </>
            )}
        </Form>
    );
}

export default Note;
