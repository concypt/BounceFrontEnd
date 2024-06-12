// src/Modal.js
import { useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 80%;
  max-width: 800px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  flex: ${({ size }) => size};
  padding: 20px;

  @media (max-width: 767px) {
    flex: 1;
  }
`;

const Button = styled.button`
  margin: 20px;
`;

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="header_btn">
        <button href="#" className="global_button_one" onClick={toggleModal}>
          <span>Secure your ticket</span>
        </button>
      </div>
      {/* <Button onClick={toggleModal}>Open Modal</Button> */}
      {isModalOpen && (
        <ModalBackground onClick={toggleModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <Column size="7">
              <h2>70% Column</h2>
              <p>This is the 70% width column content.</p>
            </Column>
            <Column size="3">
              <h2>30% Column</h2>
              <p>This is the 30% width column content.</p>
            </Column>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

export default Modal;
