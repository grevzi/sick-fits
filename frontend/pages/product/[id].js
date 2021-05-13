import SingleProduct from "../../components/SingleProduct";

const ProductItemPage = ({query}) => {
    return (
        <div>
            <SingleProduct id={query.id} />
        </div>
    )
}

export default ProductItemPage