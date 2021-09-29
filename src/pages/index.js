import React from "react";
import Header from '@Components/header'
import Footer from '@Components/footer'
import Hero from '@Components/hero'
import Preloader from '@Blocks/preloader'
import Counter from '@Components/counter'
import EventPro from '@Components/eventpromo'
import Features from '@Components/features'
import Speaker from '@Components/speaker'
import Ticket from '@Components/ticket'
import Testimonial from '@Components/testimonial'
import Blog from '@Components/blog'
import NewsLetter from '@Components/newsLetter'
import Brands from '@Components/brands'
import Register from '@Components/register'

function HomePage() {
return (
    <>
    <Header />
    {/* <Preloader /> */}
    <Hero />
    <Counter />
    <EventPro />
    <Features />
    <Speaker />
    <Ticket />
    <Testimonial />
    <Blog />
    <NewsLetter />
    <Brands />
    <Register />
    <Footer />
    </>
  );
}

export default HomePage;
