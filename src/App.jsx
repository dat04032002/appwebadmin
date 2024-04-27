import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Warehouse from './pages/Warehouse'
import ProductCategories from './pages/ProductCategories'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={< Orders/>} />
                    <Route path="customers" element={< Customers/>} />
                    <Route path="warehouse" element={< Warehouse/>} />
                    <Route path="productCategories" element={<ProductCategories/>} />
                </Route>
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
