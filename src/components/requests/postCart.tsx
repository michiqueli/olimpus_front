import { PostCartInterface } from "../interfaces";
const postCart = async (data: PostCartInterface[]) => {
    try {
          const response = await fetch(`${process.env.NEXTPu}/payments/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            const errorMessage = await response.text();
    
            if (response.status === 401) {
              window.location.href = '/';
            } else {
              throw new Error(`Error al crear la transacción: ${errorMessage}`);
            }
          }
          const responseData = await response.json();
          return responseData
      } catch (error) { 
        if (error instanceof Error) {
          window.alert(error.message);
        } else {
          window.alert("Ocurrió un error, reintente por favor.");
        }
  
    };
}

export default postCart;
