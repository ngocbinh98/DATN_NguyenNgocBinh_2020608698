import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '../popper/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import ProductItem from '../ProductItem/index';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import ProductApi from '../../../api/ProductApi';
const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(true);
  const navigate = useNavigate();
  const inputRef = useRef();
  const debounced = useDebounce(searchValue, 500);

  const handleClear = () => {
    setSearchValue('');
    setSearchResults([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleSearch = (search) => {
    setShowResult(false);
    navigate(`/products/search?search=${search}`);
  };
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) setSearchValue(searchValue);
  };
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResults([]);
      return;
    }
    const getData = async () => {
      try {
        const result = await ProductApi.getAllProduct(
          undefined,
          undefined,
          undefined,
          undefined,
          searchValue === '' ? 'aaaaaaaaaaaaaa' : debounced,
          undefined,
          undefined,
        );
        console.log(result);
        setSearchResults(result.content);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [debounced]);
  return (
    <HeadlessTippy
      appendTo={() => document.body}
      interactive
      visible={showResult && searchResult.length > 0}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx('search-title')}>Products</h4>
            {searchResult.map((result) => (
              <ProductItem onClick={() => setShowResult(false)} key={result.id} data={result} />
            ))}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input
          onFocus={() => {
            setShowResult(true);
          }}
          ref={inputRef}
          value={searchValue}
          placeholder="Tìm sản phẩm"
          spellCheck={false}
          onChange={handleChange}
        />

        <button className={cx('clear')} onClick={handleClear}>
          <FontAwesomeIcon icon={faCircleXmark} />{' '}
        </button>

        <button onClick={() => handleSearch(searchValue)} className={cx('search-btn')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}
      </div>
    </HeadlessTippy>
  );
}

export default Search;
