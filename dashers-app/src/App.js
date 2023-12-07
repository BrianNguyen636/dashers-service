import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import RestaurantPage from "./pages/RestaurantPage";
import OrderSum from './pages/OrderSum';
import RestaurantDetail from "./pages/RestaurantDetail";


function App() { 
return ( 
<div className="app"> 
<BrowserRouter> 
<Routes> 
  <Route path="/res" element={<RestaurantPage />} />
  <Route path="/restaurant/detail/:RestaurantID" element={<RestaurantDetail />} />
  <Route path="/order" element={<OrderSum />} />
</Routes> 
<div id = "main"> </div>
</BrowserRouter> 
</div> 
); 
} 
export default App;
