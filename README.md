# Scrum 新手村 [Demo](https://johnsonmao.github.io/scrum_f2e/)

![React 18](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

參加 [The F2E 4rd](https://2022.thef2e.com/users/12061549261446456233) Week-3 Scrum 新手村
採用 [EG](https://2022.thef2e.com/users/12061549261454740203) 設計師的設計稿

## 使用技術

- React v18
- React Router Dom v6
- Canvas
- Svg 動畫
- Linaria

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
    |- /asset ： 共用文件
        |- /configs ： 設定檔
        |- /images ： 圖片
        |- /styles ： 共用 style
    |- /components ： 共用元件
    |- /contexts ： 管理 Context
    |- /hooks ： custom hook
    |- /pages ： 各階段頁面
    |- /router ： 管理 router
    |- /utils ： 共用工具
```

## 如何開始

```sh
git clone https://github.com/JohnsonMao/scrum_f2e.git
npm install
npm start
```

### 重構清單
- [x] 使用 Linaria 重構樣式
- [x] 把動畫效果狀態提升，改成由 props 來產生動畫，而不是透過 ref 直接命令
- [x] 優化狀態階段，避免過度依賴樣式控制階段，造成耦合
- [ ] 檔名調整
- [ ] 改成不用 router 控制
- [ ] 優化 DOM 結構
- [ ] 優化進度條
- [ ] 優化拖拉使用者體驗
- [ ] 優化動畫效能
