import React from 'react';
import './NotificationPopup.scss';
import PropTypes from 'prop-types';

const NotificationPopup = ({
  firstName = 'Someone',
  city = 'New York',
  country = 'United States',
  productName = 'Iphone 15 pro max 256GB',
  timestamp = 'a day ago',
  productImage = 'https://newphone15.com/wp-content/uploads/2023/04/apple-iphone-15-pro-max-1-500x429.png',
  settings = {hideTimeAgo: false, truncateProductName: false, position: 'bottom-left'}
}) => {
  const {hideTimeAgo, truncateProductName, position} = settings;
  return (
    <div className={`Avada-SP__Wrapper Avada-SP__Wrapper--${position}`}>
      <div className="Avada-SP__Inner">
        <div className="Avada-SP__Container">
          <a href="#" className={'Avada-SP__LinkWrapper'}>
            <div
              className="Avada-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName || 'Someone'} in {city}, {country}
              </div>
              <div className={`Avada-SP__Subtitle${truncateProductName ? '--truncated' : ''}`}>
                Purchased {productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {hideTimeAgo ? '' : timestamp}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
          <div
            className="Avada-SP__ClosePopup"
            onClick={() => {
              const container = document.querySelector('#Avada-SalePop');
              container.remove();
            }}
          >
            <img
              src="https://boostsales.apps.avada.io/76c920a85ebd5fba8dd6568494f8021c.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  firstName: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  productName: PropTypes.string,
  productImage: PropTypes.string,
  timestamp: PropTypes.string,
  truncateProductName: PropTypes.bool,
  hideTimeAgo: PropTypes.bool,
  position: PropTypes.string
};

export default NotificationPopup;
