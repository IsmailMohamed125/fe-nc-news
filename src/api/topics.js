const API_URL = "https://ismails-news.onrender.com/api";

export async function getTopics() {
  const res = await fetch(`${API_URL}/topics`);

  if (!res.ok) throw Error("Failed getting topics");

  const { topics } = await res.json();

  return topics;
}
