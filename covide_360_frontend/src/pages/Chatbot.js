import React from 'react';
import { useState } from 'react';
import Nav from '../components/Nav'
import RoboLogo from '../robot.svg';
import UserLogo from '../user.svg';
import axios from 'axios'

function Chatbot() {
    const [arr,setArr]=useState([])
    let parr=['Yes','Yup','yes','yup']
    let narr=['No','Nope','no','nope']
    let s=['Do you have fever?','Are you experiencing tiredness','Do you have dry-cough?','Are you experiencing difficulty-in-breathing?','Do you have a sore-throat?','Do you have breathing problems?','Any pains?','Any nasal-congestion?','Do you have a runny-nose','Are you experiencing diarrhea?','What is your age?']

    const [f,setF]=useState(0)
    const [cnt,setCnt]=useState(0)
    const [inpVal,setInpVal]=useState()
    const [userMsg,setUserMsg]=useState([{from:0,
        msg:'Hello, Are you looking for COVID resources or would you like a COVID checkup?'},
        ])

    function handleChange(event){
        setInpVal(event.target.value);
      }

     function resDecide(res){
        setUserMsg([...userMsg, { from: 1, msg: inpVal }]);
         if(cnt==0)
         {
            if(res.includes('Resources'))
            {
            setF(0)
            setUserMsg([...userMsg,{ from: 1, msg: inpVal },{from:0,msg:"Ask for Resources"}])
            setCnt(cnt+1)
            }
            else if(res.includes('Check'))
            {
            setF(1)
            setUserMsg([...userMsg,{ from: 1, msg: inpVal },{from:0,msg:s[cnt]}])
            setCnt(cnt+1)
            }
            else
            setUserMsg([...userMsg,{ from: 1, msg: inpVal },{from:0,msg:"Invalid"}])
         }

         if(cnt==1 && f==0)//Resource Search
            window.location.assign("https://www.twitter.com/search?q="+inpVal+" verified");


         else if(cnt==1 && f==1)
            {
            setUserMsg([...userMsg,{ from: 1, msg: inpVal },{from:0,msg:s[cnt]}])
            // arr.push(yesno(inpVal))
            setArr([yesno(inpVal)])
            console.log(arr)
            }

         if(cnt>1&&cnt<11){
            setUserMsg([...userMsg,{ from: 1, msg: inpVal },{from:0,msg:s[cnt]}])
            // arr.push(yesno(inpVal))
            setArr([...arr,yesno(inpVal)])
            console.log(arr)
         }
         if(cnt==11){
            setUserMsg([...userMsg,{ from: 1, msg: inpVal },{from:0,msg:"Thank You, Please wait for results."}])
            // tempArr=arr.concat(ageRes(inpVal))
             setArr(arr.concat(ageRes(inpVal)))
             console.log(arr)
             mlCall(arr)
         }
        }

    function yesno(val){
        if(parr.includes(val)){
            setCnt(cnt+1)
            return 1
        }

        else if(narr.includes(val)){
            setCnt(cnt+1)
            return 0
        }
    }

    function ageRes(val){
        if(val>=0&&val<=9)
        return [1,0,0,0,0]
        if(val>=10&&val<=19)
        return [0,1,0,0,0]
        if(val>=20&&val<=24)
        return [0,0,1,0,0]
        if(val>=25&&val<=59)
        return [0,0,0,1,0]
        if(val>=60)
        return [0,0,0,0,1]
    }

    // function mlCall(){
    //     axios.post(':5000', arr)
    //       .then((response) => {
    //         console.log(response);
    //         if(response==1)
    //         setUserMsg([...userMsg,{ from: 1, msg: inpVal },{from:0,msg:"You may have COVID according to our data, please consult a doctor."}])
    //         if(response==0)
    //         setUserMsg([...userMsg,{ from: 1, msg: inpVal },{from:0,msg:"You seem to be safe from COVID, stay safe!"}])
    //       }, (error) => {
    //         console.log(error);
    //       });
    // }

    function mlCall() {
        setUserMsg([...userMsg,{ from: 1, msg: inpVal },{from:0,msg:"You may have COVID according to our data, please consult a doctor."}])
    }

    function chatbotGen(obj){
        return(

            <>
                {obj.from==1?<div class="p-4 lg:w-1/2 md:w-full ml-auto ">
            <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col ">

            <div class="flex-grow sm:text-right text-center mt-6 sm:mt-0">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-2">You</h2>
                <p class="leading-relaxed text-base">{obj.msg}</p>
                {/* <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </a> */}
            </div>
            <div class="w-16 h-16 sm:ml-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                        {/* <img src={UserLogo} class="w-8 h-8"/> */}
            </div>
            </div>
        </div>:
        <div class="p-4 lg:w-1/2 md:w-full">
            <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
            <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-8 h-8" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                {/* <img src={RoboLogo} class="w-8 h-8"/> */}
            </div>
            <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Bot</h2>
                <p class="leading-relaxed text-base">{obj.msg}</p>
                {/* <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </a> */}
            </div>
            </div>
        </div>
        }
            </>
        )
    }



    return (
        <div>
            <Nav/>
            <div className="container mx-auto border-2 border-gray-200 border-opacity-50 m-4">

            {userMsg?userMsg.map(chatbotGen):<></>}


            <div class="flex flex-col w-full gap-2 md:justify-start md:flex-row p-2">
                <input class="flex-grow w-full px-4 py-2 mb-4 text-base text-black transition duration-1000 ease-in-out transform bg-gray-200 rounded-lg lg:w-auto focus:outline-none focus:border-purple-500 sm:mb-0 focus:bg-white focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                    placeholder="Your Response" value={inpVal} onChange={(e)=>{handleChange(e)}} />
                <button onClick={()=>{resDecide(inpVal);console.log(cnt)}}
                class="flex items-center w-full px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg lg:w-auto hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
                <a>Action</a>
                </button>
                    </div>
            </div>

        </div>
    );
}

export default Chatbot;
