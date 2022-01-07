import {ChannelHeader,MessageInput,MessageList,thread,window}from "stream-chat-react"
import {useState} from "react"
import UserList from './UserList'
import {FaUsers,FaArrowAltCircleLeft} from 'react-icons/fa'

const MessagingContainer = ({users})=>{
	const [cookies,setCookie,removeCookie]=useCookies(['user'])
	const [userListVisible,setUserListVisible]=useState(false)

	const logout =()=>{
		removeCookie('Name',cookies.Name)
		removeCookie('HashedPassword',cookies.HashedPassword)
		removeCookie('UserId',cookies.UserId)
		removeCookie('AuthToken',cookies.AuthToken)
		window.location.reload()
	}
	return(
		<div className='messaging-container'>
			{userListVisible &&(
				<window>
					<faUsers className="icon" onClink={()=> setUserListVisible(true)}/>
					<ChannelHeader/>
					<MessageList/>
					<MessageInput/>
					<button className="standard-button" onClink={logout}>Logout</button>
				</window>
			)}
			{userListVisible &&(
				<window>
					<div className="chat-container">
					<FaArrowAltCirCleLeft className="icon" onClick={()=> setUserListVisible(false)}/>
					<ChannelHeader title='USers'/>
					<UserList users={Users}/>

					</div>
				</window>
			)}
			<thread/>
		</div>
	)
}
export default MessagingContainer