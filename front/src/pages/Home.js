import React from 'react';
import Card from '../components/Card';

function Home() {
  const services = [
    {
      title: '보상 신청 방법',
      description: '보상 신청 방법에 대한 설명',
      link: '/process',
    },
    {
      title: '보험 안내 페이지',
      description: '보험 안내에 대한 설명',
      link: '/guide',
    },
    {
      title: '운영시간 안내',
      description: '운영 시간에 대한 설명',
      link: '/hours',
    },
    {
      title: '오시는 길',
      description: '고객 센터 위치 안내',
      link: '/location',
    },
  ];

  return (
    <div>
      <header className="main-banner">
        <h1>휴대폰 분실/파손 보험 보상 서비스</h1>
        <p>최적의 서비스를 경험하세요</p>
      </header>

      <section className="services">
        <h2>서비스 안내</h2>
        <div className="card-container">
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
