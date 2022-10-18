import Picker from '@emoji-mart/react'
import { memo } from 'react';
interface Props {
	setter: (emoji: string) => void;
	onClose: () => void;
}

function EmojiPicker({ setter, onClose }: Props) {
	const handleSelect = (emoji: any) => {
		setter(emoji.native);
	}
	const data = async () => {
		const response = await fetch(
			'https://cdn.jsdelivr.net/npm/@emoji-mart/data',
		)
		return response.json()
	}
	return (
		<div className='fixed z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
			<svg onClick={onClose} className="absolute right-0 w-10 h-10 cursor-pointer -top-10 stroke-blue-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
			<Picker theme={'dark'} data={data} onEmojiSelect={handleSelect} />
		</div>
	)
}

export default memo(EmojiPicker);