const API_URL = "https://ismails-news.onrender.com/api";

export async function getArticles(queries) {
  let queryStr = `${API_URL}/articles?limit=6`;
  if (queries) queryStr = queryStr + queries;
  const res = await fetch(queryStr);

  if (!res.ok) throw Error("Failed getting articles");

  const { articles } = await res.json();

  return articles;
}

export async function getArticle(id) {
  const res = await fetch(`${API_URL}/articles/${id}`);
  if (!res.ok) throw Error(`Couldn't find article #${id}`);

  const { article } = await res.json();

  return article;
}

export async function getArticleComments(id) {
  const res = await fetch(`${API_URL}/articles/${id}/comments`);
  if (!res.ok) throw Error(`Couldn't find comments on article #${id}`);

  const { comments } = await res.json();
  return comments;
}

export async function createArticle(newArticle) {
  try {
    const res = await fetch(`${API_URL}/articles`, {
      method: "POST",
      body: JSON.stringify(newArticle),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { article } = await res.json();
    return article[0];
  } catch {
    throw Error("Failed creating your article");
  }
}

export async function updateArticle(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/articles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error("Failed updating your article");
  }
}

export async function getUserArticles() {
  let queryStr = `${API_URL}/articles`;
  const res = await fetch(queryStr);

  if (!res.ok) throw Error("Failed getting articles");

  const { articles } = await res.json();

  return articles;
}
