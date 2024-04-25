import { MetroType } from "../types/MetroType";

export async function getMetros() {
  try {
    const response = await fetch(
      `http://localhost:8080/metros`,

      {
        method: "GET"
      },
    );

    const metros: MetroType[] = await response.json();
    return metros;

  } catch {
    console.log("не удается получить метро");
    return [];
  }
}