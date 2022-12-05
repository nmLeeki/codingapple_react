import { useNavigate } from 'react-router-dom';
function Card(props) {
    let navigate = useNavigate();
    let num = Number(props.shoes.id);
    return (
        <div
            className="col-md-4"
            onClick={() => {
                navigate('./detail' + '/' + props.shoes.id);
            }}
        >
            <img src={'https://codingapple1.github.io/shop/shoes' + (num + 1) + '.jpg'} width="80%" />
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.content}</p>
        </div>
    );
}

export default Card;
