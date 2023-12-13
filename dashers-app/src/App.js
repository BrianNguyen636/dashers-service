import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import RestaurantPage from "./pages/RestaurantPage";
import OrderSum from './pages/OrderSum';
import RestaurantDetail from "./pages/RestaurantDetail";
import MapPage from "./pages/mapPage";
import RegistrationPage from "./pages/RegistrationPage";
import HistoryPage from "./pages/HistoryPage";

function App() { 
return ( 
<div className="app"> 
<BrowserRouter> 
<Routes> 
  <Route path="/"element={<Navigate to="/user" replace />}/>
  {/* Temporary, need to replace /home link to point towards actual home page, 
      probs just point to user registration page like we discussed */}
  <Route path="/home/:CustomerID" element={<RestaurantPage />} />
  <Route path="/user" element={<RegistrationPage />} />
  <Route path="/res/:CustomerID" element={<RestaurantPage />} />
  <Route path="/restaurant/detail/:RestaurantID/:CustomerID" element={<RestaurantDetail />} />
  <Route path="/order/:CustomerID" element={<OrderSum />} />
  <Route path="/map/:CustomerID" element={<MapPage />} />
  <Route path="/history/:CustomerID" element={<HistoryPage />} />

</Routes> 
<div id = "main"> </div>
</BrowserRouter> 
</div> 
); 
} 
export default App;
