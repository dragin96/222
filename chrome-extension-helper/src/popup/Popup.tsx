import { useEffect, useState } from 'react';
import { loadSettings } from '../utils/storage';

export function Popup() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    loadSettings().then((settings) => {
      if (settings) {
        setMessage(`Settings loaded: ${JSON.stringify(settings)}`);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;
    try {
      const res = await fetch(url, { method: 'GET' });
      const text = await res.text();
      setResponse(text.slice(0, 100));
    } catch (err) {
      setResponse(`Error: ${String(err)}`);
    }
  };

  return (
    <div>
      <h1>Helper</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="url" placeholder="Request URL" />
        <button type="submit">Send</button>
      </form>
      {response && <pre>{response}</pre>}
    </div>
  );
}

export default Popup;
