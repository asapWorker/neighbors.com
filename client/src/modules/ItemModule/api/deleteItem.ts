async function deleteItemInfo(item: string, id: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/item/delete/?` + new URLSearchParams({ item, id }),

      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      },
    );

    return true;

  } catch {
    console.log("не удается удалить объект");
    return false;
  }
}