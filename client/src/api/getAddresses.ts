import { Address } from "../types/AddressType";

export async function getAddresses() {
  try {
    const response = await fetch(
      `http://localhost:8080/addresses`,

      {
        method: "GET"
      },
    );

    const res: {id: string, address: string}[] = await response.json();

    const addresses: Address[] = res.map((item) => {
      return {
        id: item.id,
        name: item.address
      }
    });
    return addresses;

  } catch {
    console.log("не удается получить адреса");
    return [];
  }
}