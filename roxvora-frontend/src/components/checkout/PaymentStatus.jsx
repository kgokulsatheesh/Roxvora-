import { Link } from 'react-router-dom';
import { FiCheck, FiXCircle } from 'react-icons/fi';

const PaymentStatus = ({ status = 'success', orderNumber }) => {
    const isSuccess = status === 'success';
    return (
        <div className="text-center py-12">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
                {isSuccess
                    ? <FiCheck className="w-10 h-10 text-green-600" aria-hidden="true" />
                    : <FiXCircle className="w-10 h-10 text-red-600" aria-hidden="true" />
                }
            </div>
            <h2 className="text-2xl font-secondary font-bold text-primary mb-2">
                {isSuccess ? 'Payment Successful' : 'Payment Failed'}
            </h2>
            {isSuccess && orderNumber && (
                <p className="text-secondary mb-6">Your order <strong>{orderNumber}</strong> has been placed.</p>
            )}
            {isSuccess
                ? <Link to="/account/orders" className="btn btn-primary">View Orders</Link>
                : <Link to="/checkout" className="btn btn-primary">Try Again</Link>
            }
        </div>
    );
};

export default PaymentStatus;
