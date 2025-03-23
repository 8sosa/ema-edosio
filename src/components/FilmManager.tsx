"use client";

import { useState, useEffect } from "react";

type Film = {
  id: string;
  title: string;
  synopsis: string;
};

export default function FilmManager() {
  const [films, setFilms] = useState<Film[]>([]);
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch films when the component mounts
  useEffect(() => {
    async function fetchFilms() {
      try {
        const res = await fetch("/api/films");
        const data = await res.json();
        setFilms(data.films);
      } catch (error) {
        console.error("Error fetching films", error);
      }
    }
    fetchFilms();
  }, []);

  const addFilm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/films", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, synopsis }),
      });

      if (!res.ok) {
        throw new Error("Failed to add film");
      }

      const data = await res.json();
      setFilms((prev) => [...prev, data.film]);
      setTitle("");
      setSynopsis("");
    } catch (error: any) {
      setErrorMsg(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Manage Films</h2>
      <form onSubmit={addFilm} className="mb-4">
        <div className="mb-2">
          <label className="block font-semibold">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Synopsis:</label>
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Adding..." : "Add Film"}
        </button>
      </form>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <div>
        <h3 className="text-xl font-bold mb-2">Existing Films:</h3>
        {films.length === 0 ? (
          <p>No films found.</p>
        ) : (
          <ul>
            {films.map((film) => (
              <li key={film.id} className="border-b border-gray-300 py-2">
                <h4 className="font-bold">{film.title}</h4>
                <p>{film.synopsis}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
