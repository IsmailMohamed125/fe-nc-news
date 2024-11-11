const API_URL = "https://ismails-news.onrender.com/api";

export async function getArticles(queries) {
  console.log(queries, "quer");
  let queryStr = `${API_URL}/articles?limit=6`;
  if (queries) queryStr = queryStr + queries;
  console.log(queryStr, "str");
  const res = await fetch(queryStr);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
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
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your article");
  }
}

export async function createCommentOnArticle(id, newComment) {
  try {
    const res = await fetch(`${API_URL}/articles/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
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
    // We don't need the data, so we don't return anything
  } catch (err) {
    console.log(err);
    throw Error("Failed updating your order");
  }
}
