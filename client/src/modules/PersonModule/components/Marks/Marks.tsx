import { FunctionComponent } from "react";
import { EditableText } from "../../../../UI/EditableText/EditableText";
import { useMarksData } from "../../hooks/useMarksData";
import styles from "./Marks.module.css";
import { Mark } from "../../types/Mark";
import { Text, TextType } from "../../../../UI/Text/Text";

interface MarksProps {
  id: string;
}

export const Marks: FunctionComponent<MarksProps> = ({ id }) => {
  const { defaultMarksList, markSaveHandle } = useMarksData(id);

  if (!defaultMarksList) {
    return null;
  }

  return <div className={styles.marks}>
    <div className={styles.title}>Ваши оценки:</div>
    <div className={styles["marks-container"]}>
      {defaultMarksList.map((data: Mark, ind: number) => {
        return (
          <div key={ind}>
            <EditableText
              isEditable={true}
              isWithRating={true}
              saveChanges={markSaveHandle.bind(this, ind)}
              options={[data.name]}
              areMark={true}
            >
              <Text type={TextType.Normal}>{data.name}</Text>
              {data.mark}
            </EditableText>
          </div>
        );
      })}
    </div>
  </div>;
};
