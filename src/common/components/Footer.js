import React from 'react';
import Container from './main/Container';

let Footer = () => {
  return (
    <footer className="text-center">
      <div className="footer">
        <Container>
          <div className="row">
            <div className="footer-col col-lg-12">
              <ul className="list-inline">
                <li>
                  <a
                    href="https://www.facebook.com/god.creating"
                    target="_blank"
                    className="btn-social btn-outline"
                  >
                    <i className="fa fa-fw fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/gocreating"
                    target="_blank"
                    className="btn-social btn-outline"
                  >
                    <i className="fa fa-fw fa-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              Copyright &copy; Go Creating 2016
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
