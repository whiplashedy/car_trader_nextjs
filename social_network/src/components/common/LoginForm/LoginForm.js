import styles from "./LoginForm.module.css"
import {Field, Form, Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import {Checkbox} from "@material-ui/core";
import * as yup from "yup";

const myValidationSchema = yup.object({
    email: yup.string().required('Required email').email('Invalid email format'),
    password: yup.string().required('Required password').min(8)
})

let LoginForm = (props) => {
    return (
        <div className={styles.loginForm}>
            <h4>login</h4>
            <Formik initialValues={{email: '', password: '', doSave: false, showPassword: false}} validationSchema={myValidationSchema}
                    onSubmit={(data, {setSubmitting, resetForm}) => {
                        setSubmitting(true);
                        console.log(data.email, data.password, data.doSave)
                        props.login(data.email, data.password)
                        console.log("send")
                        setSubmitting(false);
                        resetForm({});
                    }}>
                {
                    ({values, isSubmitting, handleChange, handleBlur, handleSubmit, errors, touched}) => (
                        <Form onSubmit={handleSubmit}>
                            <div>
                                <Field
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="email"
                                    as={TextField}/>
                                {
                                    errors.email && touched.email ? (<div className={styles.errors}>{errors.email}</div>) : null
                                }

                            </div>
                            <div className={styles.password}>
                                <Field
                                    name="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="password"
                                    as={TextField}/>
                                {
                                    errors.password && touched.password ? (<div className={styles.errors}>{errors.password}</div>) : null
                                }
                                <label className={styles.showPassword}><Field name="showPassword" type="checkbox" as={Checkbox}/>Показать пароль</label>
                            </div>
                            <div className={styles.doSave}>
                                <Field name="doSave" type="checkbox" as={Checkbox}/>Запомнить
                                данные?
                            </div>
                            <div>
                                <Button disabled={isSubmitting} type="submit">submit</Button>
                            </div>
                            <div className={styles.errors}>{props.errorMessage}</div>
                        </Form>
                    )
                }
            </Formik>
        </div>)
}

export default LoginForm;
