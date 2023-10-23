import Sidebar from "../components/Chat/Sidebar";
import Chat from "../components/Chat/Chat";

import "../style/home.scss";

export default function Home() {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
    
  )
}
