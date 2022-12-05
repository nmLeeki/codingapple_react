import { Nav } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './../store.js';
function Detail(props) {
    let { id } = useParams();
    let [show, setShow] = useState(true);
    let navigate = useNavigate();
    let [txt, setTxt] = useState('');
    let [탭, 탭변경] = useState(0);
    let 찾은상품 = props.shoes.find(function (x) {
        return x.id == id;
    });
    let num = Number(찾은상품.id);
    let state = useSelector((state) => {
        return state;
    });
    let dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 2000);
    }, []);
    useEffect(() => {
        if (isNaN(txt) == true) {
            alert('그러지마세요');
        }
    }, [txt]);
    useEffect(() => {
        let 꺼낸거 = localStorage.getItem('watched');
        꺼낸거 = JSON.parse(꺼낸거);
        꺼낸거.push(찾은상품.id);

        //Set으로 바꿨다가 다시 array로 만들기 왜 why 중복을 제거하기 위해서
        꺼낸거 = new Set(꺼낸거);
        꺼낸거 = Array.from(꺼낸거);
        localStorage.setItem('watched', JSON.stringify(꺼낸거));
        console.log(localStorage.getItem('watched'));
    }, []);
    return (
        <div className="row">
            {show == true ? <div className="alert alert-warning">2초후 박스가 사라집니다.</div> : null}
            <input
                onChange={(e) => {
                    setTxt(e.target.value);
                }}
            />
            <div className="col-md-6">
                <img src={'https://codingapple1.github.io/shop/shoes' + (num + 1) + '.jpg'} width="100%" />
            </div>
            <div className="col-md-6">
                <h4 className="pt-5">{찾은상품.title}</h4>
                <p>{찾은상품.content}</p>
                <p>{찾은상품.price}</p>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        dispatch(store({ id: 찾은상품.id, name: 찾은상품.title, count: 1 }));
                        console.log(state.cart);
                    }}
                >
                    주문하기
                </button>
                <button
                    onClick={() => {
                        navigate('/cart');
                    }}
                >
                    장바구니로 가기
                </button>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link
                        onClick={() => {
                            탭변경(0);
                        }}
                        eventKey="link0"
                    >
                        버튼0
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => {
                            탭변경(1);
                        }}
                        eventKey="link1"
                    >
                        버튼1
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => {
                            탭변경(2);
                        }}
                        eventKey="link2"
                    >
                        버튼2
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭} />
        </div>
    );
}

function TabContent(props) {
    if (props.탭 === 0) {
        return <div>내용0</div>;
    }
    if (props.탭 === 1) {
        return <div>내용1</div>;
    }
    if (props.탭 === 2) {
        return <div>내용2</div>;
    }
}

export default Detail;
