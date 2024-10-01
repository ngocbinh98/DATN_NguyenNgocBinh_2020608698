import { useEffect, useState, Fragment } from 'react';
import CategoryApi from '../../api/CategoryApi';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/selectors/CategorySelector';
import { getCategoryAction } from '../../redux/actions/CategoryAction';
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

function CategoryManager(props) {
  // const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isShow, setShow] = useState(false);
  const [indexCheck, setIdexCheck] = useState(undefined);

  const navigate = useNavigate();

  const categoryData = props.categories;

  const getCategory = props.getCategoryAction;

  const handleSelect = (id) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  const getAllCategory = async (page) => {
    try {
      const result = await CategoryApi.getAllCategory(page);
      const categories = result.content;
      // setTotalPage(result.totalPages);
      total = result.totalPages;
      getCategory(categories);
      // console.log(products);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteCategory = async (ids) => {
    try {
      await CategoryApi.deleteIdIn(ids);
      getAllCategory(page);
      handleShowSuccessNotification('Xóa Category thành công');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory(page);
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
              CATEGORY MANAGER
            </p>
          </CardTitle>
          <div className="product-home-filter">
            <div className="product-home-type"> </div>
          </div>
        </CardHeader>

        {/* BODY */}
        <CardBody>
          <div className="product-manager-wrapper">
            <button
              className="manager-filter-btn product-manager-delete-btn"
              onClick={() => {
                if (selectedIds.length > 0) handleDeleteCategory(selectedIds);
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
                  <th>Category name</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((category, index) => (
                  <tr key={category.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(category.id)}
                        onChange={() => handleSelect(category.id)}
                      />
                    </td>
                    <td>{category.id}</td>
                    <td>{category.categoryName}</td>
                    <td>
                      <button
                        onClick={() => {
                          console.log(category.id);
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
          <div className="product-manager-box" style={{ height: '400px' }}>
            <div className="text-center mt-4 product-manager-title-box">
              <h1 className="h2">{indexCheck === undefined ? 'Create category' : 'Update category'}</h1>
              {/* <p className="lead">Start update account.</p> */}
            </div>

            <Formik
              initialValues={{
                categoryName: indexCheck === undefined ? '' : categoryData[indexCheck].categoryName,
              }}
              validationSchema={Yup.object().shape({
                categoryName: Yup.string().max(50, 'Must be less than 50 characters').required('Required'),
              })}
              onSubmit={async (values) => {
                try {
                  handleShowSuccessNotification('Thành công');
                  // call api
                  const categoryInfoCreate = {
                    categoryName: values.categoryName,
                  };
                  indexCheck === undefined
                    ? await CategoryApi.createCategory(categoryInfoCreate)
                    : await CategoryApi.updateCategory(categoryData[indexCheck].id, categoryInfoCreate);
                  getAllCategory(page);
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
                  <CardBody style={{ height: '300px' }}>
                    <div className="m-sm-4">
                      <Form>
                        <div className="product-manager-box-content" style={{ height: '200px' }}>
                          <FormGroup>
                            <FastField
                              label="Category name"
                              type="text"
                              bsSize="lg"
                              name="categoryName"
                              placeholder="Enter category name"
                              component={ReactstrapInput}
                            />
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
    categories: selectCategory(state),
    // category: selectCategory(state),
    // page: selectPage(state),
    // totalSize: selectTotalSize(state),
    // category: selectCategory(state),
    // type: selectType(state),
    // size: selectSize(state),
    // selectedRows: selectSelectedRows(state),
  };
};

export default connect(mapGlobalStateToProps, { getCategoryAction })(CategoryManager);
