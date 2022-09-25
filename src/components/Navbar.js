import * as ReactBootStrap from "react-bootstrap"
const Navbar = () => {
    return ( 
<ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <ReactBootStrap.Container>
  <ReactBootStrap.Navbar.Brand href="/dashboard">NRC HOMEPAGE</ReactBootStrap.Navbar.Brand>
  
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="me-auto">
      {/* <ReactBootStrap.Nav.Link href="#features">Something</ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link href="#pricing">Somethingelse</ReactBootStrap.Nav.Link> */}
   
    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>
      <ReactBootStrap.Nav.Link  onClick={()=>(document.cookie = "patient_cookie" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;')}>Log Out</ReactBootStrap.Nav.Link>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
  </ReactBootStrap.Container>
</ReactBootStrap.Navbar>

);
}
 
export default Navbar;




  
