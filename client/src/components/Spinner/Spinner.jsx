import loadImg from '../../assets/others/loader.gif'
const Spinner = () => {
    return (
        <div className="h-screen flex justify-center items-start">
            <img className='h-64 rounded-md w-40 object-cover' src={loadImg} alt="" />
        </div>
    );
};

export default Spinner;