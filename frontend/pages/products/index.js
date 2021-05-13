import Products from "../../components/Products";
import Pagination from "../../components/Pagination";

const ProductPage = ({query}) => {
    return <div>
        <Pagination page={+query.page || 1}/>
        <Products page={+query.page || 1}/>
        <Pagination page={+query.page || 1}/>
    </div>
}

export default ProductPage