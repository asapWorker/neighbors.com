import { useParams } from "react-router-dom";
import { Item } from "../../../../modules/ItemModule"

export const ItemPage = () => {
  const { user, type, data } = useParams();
  return <Item user={user} type={type} baseData={JSON.parse(data)}/>
}