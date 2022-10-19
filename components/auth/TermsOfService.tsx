import React from "react";

function TermsOfService() {
  return (
    <>
      <span className="font-bold">
        웹에서 트위터 콘텐츠가 표시되는 위치를 추적하세요
      </span>
      <div className="flex mb-10 mt-3">
        <label htmlFor="default-checkbox" className="text-xs font-medium">
          트위터는 이 데이터를 이용해 사용자 경험을 맞춤 설정합니다. 이 웹
          브라우징 기록은 절대 사용자 이름, 이메일 또는 전화번호와 함께 저장되지
          않습니다.
        </label>
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className="w-8 h-8"
        />
      </div>
      <p className="text-sm">
        가입하면 트위터의{" "}
        <span className="text-blue-400">
          운영원칙, 개인정보 처리방침 및 쿠키 사용
        </span>
        에 동의하게 됩니다. 트위터에서는 개인정보 처리방침에 명시된 목적에 따라
        이메일 주소 및 전화번호 등 내 연락처 정보를 사용할 수 있습니다.{" "}
        <span className="text-blue-400">자세히 알아보기</span>
      </p>
    </>
  );
}

export default TermsOfService;
