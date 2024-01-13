// Home.js
import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {

    const data = {
        title: "Happy Cat Goods",
        content: "Happiness is finding all your cat needs",
        destination: "/products",
        label: "Shop now!"
    }

    return (
        <>
            <Banner data={data}/>
            <FeaturedProducts />
        </>
    )
}
