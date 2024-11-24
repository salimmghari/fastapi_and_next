import React from 'react'
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import Form from '../components/Form';
import Title from '../components/Title';
import Field from '../components/Field';
import Button from '../components/Button';
import Link from '../components/Link';

const Login = async (): Promise<JSX.Element> => {
    async function login(formData: FormData) {
        'use server';
        if (
            formData.get('username') !== '' 
            && formData.get('password') !== ''
        ) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
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
        <Form action={login}>
            <Title>Login</Title>
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
            <Link path="/signup">Signup?</Link>
            <Button type="submit">Login</Button>
        </Form>
    );
}

export default Login;
