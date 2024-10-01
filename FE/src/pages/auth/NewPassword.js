import React from 'react';

import { Button, Card, CardBody, FormGroup } from 'reactstrap';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import UserApi from '../../api/UserApi';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { ReactstrapInput } from 'reactstrap-formik';

const NewPassword = (props) => {
  const { token } = useParams();
  const navigate = useNavigate();

  // TODO
  // if(!token){
  //   props.history.push("/auth/sign-in");
  // }showNotification

  const handleShowErrorNotification = () => {
    toast.success('Reset password successfully!!!', {
      toastId: 'email-sended', // Đặt một toastId cụ thể
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const redirectToLogin = () => {
    navigate('/profile');
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="text-center mt-4">
        <h1 className="h2">Đổi mật khẩu</h1>
        <p className="lead">Enter your new password.</p>
      </div>

      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(6, 'Must be between 6 and 50 characters')
            .max(50, 'Must be between 6 and 50 characters')
            .required('Required'),

          confirmPassword: Yup.string()
            .required('Required')
            .when(
              'password',
              (password, schema) => password && schema.oneOf([Yup.ref('password')], 'Confirm Password does not match'),
            ),
        })}
        onSubmit={async (values) => {
          try {
            // call api
            await UserApi.resetPassword(token, values.password);

            // message
            handleShowErrorNotification();

            // redirect to login page
            redirectToLogin();
          } catch (error) {
            // redirect page error server
            navigate('/404');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody className="auth">
              <div className="m-sm-4">
                <Form>
                  <FormGroup>
                    <FastField
                      label="Password"
                      type="password"
                      bsSize="lg"
                      name="password"
                      placeholder="Enter new password"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Confirm Password"
                      type="password"
                      bsSize="lg"
                      name="confirmPassword"
                      placeholder="Enter confirm new password"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <div className="text-center mt-3">
                    <Button type="submit" className="white-btn" size="lg" disabled={isSubmitting}>
                      Đổi mật khẩu
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default NewPassword;
