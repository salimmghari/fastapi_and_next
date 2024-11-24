import React from 'react'
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import Form from '../components/Form';
import Title from '../components/Title';
import Field from '../components/Field';
import Button from '../components/Button';
import Link from '../components/Link';

const Signup = async (): Promise<JSX.Element> => {
    async function signup(formData: FormData) {
        'use server';
        if (
            formData.get('username') !== '' 
            && formData.get('password') !== ''
            && formData.get('password') === formData.get('confirmPassword')
        ) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users/signup/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        username: formData.get('username'),
                        password: formData.get('password')
                    })
                })
                if (response.ok) {
                    const data = await response.json();
                    const cookieStore = await cookies();
                    cookieStore.set('accessToken', data.access_token, {
                        httpOnly: true,
                        secure: false,
                        path: '/',
                        maxAge: 60 * 10
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                redirect('/');
            }
        }
    }

    return (
        <Form action={signup}>
            <Title>Signup</Title>
            <Field
                label="Username:"
                type="text"
                name="username"
                placeholder="Your username"            
            />
            <Field
                label="Password:"
                type="password"
                name="password"
                placeholder="Your password"            
            />
            <Field
                label="Comfirm Password:"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"            
            />
            <Link path="/login">Login?</Link>
            <Button type="submit">Signup</Button>
        </Form>
    );
}

export default Signup;
