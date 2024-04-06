import { Mark } from "../types/Mark";

export async function getMarks(id: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/marks/?` + new URLSearchParams({ id }),

      {
        method: "GET"
      },
    );

    const marks: Mark[] = await response.json();

    return marks;

  } catch {
    console.log("не удается получить оценки");
    return null;
  }
}