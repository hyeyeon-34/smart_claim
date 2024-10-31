import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo.PNG'; // 로고 이미지 경로

const Header = ({ isLoggedIn, onLogout }) => {
  const categoryList = [
    {
      title: '메인 페이지',
      link: '/aaaaaa',
    },
    {
      title: '문의 내역',
      link: '/bbbbbb',
    },
    {
      title: '보상 문의',
      link: '/cccccc',
    },
    {
      title: '서류 제출',
      link: '/dddddd',
    },
    {
      title: '챗봇 문의',
      link: '/eeeeee',
    },
    {
      title: '기타 요청',
      link: '/ffffff',
    }
  ];

  return (
    <div className="w-full h-[60px] bg-slate-100 flex justify-between items-center p-[32px] md:px-10 lg:px-20 py-2 text-xs lg:text-sm">
      {/* 로고 */}
      <div className="flex items-center space-x-2">
        <img src={logoImage} alt="로고" className="h-6 w-6" /> {/* 로고 이미지 */}
        <span className="font-bold text-gray-700">PHONE CARE</span> {/* 로고 타이틀 */}
      </div>

      <div className='flex gap-[24px] space-x-4'>
        {/* 카테고리 */}
        <ul className="flex gap-[8px] space-x-4">
          {categoryList.map((category, index) => (
            <li key={index} className="text-[#d4d6cc] hover:text-[#aaae9f]">
              <Link to={category.link}>{category.title}</Link>
            </li>
          ))}
        </ul>

        {/* 로그인 여부에 따른 출력 */}
        <div className="menu flex px-2 md:px-4 font-Kr font-bold items-baseline">
          {isLoggedIn ? (
            <>
              <h2
                className="px-1 md:px-2 text-[#d4d6cc] hover:text-[#aaae9f] cursor-pointer"
                onClick={onLogout}
              >
                로그아웃
              </h2>
              <h2 className="flex px-1 md:px-2 text-[#d4d6cc] hover:text-[#aaae9f]">
                <Link to="/mypage">마이페이지</Link>
              </h2>
            </>
          ) : (
            <>
              <h2 className="px-1 md:px-2 text-[#d4d6cc] hover:text-[#aaae9f]">
                <Link to="/userlogin">고객 로그인 |</Link>
              </h2>
              <h2 className="px-1 md:px-2 text-[#d4d6cc] hover:text-[#aaae9f]">
                <Link to="/managerlogin">상담사 로그인 |</Link>
              </h2>
              <h2 className="px-1 md:px-2 text-[#d4d6cc] hover:text-[#aaae9f]">
                <Link to="/insurerlogin">보험사 로그인 |</Link>
              </h2>
              <h2 className="flex px-1 md:px-2 text-[#d4d6cc] hover:text-[#aaae9f]">
                <Link to="/mypage">마이페이지 </Link>
              </h2>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default Header;
