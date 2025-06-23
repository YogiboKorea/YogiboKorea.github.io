// ContactModal.js
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  position: relative;
  width: 80%;
  max-width: 1200px;
  padding: 40px;
  box-sizing: border-box;
  color: #fff;

  @media (max-width: 768px) {
    width: 90%;
    padding: 20px;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 20px; right: 20px;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 480px) {
    top: 10px; right: 10px;
    font-size: 20px;
  }
`;

const Title2 = styled.h1`
  margin: 0;
  font-size: 100px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 768px) { font-size: 48px; }
  @media (max-width: 480px) { font-size: 36px; }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 72px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 768px) { font-size: 48px; }
  @media (max-width: 480px) { font-size: 36px; }
`;

const Subtitle = styled.p`
  margin: 10px 0 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 768px) { font-size: 16px; margin-bottom: 20px; }
`;

const Form = styled.form`
  width: 100%;
`;

const Columns = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Right = styled.div`
  flex: 1;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-size: 16px;
  background: #222;
  color: #fff;

  &::placeholder {
    color: #999;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
  }
`;

/* ── 첨부파일 전용 스타일 ── */
const FileInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const FileDisplayInput = styled.input`
  width: 100%;
  padding: 15px;
  padding-right: 130px;       /* 버튼 자리 확보 */
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  color: #333;
  font-size: 16px;

  &::placeholder {
    color: #888;
  }

  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 260px;
  padding: 15px;
  box-sizing: border-box;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  background: #222;
  color: #fff;

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    height: 180px;
    font-size: 14px;
    padding: 12px;
  }
`;

const SendButton = styled.button`
  display: block;
  margin: 40px auto 0;
  padding: 15px 60px;
  background: transparent;
  border: 1px solid #fff;
  font-size: 20px;
  cursor: pointer;
  color:#fff;

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 0;
    font-size: 18px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
    margin-top: 20px;
  }
`;

export default function ContactModal({ onClose = () => {} }) {
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyName, setCompanyName]   = useState('');
  const [file, setFile]                 = useState(null);
  const [fileName, setFileName]         = useState('');
  const [message, setMessage]           = useState('');
  const fileInputRef                    = useRef(null);

  const handleFileClick = () => fileInputRef.current.click();
  const handleFileChange = e => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!companyEmail) {
      alert('Company Email is required.');
      return;
    }

      const formData = new FormData();
      formData.append('companyEmail',  companyEmail);        // companyEmail → company
      formData.append('companyName',  companyName);         // companyName → contact
      formData.append('url',      '');                  // URL 필드를 빼지 않으려면 빈 스트링이라도 보내주세요


      if (file) formData.append('attachment', file);
        formData.append('message',  message);
    try {
      await axios.post(
        'https://port-0-ychat-lzgmwhc4d9883c97.sel4.cloudtype.app/send-email',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert('Your request has been sent!');
      onClose();
    } catch (err) {
      console.error('전송 오류:', err);
      alert('Send failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Overlay>
      <Modal>
        <Title2>ON</Title2>
        <Title>CONTACT</Title>
        <Subtitle>Yogico.kr Renewal</Subtitle>

        <Form onSubmit={handleSubmit}>
          <Columns>
            <Left>
              <StyledInput
                type="email"
                placeholder="Company Email *"
                value={companyEmail}
                onChange={e => setCompanyEmail(e.target.value)}
                required
              />
              <StyledInput
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
              />
              <FileInputWrapper>
                <FileDisplayInput
                  readOnly
                  placeholder="Attach a file"
                  value={fileName}
                  onClick={handleFileClick}
                />
                <SearchButton type="button" onClick={handleFileClick}>
                  Choose File
                </SearchButton>
                <HiddenFileInput
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </FileInputWrapper>
            </Left>
            <Right>
              <StyledTextarea
                placeholder="Describe your collaboration request"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </Right>
          </Columns>
          <SendButton type="submit" >SEND</SendButton>
        </Form>
      </Modal>
    </Overlay>
  );
}
