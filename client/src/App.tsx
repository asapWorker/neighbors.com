import styles from "./App.module.css";

import { MainPage } from "./pages/MainPage/index";
import { TopBar } from "./modules/TopBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUserData } from "./hooks/useUserData";
import { UserContextProvider } from "./contexts/useUserContext";
import { ItemPage } from "./pages/ItemPage";
import { EnterPage } from "./pages/EnterPage/components/EnterPage/EnterPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { PersonPage } from "./pages/PersonPage";

export const App = function() {
  const {user, isLookingForHouse, isLookingForPerson, changeUser} = useUserData();

  return <UserContextProvider user={user} changeUser={changeUser} isLookingForHouse={isLookingForHouse} isLookingForPerson={isLookingForPerson}>
    <div className={styles.app}>
      <BrowserRouter>
        <TopBar/>

        <Routes>
          <Route path={""} element={<MainPage/>}/>
          <Route path={"/"} element={<MainPage/>}/>
          <Route path={"/:user/item/:type/:data"} element={<ItemPage/>}/>
          <Route path={"/enter"} element={<EnterPage/>}/>
          <Route path={"/registrate"} element={<RegistrationPage/>}/>
          <Route path={"/personal account"} element={<PersonPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  </UserContextProvider>
}