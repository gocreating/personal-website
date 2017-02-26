import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

let Footer = () => {
  return (
    <Grid
      fluid
      className="footer text-center"
    >
      <Grid
        style={{
          marginTop: 60,
          padding: 60,
          borderTop: '1px solid #ccc',
        }}
      >
        <Row>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Col>
            Copyright &copy; Go Creating 2017
          </Col>
        </Row>
      </Grid>
    </Grid>
  );
};

export default Footer;
