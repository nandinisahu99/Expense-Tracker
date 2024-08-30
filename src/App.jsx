import React, { useState } from 'react';
import styled from 'styled-components';
import Auth from './components/Trans';
import { MainLayout } from './styles/Layout';
import Navigation from './components/Navigation';
import image from './assets/bg.png'
import Dashboard from './components/Dashboard';
import Income from './components/Income';
import Expenses from './components/Expenses';
import { useGlobalContext } from './context/ContextApi';

function App() {
  const [active,setActive]=useState(1);
  
  const global=useGlobalContext();
  console.log(global);

  const Data=()=>{
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4:
        return <Expenses />
      default:
        return <Dashboard />
    }
  }

  return (
    <Appstyle bg={image} className="App">
      {/* <Auth/> */}
      <MainLayout>
          <Navigation active={active} setActive={setActive}/>
          <main>
            {Data()}
          </main>
      </MainLayout>
    </Appstyle>
  )
}
const Appstyle=styled.div`
  height:100vh;
  background-image:url(${props=>props.bg});
  position:relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 10px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
`;
export default App;
