import React, { useState } from 'react';
import Nav from '../components/Nav'

function Meeting(props) {
    console.log(props.location)
    const [evid,setEvid]=useState()
    const date=props.location.date
        var gapi = window.gapi
        var CLIENT_ID = "795034839651-mtpdd4f1lk2e6tdaj736o4rbn2r6cl8a.apps.googleusercontent.com"
        var API_KEY = "AIzaSyCv6i6tz0cyUsb9fJhIhmHsSuuz4U3Zw_Y"
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        var SCOPES = "https://www.googleapis.com/auth/calendar.events"
      
        if(!evid){
          gapi.load('client:auth2', () => {
            console.log('loaded client')
      
            gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES,
            })
      
            gapi.client.load('calendar', 'v3', () => console.log('bam!'))
      
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
              
            //   var event = {
            //     'summary': 'Awesome Event!',
            //     'location': '800 Howard St., San Francisco, CA 94103',
            //     'description': 'Really great refreshments',
            //     'start': {
            //       'dateTime': '2021-06-28T09:00:00-07:00',
            //       'timeZone': 'America/Los_Angeles'
            //     },
            //     'end': {
            //       'dateTime': '2021-06-28T17:00:00-07:30',
            //       'timeZone': 'America/Los_Angeles'
            //     },
            //     'recurrence': [
            //       'RRULE:FREQ=DAILY;COUNT=2'
            //     ],
            //     'attendees': [
            //       {'email': 'abhinav20016@gmail.com'},
            //       {'email': 'sbrin@example.com'}
            //     ],
            //     'reminders': {
            //       'useDefault': false,
            //       'overrides': [
            //         {'method': 'email', 'minutes': 24 * 60},
            //         {'method': 'popup', 'minutes': 10}
            //       ]
            //     },
            //     "conferenceData": {
            //         "createRequest": {
            //           "conferenceSolutionKey": {
            //             "type": "hangoutsMeet"
            //           },
            //           "requestId": "test"
            //         }
            //       }
            //   }
      
              var request = gapi.client.calendar.events.insert({
                "calendarId": "primary",
                "conferenceDataVersion": 1,
                "resource": {
                  "end": {
                    "date": date,
                  },
                  "start": {
                    "date": date
                  },
                  "conferenceData": {
                    "createRequest": {
                      "conferenceSolutionKey": {
                        "type": "hangoutsMeet"
                      },
                      "requestId": "some-random-string"
                    }
                  },
                  "summary": "titles are cool"
                }
              })
      
              request.execute(event => {
                console.log(event)
                setEvid(event.hangoutLink)
              })


            })
          })
        }
    return (
        <div>
            <Nav/>
          
          <section class="text-gray-700 ">
                    <div class="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
                        <div
                            class="flex flex-col items-start w-full pt-0 mb-16 text-left lg:flex-grow md:w-1/2 xl:mr-20 md:pr-24 md:mb-0 ">
                            <h1 class="mb-8 text-2xl font-black tracking-tighter text-black md:text-5xl title-font">
                                Your appointment is set up.
                            </h1>
                            <p class="mb-8 text-base leading-relaxed text-left text-gray-600 ">
                                Deploy your mvp in minutes, not days. WT offers you a a wide selection swapable sections for
                                your landing page.
                            </p>
                            <div class="flex flex-col w-full gap-2 md:justify-start md:flex-row">
                                <input
                                    class="flex-grow w-full px-4 py-2 mb-4 text-base text-black transition duration-1000 ease-in-out transform bg-gray-200 rounded-lg lg:w-auto focus:outline-none focus:border-purple-500 sm:mb-0 focus:bg-white focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                                    placeholder="Your Email" value={evid}/>
                                <button
                                    class="flex items-center w-full px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg lg:w-auto hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
                                    Action
                                </button>
                            </div>
                            <p class="w-full mt-2 mb-8 text-sm text-left text-gray-600">
                                Please join on time
                            </p>
                        </div>
                        <div class="w-full lg:w-5/6 lg:max-w-lg md:w-1/2">
                            <img class="object-cover object-center rounded-lg " alt="hero"
                                src="https://dummyimage.com/720x600/F3F4F7/8693ac" />
                        </div>
                    </div>
                </section>
                
        </div>
    );
}

export default Meeting;