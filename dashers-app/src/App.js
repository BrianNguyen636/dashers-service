import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import RestaurantPage from "./ResPage";
function App() { 
return ( 
<div className="app"> 
<BrowserRouter> 
<Routes> 
  <Route path="/" element={<RestaurantPage />} />
</Routes> 
</BrowserRouter> 
</div> 
); 
} 
export default App; 