import React from 'react'
import type {Metadata} from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Notes',
  description: ''
}

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang="en">
      <body className="w-full flex flex-col justify-center items-center p-10 secondary-bg-color">
        {children}
      </body>
    </html>
  )
}        

export default RootLayout
