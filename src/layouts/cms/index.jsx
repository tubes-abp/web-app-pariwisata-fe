import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import OrganismsCmsSidebar from '../../components/organisms/cms/sidebar'
import OrganismsCmsContent from '../../components/organisms/cms/content'
import { get_data } from '../../redux/actions/main';
import { ownerMenu, cashierMenu } from './menu';


import './style.scss' 

const LayoutsCms = (props) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([])
  const [selectedMenu, setSelectedMenu] = useState([])
  const [openMenu, setOpenMenu] = useState([])
  const location = useLocation();
  const history = useHistory();  
  
  const role = location.pathname.split("/")[1];
  useEffect(() => {
    dispatch(get_data(`/${role}s/current`, 'user_data'));
  }, [dispatch, role]);

  const { user_data } = useSelector(state => state.main);

  
  useEffect(() => {
    getMenu(role)
    // eslint-disable-next-line
  }, [location])
  useEffect(() => {
    checkMenu()
    // eslint-disable-next-line
  }, [list, location])
  const getMenu = (menuMode) => {
    if (menuMode === 'owner') {      
      setList(ownerMenu)      
    } else if (menuMode === 'cashier') {
      setList(cashierMenu)      
    }
  }
  const checkMenu = async () => {
    setSelectedMenu([props.activeMenu.key || '']);
    setOpenMenu([props.activeMenu.openKey || '']);
  }  
  const goToMenu = (url) => {
    history.push(url)
  }
  const handleOpenChange = (key) => {    
    setOpenMenu(key)
  }
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    history.push(`/login/${role}`)
  }
  return (
    <div className="l-cms">
      <OrganismsCmsSidebar
        role={role}
        profileData={user_data}
        activeMenu={selectedMenu}
        openSubMenu={openMenu}
        goToMenu={goToMenu}
        handleOpenChange={handleOpenChange}
        handleLogout={handleLogout}
        list={list}
      />
      <OrganismsCmsContent breadcrumb={props.breadcrumb}>
        {props.children}
      </OrganismsCmsContent>
    </div>
  )
}

export default LayoutsCms
