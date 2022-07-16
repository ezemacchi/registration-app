import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Account from '../models/Account';
import { saveAccount } from '../services/AccountService';

type Props = {}

type Values = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAndConditionFlag: boolean;
}

const Registration = (props: Props) => {

  var saveValues = (values: Values) => {
    saveAccount(values);
  }

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          termsAndConditionFlag: false
        }}
        validationSchema={
          Yup.object({
            username: Yup.string()
              .min(3, "The username must have at least 3 characters")
              .required("The username is required"),
            email: Yup.string()
              .email("Write a valid email address")
              .required("The email is required"),
            password: Yup.string()
              .min(8, "At leats 4 char")
              .required("The password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], "Password must match"),
            termsAndConditionFlag: Yup.boolean()
              .default(false)
              .oneOf([true], "Must accept Terms and Conditions")
          })}
        onSubmit={(
          values: Values,
          { setSubmitting }
        ) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <Form>
            <div className='form-group mt-2'>
              <label htmlFor='username'>Username:</label>
              <Field
                id='username'
                className={formik.touched.username && formik.errors.username ? 'form-control is-invalid' : 'form-control'}
                name='username'
                type="text" />
              {formik.touched.username && formik.errors.username ? <div className='invalid-feedback d-block'>{formik.errors.username}</div> : null}
            </div>

            <div className='form-group mt-2'>
              <label htmlFor='email'>Email:</label>
              <Field
                id='email'
                className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control'}
                name='email'
                type="text" />
                {formik.touched.email && formik.errors.email ? <p className='invalid-feedback d-block'>{formik.errors.email}</p> : null}
            </div>

            <div className='form-group mt-2'>
              <label htmlFor='password'>Password:</label>
              <Field
                id='password'
                className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'}
                name='password'
                type="password" />
                {formik.touched.password && formik.errors.password ? <p className='invalid-feedback d-block'>{formik.errors.password}</p> : null}
            </div>

            <div className='form-group mt-2'>
              <label htmlFor='confirmPassword'>Confirm password:</label>
              <Field
                id='confirmPassword'
                className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                name='confirmPassword'
                type="password" />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className='invalid-feedback d-block'>{formik.errors.confirmPassword}</p> : null}
            </div>

            <div className='form-group form-check mt-2'>
              <label htmlFor='termsAndConditionFlag'>I agree with terms and conditions:</label>
              <Field
                id='termsAndConditionFlag'
                className={formik.touched.termsAndConditionFlag && formik.errors.termsAndConditionFlag ? 'form-check-input is-invalid' : 'form-check-input'}
                name='termsAndConditionFlag'
                type="checkbox" />
                {formik.touched.termsAndConditionFlag && formik.errors.termsAndConditionFlag ? <p className='invalid-feedback d-block'>{formik.errors.termsAndConditionFlag}</p> : null}
            </div>

            <div className='d-flex justify-content-center form-group mt-4'>
              <label></label>
              <button type="submit" className='btn btn-primary' disabled={!formik.isValid}>Register</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Registration;