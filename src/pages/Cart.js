import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { plus, addCount } from './../store.js';
function Cart() {
    let state = useSelector((state) => {
        return state;
    });
    console.log(state.user);
    let dispatch = useDispatch();
    return (
        <div>
            {state.user.name} {state.user.age} 의 장바구니
            <button
                onClick={() => {
                    dispatch(plus());
                }}
            >
                버튼
            </button>
            <Table>
                {state.cart.map((a, i) => (
                    <tr key={i}>
                        <td>{state.cart[i].id}</td>
                        <td>{state.cart[i].name}</td>
                        <td>{state.cart[i].count}</td>
                        <td>
                            <button
                                onClick={() => {
                                    dispatch(addCount(state.cart[i].id));
                                }}
                            >
                                버튼임
                            </button>{' '}
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
}

export default Cart;
