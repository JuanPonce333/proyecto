const stripe = Stripe('pk_test_51QNGGuD7U0ZsSgHhMvmNeHjKBjJgJ9op7ZiH6qI0m7vCLlpZ95JSWYXZB6SazrTbJJsKb9ugwVytlGjX5gcZu3vE00KSimNXdS');

const elements = stripe.elements();
const cardElement = elements.create('card');

cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { paymentIntent, error } = await stripe.confirmCardPayment('CLIENT_SECRET_DE_PREPAGO', {
        payment_method: {
            card: cardElement,
            billing_details: {
                name: 'Nombre del Cliente',
            },
        },
    });

    if (error) {
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
    } else {
        alert('Pago realizado con éxito');
        // Aquí puedes redirigir al usuario o actualizar tu base de datos
    }
});
