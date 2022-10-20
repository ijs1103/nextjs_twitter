import Document, {
	Html,
	Head,
	Main,
	NextScript,
} from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="kr">
				<Head>
					<title>nextjs-twitter</title>
					<meta charSet="utf-8" />
					<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					{/* Open Graph */}
					<meta property="og:type" content="website" />
					<meta property="og:title" content="넥스트 트위터" />
					<meta property="og:image" content="https://seaagainuploads.s3.ap-northeast-2.amazonaws.com/twitter_photos/twitter_screenshot.png-1666278747477" />
					<meta property="og:description" content="Next.js로 구현한 트위터" />
					<meta property="og:url" content="https://nextjs-twiiter.vercel.app/" />
					{/* Twitter Card */}
					<meta property="twitter:card" content="summary" />
					<meta property="twitter:title" content="넥스트 트위터" />
					<meta property="twitter:description" content="Next.js로 구현한 트위터" />
					<meta property="twitter:image" content="https://seaagainuploads.s3.ap-northeast-2.amazonaws.com/twitter_photos/twitter_screenshot.png-1666278747477" />
					<meta property="twitter:url" content="https://nextjs-twiiter.vercel.app/" />
					<meta name="description" content="Next.js로 구현한 트위터" />
					<meta name="keywords" content="Next.js swr recoil twitter" />
					<meta name="robots" content="index,follow" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;