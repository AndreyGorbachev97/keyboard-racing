import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import style from './Race.scss';
import { calculateCharactersPerMinute, calculateDiffSeconds } from '../../utils';
import { KbTextField } from './KbTextField';
import { Statistic } from './Statistic';
import { LetterType } from '../../constants';

const sampleText = 'Величайшим удовлетворением в жизни является то, что мы делаем то, чего другие считают невозможным.';

let interval: any;

export const Race = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [raceValue, setRaceValue] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentLetterType, setCurrentLetterType] = useState<string>(LetterType.SUCCESS);
  const [timer, setTimer] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [inputErrors, setInputErrors] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);

  // Вычисляем скорость печати символы/мин
  useEffect(() => {
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
      setCurrentLetterType(LetterType.SUCCESS);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      if (currentLetterType !== LetterType.ERROR) {
        setInputErrors((prevCount) => prevCount + 1);
        setCurrentLetterType(LetterType.ERROR);
      }
      return;
    }

    setRaceValue(inputValue);
  };

  return (
    <>
      <div onClick={handleClick} onMouseDown={handleClick}>
        <input
          autoFocus
          ref={inputRef}
          onChange={handleChange}
          value={raceValue}
          className={style.hiddenInput}
          type="text"
        />
        <div className={style.raceInfoBlock}>
          <KbTextField sampleText={sampleText} currentIndex={currentIndex} currentLetterType={currentLetterType} />
          <Statistic speed={speed} inputErrors={inputErrors} isFinish={isFinish} />
        </div>
      </div>
    </>
  );
};
