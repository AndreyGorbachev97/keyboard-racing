import React from 'react';
import style from './KbTextField.scss';

interface KbTextFieldProps {
  sampleText: string;
  currentIndex: number;
  currentLetterType: string;
}

export const KbTextField: React.FC<KbTextFieldProps> = ({ sampleText, currentIndex, currentLetterType }) => {
  const currentLetterClass = currentLetterType === 'success' ? style.kbGreen : style.kbRed;
  return (
    <div className={style.textField}>
      {sampleText.split('').map((char, i) => (
        <span
          className={`${style.kb} ${i < currentIndex ? style.kbSuccess : i === currentIndex ? currentLetterClass : ''}`}
          key={i}
        >
          {char}
        </span>
      ))}
    </div>
  );
};
