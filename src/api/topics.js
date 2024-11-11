const API_URL = "https://ismails-news.onrender.com/api";

export async function getTopics() {
  const res = await fetch(`${API_URL}/topics`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting topics");

  const { topics } = await res.json();

  return topics;
}
