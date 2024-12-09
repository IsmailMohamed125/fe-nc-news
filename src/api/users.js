const API_URL = "https://ismails-news.onrender.com/api";

export async function getUser(username) {
  const res = await fetch(`${API_URL}/users/${username}`);
  if (!res.ok) throw Error(`Couldn't find user #${username}`);

  const { user } = await res.json();

  return user;
}
