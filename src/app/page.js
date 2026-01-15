"use client";

import { useState, useEffect, useRef } from "react";

export default function RSVPApp() {
  // State for the text input by user
  const [text, setText] = useState("");
  // Array of words split from the text
  const [words, setWords] = useState([]);
  // Current index of the word being displayed
  const [index, setIndex] = useState(0);
  // Words per minute speed setting
  const [wpm, setWpm] = useState(300);
  // Boolean to track if playback is active
  const [playing, setPlaying] = useState(false);
  // Dark mode toggle
  const [darkMode, setDarkMode] = useState(false);
  // Ref to store interval ID for clearing
  const intervalRef = useRef(null);

  // Effect to handle automatic word progression while playing
  useEffect(() => {
    if (!playing || words.length === 0) return;

    // Calculate interval duration in milliseconds based on WPM
    const interval = (60 * 1000) / wpm;

    intervalRef.current = setInterval(() => {
      setIndex((i) => {
        // Stop if last word is reached
        if (i >= words.length - 1) {
          clearInterval(intervalRef.current);
          setPlaying(false);
          return i;
        }
        return i + 1; // Move to next word
      });
    }, interval);

    // Cleanup interval on unmount or dependencies change
    return () => clearInterval(intervalRef.current);
  }, [playing, wpm, words]);

  // Start the RSVP playback
  const start = () => {
    const split = text.trim().split(/\s+/); // Split text into words
    setWords(split);
    setIndex(0);
    setPlaying(true);
  };

  // Toggle play/pause state
  const togglePlay = () => setPlaying((p) => !p);
  // Rewind one word
  const rewind = () => setIndex((i) => Math.max(0, i - 1));
  // Toggle dark mode state
  const toggleDarkMode = () => setDarkMode((d) => !d);

  // CSS classes for light/dark mode
  const bgClass = darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black';
  const cardClass = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black';
  const buttonClass = 'px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600';

  // Simple sun/moon icons using Unicode
  const SunIcon = () => <span>☀️</span>;
  const MoonIcon = () => <span>🌙</span>;

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${bgClass}`}>
      <div className={`w-full max-w-xl shadow-xl rounded-2xl ${cardClass} p-6 space-y-6`}>
        {/* Header with dark mode toggle */}
        <div className="relative flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-center">RSVP Speed Reader</h1>
          <div className="absolute right-0">
            <button onClick={toggleDarkMode} className="flex items-center gap-1 px-2 py-1 border rounded">
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        {/* Text input area */}
        <textarea
          className={`w-full h-32 border rounded-xl p-3 text-sm ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          placeholder="Paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Display area for RSVP words */}
        <div className="relative h-16 flex items-center justify-center overflow-hidden font-mono">
          {/* Vertical line indicator in the center */}
          <div className="absolute left-1/2 top-1 bottom-1 w-px bg-gray-400" />

          {/* Show current word if available */}
          {words[index] && (() => {
            const word = words[index];
            // Calculate Optimal Recognition Point (ORP) index roughly 40% into the word
            const orpIndex = Math.max(1, Math.floor(word.length * 0.4));
            const before = word.slice(0, orpIndex); // Letters before ORP
            const orpChar = word[orpIndex] || ""; // Red letter
            const after = word.slice(orpIndex + 1); // Letters after ORP

            return (
              <div
                className="absolute text-4xl font-bold whitespace-nowrap"
                style={{
                  // Center the word around the vertical line, nudge slightly left
                  transform: `translateX(calc(50% - ${before.length}ch - 0.5ch))`,
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  padding: '0 0.05ch'
                }}
              >
                <span>{before}</span>
                {/* Red letter at ORP */}
                <span className="text-red-500">{orpChar}</span>
                <span>{after}</span>
              </div>
            );
          })()}
        </div>

        {/* WPM slider */}
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

        {/* Playback controls */}
        <div className="flex gap-3 justify-center">
          <button onClick={start} className={buttonClass}>Start</button>
          <button onClick={togglePlay} className={buttonClass}>⏯️</button>
          <button onClick={rewind} className={buttonClass}>Back</button>
        </div>
      </div>
    </div>
  );
}
