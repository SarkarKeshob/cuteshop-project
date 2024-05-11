import PropTypes from 'prop-types';
const InfoBox = ({ value }) => {
    const { title, borderStyle, count, icon } = { ...value }
    return (
        <div>
            <div className={`card bg-white shadow-xl ${borderStyle}`}>
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-slate-700">{title}</h2>
                    <div className='flex justify-between items-center mt-5'>
                        <h3 className='text-3xl font-medium text-slate-500'>{count}</h3>
                        <span>{icon}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

InfoBox.propTypes = {
    value: PropTypes.object,
}
export default InfoBox;