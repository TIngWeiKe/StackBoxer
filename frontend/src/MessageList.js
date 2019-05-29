import React, { useContext, useEffect } from 'react'
import MessageItem from './MessageItem'
import RobotTypingItem from './RobotTypingItem'
import { MessageManger } from './MessageProvider'
import AlertMessage from './AlertMessage'

export default function MessageList(props){
	const [ robotState ] = useContext(MessageManger)[2]
	const [ messageState ] = useContext(MessageManger)[3]
	const {transition, setTransition} = useContext(MessageManger)[4]
	let message = []
	let x = [ messageState.mixMessage, messageState.enMessage, messageState.cnMessage, messageState.stofMessage ]
	message = x[robotState.index]

	function scrollToBottom(){
		document.getElementById('message-list').scrollTop = document.getElementById('message-list').scrollHeight
	}

	useEffect(() => {
		return () => {
			scrollToBottom()
		}
	}, x)
console.log(transition)
	return (
		<div onLoad={() => scrollToBottom()} id='message-list'>
			<AlertMessage isAlert={props.isAlert} />
			{message ? (
				message.map((data, index) => {
					return <MessageItem isShow={message.length - index === 1 && transition } key={data.id} type={data.type} data={data.text} time={data.time} icon={robotState.icon} index={index} />
				})
			) : null}
			<RobotTypingItem type={'typing'} mode={robotState.mode} icon={robotState.icon} />
		</div>
	)
}
