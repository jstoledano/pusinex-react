import Header from './Header'
import Footer from './Footer'
import CreatePUSINEX from './CreatePUSINEX'

const Pusinex = () => {
    return (
        <div className='container py-3'>
            <Header />
            
                <div className='row'>
                    <CreatePUSINEX />
                </div>
            <Footer />
        </div>
    )
}

export default Pusinex