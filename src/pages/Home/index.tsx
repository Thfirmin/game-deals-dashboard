import { BanknoteArrowDown, Gamepad2, Zap } from 'lucide-react';
import './style.css'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Text from '@/components/Text';
import Button from '@/components/Button';

export default function HomePage() {
  useEffect(() => {
    selectNavItem();
  }, []);

  return (
    <div id="main-container">
      <section className='flex flex-col items-center text-center gap-5 mb-12'>
          <span>
          <Text.Title>Game Deals Dashboard</Text.Title>
          <Text.Desc><p>Discover unmissable deals, track price history, and save on your favorite games across multiple platforms.</p></Text.Desc>
          </span>
          <div className='flex flex-row gap-2 items-center mt-4'>
            <Link to="/dashboard"><Button>Get Started</Button></Link>
            <Text.Body><p>or</p></Text.Body>
            <Link to="/about"><Button>Learn About Us</Button></Link>
          </div>
      </section>

      <section className='cards-container'>
        <section className='section-card'>
          <span className='flex items-center gap-2 justify-center'>
            <Zap className='text-(--subtitle) w-[35px] h-[35px]' />
            <Text.Subtitle>Featured Deals</Text.Subtitle>
          </span>
          <Text.Body><p>See the most popular games currently on sale. Real-time updates so you never miss a discount.</p></Text.Body>
          <Link to="/dashboard"><Button>Explore Deals</Button></Link>
        </section>

        <section className='section-card'>
          <span className='flex items-center gap-2 justify-center'>
            <BanknoteArrowDown className='text-(--subtitle) w-[35px] h-[35px]' />
            <Text.Subtitle>Cheapest Ever</Text.Subtitle>
          </span>
          <Text.Body><p>Track the lowest prices ever recorded for your favorite games and know exactly when to buy.</p></Text.Body>
          <Link to="/dashboard"><Button>See Cheapest Games</Button></Link>
        </section>

        <section className='section-card'>
          <span className='flex items-center gap-2 justify-center'>
            <Gamepad2 className='text-(--subtitle) w-[35px] h-[35px]' />
            <Text.Subtitle>Platforms</Text.Subtitle>
          </span>
          <Text.Body><p>Explore deals across platforms like Steam, Epic Games, GOG, and more. All in one place.</p></Text.Body>
          <Link to="/dashboard"><Button>Explore Platforms</Button></Link>
        </section>
      </section>
    </div>
  )
}

function selectNavItem() {
  const navHomeItem = document.getElementById('nav-home-item');
  if (navHomeItem) {
    navHomeItem.classList.add('nav__item__selected');
  }

  const navAboutItem = document.getElementById('nav-about-item');
  if (navAboutItem) {
    navAboutItem.classList.remove('nav__item__selected');
  }
  
  const navDashboardItem = document.getElementById('nav-dashboard-item');
  if (navDashboardItem) {
    navDashboardItem.classList.remove('nav__item__selected');
  }
}