import { User } from "../../../constants/constants";

export async function enter(form: FormData) {
  try {
    const response = await fetch(
      `http://localhost:8080/enter`,

      {
        method: "POST",
        body: form
      },
    );

    const data = await response.json()

    return {
      id: data.id,
      type: User[data.type],
      isLookingForHouse: data?.house,
      isLookingForPerson: data?.person
    }

  } catch {
    console.log("не удается войти");
    return null;
  }
}