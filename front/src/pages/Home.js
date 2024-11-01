import React from 'react';
import Card from '../components/Card';

function Home() {
  const services = [
    {
      title: '보험 안내',
      description: '다양한 보험 상품을 한눈에 확인할 수 있습니다.',
      link: '/process',
    },
    {
      title: '가입 내역',
      description: '내 보험 가입 현황과 보장 내용을 조회합니다.',
      link: '/guide',
    },
    {
      title: '보상 신청',
      description: '보상 청구 절차와 필요한 정보를 안내합니다.',
      link: '/hours',
    },
    {
      title: '필요 서류',
      description: '보상 신청 시 필요한 서류 목록을 제공합니다.',
      link: '/location',
    },
    {
      title: '센터 안내',
      description: '가까운 상담 센터 위치와 연락처 안내입니다.',
      link: '/title_01',
    },
  ];

  return (
    <div className='w-full h-fit'>
      <section className="services">
        <h1 className='text-2xl font-bold mb-2'>휴대폰 분실/파손 보험 보상 서비스</h1>
        <p className='text-base mb-4'>최적의 서비스를 경험하세요</p>
        <div className="card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card
              key={service.title}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
