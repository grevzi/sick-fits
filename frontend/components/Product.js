import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import Link from "next/link";
import PriceTag from "./styles/PriceTag";
import {formatMoney} from "../lib/formatMoney";
import DeleteProductButton from "./DeleteProductButton";

const Product = ({product}) => {
    return (
        <ItemStyles>
            <img src={product?.photo?.image?.publicUrlTransformed} alt={product?.photo?.altText}/>
            <Title>
                <Link href={`/product/${product.id}`}>{product.name}</Link>
            </Title>
            <PriceTag>{formatMoney(product.price)}</PriceTag>
            <p>{product.description}</p>
            <div className="buttonList">
                <Link href={{
                    pathname: '/update',
                    query: {
                        id: product.id
                    }
                }}>
                    Edit 📝
                </Link>

                <DeleteProductButton id={product.id}>
                    Delete 🗑
                </DeleteProductButton>
            </div>
        </ItemStyles>
    )
}

export default Product