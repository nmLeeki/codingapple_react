import { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail';
import Card from './components/Card';
import Event from './components/Event';
import axios from 'axios';
import Cart from './pages/Cart';

function App() {
    let [shoes, setShoes] = useState(data);
    let [clickCount, setclickCount] = useState(1);
    let [rView, setrView] = useState([]);
    let navigate = useNavigate();
    // let 찾은상품 = shoes.find(function (x) {
    //     return x.id == id;
    // });
    useEffect(() => {
        localStorage.setItem('watched', JSON.stringify([]));
    }, []);

    useEffect(() => {
        let view = localStorage.getItem('watched');
        view = JSON.parse(view);
        setrView(view);
        console.log(rView);
    }, [localStorage.getItem('watched')]);
    console.log(rView);
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                navigate('/detail');
                            }}
                        >
                            detail
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <div className="main-bg"></div>
                            <div className="container">
                                <div className="row">
                                    {shoes.map((item, i) => {
                                        return <Card shoes={shoes[i]} />;
                                    })}
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setclickCount(clickCount + 1);
                                    if (clickCount == 1) {
                                        axios
                                            .get('https://codingapple1.github.io/shop/data2.json')
                                            .then((결과) => {
                                                var obj = [...shoes, ...결과.data];
                                                setShoes(obj);
                                            })
                                            .catch(() => {
                                                console.log('실패함');
                                            });
                                    } else if (clickCount == 2) {
                                        axios
                                            .get('https://codingapple1.github.io/shop/data3.json')
                                            .then((결과) => {
                                                var obj = [...shoes, ...결과.data];
                                                setShoes(obj);
                                            })
                                            .catch(() => {
                                                console.log('실패함');
                                            });
                                    } else if (clickCount > 2) {
                                        alert('더 이상 상품이 없습니다.');
                                    }
                                }}
                            >
                                버튼
                            </button>
                            <ul className="recentView">
                                {rView.map((a, i) => {
                                    let 찾은상품 = shoes.find(function (x) {
                                        return x.id == rView[i];
                                    });
                                    let num = Number(찾은상품.id);
                                    console.log(찾은상품);
                                    return (
                                        <li key={i}>
                                            <img
                                                src={'https://codingapple1.github.io/shop/shoes' + (num + 1) + '.jpg'}
                                                width="100%"
                                            />
                                            <span>{찾은상품.title}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    }
                />
                <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/event" element={<Event />}>
                    <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
                    <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
                </Route>
                <Route path="*" element={<div>없는페이지임</div>} />
            </Routes>
        </div>
    );
}

export default App;
