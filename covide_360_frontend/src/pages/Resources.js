import React, { useState } from 'react';
import Nav from '../components/Nav'
import Homesvg2 from '../home2.svg';

function Resources() {
    const [value,setValue]=useState('')
    function handleChange(event){
        setValue(event.target.value);
        console.log(value)
      }
    return (
        <div>
            <Nav/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
             <section class="text-gray-700 ">
                        <div
                            class="container flex flex-col items-start px-5 py-16 mx-auto lg:items-center md:flex-row lg:px-28">
                            <div class="w-full mb-10 lg:w-5/6 lg:max-w-lg md:w-1/2">
                                <img class="object-cover object-center rounded" alt="hero" src={Homesvg2} />
                            </div>
                            <div class="flex flex-col items-start text-left lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16">
                                <h1 class="mb-8 text-2xl font-bold tracking-tighter text-black lg:text-left lg:text-5xl title-font">
                                    Medium length display headline.</h1>
                                <p class="mb-8 text-base leading-relaxed text-left text-gray-700 ">Deploy
                                    your mvp in
                                    minutes, not days. WT offers you a a wide selection swapable sections for your landing page.
                                </p>
                                <div class="flex flex-col w-full gap-2 md:justify-start md:flex-row">
                                    <input
                                        class="flex-grow w-full px-4 py-2 mb-4 text-base text-black transition duration-1000 ease-in-out transform bg-gray-200 rounded-lg lg:w-auto focus:outline-none focus:border-purple-500 sm:mb-0 focus:bg-white focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                                        placeholder="Your Email"  value={value} onChange={(e)=>{handleChange(e)}} />
                                    <button
                                        class="flex items-center w-full px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg lg:w-auto hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
                                        <a href={"https://www.twitter.com/search?q="+value+" verified"}>Action</a>
                                    </button>
                                </div>
                                <p class="w-full mt-2 mb-8 text-sm text-left text-gray-600">
                                    I got 99 problems and blocks ain't one.
                                </p>
                            </div>
                        </div>
                    </section>
                
        </div>
    );
}

export default Resources;


// https://twitter.com/search?q=Pune%20(oxygen)%20-%22not%20verified%22%20-%22un%20verified%22%20-%22urgent%22%20-%22unverified%22%20-%22needed%22%20-%22required%22%20-%22need%22%20-%22needs%22%20-%22requirement%22%20-%22Any%20verified%20lead%22%20since%3A2021-5-5&f=live