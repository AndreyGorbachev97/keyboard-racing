import React, { ChangeEvent, useEffect, useState } from 'react';
import style from './KbTextField.scss';

const sampleText = 'Тестовый текс';

export const KbTextField = () => {
  const [raceValue, setRaceValue] = useState('');

  useEffect(() => {
    console.log('raceValue', raceValue);
  }, [raceValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.value', event.target.value);
    if (sampleText.includes(event.target.value) && event.target.value.length >= raceValue.length) {
      setRaceValue(event.target.value);
    }
  };

  return (
    <div className={style.kbTextField}>
      {sampleText.split('').map((char, i) => (
        <span className={`${style.kb} ${style.kbLetter}`} key={i}>
          {char}
        </span>
      ))}
      <span className={`${style.kb} ${style.kbGreen}`}>А</span>
      <span className={`${style.kb} ${style.kbRed}`}>А</span>
      <span className={`${style.kb} ${style.kbSuccess}`}>А</span>
    </div>
  );
};
