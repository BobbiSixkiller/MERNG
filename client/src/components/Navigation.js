import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom';

import { AuthContext } from '../context/auth';

export default function Navigation() {
  const { user, logout } = React.useContext(AuthContext);
  const { pathname } = useLocation();
  
  const path = pathname === "/" ? ("home") : pathname.substring(1);
  const [ activeItem, setActiveItem ] = React.useState(path);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    if (name === 'logout') {
      logout();
      setActiveItem('home');
    }
  }

  const NavMenu = user ? (
    <Menu pointing secondary size="massive">
      <Menu.Item
        name={user.username}
        active
        as={Link}
        to="/"
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive">
      <Menu.Item
        name={'home'}
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
      </Menu.Menu>
    </Menu>
  )
  
  return NavMenu;
}