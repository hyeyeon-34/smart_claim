import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <div className="w-full h-[30px] bg-slate-0 flex justify-between items-baseline px-4 md:px-10 lg:px-20 py-2 text-xs lg:text-sm">
      <div className="flex-grow"></div>
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
              <Link to="/login">로그인 |</Link>
            </h2>
            <h2 className="flex px-1 md:px-2 text-[#d4d6cc] hover:text-[#aaae9f]">
              <Link to="/mypage">마이페이지 </Link>
            </h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
