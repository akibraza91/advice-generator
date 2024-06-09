"use client"

import { useEffect, useRef, useState } from 'react';
import './globals.css';

export default function Home() {
  const [data, setData] = useState(null);
  const [rotate, setRotate] = useState(false);

  const idRef = useRef(null);
  const quoteRef = useRef(null);

  const handleClick = () => {
    setRotate(!rotate);
    
    fetch('https://api.adviceslip.com/advice')
    .then((res) => res.json())
    .then((data) => {
      data ? setData(data.slip) : console.log('Error in fetching data.');
    });
  }

  useEffect(() => {
    if(data){
      setTimeout(() => {
        idRef.current.textContent = data.id;
        quoteRef.current.textContent = data.advice;
      }, 1000);
    }
  }, [data]);

  return (
    <main>
      <div className='box'>
        <label htmlFor="advice">Advice #<span ref={idRef} className='advice-id'>57</span></label>
        <blockquote ref={quoteRef} className='advice'>
          It is easy to sit up and take notice, what's difficult is getting up and taking action.
        </blockquote>
        <picture>
          <source media='(min-width: 768px)' srcSet='./pattern-divider-desktop.svg'/>
          <img src="./pattern-divider-mobile.svg" alt="Divider" />
        </picture>
      </div>
      <div className={`dice ${ rotate ? 'rotate' : ''}`} onClick={handleClick}>
        <img src="./icon-dice.svg" alt="Icon dice" />
      </div>
    </main>
  );
}
