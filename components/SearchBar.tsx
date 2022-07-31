import { useState } from 'react'
import { useForm } from 'react-hook-form'
interface Props {

}


function SearchBar({  }: Props) {
	const { register, handleSubmit, reset } = useForm<{ search: string }>({ mode: 'onChange' })
	
	const isValid = (form: { search: string }) => {
		// 키워드를 가지고 검색결과 불러오기
	}
	return (
		<form className="relative w-full" onSubmit={handleSubmit(isValid)}>
              <input
								{...register('search')}
                type="text"
                name="search"
                placeholder="Search Twitter"
                className="bg-gray-800 h-10 px-10 w-full rounded-full text-sm peer focus:border-2 border-blue-500 outline-none"
              />
              <svg
                className="cursor-pointer absolute left-2 top-0 bottom-0 my-auto fill-current peer-focus:fill-blue-500 w-6 h-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <svg onClick={() => reset({search: ''})} viewBox="0 0 15 15" aria-hidden="true" className="hidden peer-focus:block cursor-pointer absolute fill-blue-500 rounded-full right-3 top-0 bottom-0 my-auto w-4 h-4"><g><path d="M8.914 7.5l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L7.5 6.086 1.707.293c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L6.086 7.5.293 13.293c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L7.5 8.914l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L8.914 7.5z"></path></g></svg>
            </form>
	)
}

export default SearchBar