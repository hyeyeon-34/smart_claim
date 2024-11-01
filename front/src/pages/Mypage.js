import React from 'react';

const Mypage = () => {
  return (
  <div className="flex flex-col items-center w-full px-4 mt-8">
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-semibold mb-2">내 상담 내역</h1>
        <p className="text-gray-500 text-lg">현재까지 문의한 내역을 조회합니다.</p>
      </div>
      <div className="w-full max-w-5xl bg-white border rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center font-semibold text-gray-700 mb-4">
            <span >상담 목록 리스트</span>
      
            <div className="flex items-center space-x-2">
              {/* <span>필터링</span> */}
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>전체</option>
                <option>진행중</option>
                <option>완료</option>
              </select>
            </div>
          </div>
          
          {/* 리스트 부분 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4 py-3 bg-white rounded-lg shadow-md border">
              <span>분실</span>
              <span>21.02.2023</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-white rounded-lg shadow-md border">
              <span>완전 파손</span>
              <span>21.02.2023</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-white rounded-lg shadow-md border">
              <span>부분 파손</span>
              <span>21.02.2023</span>
            </div>
          </div>
      </div>
    
  </div>)
};

export default Mypage;
