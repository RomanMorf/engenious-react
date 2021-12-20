import { createContext, useMemo, useState } from "react";
import GET_PRODUCTS_QUERY from "../queries/get-products";
import client from "../client";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const apiURL = process.env.REACT_APP_WORDPRESS_API_URL;
  const [products, setProducts] = useState([]);

  const sendForm = async (formId, data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      return await fetch(
        `${apiURL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
        { method: "POST", body: formData }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const getProducts = async () => {
    try {
      const {
        data: { products },
      } = await client.query({
        query: GET_PRODUCTS_QUERY({}),
      });

      setProducts(products);
    } catch (e) {
      console.log(e);
    }
  };

  
  const value = useMemo(
    () => ({ sendForm, getProducts, products }),
    // eslint-disable-next-line
    [products]
  );
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

// -----------------
export default function Wholesale() {
  const { products, getProducts } = useContext(GlobalContext);

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products)
}