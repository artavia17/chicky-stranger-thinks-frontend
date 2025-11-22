import AwardsMochilas from '../assets/img/webp/awards-mochilas.webp';

const Awards = () => {

    return (
        <>
            <main className='top-space awards-page'>
                <div className="responsive-box">
                    <section>
                        <h1>PREMIOS</h1>
                        <p>Descubre la nueva colección <strong>Chiky & Stranger Things</strong>, una edición limitada inspirada en el misterioso mundo del “Upside Down”. Esta línea exclusiva incluye mochilas, cartucheras y loncheras con <strong>detalles bordados y serigrafía de alta densidad</strong>, que combinan el estilo urbano con la esencia de la icónica serie. Con tonos intensos en <strong>negro y rojo</strong>, cada artículo refleja una fusión perfecta entre aventura, nostalgia y autenticidad.</p>
                        <img src={AwardsMochilas} alt="Mochilas de la colección Chiky & Stranger Things" />
                    </section>
                </div>
            </main>
        </>
    )

}

export default Awards