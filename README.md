<p align="center">
<img src="https://github.com/shinheylynn/storybook-multi-framework/assets/84219519/4c39a800-aa1f-41ca-bcf0-fb377b64bb53" align="center" width="50%" />
<br/>
<br/>
<img src="https://github.com/shinheylynn/storybook-multi-framework/assets/84219519/18025217-01c9-41e2-b068-bf140b31dd54" align="center" width="15%" />
<img src="https://github.com/shinheylynn/storybook-multi-framework/assets/84219519/ef44290e-e90a-4f30-a329-83020496be46" align="center" width="15%" />
<img src="https://github.com/shinheylynn/storybook-multi-framework/assets/84219519/e9a8fdf8-95fd-4c23-95ba-da8f98fef2f6" align="center" width="15%" />
</p>

<br/>

# Projects
*(편의상 React library를 framework로 지칭함.)*
### Multi-Framework 작업: 
[`Storybook`](https://storybook.js.org/)의 **`composition`** 기능을 활용하여 **`Vue framework과 React library를 하나의 공간에서 관리`** 할 수 있도록 한다.

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

### 배포:
본 프로젝트는 각 Framework Storybook들을 [`Chromatic`](https://www.chromatic.com/)을 이용하여 배포한다.

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
- 이 프로젝트는 어떻게 작동하는가?

프로젝트를 시작하는 방법: 프로젝트를 처음 사용하기 위해 필요한 내용을 포함합니다.

- 프로젝트를 설치, 사용하기 위해 필요한 전제조건이 있는가?
- 어떻게 설치, 사용, 테스트하는가?
- 설치 가이드 문서는 어디에 있는가?

저작권, 라이선스 정보: 프로젝트의 사용 범위 및 조건을 설명하는 내용을 포함합니다.

- 어떤 라이선스로 배포되는가?
- 상세한 라이선스 정보는 어디에서 확인할 수 있는가?
- 프로젝트를 사용함에 있어 제약 조건이 있는가(특허, 상업적 사용)?

외부 리소스 정보: 프로젝트 내에 포함된 외부의 코드나 리소스의 정보를 포함합니다.

- 각각의 출처 및 배포 라이선스는 무엇인가?
- 이러한 질문 이외에도 컨트리뷰션 진행 방법이나 버그 신고 방법, 사용자 질문을 올리는 방법 등에 대한 정보를 포함할 수도 있습니다.
