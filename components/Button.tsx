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
			className={cls ("mt-5 text-white font-bold py-2 px-2 sm:px-8 rounded-full ", isCancel ? "bg-red-600 hover:bg-red-800" : "bg-blue-400 hover:bg-blue-600") }>
			{name}
		</button>
	)
}

export default Button