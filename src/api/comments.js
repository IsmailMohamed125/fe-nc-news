const API_URL = "https://ismails-news.onrender.com/api";

export async function createComment(id, newComment) {
  console.log(id, newComment);
  try {
    const res = await fetch(`${API_URL}/articles/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { comment } = await res.json();
    return comment;
  } catch {
    throw Error("Failed creating your article");
  }
}
