import React from 'react';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import Title from './components/Title';
import Button from './components/Button';
import Note, {NoteInterface} from './components/Note';

const App = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value
  if (!accessToken) {
    redirect('/login');
  }  

  async function getNotes(): Promise<[NoteInterface] | undefined> {
    'use server';
    try {
      const response = await fetch('http://127.0.0.1:8000/api/notes/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function logout(formData: FormData) {
    'use server';
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({})
      })
      if (response.ok) {
        cookieStore.set('accessToken', '', {
          path: '/',
          maxAge: 0
        });
        cookieStore.set('refreshToken', '', {
          path: '/',
          maxAge: 0
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      redirect('/login');
    }
  }

  const notes: [NoteInterface] | undefined = await getNotes();

  return (
    <>
      <Title>Notes</Title>
      {notes?.map((note) => (
        <Note 
          key={note?.id} 
          id={note?.id} 
          title={note?.title} 
          body={note?.body} 
          new={false} 
        />
      ))}
      <Note new={true} />
      <form action={logout} className="w-full">
        <Button type="submit" className="secondary-color danger-bg-color">Logout</Button>
      </form>
    </>
  );
}

export default App;
