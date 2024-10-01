import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usersvg from '../../assets/img/avatars/user-128.svg';
import { Button, Card, CardBody, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FastField, Form, Formik, Field, ErrorMessage } from 'formik';
import { ReactstrapInput } from 'reactstrap-formik';
import { TextInput } from '../../custom_/Text';
import * as Yup from 'yup';
import UserApi from '../../api/UserApi';
import UploadApi from '../../api/UploadApi';
import { withRouter } from 'react-router-dom';
import Storage from '../../storage/Storage';
import { ToastContainer, toast } from 'react-toastify';
import NotifiBox3 from '../../components/component/box/NotifiBox3';

const handleShowErrorNotification = () => {
  toast.success('Update account successfully!!', {
    toastId: 'update-success', // Đặt một toastId cụ thể
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const UserProfile = (props) => {
  const useStorage = Storage.getUserInfo();
  const [userInfo, setUserInfo] = useState(useStorage);
  const [isShow, setShow] = useState(false);
  const [isShow2, setShow2] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const userResult = async () => {
    try {
      const result = await UserApi.getByUsername(useStorage.username);
      Storage.setUserInfo(result);
      setUserInfo(result);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result);
    };

    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleUploadImage = async () => {
    try {
      const uploadResult = await UploadApi.upload(image, 'user_image');
      if (userInfo.image === null || !userInfo.image.includes('cloudinary')) {
        const result = await UserApi.uploadProfileImage(userInfo.userId, uploadResult.url);
        // console.log(uploadResult.url);
      } else {
        const image_public_id = userInfo.image;
        const imageName = image_public_id.split('/').pop().split('.')[0];
        await UploadApi.deleteUserImage(imageName);
        const result = await UserApi.uploadProfileImage(userInfo.userId, uploadResult.url);
        // console.log(result);
      }
      userResult();
      handleShowErrorNotification();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userResult();
  }, []);

  return (
    <div className="user-update-backhround">
      <div className="user-update-main">
        <ToastContainer />
        <button className="white-btn user-update-back-btn" onClick={() => navigate('/products')}>
          {'<'}
        </button>
        <div className="user-update-left-tab">
          {userInfo.image === '' || userInfo.image === null ? (
            <svg
              className="user-update-svg-icon"
              style={{ verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" />
            </svg>
          ) : (
            <div className="user-update-image-div">
              <div className="user-update-image-profile">
                <img src={userInfo.image} alt="image" />
              </div>
            </div>
          )}
          <button className="black-btn user-update-image-btn" onClick={() => setShow2(true)}>
            Tải ảnh hồ sơ
          </button>
          <p>Xin chào! {userInfo.username}</p>
        </div>
        <div className="user-update-right-tab">
          <div className="user-update-public">
            <div className="user-update-public-lable">
              <p>THÔNG TIN NGƯỜI DÙNG</p>
            </div>
            <div className="user-update-public-content first">
              <div className="user-update-public-info">
                <p className="user-update-public-info-label">First Name: </p>
                <p className="user-update-public-info-text">{userInfo.firstName}</p>
              </div>
              <div className="user-update-public-info">
                <p className="user-update-public-info-label">Last Name: </p>
                <p className="user-update-public-info-text">{userInfo.lastName}</p>
              </div>
              {/* </div>
          <div className="user-update-public-content"> */}
              <div className="user-update-public-info">
                <p className="user-update-public-info-label">Địa chỉ: </p>
                <p className="user-update-public-info-text">{userInfo.address}</p>
              </div>
              <div className="user-update-public-info">
                <p className="user-update-public-info-label">Email: </p>
                <p className="user-update-public-info-text">{userInfo.email}</p>
              </div>
              <div className="user-update-public-info">
                <p className="user-update-public-info-label">Số điện thoại: </p>
                <p className="user-update-public-info-text">{userInfo.phone}</p>
              </div>
            </div>

            <button
              className="black-btn user-update-public-updatebtn"
              onClick={() => {
                navigate('/reset-password');
              }}
            >
              Đổi mật khẩu
            </button>
            <button
              className="white-btn user-update-public-passwordbtn"
              onClick={() => {
                setShow(true);
              }}
            >
              Thay đổi thông tin
            </button>
          </div>
        </div>

        {isShow === false ? (
          <Fragment />
        ) : (
          <div className="user-update-box-main">
            <div className="user-update-box">
              <div className="text-center mt-4">
                <h1 className="h2">Thay đổi thông tin</h1>
                <p className="lead">Start update account.</p>
              </div>

              <Formik
                initialValues={{
                  firstName: userInfo.firstName,
                  lastName: userInfo.lastName,
                  address: userInfo.address,
                  phone: userInfo.phone,
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),

                  lastName: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),

                  address: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
                  phone: Yup.string().max(25, 'Must be less than 25 characters').required('Required'),
                })}
                onSubmit={async (values) => {
                  try {
                    handleShowErrorNotification();
                    // call api
                    await UserApi.updateUser(
                      userInfo.userId,
                      values.address,
                      values.phone,
                      values.firstName,
                      values.lastName,
                    );
                    const result = await UserApi.getByUsername(useStorage.username);
                    Storage.setUserInfo(result);
                    setUserInfo(result);
                    setShow(false);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ isSubmitting }) => (
                  <Card>
                    <CardBody>
                      <div className="m-sm-4">
                        <Form>
                          <FormGroup>
                            <FastField
                              label="First Name"
                              type="text"
                              bsSize="lg"
                              name="firstName"
                              placeholder="Enter your first name"
                              component={ReactstrapInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <FastField
                              label="Last Name"
                              type="text"
                              bsSize="lg"
                              name="lastName"
                              placeholder="Enter your last name"
                              component={ReactstrapInput}
                            />
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
                          </FormGroup>

                          <FormGroup>
                            <FastField
                              label="Phone"
                              type="text"
                              bsSize="lg"
                              name="phone"
                              placeholder="Enter your phone"
                              component={ReactstrapInput}
                            />
                          </FormGroup>

                          <div className="text-center mt-3">
                            <button
                              className="black-btn user-update-close-btn"
                              onClick={() => {
                                setShow(false);
                              }}
                            >
                              Thoát
                            </button>
                            <Button
                              className="white-btn"
                              type="submit"
                              color="primary"
                              size="lg"
                              // disabled={isSubmitting}
                            >
                              Cập nhật
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </CardBody>
                  </Card>
                )}
              </Formik>
            </div>
          </div>
        )}
        {isShow2 === false ? (
          <Fragment />
        ) : (
          <NotifiBox3
            isbtn1={true}
            isbtn2={true}
            btnname1={'Lưu'}
            btnname2={'Thoát'}
            action1={() => {
              if (image === null || image === '') {
                setShow2(false);
              } else {
                handleUploadImage();
                setShow2(false);
                setImageUrl();
                setImage();
              }
            }}
            action2={() => {
              setShow2(false);
              setImageUrl();
              setImage();
            }}
            title="Upload image"
            content={
              <div className="user-upload-box">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {imageUrl && <img src={imageUrl} alt="Uploaded" />}
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
