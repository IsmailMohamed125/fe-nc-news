const API_URL = "https://ismails-news.onrender.com/api";

export async function getUser(username) {
  console.log(username, "api");
  const res = await fetch(`${API_URL}/users/${username}`);
  if (!res.ok) throw Error(`Couldn't find user #${username}`);

  const { user } = await res.json();
  console.log(user, "api");

  return user;
}
