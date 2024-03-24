export async function getBoundedItemsList() {
  const response = await fetch(
    `http://localhost:8080/bounded?`,

    {
      method: "GET",
    }
  );

  let result = await response.json();

  return result;
}