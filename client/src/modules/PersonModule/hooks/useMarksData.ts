import { useCallback, useEffect, useState } from "react"
import { changeMark } from "../api/changeMark";
import { getMarks } from "../api/getMarks";
import { Mark } from "../types/Mark";

export const useMarksData = (id: string) => {
  const [defaultMarksList, setDefaultMarksList] = useState<Mark[] | null>(null);

  useEffect(() => {
    if (!id || id == "") return;
    
    getMarks(id).then((data) => {
      console.log(data);
      setDefaultMarksList(data);
    }).catch(() => {
      console.log("Оценки не получены");
    })
  }, [id])

  const markSaveHandle = useCallback((ind: number, val: number) => {
    const isConfirmed = confirm(
      "Вы действительно хотите изменить оценку?"
    );
    if (!isConfirmed) return false;
    
    changeMark(id, defaultMarksList[ind].id, val).catch(() => {
      console.log("Ошибка при изменении оценки");
    })

    return true;
  }, [defaultMarksList])

  return {
    defaultMarksList,
    markSaveHandle
  }
}