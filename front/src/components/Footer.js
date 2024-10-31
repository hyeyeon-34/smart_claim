import React from 'react';

const FooterSection = ({ title, items }) => (
  <div className="flex flex-col justify-between h-full">
    <h4 className="mb-2 font-bold">{title}</h4>
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const footerData = [
    { title: 'Use cases', items: ['UI design', 'UX design', 'Wireframing', 'Diagramming', 'Brainstorming'] },
    { title: 'Explore', items: ['Design', 'Prototyping', 'Development features'] },
    { title: 'Resources', items: ['Blog', 'Best practices', 'Colors', 'Color wheel', 'Support'] },
  ];

  return (
    <footer className="footer w-full h-fit bg-slate-800 px-[32px] py-[16px] md:px-10 lg:px-20 text-xs lg:text-sm">
      <div className="footer-links w-full h-full flex justify-between items-start">
        <div className="footer-logo">Logo</div>
        {footerData.map((section, index) => (
          <FooterSection key={index} title={section.title} items={section.items} />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
