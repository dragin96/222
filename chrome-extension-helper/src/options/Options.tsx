import { useEffect, useState } from 'react';
import { loadSettings, saveSettings } from '../utils/storage';
import type { Settings } from '../types';

export function Options() {
  const [form, setForm] = useState<Settings>({ apiUrl: '', token: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    loadSettings().then((settings) => {
      if (settings) setForm(settings);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings(form);
    setStatus('Saved');
  };

  return (
    <form onSubmit={handleSave}>
      <label>
        API URL:
        <input name="apiUrl" value={form.apiUrl} onChange={handleChange} />
      </label>
      <label>
        Token:
        <input name="token" value={form.token} onChange={handleChange} />
      </label>
      <button type="submit">Save</button>
      {status && <span>{status}</span>}
    </form>
  );
}

export default Options;
