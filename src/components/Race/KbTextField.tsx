import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import style from './KbTextField.scss';

const sampleText = 'Тестовый текст';

export const KbTextField = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLetterClass, setCurrentLetterClass] = useState(style.kbGreen);
  const [raceValue, setRaceValue] = useState('');

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    console.log('raceValue', raceValue);
  }, [raceValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.value', event.target.value);
    const inputValue = event.target.value.slice(-1);
    if (sampleText[currentIndex] === inputValue) {
      setCurrentLetterClass(style.kbGreen);
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentLetterClass(style.kbRed);
      return;
    }

    setRaceValue(inputValue);
  };

  return (
    <div className={style.kbTextField} onClick={handleClick} onMouseDown={handleClick}>
      <input
        autoFocus
        ref={inputRef}
        onChange={handleChange}
        value={raceValue}
        className={style.hiddenInput}
        type="text"
      />
      {sampleText.split('').map((char, i) => (
        <span
          className={`${style.kb} ${i < currentIndex ? style.kbSuccess : i === currentIndex && currentLetterClass}`}
          key={i}
        >
          {char}
        </span>
      ))}
    </div>
  );
};
