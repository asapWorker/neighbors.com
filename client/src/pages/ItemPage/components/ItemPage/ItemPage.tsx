import { useParams } from "react-router-dom";
import { Item } from "../../../../modules/ItemModule"
import { useUser } from "../../../../contexts/useUserContext";

export const ItemPage = () => {
  const user = useUser();
  const { type, data } = useParams();
  return <Item user={user} type={type} baseData={JSON.parse(data)}/>
}