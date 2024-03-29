export async function changeMark(idClient: string, idItem: string,  mark: number) {
  try {
    const response = await fetch(
      `http://localhost:8080/change/mark`,

      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          idClient,
          idItem,
          mark
        })
      },
    );

    return true;

  } catch {
    console.log("не удается изменить оценку");
    return false;
  }
}