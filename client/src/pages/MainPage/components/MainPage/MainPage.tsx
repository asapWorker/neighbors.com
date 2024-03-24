import { FilterModule } from "../../../../modules/FilterModule/index";
import { List } from "../../../../modules/ItemListModule/index";
import { ListControlModule } from "../../../../modules/ListControlModule/index";
import { useMainPageData } from "../../hooks/useMainPageData";
import styles from "./MainPage.module.css";
import { FunctionComponent } from "react";


export const MainPage: FunctionComponent = () => {
  const {
    isHouse,
    isFilter,
    filterSettings,
    changeList,
    openFilter,
    setFilterSettingsAndClose,
  } = useMainPageData();

  return (
    <main className={styles["main-page"]}>
      <ListControlModule
        isHouse={isHouse}
        changeList={changeList}
        openFilter={openFilter}
      />
      <List isHouse={isHouse} filterSettings={filterSettings}/>

      {isFilter && (
        <FilterModule
          isHouse={isHouse}
          setFilterSettings={setFilterSettingsAndClose}
        />
      )}
    </main>
  );
};
