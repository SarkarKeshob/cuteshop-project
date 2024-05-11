import PropTypes from 'prop-types';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: '',
        },
    },
};

const Chart = ({value}) => {
    const orders=value;
    const findNumber=(statusText)=>{
        return (orders.filter(order=>order.orderStatus==statusText)).length;
    }
    const placed=findNumber('Order Placed');
    const shipped=findNumber('Order Shipped');
    const processing=findNumber('Processing');
    const delivered=findNumber('Delivered');
    console.log(placed,shipped,processing,delivered);
    
    const data = {
        labels:['Placed Orders','Prcessing','Shipping Orders','Delivered Orders'],
        datasets:[
            {
                label:'Order Count',
                data:[placed,processing,shipped,delivered],
                backgroundColor:'rgba(255,99,132,0.7)'
            }
        ]
    };
    return (
        <div className="card w-full lg:w-4/6 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-xl lg:text-2xl">Order Status Chart</h2>
                <Bar options={options} data={data} />
            </div>
        </div>
    );
};
Chart.propTypes = {
    value: PropTypes.array,
}
export default Chart;