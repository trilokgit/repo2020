const App = () => {

    const [products, setproducts] = React.useState([]);

    const [fform, setform] = React.useState({
        name: "",
        price: ""
    });

    React.useEffect(() => {
       
        fetchProducts();

    }, [])
    function fetchProducts() {
        fetch('/api/products',)
            .then((res) => res.json())
            .then(data => {
                setproducts(data);
            });
   }

    function handlesubmit(e) {
        e.preventDefault();
        if(!fform.name || !fform.price){
            return;
        }

        fetch("/api/products", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(fform)
            
        }).then(res => res.json())
            .then(data => {
                fetchProducts();
                setform({name:"",price:""})
            })
    }

    function updateform(event,field) {
        if (field === 'name') {
            setform({
                ...fform,
                "name":event.target.value
            });
            
        } else if (field === 'price') {
            setform({
                ...fform,
                "price":event.target.value
            })
        }
    }

     const deleteProduct = (productId) => {
        fetch(`/api/products/${productId}`, {
            method: 'DELETE' // PUT , PATCH
        }).then((res) => res.json())
          .then((data) => {
            fetchProducts();
            console.log(data)
        });
    }


    return (



        <div>

            <div className="card text-dark">
                <div className="card-header">
                    Add a product
                 </div>
                <div className="card-body">
                    <form onClick={handlesubmit}>
                        <input value={fform.name} onChange={()=> updateform(event,'name')} type="text" className="form-control mt-3" placeholder="Product Name"/>
                        <input onChange={()=> updateform(event,'price')} value={fform.price} type="text" className="form-control mt-3" placeholder="Product Price" />
                        <button className="btn btn-primary mt-5" type="submit">Submit</button>
                   </form>
                </div>
  
        </div>
            
           <ul className="list-group mt-4">
            {
                    products.map((product) => {
                        return (
                            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{product.name}: </strong>
                                ${product.price}
                                </div>
                                <button className="btn" onClick={() => deleteProduct(product.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                            </button>
                            </li>
                            )
                })
            }
        </ul>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));