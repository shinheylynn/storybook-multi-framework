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
[`Storybook`](https://storybook.js.org/)의 **`composition`** 기능을 활용하여 **`Vue.js framework과 React.js framework를 하나의 공간에서 관리`** 할 수 있도록 한다.

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

