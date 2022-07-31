import React from 'react'
import MobileLayout from '@components/MobileLayout'
import SearchBar from '@components/SearchBar'

function search() {

	return (
		<MobileLayout>
			<SearchBar />
			{/* 검색결과 */}
			<div></div>
		</MobileLayout>
	)
}

export default search