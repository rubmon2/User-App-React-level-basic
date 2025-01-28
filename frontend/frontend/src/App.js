import { Route, Routes } from 'react-router-dom';
import './index.css';
import { RegisterPage } from './page/RegisterPage.js';
import { LoginPage } from './page/LoginPage.js';
import { HomePage } from './page/HomePage.js';
import {
  FooterComponent,
  NavBarComponent,
  ProtectedRoutes,
} from './component/index.js';
import { ProfilePage } from './page/ProfilePage.js';

function App() {
  return (
    <div>
      <NavBarComponent></NavBarComponent>
      <main>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="Login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route element={<ProtectedRoutes></ProtectedRoutes>}>
            <Route
              path="/profile"
              element={<ProfilePage></ProfilePage>}
            ></Route>
          </Route>
        </Routes>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
