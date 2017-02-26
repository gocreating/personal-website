import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';

const ResumePage = (props) => (
  <PageLayout hasGrid>
    <Grid>
      <Row>
        <Col
          xs={8}
          xsOffset={2}
          sm={6}
          smOffset={3}
          md={4}
          mdOffset={4}
          style={{
            paddingTop: 60,
            paddingBottom: 60,
          }}
        >
          <Image
            src="/img/avatar.jpg"
            circle
            responsive
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>個人簡介</h1>
          <p>
            我是一名興趣使然的全端網站開發者，熱愛撰寫網頁，本科系也是資訊工程系。個性有點念舊，卻喜歡帶有變化的生活，興趣是喜歡收集東西，曾經收集過郵票、笑話，<s>還有全世界男人都會收集的＊＊</s>，現在最喜歡收集朋友的點點滴滴，也許某天會累積成為Big Data吧！
          </p>
          <p>
            休閒時會看看電影或影集，從美劇、日劇看到韓劇，再從古裝劇、本土劇看到肥皂劇，其實也沒幾部，大概就來自星星的你、甄嬛傳、半澤直樹、痞子英雄、王牌大律師、步步驚心、進擊的巨人、皮諾丘、看見味道的少女、十六個夏天、麻醉風暴、一拳超人、蘭陵王、生活大爆炸、射鵰英雄傳、瑯琊榜、掟上今日子的備忘錄、他們在畢業前一天爆炸、權力遊戲、實習醫生、陰屍路、王牌大醫師、信號、矽谷群瞎傳、絕命毒師這幾部而已。
          </p>
          <p>
            另外還有一樣超猛收藏品，因為長年受困在新竹這個鬼地方，就隨手把吃過喝過走過玩過愛過痛過恨過的足跡都留在這張<a target="_blank" href="https://drive.google.com/open?id=1bL2FWXRps9nxrHCMUTmQprpfKKw&usp=sharing">藏寶圖</a>中了！
          </p>
          <blockquote>
            想要我的財寶嗎？想要的話可以全部給你，去找吧！我把所有的財寶都放在那裡了。
          </blockquote>
          <h1>專長領域</h1>
          <ul>
            <li>Full Stack (MERN Stack) Web Development</li>
            <li>Nodejs, Expressjs, Reactjs, Redux, MySQL</li>
          </ul>
        </Col>
      </Row>
    </Grid>
  </PageLayout>
);

export default ResumePage;
