declare module '*.jpg';
import {useEffect} from 'react'
import myImg from '../assets/images/0394c8857780323dfdcd79d7c946ad72.jpg'
import Alert from './../components/Alert'
const Home = () => {
  const alertMessage = {
    "message": "Please Drag Icons a little and paste wherever on the screen",
  };
  useEffect(() => {
    document.body.classList.add('home');
    return () => {
      document.body.classList.remove('home');
    }
  }, []);
  return (
    <>
      <Alert message={alertMessage.message} />
       <div className="spotlight">
    <div className="row">
      <div className="col">
        <div className="home-text">
          <h2 className="text-secondary">
            Laravel Livewire, Flutter/Dart, React, React Native, SolidWorks,MS
            Office tools.
          </h2>
          <p>
            Experienced in building and debugging applications using Strong
            analytical and problem solving abilities, with a passion for
            innovation in engineering and technology.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="hero-img">
          <svg width="0" height="0" viewBox="0 0 435 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="smoothBox" clipPathUnits="userSpaceOnUse">
                <path
                  d="M419 0.5C427.56 0.5 434.5 7.4396 434.5 16V402.138C434.5 409.845 430.177 416.902 423.31 420.402L242.022 512.808C230.144 518.862 227.708 534.785 237.234 544.113L287.085 592.925C297.008 602.641 290.129 619.5 276.241 619.5H21C9.67816 619.5 0.5 610.322 0.5 599V16C0.5 7.43959 7.43959 0.500002 16 0.5H419ZM405.34 445.988C418.93 439.654 434.5 449.576 434.5 464.569V599C434.5 610.322 425.322 619.5 414 619.5H333.229C327.539 619.5 322.104 617.134 318.227 612.97L255.382 545.476C245.895 535.286 249.106 518.806 261.725 512.925L405.34 445.988Z"
                  stroke="black" />
              </clipPath>
            </defs>
          </svg>
          <img className="home-img" src={myImg} alt=""  />
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Home;