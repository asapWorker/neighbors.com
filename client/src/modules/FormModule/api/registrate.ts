export async function registrate(form: FormData) {
  try {
    const response = await fetch(
      `http://localhost:8080/registrate`,

      {
        method: "POST",
        body: form
      },
    );

    return  true;

  } catch {
    console.log("не удается зарегестрироваться");
    return null;
  }
}