export async function addNewItem(form: FormData) {
  try {
    const response = await fetch(
      `http://localhost:8080/new-item`,

      {
        method: "POST",
        body: form
      },
    );

    return true;

  } catch {
    console.log("не удается добавить новый объект");
    return false;
  }
}