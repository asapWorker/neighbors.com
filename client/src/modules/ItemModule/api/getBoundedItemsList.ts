import { BoundedItem } from "../types/BoundedItem";

export async function getBoundedItemsList() {
  const response = await fetch(
    `http://localhost:8080/bounded?`,

    {
      method: "GET",
    }
  );

  const res: {id: string; login: string}[] = await response.json();
  const boundedItems: BoundedItem[] = res.map((item) => {
    return {
      id: item.id,
      name: item.login
    }
  })

  return boundedItems;
}