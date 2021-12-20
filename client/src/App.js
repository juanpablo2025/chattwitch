import React, { useEffect, useState } from 'react'
import { UseCookies } from 'react-cookie'
import { StreamChat } from 'stream-chat'
import {
  Chat,
  Channel,
} from 'stream-chat-react'
import Auth from './components/Auth'
import MessagingContainer from './components/MessagingContainer'
import Video from './components/Video'
import 'stream-chat=css/dist/css/index.css'
import { customStyles } from "./styles/customStyles"


const client = StreamChat.getInstance('62jj2wpqzp9u')
const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [channel, setChannel] = useState(null)
  const [users, setUsers] = useState(null)

  const authToken = cookies.authToken

  console.log(authToken)

  useEffect(async () => {
    if (authToken) {
      const { users } - await client.queryUsers({ role: 'user' })
      setUsers(users)
    }

  }, [])

  const setupClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookies.UserId,
          name: cookies.Name,
          hashedPassword: cookies.HasehdPassword,


        },
        authToken
      )
      const channel = await client.channel('gamin', 'gaming-demo', {
        name: 'Gaming Demo',
      })
      setChannel(channel)
    } catch (err) {
      console.log(err)
    }
  }
  if (authToken) setupClient()

  return (
    <div>
      {!authToken && <Auth />}
      {authToken && <Chat client={client} customStyles={customStyles}>
        <Channel channel={channel}>
          <Video />
          <MessagingContainer users={users} />
        </Channel>
      </Chat>}
    </div>
  )
}

export default App
