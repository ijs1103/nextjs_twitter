import React from 'react'
import Button from './Button';
import Input from './Input';
import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
	onClose: () => void;
	getCode: () => string;
	register: UseFormRegisterReturn;
	onCheckCode: () => void;
}

function CodeModal({ onClose, getCode, register, onCheckCode }: Props) {

	const handleClick = () => {
		if (getCode().length !== 6) return;
		onCheckCode();
	}
	return (
		<>
			<div onClick={onClose} className="fixed top-0 left-0 z-10 w-full h-full bg-black opacity-60">
			</div>
			<div className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg h-full w-full sm:h-[240px] sm:w-[220px] bg-slate-800 flex flex-col justify-center gap-4 p-4">
				<span className='text-2xl text-center text-bold'>6자리 코드 입력</span>
				<Input id="code" label="코드" register={register} type="number" />
				<Button onClick={handleClick}>확인</Button>
			</div>
		</>
	)
}

export default CodeModal