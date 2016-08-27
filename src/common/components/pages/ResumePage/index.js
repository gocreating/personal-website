import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Container from '../../main/Container';

const ResumePage = (props) => (
  <PageLayout>
    <section className="success">
      <Container>
        <div className="row">
          <div className="col-lg-12">
            <img
              className="img-circle"
              style={{ width: 200 }}
              src="/img/avatar.jpg" alt=""
            />
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
          </div>
        </div>
      </Container>
    </section>

    <section>
      <Container>
        <div className="row">
          <div className="col-lg-12">
            <h1>專長領域</h1>
            <ul>
              <li>Full Stack (MERN Stack) Web Development</li>
              <li>Nodejs, Expressjs, Reactjs, Redux, MySQL</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  </PageLayout>
);

export default ResumePage;
