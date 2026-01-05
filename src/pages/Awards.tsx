import AwardsMochilas from '../assets/img/webp/awards-mochilas.webp';

const Awards = () => {

    return (
        <>
            <main className='top-space awards-page'>
                <div className="responsive-box">
                    <section>
                        <h1>PREMIOS</h1>
                        <p>Descubrí la nueva colección <strong>Chiky & Stranger Things</strong>, una edición limitada inspirada en el misterioso mundo del “Upside Down”. Esta línea exclusiva incluye mochilas, cartucheras y loncheras con <strong>detalles bordados y serigrafía de alta densidad</strong>, que combinan el estilo urbano con la esencia de la icónica serie. Con tonos intensos en <strong>negro y rojo</strong>, cada artículo refleja una fusión perfecta entre aventura, nostalgia y autenticidad.</p>
                        <img src={AwardsMochilas} alt="Mochilas de la colección Chiky & Stranger Things" />
                    </section>
                    <section className='reclamar'>
                        <h1>¿CÓMO RECLAMAR TUS PREMIOS?</h1>
                        <ol>
                            <li><p>Tené a la mano el empaque ganador.</p></li>
                            <li><p>Prepará una fotocopia de tu documento de identidad.</p></li>
                            <li><p>Descargá, imprimí y <a href="/pdf/carta.pdf" target="_blank">llená este formulario</a>.</p></li>
                            <li><p>Presentate con estos documentos en la dirección indicada.</p></li>
                        </ol>
                    </section>
                </div>
            </main>
        </>
    )

}

export default Awards