async function changeFieldData(item: string, id: string, field: string, value: any) {
  try {
    const response = await fetch(
      `http://localhost:8080/item/change/?` + new URLSearchParams({ item, id, field }),

      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(value)
      },
    );

    return true;

  } catch {
    console.log("не удается изменить поле");
    return false;
  }
}

