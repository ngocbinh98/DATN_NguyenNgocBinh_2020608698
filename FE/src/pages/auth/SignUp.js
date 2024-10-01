import React, { Fragment, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ReactstrapInput } from 'reactstrap-formik';
import { Button, Card, CardBody, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FastField, Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserApi from '../../api/UserApi';
import NotifiBox4 from '../../components/component/box/NotifiBox4';
const SignUp = (props) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState('');

  const [isDisableResendButton, setDisableResendButton] = useState(false);

  const [isShow, setShow] = useState(false);

  const navigate = useNavigate();

  const resendEmailToActiveAccount = async () => {
    setShow(true);
    setDisableResendButton(true);
    await UserApi.resendEmailToActiveAccount(email);
    setDisableResendButton(false);
    setShow(false);
  };

  const redirectToLogin = () => {
    navigate('/sign-in');
  };

  return (
    <>
      <div className="text-center mt-4">
        <h1 className="h2">Đăng ký tài khoản</h1>
        <p className="lead">Cá nhân hóa trải nghiệm mua hàng bằng cách tạo tài khoản của riêng mình</p>
      </div>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          address: '',
          phone: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),

          lastName: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),

          username: Yup.string()
            .min(6, 'Must be between 6 and 50 characters')
            .max(50, 'Must be between 6 and 50 characters')
            .required('Required')
            .matches(/^[a-zA-Z0-9]+$/, 'Only alphanumeric characters are allowed')
            .test('checkExistsUsername', 'This username is already registered.', async (username) => {
              // call api
              const isExists = await UserApi.existsByUsername(username);
              return !isExists;
            }),

          email: Yup.string()
            .email('Invalid email address')
            .required('Required')
            .test('checkExistsEmail', 'This email is already registered.', async (email) => {
              // console.log(email);
              // call api
              const isExists = await UserApi.existsByEmail(email);
              return !isExists;
            }),
          address: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
          phone: Yup.number().required('Required'),

          password: Yup.string()
            .min(6, 'Must be between 6 and 50 characters')
            .max(50, 'Must be between 6 and 50 characters')
            .required('Required'),

          confirmPassword: Yup.string()
            .required('Required')
            .when('password', {
              is: (value) => (value && value.length > 0 ? true : false),
              then: () => Yup.string().oneOf([Yup.ref('password'), null], 'Confirm Password do not match'),
            }),
        })}
        onSubmit={async (values) => {
          try {
            // console.log(values);
            // const userInfo = {
            //   username:values.username,
            //   email:values.email,
            //   password:values.password,
            //   firstName:values.firstname,
            //   lastName:values.lastname,
            // }

            // call api
            setShow(true);
            await UserApi.create(values);
            // message
            setEmail(values.email);
            setOpenModal(true);
            setShow(false);
          } catch (error) {
            console.log(error);
            // redirect page error server
            props.history.push('/500');
          }
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Card style={{ boxShadow: 'none' }}>
            <CardBody className="auth">
              <div className="m-sm-4">
                <Form>
                  <FormGroup>
                    <FastField
                      label="FirstName"
                      type="text"
                      bsSize="lg"
                      name="firstName"
                      placeholder="Enter your first name"
                      component={ReactstrapInput}
                    />
                    <ErrorMessage name="firstName" />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="LastName"
                      type="text"
                      bsSize="lg"
                      name="lastName"
                      placeholder="Enter your last name"
                      component={ReactstrapInput}
                    />
                    {/* <ErrorMessage name="lastName" /> */}
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Username"
                      type="text"
                      bsSize="lg"
                      name="username"
                      placeholder="Enter your username"
                      component={ReactstrapInput}
                    />
                    {/* <ErrorMessage name="username" /> */}
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Email"
                      type="email"
                      bsSize="lg"
                      name="email"
                      placeholder="Enter your email"
                      component={ReactstrapInput}
                    />
                    {/* <ErrorMessage name="email" /> */}
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Address"
                      type="text"
                      bsSize="lg"
                      name="address"
                      placeholder="Enter your address"
                      component={ReactstrapInput}
                    />
                    {/* <ErrorMessage name="address" /> */}
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Phone"
                      type="number"
                      bsSize="lg"
                      name="phone"
                      placeholder="Enter your phone"
                      component={ReactstrapInput}
                    />
                    {/* <ErrorMessage name="phone" /> */}
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="Password"
                      type="password"
                      bsSize="lg"
                      name="password"
                      placeholder="Enter password"
                      component={ReactstrapInput}
                    />
                    {/* <ErrorMessage name="password" /> */}
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Confirm Password"
                      type="password"
                      bsSize="lg"
                      name="confirmPassword"
                      placeholder="Enter confirm password"
                      component={ReactstrapInput}
                    />
                    {/* <ErrorMessage name="confirmPassword" /> */}
                  </FormGroup>

                  {/* Nút Sign in */}
                  <div className="text-center mt-3">
                    {/* <Link to="/sign-in" className="signup-link"> */}
                    <span className="signup-text">
                      Đã có tài khoản? <Link to={'/sign-in'}>Đăng nhập!</Link>
                    </span>
                    {/* </Link> */}
                  </div>

                  <div className="text-center mt-3">
                    <Button
                      className="black-btn"
                      type="submit"
                      color="primary"
                      size="lg"
                      // disabled={isSubmitting}
                    >
                      Đăng ký
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>

      <Modal isOpen={isOpenModal}>
        {/* header */}
        <ModalHeader></ModalHeader>

        {/* body */}
        <ModalBody className="m-3">
          <p className="mb-0">
            Chúng tôi đã gửi một địa chỉ kích hoạt tài khoản tới email <b>{email}</b> của bạn!.
          </p>
          <p className="mb-0">Xin vui lòng kiểm tra hộp thư email để kích hoạt tài khoản!</p>
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          <Button className="black-btn" onClick={resendEmailToActiveAccount} disabled={isDisableResendButton}>
            Gửi lại
          </Button>{' '}
          <Button className="white-btn" onClick={redirectToLogin}>
            Đăng nhập
          </Button>
        </ModalFooter>
      </Modal>
      {isShow === true ? <NotifiBox4 /> : <Fragment />}
    </>
  );
};

export default SignUp;
