import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import style from './KbTextField.scss';
import { calculateCharactersPerMinute, calculateDiffSeconds } from '../../utils';

const sampleText = 'Тестовый текст';

let interval: any;

export const KbTextField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [raceValue, setRaceValue] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentLetterClass, setCurrentLetterClass] = useState<string>(style.kbGreen);
  const [timer, setTimer] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [inputErrors, setInputErrors] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);

  useEffect(() => {
    // console.log('raceValue', raceValue);
  }, [raceValue]);

  // Вычисляем скорость печати символы/мин
  useEffect(() => {
    console.log('diffSeconds', timer);
    console.log('raceValue', raceValue);
    const speed = calculateCharactersPerMinute(currentIndex, timer);
    setSpeed(speed);
  }, [timer]);

  const handleClick = () => {
    inputRef.current.focus();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isFinish) return;
    const inputValue = event.target.value.slice(-1);

    // Запускаем таймер если ввели первый символ
    if (!isStart && event.target.value.length === 1) {
      setIsStart(true);

      const startDate = new Date();
      setStartDate(startDate);
      interval = setInterval(() => {
        const currentDate = new Date();
        const diffSeconds = calculateDiffSeconds(startDate, currentDate);
        setTimer(diffSeconds);
      }, 1000);
    }

    // Обработка финиша
    if (currentIndex + 1 === sampleText.length) {
      const currentTimer = calculateDiffSeconds(startDate, new Date());
      const speed = calculateCharactersPerMinute(currentIndex + 1, currentTimer);
      setSpeed(speed);
      setIsFinish(true);
      clearInterval(interval);
    }

    // Логика отвечающая за смену индеса и цвет буквы, стоящей на индексе
    if (sampleText[currentIndex] === inputValue) {
      setCurrentLetterClass(style.kbGreen);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      if (currentLetterClass !== style.kbRed) {
        setInputErrors((prevCount) => prevCount + 1);
        setCurrentLetterClass(style.kbRed);
      }
      return;
    }

    setRaceValue(inputValue);
  };

  return (
    <div className={style.kbTextField} onClick={handleClick} onMouseDown={handleClick}>
      <div>
        <input
          autoFocus
          ref={inputRef}
          onChange={handleChange}
          value={raceValue}
          className={style.hiddenInput}
          type="text"
        />
        <div>
          <div>{isFinish ? 'Финиш!' : 'Гонка началась!'}</div>
          <div>Скорость: {speed}</div>
          <div>Количетсво ошибок: {inputErrors}</div>
        </div>

        {sampleText.split('').map((char, i) => (
          <span
            className={`${style.kb} ${
              i < currentIndex ? style.kbSuccess : i === currentIndex ? currentLetterClass : ''
            }`}
            key={i}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};
