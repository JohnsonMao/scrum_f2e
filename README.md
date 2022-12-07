# Scrum 新手村 [Demo](https://johnsonmao.github.io/scrum_f2e/)

\碰/ 歡迎進入SCRUM新手村 ， 讓村莊裡的短衝小精靈帶你一起解新手任務 《敏捷任務-最初の試煉》 吧 ！ 嗚噢，終於最後一週惹，大家一起加油八 ！！
採用 [EG](https://2022.thef2e.com/users/12061549261454740203) 設計師的設計稿

## 使用技術

- react v18
- react-router-dom v6
- canvas
- svg 動畫

## 系統說明

- Node.js 版本 `^16.0.0`
- React 版本 `^18.2.0`
- React Router 版本 `^6.4.3`
- vite 版本 `^3.1.8`

## 第三方服務

- react-beautiful-dnd 快速實作拖拉功能
- react-particles 快速實作全景背景
- dynamics.js 快速實作動畫
- vivus 快速實作 Svg 動畫

## 資料夾說明

```
|- /src
    |- /asset：共用文件
        |- /configs：設定檔
        |- /images：圖片
        |- /styles：共用 style
    |- /components：共用元件
    |- /pages：各階段頁面
```

## 如何開始

```sh
git clone https://github.com/JohnsonMao/scrum_f2e.git
npm install
npm start
```

### 心得
常常為了細節拖到完成速度，一不小心 scss 寫得很髒，Svg 真好玩，又有新想法，想重構

### 重構清單
- [ ] 使用 Linaria 重構樣式
- [ ] 優化狀態階段，避免過度依賴樣式控制階段，造成耦合
