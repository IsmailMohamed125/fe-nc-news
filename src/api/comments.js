const API_URL = "https://ismails-news.onrender.com/api";

export async function createComment(id, newComment) {
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
    throw Error("Failed creating your comment");
  }
}

export async function patchComment(id, vote) {
  try {
    const res = await fetch(`${API_URL}/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(vote),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
    const { comment } = await res.json();
    return comment;
  } catch {
    throw Error("Failed creating your comment");
  }
}

export async function deleteComment(id) {
  try {
    const res = await fetch(`${API_URL}/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
    // const { comment } = await res.json();
    return null;
  } catch {
    throw Error("Failed deleting your comment");
  }
}
