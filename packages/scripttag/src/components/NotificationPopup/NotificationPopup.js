import React from 'react';
import './NoticationPopup.scss';
import moment from 'moment';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = `${new Date()}`,
  productImage = 'http://paris.mageplaza.com/images/shop/single/big-1.jpg',
  settings = {hideTimeAgo: false, truncateProductName: true, position: 'bottom-left'},
  closePopup = () => {}
}) => {
  return (
    <div className={`Avada-SP__Wrapper Avada-SP__Wrapper--${settings.position}`}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div
                className={`Avada-SP__Subtitle${settings.truncateProductName ? '--truncated' : ''}`}
              >
                Purchased {productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                <span>{settings.hideTimeAgo ? '' : `${moment(timestamp).fromNow()}`}</span>
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="fasle" /> by Avada
                </span>
              </div>
            </div>
          </a>
          <div className="Avada-SP__ClosePopup" onClick={closePopup}>
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

export default NotificationPopup;
