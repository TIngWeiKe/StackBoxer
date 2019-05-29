import React, { createContext, useState, useReducer } from 'react'
import robotReducer from './robotReducer'
import messageReducer from './MessageReducer'
import { mixRobotIcon } from './styles/icons'

export const MessageManger = createContext()
export default function MessageProvider({ children }){
	const initRobotState = {
		action: 'TO_MIX',
		info: '(English Chatbot + StackBot)',
		mode: 'mix',
		title: 'MixRobot',
		icon: mixRobotIcon,
		index: 0,
	}

	let initMessageState = { mixMessage: [], enMessage: [], cnMessage: [], stofMessage: [] }
	if (typeof localStorage !== 'undefined') {
		if (!localStorage.message) {
			localStorage.setItem('message', JSON.stringify(initMessageState))
		}
	}

	let messageList = JSON.parse(localStorage.getItem('message'))
	const [ input, setInput ] = useState([])
	const [transition, setTransition] = useState(true)
	const botReducer = useReducer(robotReducer, initRobotState)
	const mesReducer = useReducer(messageReducer, messageList)

	return (
		<div>
			<MessageManger.Provider value={[ input, setInput, botReducer, mesReducer, {transition, setTransition} ]}>{children}</MessageManger.Provider>
		</div>
	)
}
