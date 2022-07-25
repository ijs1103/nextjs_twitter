import { useEffect } from 'react'
import MobileLayout from "@components/MobileLayout";
import { useRouter } from "next/router";
import useMutation from "@libs/useMutation";
import Header from "@components/Header";
import Button from "@components/Button";

function TweetDelete() {
	const router = useRouter();
	const [deleteTweet, { data, loading }] = useMutation(`/api/tweets/${router.query.id}/delete`, 'DELETE');
	const onDelete = () => {
		if (loading) return;
    deleteTweet({});
  };
	useEffect(() => {
		if (!data) return;
		if (data.ok) {
			alert("트윗이 정상적으로 삭제되었습니다");
			document.location.href = "/tweets";
		} else {
			alert(data.error);
		}
	}, [data]);
	const onCancel = () => {
		router.push(`/tweets/${router.query.id}`);
	}
	return (
			<MobileLayout>
				<Header />
				<div className='mt-[200px] flex flex-col items-center'>
					<p className='text-gray-500 text-3xl'>해당 트윗을 정말 삭제하시겠습니까?</p>
					<div className='flex gap-3'>
						<Button onClick={onDelete} name='삭제' isCancel />
						<Button onClick={onCancel} name='취소' />
					</div>
				</div>
			</MobileLayout>
	)
}

export default TweetDelete