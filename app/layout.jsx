import '@styles/globals.css'
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Promptify",
    description: "Find creativity trough AI"
}

const Rootlayout = ({ children }) => {
return (
    <html lang='en'>
        <body>
        <Provider>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                <Nav />  {/* To get the Navbar on all pages*/}
                {children}
            </main> 
        </Provider>
        </body>  

    </html>
)
}

export default Rootlayout
