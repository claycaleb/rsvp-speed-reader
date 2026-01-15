"use client";

import { useState, useEffect, useRef } from "react";

export default function RSVPApp() {
  const [text, setText] = useState("");
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [wpm, setWpm] = useState(300);
  const [playing, setPlaying] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!playing || words.length === 0) return;

    const interval = (60 * 1000) / wpm;

    intervalRef.current = setInterval(() => {
      setIndex((i) => {
        if (i >= words.length - 1) {
          clearInterval(intervalRef.current);
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, interval);

    return () => clearInterval(intervalRef.current);
  }, [playing, wpm, words]);

  const start = () => {
    const split = text.trim().split(/\s+/);
    setWords(split);
    setIndex(0);
    setPlaying(true);
  };

  const togglePlay = () => setPlaying((p) => !p);
  const rewind = () => setIndex((i) => Math.max(0, i - 1));
  const toggleDarkMode = () => setDarkMode((d) => !d);

  const bgClass = darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black';
  const cardClass = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black';
  const buttonClass = 'px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600';

  // Simple sun/moon icons using Unicode characters to avoid external dependencies
  const SunIcon = () => <span>☀️</span>;
  const MoonIcon = () => <span>🌙</span>;

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${bgClass}`}>
      <div className={`w-full max-w-xl shadow-xl rounded-2xl ${cardClass} p-6 space-y-6`}>
        <div className="relative flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-center">RSVP Speed Reader</h1>
          <div className="absolute right-0">
            <button onClick={toggleDarkMode} className="flex items-center gap-1 px-2 py-1 border rounded">
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        <textarea
          className={`w-full h-32 border rounded-xl p-3 text-sm ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          placeholder="Paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="relative h-16 flex items-center justify-center overflow-hidden font-mono">
          <div className="absolute left-1/2 top-1 bottom-1 w-px bg-gray-400" />

          {words[index] && (() => {
            const word = words[index];
            const orpIndex = Math.max(1, Math.floor(word.length * 0.4));
            const before = word.slice(0, orpIndex);
            const orpChar = word[orpIndex] || "";
            const after = word.slice(orpIndex + 1);

            return (
              <div
                className="absolute text-4xl font-bold whitespace-nowrap"
                style={{
                  transform: `translateX(calc(50% - ${before.length}ch - 0.7ch))`,
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  padding: '0 0.05ch'
                }}
              >
                <span>{before}</span>
                <span className="text-red-500">{orpChar}</span>
                <span>{after}</span>
              </div>
            );
          })()}
        </div>

        <div className="space-y-2">
          <label className="text-sm">Words per minute: {wpm}</label>
          <input
            type="range"
            min={100}
            max={1000}
            step={25}
            value={wpm}
            onChange={(e) => setWpm(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={start} className={buttonClass}>Start</button>
          <button onClick={togglePlay} className={buttonClass}>Play</button>
          <button onClick={rewind} className={buttonClass}>Back</button>
        </div>
      </div>
    </div>
  );
}
