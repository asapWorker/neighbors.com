import styles from "./FormModule.module.css";
import classnames from "classnames";

import { FunctionComponent } from "react";
import { useFormData } from "../../hooks/useFormData";
import { Text, TextType } from "../../../../UI/Text/Text";
import { Btn } from "../../../../UI/Btn/Btn";
import { RadioField } from "../../../../UI/RadioField/RadioField";
import {
  YesNoAnswers,
  attitudesTowardSmoking,
  houseTypes,
  personSexes,
  sexes,
} from "../../../../constants/constants";
import { TextField, TextFieldType } from "../../../../UI/TextField/TextField";

export const enum FormType {
  Enter = "enter",
  Registration = "registration",
  NewAnnouncement = "New announcement"
}

interface FormModuleProps {
  type: FormType;
  reportAboutSubmit?: () => void;
}

export const FormModule: FunctionComponent<FormModuleProps> = ({
  type,
  reportAboutSubmit = () => {}
}) => {
  const {
    formRef,
    isFilled,
    submitChanges,
    goToRegistration,
    signUp,
    isHouse,
    targetChangeHandle,
  } = useFormData(type === FormType.NewAnnouncement, reportAboutSubmit);

  if (type === FormType.Enter) {
    return (
      <form
        id="form"
        ref={formRef}
        className={classnames(
          styles.form,
          styles.enter
        )}
      >
        <div className={styles.container}>
          <h3 className={styles.title}>Вход</h3>

          <TextField name="login" isMessage={!isFilled}>
            <Text type={TextType.Bold}>Логин:</Text>
          </TextField>

          <TextField
            name="password"
            isMessage={!isFilled}
            type={TextFieldType.Password}
          >
            <Text type={TextType.Bold}>Пароль:</Text>
          </TextField>
        </div>

        <div className={styles["btns-container"]}>
          <Btn isSubmit={true} onClickHandle={submitChanges.bind(this)}>
            Войти
          </Btn>

          <Btn
            style={styles["registration-btn"]}
            onClickHandle={goToRegistration.bind(this)}
          >
            Регистрация
          </Btn>
        </div>
      </form>
    );
  } else {
    return (
      <form
        id="form"
        ref={formRef}
        className={classnames(
          styles.form,
          styles.registration
        )}
      >
        <div className={styles.container}>
          <h3 className={styles.title}>
            {(type === FormType.NewAnnouncement) ? "Новое объявление" : "Регистрация"}
          </h3>

          {(type === FormType.Registration) && <>
            <TextField name="login" isMessage={!isFilled}>
              <Text type={TextType.Bold}>Логин:</Text>
            </TextField>

            <TextField
              name="password"
              isMessage={!isFilled}
              type={TextFieldType.Password}
            >
              <Text type={TextType.Bold}>Пароль:</Text>
            </TextField>

            <TextField name="name" isMessage={!isFilled}>
              <Text type={TextType.Bold}>Имя:</Text>
            </TextField>

            <TextField
              name="age"
              isMessage={!isFilled}
              type={TextFieldType.Number}
            >
              <Text type={TextType.Bold}>Возраст:</Text>
            </TextField>

            <RadioField radios={personSexes} name="sex">
              <Text type={TextType.Bold}>Пол:</Text>
            </RadioField>
          </>}

          <div className={styles.target}>
            <Text type={TextType.Bold}>Ищу:</Text>
            <div className={styles["target-options"]}>
              <label htmlFor="target-house" className={styles.label}>
                <input
                  className={styles.input}
                  type="radio"
                  name="target"
                  value="target-house"
                  id="target-house"
                  form="form"
                  onChange={targetChangeHandle.bind(this)}
                  defaultChecked={true}
                />
                жилье
              </label>

              <label htmlFor="target-person" className={styles.label}>
                <input
                  className={styles.input}
                  type="radio"
                  name="target"
                  value="target-person"
                  id="target-person"
                  form="form"
                  onChange={targetChangeHandle.bind(this)}
                />
                соседа
              </label>
            </div>
          </div>

          {!isHouse && (
            <>
              <TextField name="address" isMessage={!isFilled}>
                <Text type={TextType.Bold}>Адресс:</Text>
              </TextField>

              <TextField name="metro" isMessage={!isFilled}>
                <Text type={TextType.Bold}>Метро:</Text>
              </TextField>

              <TextField
                name="money"
                isMessage={!isFilled}
                type={TextFieldType.Number}
              >
                <Text type={TextType.Bold}>Плата:</Text>
              </TextField>

              <RadioField radios={sexes} name="sex">
                <Text type={TextType.Bold}>Пол:</Text>
              </RadioField>

              <RadioField radios={houseTypes} name="house-type">
                <Text type={TextType.Bold}>Тип:</Text>
              </RadioField>

              <RadioField radios={YesNoAnswers} name="allowed-smoking">
                <Text type={TextType.Bold}>Разрешено курение:</Text>
              </RadioField>
            </>
          )}

          {isHouse && (
            <>
              <TextField
                name="money"
                isMessage={!isFilled}
                type={TextFieldType.Number}
              >
                <Text type={TextType.Bold}>Бюджет:</Text>
              </TextField>

              <RadioField
                radios={attitudesTowardSmoking}
                name="attitude-toward-smoking"
              >
                <Text type={TextType.Bold}>Отношение к курению:</Text>
              </RadioField>
            </>
          )}
        </div>

        <div className={styles["btns-container"]}>
          <Btn isSubmit={true} onClickHandle={signUp.bind(this)}>
            Готово
          </Btn>
        </div>
      </form>
    );
  }
};
