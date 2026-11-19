import { useEffect, useState } from 'react';

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function hexToRgb(hex) {
  const num = parseInt(hex.slice(1), 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

export default function App() {
  const [value, setValue] = useState('#9921ff');

  const isValid = HEX_RE.test(value);
  const rgb = isValid ? hexToRgb(value) : null;
  // решение об ошибке принимаем только после ввода всех семи символов
  const isError = !isValid && value.length >= 7;

  useEffect(() => {
    if (isValid) {
      document.body.style.backgroundColor = hexToRgb(value);
    } else if (isError) {
      document.body.style.backgroundColor = '#e74c3c';
    }
  }, [value, isValid, isError]);

  return (
    <div className="container">
      <input
        type="text"
        className="input-field"
        placeholder="Введите код цвета..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        spellCheck={false}
      />
      <span className={`result${isError ? ' error' : ''}`}>
        {isError ? 'Ошибка!' : rgb}
      </span>
    </div>
  );
}
