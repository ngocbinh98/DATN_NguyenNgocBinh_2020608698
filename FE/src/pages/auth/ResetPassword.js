import React, { Fragment, useState } from 'react';

import { Button, Card, CardBody, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FastField, Form, Formik } from 'formik';
import { ReactstrapInput } from 'reactstrap-formik';
import * as Yup from 'yup';
import UserApi from '../../api/UserApi';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NotifiBox4 from '../../components/component/box/NotifiBox4';

const handleShowErrorNotification = () => {
  toast.success('Sending request to your Email! Please Check!!', {
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

const ResetPassword = (props) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState('');
  const [isShow, setShow] = useState(false);
  const [isDisableResendButton, setDisableResendButton] = useState(false);

  const navigate = useNavigate();

  const resendEmailToResetPassword = async () => {
    setShow(true);
    setDisableResendButton(true);
    await UserApi.resendEmailToResetpassword(email);
    handleShowErrorNotification();
    setDisableResendButton(false);
    setShow(false);
  };

  const redirectToLogin = () => {
    navigate('/sign-in');
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="text-center mt-4">
        <h1 className="h2">Đổi mật khẩu</h1>
        <p className="lead">Nhập email để nhận thông tin đổi mật khẩu.</p>
      </div>

      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required')
            .test('checkExistsEmail', 'This email is not exists.', async (email) => {
              try {
                // call api
                const isExists = await UserApi.existsByEmail(email);
                return isExists;
              } catch (error) {
                console.error(error);
                return false; // Trả về false nếu có lỗi xảy ra trong quá trình gọi API
              }
            }),
        })}
        onSubmit={async (values) => {
          try {
            setShow(true);
            // call api
            await UserApi.requestResetPassword(values.email);
            handleShowErrorNotification();
            // message
            setEmail(values.email);
            setOpenModal(true);
            setShow(false);
          } catch (error) {
            // redirect page error server
            navigate('/404');
          }
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody className="auth">
              <div className="m-sm-4">
                <Form>
                  <FormGroup>
                    <FastField
                      label="Email"
                      type="email"
                      bsSize="lg"
                      name="email"
                      placeholder="Enter your email"
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

      <Modal isOpen={isOpenModal}>
        {/* header */}
        <ModalHeader></ModalHeader>

        {/* body */}
        <ModalBody className="m-3">
          <p className="mb-0">
            Chúng tôi đã gửi thông tin xác nhận tới <b>{email}</b>.
          </p>
          <p className="mb-0"> Vui lòng kiểm tra!</p>
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          <Button className="black-btn" onClick={resendEmailToResetPassword} disabled={isDisableResendButton}>
            Gửi lại
          </Button>{' '}
          <Button className="white-btn" onClick={redirectToLogin}>
            Đăng nhập
          </Button>
        </ModalFooter>
      </Modal>
      {isShow === true ? <NotifiBox4 /> : <Fragment />}
    </React.Fragment>
  );
};

export default ResetPassword;
