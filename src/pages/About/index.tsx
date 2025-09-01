import { useEffect } from 'react';
import './style.css'
import Text from '@/components/Text';

export default function AboutPage() {
  useEffect(() => {
    selectNavItem();
  }, []);
  
  return (
    <div id="main-container">
      <section className='mb-[50px]'>
        <h1 className='title mb-5'>About</h1>
        <p className='description'>This is the about page of the Game Deals Dashboard.</p>
      </section>

      <div className='flex flex-1 flex-col gap-[25px] items-center'>
        <section className='section_container'>
          <Text.Subtitle>About the Dashboard</Text.Subtitle>
          <Text.Body>
            The Game Deals Dashboard is designed to help users find the best deals on video games across various online stores.
          </Text.Body>
        </section>

        <section className='section_container'>
          <Text.Subtitle>Tech Stack</Text.Subtitle>
          <Text.Body>
            Our tech stack includes React, TypeScript, and Tailwind CSS to create a responsive and user-friendly interface.
          </Text.Body>
          <br/>
          <Text.Body>
            Visit the <Text.Anchor href="https://github.com/Thfirmin/game-deals-dashboard" target='_blank'>GitHub Repository</Text.Anchor> for more details: 
          </Text.Body>
        </section>
      </div>

    </div>
  )
}

function selectNavItem() {
  const navAboutItem = document.getElementById('nav-about-item');
  if (navAboutItem) {
    navAboutItem.classList.add('nav__item__selected');
  }
  const navHomeItem = document.getElementById('nav-home-item');
  if (navHomeItem) {
    navHomeItem.classList.remove('nav__item__selected');
  }
  const navDashboardItem = document.getElementById('nav-dashboard-item');
  if (navDashboardItem) {
    navDashboardItem.classList.remove('nav__item__selected');
  }
}