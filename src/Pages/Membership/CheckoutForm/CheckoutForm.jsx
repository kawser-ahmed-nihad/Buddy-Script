import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {

            const res = await axiosSecure.post('/api/create-payment-intent', { amount: 1000 });
            const clientSecret = res.data.clientSecret;


            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setError(result.error.message);
                setLoading(false);
                return;
            }

            if (result.paymentIntent.status === 'succeeded') {
                Swal.fire("Payment Successful", `Transaction ID: ${result.paymentIntent.id}`, "success");



                const paymentInfo = {
                    email: user.email,
                    amount,
                    transactionId: result.paymentIntent.id,
                    date: new Date(),
                    status: 'succeeded'
                };

                await axiosSecure.post('/api/payments', paymentInfo);


                await axiosSecure.patch(`/api/users/status/${user.email}`, {
                    status: 'gold'
                });

                Swal.fire("Success!", "Membership upgraded to Gold 🎉", "success");


                queryClient.invalidateQueries(['user']);
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-4 shadow-md rounded">
                <CardElement className="p-2 border rounded" />

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="bg-[#cc5429] text-white px-4 py-2 rounded hover:bg-[#e35b2c] w-full"
                >
                    {loading ? 'Processing...' : `Pay ${amount}`}
                </button>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
