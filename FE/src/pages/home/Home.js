import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import ProductApi from '../../api/ProductApi';
import img1 from '../../assets/img/photos/massage_royal.jpg';
import img2 from '../../assets/img/photos/kingSport.webp';
import img4 from '../../assets/img/photos/omron.jpg';
import { connect } from 'react-redux';
import ImageSlider from '../../components/component/ImageSlider/ImageSlider';
import { selectProducts, selectCategory } from '../../redux/selectors/ProductSelector';
import { getListProductAction } from '../../redux/actions/ProductAction';
import Storage from '../../storage/Storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import FormatPrice from '../../components/checkprice/FormatPrice';
import ShoppingCartApi from '../../api/ShoppingCartApi';
import { selectCartItems } from '../../redux/selectors/CartSelector';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Home(props) {
  const productData = props.products;

  const navigate = useNavigate();

  const getListProduct = props.getListProductAction;

  const cartData = props.cartItems;

  const isAuthenticated = () => {
    console.log(Storage.getToken());
    return Storage.getToken() !== null && Storage.getToken() !== undefined;
  };

  const handleShowSuccessNotification = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const getAllProduct = async () => {
    try {
      const result = await ProductApi.getAllProduct(
        undefined,
        4,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      const products = result.content;
      // setTotalPage(result.totalPages);
      getListProduct(products);
      // console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProductToCart = async (productId) => {
    try {
      const result = await ShoppingCartApi.getShoppingCartByDate();
      // console.log(result);
      if (result.id == null) {
        ShoppingCartApi.createCart(productId);
      } else {
        ShoppingCartApi.addProductToCart(result.id, productId);
      }
      handleShowSuccessNotification('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home">
      <ToastContainer />
      <ImageSlider />
      <div className="home-list-title">
        <p>Sản phẩm mới nhất</p>
      </div>
      <div className="product-home-wrapper">
        {productData.map((product) => (
          <div key={product.id} className="product-home-item">
            <Link to={`/products/productinfo/${product.id}`}>
              <img id="product-collection-image" src={product.image} alt={product.name} />
            </Link>
            <Link className="product-images" to={`/products/productinfo/${product.id}`}>
              {product.name}
            </Link>
            <p>{FormatPrice(product.price)}</p>
            <div className="product-home-moreinfo">
              <button
                // style={{ display: 'flex' }}
                className="white-btn"
                onClick={() => (!isAuthenticated() ? navigate('/sign-in') : handleAddProductToCart(product.id))}
              >
                {'+'}
                <FontAwesomeIcon icon={faCartShopping} />
                {'Cart'}
              </button>
              <button
                className="black-btn product-home-moreinfo-btn"
                onClick={() => {
                  navigate(`/products/productinfo/${product.id}`);
                }}
              >
                Xem thêm
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="home-content">
        <div className="home-content-image1">
          <div className="home-image-container" style={{ width: '1400px', height: '500px' }}>
            <img className="home-img1" src={img1} alt="" />
          </div>

          <div>
            <div className="home-content-body1" style={{ marginRight: '30px', width: '250px' }}>
              <p className="home-content-image1-title" style={{ color: '#ededed', textAlign: 'left' }}>
                Thư giãn
              </p>
              <p
                className="home-content-image1-body"
                style={{ color: '#ededed', margin: '0', fontSize: '15px', fontWeight: '800', width: '300px' }}
              >
                Sau những ngày làm việc căng thẳng
              </p>
              <Link to={'/products/category?category=health_care'}>xem {'>'}</Link>
            </div>
            <div className="home-content-body1" style={{ marginTop: '40px', marginLeft: '65px' }}>
              <p className="home-content-image1-title" style={{ color: '#ededed', textAlign: 'left' }}>
                Tập luyện
              </p>

              <p
                className="home-content-image1-body"
                style={{ color: '#ededed', textAlign: 'left', margin: '0px', width: '300px' }}
              >
                Nâng cao sức khỏe mỗi ngày
              </p>
              <Link style={{ marginLeft: '50px' }} to={'/products/category?category=medical_equipment'}>
                xem {'>'}
              </Link>
            </div>
          </div>

          <div style={{ width: '1000px', height: '700px', marginTop: '30px' }}>
            <div style={{ width: '100p%', height: '190px', backgroundColor: 'transparent' }}></div>
            <div className="home-image-container">
              <img className="home-img2" src={img2} alt="" />
            </div>
          </div>
        </div>
        <div className="home-content-image1" style={{ marginTop: '60px' }}>
          <div className="home-image-container" style={{ width: '900px', height: '500px', marginTop: '-50px' }}>
            <img className="home-img1" src={img4} alt="" />
          </div>
          <div>
            <div className="home-content-body1" style={{ marginRight: '30px' }}>
              <p className="home-content-image1-title" style={{ color: '#ededed', textAlign: 'left' }}>
                Y tế
              </p>
              <p className="home-content-image1-body" style={{ color: '#ededed', margin: '0', width: '300px' }}>
                Theo dõi sức khỏe mọi lúc
              </p>
              <Link to={'/products/category?category=medical_equipment'}>xem {'>'}</Link>
            </div>
            <div className="home-content-body1"></div>
          </div>

          {/* <div style={{ width: '320px', height: '450px' }}>
            <div className="home-image-container" style={{ width: '920px', height: '100%' }}>
              <img className="home-img2" src={img3} alt="" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
const mapGlobalStateToProps = (state) => {
  return {
    products: selectProducts(state),
    cartItems: selectCartItems(state),
    // page: selectPage(state),
    // totalSize: selectTotalSize(state),
    // category: selectCategory(state),
    // type: selectType(state),
    // size: selectSize(state),
    // selectedRows: selectSelectedRows(state),
  };
};

export default connect(mapGlobalStateToProps, { getListProductAction })(Home);
