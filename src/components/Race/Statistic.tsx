import React from 'react';

interface StatisticProps {
  speed: number;
  inputErrors: number;
  isFinish: boolean;
}

export const Statistic: React.FC<StatisticProps> = ({ speed, inputErrors, isFinish }) => {
  return (
    <div>
      <div>{isFinish ? 'Финиш!' : 'Гонка началась!'}</div>
      <div>Скорость: {speed}</div>
      <div>Количетсво ошибок: {inputErrors}</div>
    </div>
  );
};
