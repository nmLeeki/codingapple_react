import { configureStore, createSlice } from '@reduxjs/toolkit';

let user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age: 20 },
    reducers: {
        changeName(state) {
            state.name = 'park';
        },
        plus(state) {
            state.age += 1;
        },
    },
});

let stock = createSlice({
    //usestate 역할
    name: 'stock',
    initialState: [10, 11, 12],
});

let cart = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addCount(state, action) {
            let 번호 = state.findIndex((a) => {
                return a.id === action.payload;
            });
            state[번호].count++; // action 매개변수를 쓸때는 뒤에 payload를 무조건 붙여준다.
        },
        store(state, action) {
            //이미 스테이트안에 있으면 수량만 추가하고
            //스테이트 안에 없으며 action.payload를 통해 데이터를 push 한다
            let 판별 = state.findIndex((a) => {
                return a.id == action.payload.id;
            });

            if (판별) {
                state.push(action.payload);
            } else {
                state[판별].count += 1;
            }
        },
    },
});

export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cart: cart.reducer,
    },
});
export let { changeName, plus } = user.actions;
export let { addCount, store } = cart.actions;

// 리덕스를 쓰기위한 스탭

// step 1

// npm install @reduxjs/toolkit react-redux 외부 라이브러리이기 때문에 npm 에서 인스톨해준다

// step 2

// index.js 에서 이  state저장소를 모든 컴포넌트에서 쓸 수 있게끔 선언을 해줘야하는데

// import { Provider } from 'react-redux'; provider 라는 문법을 import 해주고

// import store from './store.js' store.js 도 import 해준다

//   <Provider store={store}>
//<BrowserRouter>
//<App />
//</BrowserRouter>
//</Provider>
// 전체 컴포넌트를 provider로 감싼 뒤에 props를 쓸 수 있는것 처럼 store={store} 이렇게 선언해준다

// step 3

// src안에 보관할 js ex) store.js를 만들어서 state를 보관한다.

// step 4

// 가져다 쓸 state를 redux 문법에 맞게 코딩한다.

// configureStore -> state를 등록하는것 쉽게말해 등록해야 다른 컴포넌트에서 사용할 수 있다.

// createSlice -> state를 만듦 name과 initialstate 을 이용하여 state를 만든다. usestate역할과 동일하다

// step 5

// 이제 보낼 준비는 끝났고 갖다 쓸 경우에는 갖다 쓸 컴포넌트에다가

// import { useSelector } from 'react-redux';  useSelector를 import 해주고

// let state = useSelector((state) => {
//    return state;
// });
// 이런식으로 변수로 저장하여 useSelector로 불러오면 된다.
// state라는 변수를 cart에서 출력해보면 현재 저장하고 있는 state들을 불러올 수 있다.
// 여기서 state.작명한name 을 출력해보면 해당 작명한 값들만 출력되는것을 볼 수 있다.

// state 변경함수 redux로 활용하는 방법

//step1

// slice 안에 reducers : {} 안에 함수를 만든다
// reducers : {
//    changeName(state){
//        return 'john ' + state
//      }
//    }
// 예시로는 위의 reducers가 되는데 안에 함수는 changeName을 만들고 매개변수라는 state는
// 기존의 가진 state를 의미하기때문에
// return 한 state 변경함수는 console에 찍어보면 'john kim' 이 나오는 걸 확인할 수 있다.

//step2

// changeName 을 export해야 다른 컴포넌트에서도 쓸 수 있는데
// export let { changeName } = user.actions  -> state 변경함수가 전부 그 자리에 출력

//step3

// 처음에 import해서 갖다쓸때에는 가져다 쓸 컴포넌트에다가
// import를  useSelector 만 해서 state를 가져올 수 있었는데
// state변경함수를 쓸려면 useDispatch 를 가져와야한다.
// 똑같이 import { useDispatch, useSelector } from 'react-redux'; 를 import 해주고
// store.js export했던 changeName을
// import { changeName } from "./../store.js" import 해준다 - cart.js 에서 import 하기 때문에 경로가 저런거
// 자 이제 모든 준비는 끝났고 변경함수를 쓸려면
// useDispatch를 바로 쓸 수는 없고 변수에다가 저장해놔야한다.
// let dispatch = useDispatch(); 함수를 저장해놓고
// 버튼을 클릭할때 state변경 함수를 실행해주세요 라는 이벤트를 걸면 끝이다
//  <button
// onClick={() => {
//    dispatch(changeName());
// }}
// >
// onClick 이벤트안에 dispatch를 넣었는데 redux문법적으로 무조건 dispatch를 넣어야 실행이 된다
