import React, { useState } from 'react';
import styles from './RegisterModal.scss';

interface RegisterModalProps {
  registerUser: (name: string) => void;
  getRooms: () => void;
}
export const RegisterModal: React.FC<RegisterModalProps> = ({ registerUser, getRooms }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [name, setName] = useState<string>('');

  const register = () => {
    if (name) {
      registerUser(name);
      setIsModalOpen(false);
      getRooms();
    }
  };

  return (
    <div>
      {/* <button onClick={handleOpenModal}>Открыть модальное окно</button> */}
      <div className={`${styles.modalBackground} ${isModalOpen ? styles.modalShow : ''}`}>
        <div className={styles.modalContent}>
          <h2>Модальное окно</h2>
          <p>Это простое модальное окно с использованием HTML и CSS.</p>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" />
          <button onClick={register}>Зарегестрироваться</button>
          {/* <button onClick={handleCloseModal}>Закрыть окно</button> */}
        </div>
      </div>
    </div>
  );
};
