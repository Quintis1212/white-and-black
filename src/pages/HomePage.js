import React from 'react'

export default function HomePage() {
    return (
        <main className='home-page'>
            <section >
                <p className='home-page-text'><span>CLOTHES</span> FOR EVERYONE</p>
                <img className='home-page-img' src={require('../img/home-page-img.jpg')}  alt='family-logo' />
            </section>
            <section >
                <p className='home-page-text'><span>OUR CLOTHES IN SOCIAL MEDIA</span></p>
                <div className='home-page-insta'>
                <a href='https://www.instagram.com'>@yuiliaQ</a>
                <a href='https://www.instagram.com'>@TuiliaQ</a>
                <a href='https://www.instagram.com'>@MuiliaQ</a>
                <a href='https://www.instagram.com'>@Pia</a>
                <a href='https://www.instagram.com'>@slivOchka</a>
                <a href='https://www.instagram.com'>@klubnichka</a>
                </div>
                <img className='home-page-img' src={require('../img/home-page-insta-img.jpg')}  alt='family-logo' />
            </section>
        </main>
    )
}
