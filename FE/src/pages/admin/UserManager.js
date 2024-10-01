import { useEffect, useState, Fragment } from 'react';
import UserApi from '../../api/UserApi';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectUsers } from '../../redux/selectors/UserSelector';
import { getUserAction } from '../../redux/actions/UserAction';
import { Button, Card, CardBody, FormGroup, Container, CardHeader, CardTitle, ModalHeader, Label } from 'reactstrap';
import { FastField, Form, Formik, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { ReactstrapInput } from 'reactstrap-formik';
import 'react-toastify/dist/ReactToastify.css';
import FormatPrice from '../../components/checkprice/FormatPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';

const handleShowSuccessNotification = (message) => {
  toast.success(message, {
    toastId: 'login-error', // Đặt một toastId cụ thể
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
let total = 1;

function UserManager(props) {
  // const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [selectRoleValue, setSelectValue] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectSearchValue, setSearchValue] = useState('');
  const [isShow, setShow] = useState(false);
  const [indexCheck, setIdexCheck] = useState(undefined);

  const navigate = useNavigate();

  const userData = props.users;

  const getUser = props.getUserAction;

  const handleSelect = (id) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  const getAllUser = async (page, search, role) => {
    try {
      const result = await UserApi.getAllUsers(page, 5, undefined, undefined, search, role);
      const users = result.content;
      // setTotalPage(result.totalPages);
      total = result.totalPages;
      getUser(users);
      // console.log(products);
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDeleteUser = async (ids) => {
    try {
      const result = await UserApi.deleteByIds(ids);
      getAllUser(page, selectSearchValue, selectRoleValue);
      handleShowSuccessNotification('Xóa người dùng thành công');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser(page, selectSearchValue, selectRoleValue);
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <Container fluid className="p-0">
        <ToastContainer />
        {/* HEADER */}
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            <p className="product-home-title" style={{ textAlign: 'center', fontSize: '75px' }}>
              USER MANAGER
            </p>
          </CardTitle>
          <div className="product-home-filter">
            <div className="product-home-type">
              <input
                className="product-home-search-inp"
                type="text"
                placeholder="Search"
                value={selectSearchValue}
                onChange={handleChange}
              />
              <select id="user-role-select">
                <option key="0" value="">
                  Role
                </option>
                <option key="2" value="USER">
                  User
                </option>
                <option key="4" value="ADMIN">
                  Admin
                </option>
              </select>
              <button
                className="manager-filter-btn"
                onClick={() => {
                  const selectElement = document.getElementById('user-role-select');
                  const selectedValue = selectElement.value;
                  setSelectValue(selectedValue);
                  getAllUser(1, selectSearchValue, selectedValue);
                  getAllUser(1, selectSearchValue, selectedValue);
                  if (selectedValue != '') setPage(1);
                  if (selectedValue === '') setPage(1);
                  setSelectedIds([]);
                  console.log(selectedValue);
                }}
              >
                Lọc
              </button>
            </div>
          </div>
        </CardHeader>

        {/* BODY */}
        <CardBody>
          <div className="product-manager-wrapper">
            <button
              className="manager-filter-btn product-manager-delete-btn"
              onClick={() => {
                if (selectedIds.length > 0) handleDeleteUser(selectedIds);
                console.log(selectedIds);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button onClick={() => setShow(true)} className="manager-filter-btn product-manager-add-btn">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <table className="product-table">
              <thead>
                <tr>
                  <th>✓</th>
                  <th>id</th>
                  <th>username</th>
                  <th>first name</th>
                  <th>last name</th>
                  <th>email</th>
                  <th>password</th>
                  <th>address</th>
                  <th>phone</th>
                  <th>role</th>
                  <th>status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(user.userId)}
                        onChange={() => handleSelect(user.userId)}
                      />
                    </td>
                    <td>{user.userId}</td>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.password.substring(0, 10)}...</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>{user.userStatus}</td>
                    <td>
                      <button
                        onClick={() => {
                          console.log(user.id);
                          setIdexCheck(index);
                          setShow(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGE CHUYỂN TRANG */}
          <div className="product-home-pages">
            <button onClick={() => setPage(page == 1 ? page : page - 1)} className="white-btn product-home-page-btn">
              {'<'}
            </button>
            {Array.from({ length: 7 }).map((_, index) => {
              const pageNumber = index - 3 + page;
              if (pageNumber > 0 && pageNumber <= total) {
                return pageNumber === page ? (
                  <button className="black-btn product-home-page-btn" key={index}>
                    {pageNumber}
                  </button>
                ) : (
                  <button onClick={() => setPage(pageNumber)} className="white-btn product-home-page-btn" key={index}>
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}
            <button
              onClick={() => setPage(page == total ? page : page + 1)}
              className="white-btn product-home-page-btn"
            >
              {'>'}
            </button>
          </div>
          <div className="product-home-input-div">
            <input className="product-home-input-page" type="number" />
            <button
              onClick={() => {
                // console.log(categoryData);
                const selectPageElement = document.getElementsByClassName('product-home-input-page')[0];
                const selectedPageValue = selectPageElement.value ? parseInt(selectPageElement.value, 10) : null;

                if (selectedPageValue !== null) {
                  if (selectedPageValue < 1) {
                    setPage(1);
                  } else if (selectedPageValue > total) {
                    setPage(total);
                  } else {
                    setPage(selectedPageValue);
                  }
                }
              }}
              className="white-btn product-home-input-page-btn"
            >
              Chuyển
            </button>
          </div>
        </CardBody>
      </Container>
      {isShow === false ? (
        <Fragment />
      ) : (
        <div className="product-manager-box-main">
          <div className="product-manager-box">
            <div className="text-center mt-4 product-manager-title-box">
              <h1 className="h2">{indexCheck === undefined ? 'Create User' : 'Update user'}</h1>
              {/* <p className="lead">Start update account.</p> */}
            </div>

            <Formik
              initialValues={{
                username: indexCheck === undefined ? '' : userData[indexCheck].username,
                email: indexCheck === undefined ? '' : userData[indexCheck].email,
                password: '',
                address: indexCheck === undefined ? '' : userData[indexCheck].address,
                phone: indexCheck === undefined ? '' : userData[indexCheck].phone,
                firstName: indexCheck === undefined ? '' : userData[indexCheck].firstName,
                lastName: indexCheck === undefined ? '' : userData[indexCheck].lastName,
                role: indexCheck === undefined ? '' : userData[indexCheck].role,
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
                email: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
                password: Yup.string(),
                address: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
                phone: Yup.string().max(25, 'Must be less than 50 characters').required('Required'),
                firstName: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
                lastName: Yup.string().required('Required'),
                role: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
              })}
              onSubmit={async (values) => {
                try {
                  handleShowSuccessNotification('Thành công');
                  // call api
                  const userInfoCreate = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    address: values.address,
                    phone: values.phone,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    role: values.role,
                  };
                  const userInfoUpdate = {
                    address: values.address,
                    phone: values.phone,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    password: values.password,
                    role: values.role,
                  };
                  indexCheck === undefined
                    ? await UserApi.createAccountFromAdmin(userInfoCreate)
                    : await UserApi.updateByAdmin(userData[indexCheck].userId, userInfoUpdate);
                  getAllUser(page, selectSearchValue, selectRoleValue);
                  // setUserInfo(result);
                  setShow(false);
                  setIdexCheck(undefined);
                  // console.log(productInfo);
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
                        <div className="product-manager-box-content">
                          {indexCheck === undefined ? (
                            <FormGroup>
                              <FastField
                                label="Username"
                                type="text"
                                bsSize="lg"
                                name="username"
                                placeholder="Enter username"
                                component={ReactstrapInput}
                              />
                            </FormGroup>
                          ) : (
                            <></>
                          )}

                          <FormGroup>
                            <FastField
                              label="First Name"
                              type="text"
                              bsSize="lg"
                              name="firstName"
                              placeholder="Enter your firstName"
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

                          {indexCheck === undefined ? (
                            <FormGroup>
                              <FastField
                                label="Email"
                                type="text"
                                bsSize="lg"
                                name="email"
                                placeholder="Enter email"
                                component={ReactstrapInput}
                              />
                            </FormGroup>
                          ) : (
                            <></>
                          )}

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
                              label="Phone number"
                              type="text"
                              bsSize="lg"
                              name="phone"
                              placeholder="Enter your phone number"
                              component={ReactstrapInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <FastField
                              label="New password"
                              type="text"
                              bsSize="lg"
                              name="password"
                              placeholder="Enter new password"
                              component={ReactstrapInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="role">Role </Label>
                            <Field as="select" id="role" name="role">
                              <option value="">Role</option>
                              <option key="2" value="USER">
                                User
                              </option>
                              <option key="4" value="ADMIN">
                                Admin
                              </option>
                            </Field>
                          </FormGroup>
                        </div>
                        <div className="text-center product-manager-btn">
                          <button
                            className="black-btn user-update-close-btn"
                            onClick={() => {
                              setShow(false);
                              setIdexCheck(undefined);
                            }}
                          >
                            Close
                          </button>
                          <Button
                            className="white-btn"
                            type="submit"
                            color="primary"
                            size="lg"
                            // disabled={isSubmitting}
                          >
                            {indexCheck === undefined ? 'Create' : 'Update'}
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
    </>
  );
}
const mapGlobalStateToProps = (state) => {
  return {
    users: selectUsers(state),
    // category: selectCategory(state),
    // page: selectPage(state),
    // totalSize: selectTotalSize(state),
    // category: selectCategory(state),
    // type: selectType(state),
    // size: selectSize(state),
    // selectedRows: selectSelectedRows(state),
  };
};

export default connect(mapGlobalStateToProps, { getUserAction })(UserManager);
