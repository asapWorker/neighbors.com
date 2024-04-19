import { Mark } from "../types/Mark";

export async function getMarks(id: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/marks/?` + new URLSearchParams({ id }),

      {
        method: "GET"
      },
    );

    const res = await response.json();
    const marks: Mark[] = res.map((item: any) => {
      return {id: item.id, name: item.name, isPerson: item.isPerson, mark: item.rating}
    })

    return marks;

  } catch {
    console.log("не удается получить оценки");
    return null;
  }
}