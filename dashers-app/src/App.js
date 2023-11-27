import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import RestaurantPage from "./RestaurantPage";
import OrderSum from './pages/OrderSum';


function App() { 
return ( 
<div className="app"> 
<BrowserRouter> 
<Routes> 
  <Route path="/" element={<RestaurantPage />} />
</Routes> 
<div id = "main">
      <OrderSum/>
    </div>
</BrowserRouter> 
</div> 
); 
} 
export default App;
