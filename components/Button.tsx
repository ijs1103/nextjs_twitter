import React from 'react'
import { cls } from '@libs/utils' 
interface Props {
	name: string;
	isDisable?: boolean;
	isCancel?: boolean;
	onClick?: () => void;
}

function Button({name, isDisable = false, isCancel = false, onClick}: Props) {
	return (
		<button onClick={onClick}  disabled={isDisable}
			className={cls ("font-bold py-1 px-4 sm:px-8 rounded-xl  sm:rounded-full ", isCancel ? "bg-red-600 hover:bg-red-800" : "bg-blue-400 hover:bg-blue-600") }>
			{name}
		</button>
	)
}

export default Button