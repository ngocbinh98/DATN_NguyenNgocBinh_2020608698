import { useEffect, useState } from 'react';
import Page404 from '../auth/Page404';
import UserApi from '../../api/UserApi';
import ProductApi from '../../api/ProductApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Storage from '../../storage/Storage';
import { TextInfor } from '../../custom_/Text';
import { Card, Modal, ModalBody, ModalFooter, ModalHeader, Button, Col, Container, Row } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import FormatPrice from '../../components/checkprice/FormatPrice';
import ShoppingCartApi from '../../api/ShoppingCartApi';
import { selectCartItems } from '../../redux/selectors/CartSelector';
import { selectIsPurchase, selectPurchaseItem } from '../../redux/selectors/PurchaseSelector';
import { connect } from 'react-redux';
import { getCartItemAction } from '../../redux/actions/CartAction';
import { getPurchaseAction } from '../../redux/actions/PurchaseAction';
import image from '../../assets/img/photos/den.jpg';
import { Link } from 'react-router-dom';

//CSS
// import '../../css/General.scss';
const label_width = 3;
const input_width = {
  name: 9,
  collection: 9,
  size: 9,
  description: 12,
  material: 9,
  price: 5,
  image: 5,
};

let product = {
  id: '',
  name: '',
  collection: '',
  size: '',
  description: '',
  material: '',
  price: '',
  image: '',
  category: { categoryName: '' },
  type: { typeName: '' },
};

const handleShowSuccessNotification = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const ProductInfo = function ProductInfo(props) {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenModal2, setOpenModal2] = useState(false);
  const [productInfo, setProductInfo] = useState([]);
  const [productCollection, setProductCollection] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [checkToken, setCheckToken] = useState(Storage.getToken());
  const navigate = useNavigate();

  const getCartItem = props.getCartItemAction;
  const cartData = props.cartItems;
  const getPurchase = props.getPurchaseAction;
  const isPurchase = props.isPurchase;
  const purchaseItem = props.purchaseItem;

  let location = useLocation();

  let productId = location.pathname;
  productId = productId.split('/').slice(-1)[0];

  let itemPurchase = [{ quantity: quantity, product: product }];

  const handleQuantity = (event) => {
    const newQuantity = parseInt(event.target.value);

    // Kiểm tra nếu giá trị mới nhỏ hơn 0 và lớn hơn 10, không thực hiện cập nhật
    if (newQuantity >= 1 && newQuantity <= 9) {
      setQuantity(newQuantity);
    }
  };

  const getData = async () => {
    try {
      const result = await ProductApi.getProductById(productId);
      product = { ...result };
      setProductInfo(product);
      const result2 = await ProductApi.getAllProduct(1, 10, undefined, 'asc', result.collection, undefined, undefined);
      setProductCollection(result2.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProductToCart = async (productId) => {
    try {
      if (cartData === null) {
        ShoppingCartApi.createCart(productId);
      } else {
        const result = await ShoppingCartApi.getShoppingCartByDate();
        ShoppingCartApi.addProductToCart(result.id, productId);
      }
      handleShowSuccessNotification('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.log(error);
    }
  };

  // const handleGetProductFromCollection = async () => {
  //   try {
  //     const result = await ProductApi.getAllProduct(
  //       1,
  //       10,
  //       undefined,
  //       'asc',
  //       productInfo.collection,
  //       undefined,
  //       undefined,
  //     );
  //     setProductCollection(result.content);
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // handleGetProductFromCollection();
    getData();
    window.scrollTo(0, 0);
    // getPurchase(false, product);
    // setCheckToken(Storage.getToken());
    // console.log('show');
  }, [location.pathname]);

  const rowStyle = {
    display: 'grid',
    placeItems: 'center',
  };

  return (
    <Container fluid>
      <ToastContainer />
      <div className="product-infor-form">
        <Row>
          <div style={rowStyle}>
            <Row style={rowStyle}>
              <div className="product-infor-frame">
                <img src={productInfo.image} alt="anh" className="product-infor-img" />
              </div>
              <Row>
                <div className="product-infor-buy-button">
                  <Button
                    className="product-infor-buy-btn black-btn"
                    type="button"
                    size="lg"
                    onClick={() => {
                      setCheckToken(Storage.getToken());
                      if (checkToken) {
                        //reset state
                        setOpenModal(true);
                        setQuantity(1);
                      } else {
                        setOpenModal2(true);
                      }
                    }}
                  >
                    MUA NGAY
                  </Button>
                </div>
                <div className="product-infor-buy-button">
                  <Button
                    type="button"
                    className="product-infor-addtocart-btn white-btn"
                    size="lg"
                    onClick={() => {
                      if (checkToken) {
                        //reset state
                        handleAddProductToCart(productId);
                      } else {
                        setOpenModal2(true);
                      }
                    }}
                  >
                    THÊM VÀO GIỎ HÀNG
                  </Button>
                </div>
              </Row>
            </Row>
          </div>
          <Col lg={6}>
            <div className="product-infor-edit-frame">
              <Row>
                <h2 className="product-infor-product-name">{productInfo.name}</h2>
              </Row>
              <TextInfor
                classNameLabel="product-infor-label"
                label_width={label_width}
                input_width={input_width.collection}
                label="Collection"
                value={productInfo.collection}
              />

              <TextInfor
                classNameLabel="product-infor-label"
                label_width={label_width}
                input_width={input_width.size}
                label="Size"
                value={productInfo.size}
              />

              <TextInfor
                classNameLabel="product-infor-label"
                label_width={label_width}
                input_width={input_width.material}
                label="Material"
                value={productInfo.material}
              />

              <TextInfor
                classNameLabel="product-infor-label"
                label_width={label_width}
                input_width={input_width.price}
                label="Price"
                value={FormatPrice(productInfo.price)}
              />

              <TextInfor
                classNameLabel="product-infor-label"
                label_width={label_width}
                input_width={input_width.price}
                label="Type"
                value={productInfo.type ? productInfo.type.typeName : ''}
              />

              <TextInfor
                classNameLabel="product-infor-label"
                label_width={label_width}
                input_width={input_width.price}
                label="Category"
                value={productInfo.category ? productInfo.category.categoryName : ''}
              />
            </div>
          </Col>
        </Row>
        <>
          <div className="product-infor-descrip">
            <TextInfor
              classNameLabel="product-infor-big-label"
              label_width={label_width}
              input_width={input_width.description}
              label="Decription"
              value={productInfo.description}
            />
          </div>
        </>
      </div>
      {productCollection != [] ? (
        <div className="product-infor-other-product">
          <img className="product-infor-other-product-img" src={image} alt="noithat" />
          <div className="product-infor-other-product-title">
            {' '}
            <p>CÁC SẢN PHẨM TRONG CÙNG BỘ SƯU TẬP</p>
          </div>
          <div className="product-infor-other-product-content">
            {productCollection.map((product) => (
              <div className="product-infor-other-product-item" key={product.name}>
                <div className="product-infor-other-product-image">
                  <Link to={`/products/productinfo/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                    <p>{product.name}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      <Modal isOpen={isOpenModal2}>
        {/* body */}
        <ModalBody className="m-3">
          <div>
            <h1>Bạn cần đăng nhập để tiếp tục mua hàng</h1>
          </div>
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          <Button
            className="black-btn"
            onClick={() => {
              navigate('/sign-in');
            }}
          >
            Login
          </Button>

          <Button className="white-btn" onClick={() => setOpenModal2(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isOpenModal}>
        {/* header */}
        <ModalHeader>
          <div>
            <h1>Chọn thông tin thanh toán</h1>
          </div>
        </ModalHeader>
        {/* body */}
        <ModalBody className="m-3">
          <p className="mb-0" style={{ fontSize: '20px' }}>
            Tên sản phẩm: <span style={{ fontStyle: 'italic' }}>{productInfo.name}</span>
          </p>
          <label style={{ fontSize: '20px' }}>Chọn số lượng cần mua: </label>
          <input type="number" value={quantity} style={{ height: '25px', width: '40px' }} onChange={handleQuantity} />
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          <Button
            className="black-btn"
            onClick={() => {
              console.log(quantity);
              getPurchase(true, itemPurchase, 0);
              console.log(isPurchase);
              console.log(itemPurchase);
              navigate(`/purchase`);
            }}
          >
            Tới trang thanh toán
          </Button>

          <Button className="white-btn" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

const mapGlobalStateToProps = (state) => {
  return {
    cartItems: selectCartItems(state),
    isPurchase: selectIsPurchase(state),
    purchaseItem: selectPurchaseItem(state),
  };
};

export default connect(mapGlobalStateToProps, { getCartItemAction, getPurchaseAction })(ProductInfo);
