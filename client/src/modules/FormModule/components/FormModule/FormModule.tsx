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
import { SelectField } from "../../../../UI/SelectField/SelectField";
import { Form } from "react-router-dom";

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
    addresses,
    metros
  } = useFormData(type === FormType.NewAnnouncement, reportAboutSubmit);

  if (type !== FormType.NewAnnouncement) {
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
          <h3 className={styles.title}>{type === FormType.Registration ? "Регистрация" : "Вход"}</h3>

          <TextField name="login" isMessage={!isFilled} form="form">
            <Text type={TextType.Bold}>Логин:</Text>
          </TextField>

          <TextField
            name="password"
            isMessage={!isFilled}
            type={TextFieldType.Password}
            form="form"
          >
            <Text type={TextType.Bold}>Пароль:</Text>
          </TextField>
        </div>

        <div className={styles["btns-container"]}>
          <Btn isSubmit={true} onClickHandle={(type === FormType.Registration) ? signUp.bind(this) : submitChanges.bind(this)}>
            {type === FormType.Registration ? "Готово" : "Вход"}
          </Btn>

          {type === FormType.Enter && <Btn
            style={styles["registration-btn"]}
            onClickHandle={goToRegistration.bind(this)}
          >
            Регистрация
          </Btn>}
        </div>
      </form>
    );
  } else {
    return (
      <form
        id={isHouse ? "house" : "person"}
        ref={formRef}
        className={classnames(
          styles.form,
          styles.registration
        )}
      >
        <div className={styles.container}>
          <h3 className={styles.title}>
            Новое объявление
          </h3>

          <div className={styles.target}>
            <Text type={TextType.Bold}>Ищу:</Text>
            <div className={styles["target-options"]}>
              <label htmlFor="target-person" className={styles.label}>
                <input
                  className={styles.input}
                  type="radio"
                  name="target"
                  value="house"
                  id="target-person"
                  form={isHouse ? "house" : "person"}
                  onChange={targetChangeHandle.bind(this)}
                  defaultChecked={true}
                />
                соседа
              </label>

              <label htmlFor="target-house" className={styles.label}>
                <input
                  className={styles.input}
                  type="radio"
                  name="target"
                  value="person"
                  id="target-house"
                  form={isHouse ? "house" : "person"}
                  onChange={targetChangeHandle.bind(this)}
                />
                жилье
              </label>
            </div>
          </div>

          {!isHouse && (
            <>
              <SelectField options={addresses} name="address" form="person">
                <Text type={TextType.Bold}>Адресс:</Text>
              </SelectField>

              <SelectField name="metro" options={metros} form="person">
                <Text type={TextType.Bold}>Метро:</Text>
              </SelectField>

              <TextField
                name="money"
                isMessage={!isFilled}
                type={TextFieldType.Number}
                form="person"
              >
                <Text type={TextType.Bold}>Плата:</Text>
              </TextField>

              <RadioField radios={sexes} name="sex" form="person">
                <Text type={TextType.Bold}>Пол:</Text>
              </RadioField>

              <RadioField radios={houseTypes} name="type" form="person">
                <Text type={TextType.Bold}>Тип:</Text>
              </RadioField>

              <RadioField radios={YesNoAnswers} name="smoking" form="person">
                <Text type={TextType.Bold}>Разрешено курение:</Text>
              </RadioField>

              <RadioField radios={YesNoAnswers} name="animals" form="person">
                <Text type={TextType.Bold}>Разрешены животные:</Text>
              </RadioField>
            </>
          )}

          {isHouse && (
            <>
              <TextField name="name" isMessage={!isFilled} form="house">
                <Text type={TextType.Bold}>Имя:</Text>
              </TextField>

              <TextField
                name="age"
                isMessage={!isFilled}
                type={TextFieldType.Number}
                form="house"
              >
                <Text type={TextType.Bold}>Возраст:</Text>
              </TextField>

              <RadioField radios={personSexes} name="sex" form="house">
                <Text type={TextType.Bold}>Пол:</Text>
              </RadioField>

              <TextField
                name="money"
                isMessage={!isFilled}
                type={TextFieldType.Number}
                form="house"
              >
                <Text type={TextType.Bold}>Бюджет:</Text>
              </TextField>

              <RadioField
                radios={attitudesTowardSmoking}
                name="smoking"
                form="house"
              >
                <Text type={TextType.Bold}>Отношение к курению:</Text>
              </RadioField>

              <RadioField radios={YesNoAnswers} name="animals" form="house">
                <Text type={TextType.Bold}>Есть животные:</Text>
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
