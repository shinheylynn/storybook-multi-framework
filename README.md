<p align="center">
<img src="https://github.com/shinheylynn/storybook-multi-framework/assets/84219519/4c39a800-aa1f-41ca-bcf0-fb377b64bb53" align="center" width="50%" />
<br/>
<br/>
<img src="https://github.com/shinheylynn/storybook-multi-framework/assets/84219519/18025217-01c9-41e2-b068-bf140b31dd54" align="center" width="15%" />
<img src="https://github.com/shinheylynn/storybook-multi-framework/assets/84219519/ef44290e-e90a-4f30-a329-83020496be46" align="center" width="15%" />
<img src="https://github.com/shinheylynn/storybook-multi-framework/assets/84219519/e9a8fdf8-95fd-4c23-95ba-da8f98fef2f6" align="center" width="15%" />
</p>

<br/>

<p align="center">
<img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"><img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"><img src="https://img.shields.io/badge/chromatic-FC521F?style=for-the-badge&logo=chromatic&logoColor=white"><img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"><img src="https://img.shields.io/badge/vue-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
</p>

<br/>

# Project 소개

### 📌 문제점
* Vue.js를 사용하는 [Moreden](https://moreden.co.kr/) 
* React.js를 사용하는 [Medistream](https://auth.medistream.co.kr/login?client_id=01FSRJ9QBKT85VMM0RA4VC4FG3&redirect_uri=https://members.medistream.co.kr/auth/callback&response_type=code)
  
두 사이트 모두 동일한 UI 컴포넌트들을 사용하고 있으나, 프레임워크가 다르기 때문에 각기 다른 저장소에서 관리 중이었음.

컴포넌트에 업데이트가 생기면 두 저장소에서 모두 수정해야 한다는 번거로움이 있었기 때문에, 효율도를 높이기 위해서 다양한 프레임워크들을 하나의 저장소에서 관리할 수 있도록 한다.

💡 목표한 바를 이루고자 [`Storybook`](https://storybook.js.org/)의 **`composition`** 기능을 활용하여 구조를 설계한다.

<br/>

### <img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"> 에 대해

1. [Storybook 튜토리얼](https://storybook.js.org/tutorials/intro-to-storybook/vue/en/get-started/) 읽어보기
2. UI 컴포넌트 생성 후 [디자인 시스템으로 제작하는 방법](https://storybook.js.org/tutorials/design-systems-for-developers/)
3. [공식 문서](https://storybook.js.org/) 읽어보기
4. [Composition](https://storybook.js.org/docs/react/sharing/storybook-composition#page-top) 기능에 대해 읽어보기

<br/>

## Storybook Multi-Framework 작업: 
*(편의상 React library를 framework로 지칭함.)*

2개 이상의 프레임워크를 하나의 Storybook으로 합쳐서 하나의 레포로 관리한다. 이를 통해 다수의 프레임워크로 작성된 UI들을 효율적으로 관리할 수 있도록 한다.

<p align="center">
<img src="https://github.com/shinheylynn/storybook-multi-framework/assets/84219519/619c590a-1a96-4948-a9c9-07ea8fdf3359" align="center" width="50%" />
</p>

<br/>

### Architecture:
```
root
ㄴ .storybook
	 story는 없고, react와 vue를 composition하는 storybook.
ㄴ stories
	 root-storybook이 동작하기 위한 최소 하나 이상의 story가 존재한다.
ㄴ components
	 UI 컴포넌트 구성하는 jsx, vue 파일들이 모여있다.
ㄴ [+] react-storybook
	components 내 jsx를 import하는 story들이 모여있다.
ㄴ [+] vue-storybook
	components 내 vue를 import하는 story들이 모여있다.
```

<br/>

### <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"> & <img src="https://img.shields.io/badge/chromatic-FC521F?style=for-the-badge&logo=chromatic&logoColor=white"> 배포:
본 프로젝트는 `root storybook`을 제외한 각 Framework Storybook들을 [`Chromatic`](https://www.chromatic.com/)을 이용하여 배포한다.
* `root storybook`은 회사 내 규정대로 [`AWS S3`](https://aws.amazon.com/ko/s3/getting-started/?trk=919c3162-c8f1-4d4c-baec-33fb3fcc1988&sc_channel=ps&ef_id=Cj0KCQjwm66pBhDQARIsALIR2zBG-HSy4a78wGK5mOv4LzXDb30QAs_ug03YWfKSa2BmOlyLsXGGINcaApwNEALw_wcB:G:s&s_kwcid=AL!4422!3!536452699328!e!!g!!aws%20s3!11547526035!116491964390)를 이용하여 배포함.

<br/>

# Pipeline
```
pipelines:
  branches:
    develop:
      - step:
          name: Build
          deployment: Production
          image: node:18
          script:
            - npm install
            - npm run build-storybook
          artifacts:
            - storybook-static/**
      - step:
          name: Deploy to S3
          image: atlassian/pipelines-awscli
          script:
            - aws s3 sync --delete ./storybook-static s3://ui.integrationcorp.co.kr
            - aws cloudfront create-invalidation --distribution-id E2J4QL6EK16P4D --paths "/*"
    react:
      - step:
          name: Build & Deploy
          deployment: Production
          image: node:18
          script:
            - npm install
            - cd storybook-react
            - npm install
            - npm run build-storybook 
            - npx chromatic --project-token $REACT_STORYBOOK_TOKEN --exit-zero-on-changes
          artifacts:
            - storybook-react/storybook-static/**
    vue:
      - step:
          name: Build & Deploy
          deployment: Production
          image: node:16
          script:
            - npm install
            - cd storybook-vue
            - npm install
            - npm run build-storybook 
            - npx chromatic --project-token $VUE_STORYBOOK_TOKEN --exit-zero-on-changes
          artifacts:
            - storybook-vue/storybook-static/**
  tags:
    production-*:
      - step:
          name: Build
          deployment: Production
          image: node:18
          script:
            - npm install
            - npm run build-storybook
          artifacts:
            - storybook-static/**
      - step:
          name: Deploy to S3
          image: atlassian/pipelines-awscli
          script:
            - aws s3 sync --delete ./storybook-static s3://ui.integrationcorp.co.kr
            - aws cloudfront create-invalidation --distribution-id E2J4QL6EK16P4D --paths "/*"
```

<br/>

### `package.json` scripts:
| npm scripts               | commands                                                       |
|---------------------------|----------------------------------------------------------------|
| `"storybook"`             | "storybook dev -p 6006"                                        |
| `"storybook:react"`       | "cd storybook-react && npm install && npm run storybook"       |
| `"storybook:vue"`         | "cd storybook-vue && npm install && npm run storybook"         |
| `"build-storybook"`       | "storybook build"                                              |
| `"build-storybook:react"` | "cd storybook-react && npm install && npm run build-storybook" |
| `"build-storybook:vue"`   | "cd storybook-vue && npm install && npm run build-storybook"   |
