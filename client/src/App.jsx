import React from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'

import {ChannelListContainer, ChannelContainer} from './comonents'
import  './App.css'
//use api
const apiKey = '7qy7fcfaa5bp'
const client = StreamChat.getInstance(apiKey)


const App = () => {
  return (
    <div className="styles.app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer/>

        <ChannelContainer/>
      </Chat>
    </div>
  )
}

export default App
