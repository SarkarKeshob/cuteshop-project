import { useContext, useEffect } from "react";
import { ProductContext } from "../../Products";
import { useSelector } from "react-redux";

const Pagination = () => {
    const { currentPage, setCurrentPage, productsPerPage, setPaginatedProducts } = useContext(ProductContext);
    const filteredProducts = useSelector(state => state.filter.filteredProducts);
    const numberOfProducts = filteredProducts.length;
    const numberOfPages = Math.ceil(numberOfProducts / productsPerPage);
    const paginationNumber = [];
    if (numberOfPages > 0) {
        for (let i = 1; i <= numberOfPages; i++) {
            paginationNumber.push(i);
        }
    }
    useEffect(() => {
        const lastIndex = currentPage * productsPerPage;
        const firstIndex = lastIndex - productsPerPage;
        const productsInPage = filteredProducts.slice(firstIndex, lastIndex);
        setPaginatedProducts(productsInPage);
    }, [currentPage, filteredProducts, productsPerPage, setPaginatedProducts]);


    const handleCurrent = (e) => {
        setCurrentPage(Number(e.target.innerText));
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1);

    }


    return (
        <div className="w-fit mx-auto">
            <div className="join">
                <button className={currentPage - 1 === 0 ? 'hidden' : "btn btn-outline border-r-2 border-black"} onClick={handlePrev}>Prev</button>

                {paginationNumber.map((n, index) => <button key={index} onClick={handleCurrent} className={currentPage === n ? "join-item btn btn-active" : "join-item btn"}>{n}</button>)}
                <button className={currentPage + 1 > numberOfPages ? 'hidden' : "btn btn-outline border-l-2 border-black"} onClick={handleNext}>Next</button>

            </div>


        </div>
    );
};

export default Pagination;