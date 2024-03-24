import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const useMainBtnData = () => {
  const navigate = useNavigate();

  const handleMainClick = useCallback(() => {
    navigate("");
  }, [])

  return {
    handleMainClick
  }
}