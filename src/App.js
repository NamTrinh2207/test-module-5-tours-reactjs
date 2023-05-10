import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Nav from "./component/Nav";
import ListTours from "./component/ListTours";
import CreateForm from "./component/CreateForm";
import UpdateForm from "./component/UpdateForm";
import ViewsDetail from "./component/ViewsDetail";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Nav />
            <Routes>
                <Route path={"/"} element={<ListTours />}></Route>
                <Route path={"/create"} element={<CreateForm />}></Route>
                <Route path={"/update/:id"} element={<UpdateForm />}></Route>
                <Route path={"/views/:id"} element={<ViewsDetail />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;
