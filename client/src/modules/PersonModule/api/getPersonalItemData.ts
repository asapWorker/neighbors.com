export async function getPersonalItemData(id: string) {
  const response = await fetch(
    `http://localhost:8080/person/item?` + new URLSearchParams({ id }),

    {
      method: "GET"
    },
  );

  let result = await response.json();

  return result;
}