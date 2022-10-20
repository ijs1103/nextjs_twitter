const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "seaagainuploads.s3.ap-northeast-2.amazonaws.com", // aws-s3 이미지
      "abs.twimg.com", // NotFound 컴포넌트 이미지
      "lh3.googleusercontent.com", // google 프로필 이미지
    ],
  },
});
