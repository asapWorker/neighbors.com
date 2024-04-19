export async function changeFieldData(item: string, itemData: any, field: string, value: any) {
  try {
    const response = await fetch(
      `http://localhost:8080/item/change/?` + new URLSearchParams({ item, field }),

      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          itemData,
          value
        })
      },
    );

    return true;

  } catch {
    console.log("не удается изменить поле");
    return false;
  }
}

