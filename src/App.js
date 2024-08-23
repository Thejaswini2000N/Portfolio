import { Provider } from "react-redux"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import store, { Persistor } from "./redux"
import { PersistGate } from "redux-persist/integration/react"
import Home from "./components/Home"
import Todo from './components/TaskView'
import './App.css'
import MultiSelecteDropDown from "./components/MultiSelecteDropDown"
import DragAndDrop from "./components/DragAndDrop"
import ShopHome from "./components/shop/ShopHome"
import TabularView from "./components/shop/TabularView"
import RecycleBin from "./components/shop/RecycleBin"
import ShopView from "./components/shop/ShopView"
import Snake from "./components/snake/Snake"
import FileExplorer from "./components/FileExplorer/FileExplorer"
import TaskHome from "./components/TodoNewVersion/TaskHome"
import Task from "./components/TodoNewVersion/Task"

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Provider store={store}>
          <PersistGate loading={'loading...'} persistor={Persistor}>
            <Link to={"/"}>Back to Home</Link>
            <Routes>
              {/* main page route */}
              <Route path="/" element={
                <div>
                  LLDs
                  <div><Link to={`/todo-app`}>Todo App</Link></div>
                  <div><Link to={`/multi-select`}>MultiSelecteDropDown</Link></div>
                  <div><Link to={`/drag-and-drop`}>DragAndDrop</Link></div>
                  <div><Link to={`/shop`}>Shop</Link></div>
                  <div><Link to={`/snake`}>Snake and Ladder</Link></div>
                  <div><Link to={`/file-explorer`}>File Explorer</Link></div>
                  <div><Link to='/task-home'>Todo Version 2</Link></div>
                </div>
              } />
              {/* For todo */}
              <Route path="todo-app/" element={
                <div className="home-container">
                  <Home />
                </div>
              } />
              {/* Individual task */}
              <Route path="todo-app/task/:id" element={
                <div className="home-container">
                  <Todo />
                </div>
              } />
              {/* For Multiselect */}
              <Route path="multi-select" element={
                <div>
                  <MultiSelecteDropDown />
                </div>
              } />
              {/* For Drag and drop */}
              <Route path="drag-and-drop" element={
                <div>
                  <DragAndDrop />
                </div>
              } />
              {/* For Shop has nested routes */}
              <Route path="shop" element={
                <div className="shop-container">
                  <ShopHome />
                </div>
              }>
                <Route path="view" element={
                  <div>
                    <ShopView />
                  </div>
                } />
                <Route path="table" element={
                  <div>
                    <TabularView />
                  </div>
                } />
                <Route path="recycle" element={
                  <div>
                    <RecycleBin />
                  </div>
                } />
              </Route>
              {/* Snake and ladder */}
              <Route path="snake" element={
                <div>
                  <Snake />
                </div>
              } />
              {/* FileExplorer */}
              <Route path="file-explorer" element={
                <div>
                  <FileExplorer />
                </div>
              } />
              {/* Todo App version 2 */}
              <Route path="task-home" element={
                <div>
                  <TaskHome />
                </div>
              } />
              <Route path="task/:id" element={
                <div>
                  <Task />
                </div>
              } />
            </Routes>
          </PersistGate>
        </Provider>
      </Router>
    </div>
  )
}

export default App