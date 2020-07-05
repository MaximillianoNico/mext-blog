/* eslint-disable no-undef */
import React from 'react'
import Document, {Head, Main, NextScript } from 'next/document'

class Documents extends Document{
    render(){
        return(
            <html>
                <Head>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"/>
                    <link href="https://fonts.googleapis.com/css?family=Niramit:500i|Roboto" rel="stylesheet"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#1071b8"/>
                    {process.env.NODE_ENV !== 'production' && (
                        <link
                            rel="stylesheet"
                            type="text/css"
                            href={`/_next/static/css/styles.chunk.css?v=${Date.now()}`}
                            />
                        )}
                    <meta name="viewport" content="initial-scale=1.2, width=device-width" key="viewport" />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        )
    }
}

export default Documents