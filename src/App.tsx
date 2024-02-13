import './App.css';

import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"


import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <div style={{position:"relative"}}>        
        <div style={{borderRight: "solid", width: "15%",float:"left", height:"100vh", position:"fixed"}} className='bg-secondary-subtle'>
          <div className='m-2'>
            <b className='fs-5'>Menu</b>
            <div style={{marginTop: "5%", marginLeft: "5%"}}>
              <Link to="/" style={{marginLeft: "5px"}} className='btn btn-link'>Dashboard</Link>
              <p className='btn btn-link mx-1'>Upcoming Deadlines</p>
              <p className='btn btn-link mx-1'>Nuclear Launch Codes</p>
              <p className='btn btn-link mx-1'>More Stuff...</p>
            </div>
          </div>  
        </div>

        <div style={{width: "83%", margin:"auto", paddingRight:"1%", float:"right"}}><div>
          <div className='d-flex mb-2' >
            <div className='p-2 flex-fill'>
              <p className='fs-3 m-2'>Agreement Dashboard App</p>
            </div>
            <div className=' mx-5 flex'>
              <DropdownMenu>
                <DropdownMenuTrigger className='mb-3 pt-3'>
                    <span>You're logged in as: <span className='mt-2 link-primary'>Admin Person</span></span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><b>Logout</b></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <hr/>
          <br/>
        </div>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;