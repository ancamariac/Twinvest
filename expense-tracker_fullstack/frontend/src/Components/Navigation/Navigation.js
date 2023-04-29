import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useGlobalContext } from "../../context/globalContext";
import { NavLink } from 'react-router-dom';

function Navigation({ active, setActive }) {
   const { getUser } = useGlobalContext();

   let username = getUser().user.username;
   let page = lastWordCapitalized(window.location.href);

   if (page === 'dashboard') {
      changePage(1);
   } else if (page === 'marketnews') {
      changePage(2);
   } else if (page === 'incomes') {
      changePage(3);
   } else if (page === 'expenses') {
      changePage(4);
   } else if (page === 'marketpredictions') {
      changePage(5);
   } else if (page === 'settings') {
      changePage(6);
   } 

   function lastWordCapitalized(url) {
      return url.replace(/^.*\/([^?#\/]+).*$/, function (_, word) {
         var word = decodeURI(word);
         return word.charAt(0) + word.slice(1);
      });
   }
   function changePage(id) {
      setActive(id);
   }
   function logout() {
      sessionStorage.clear();
      window.location.href = '/';
   }

   return (
      <NavStyled>
         <div className="app-logo shine-effect">
            <h1 className="app-logo-title"> Twinvest </h1>
            <i  className="fa-solid fa-coins app-logo-icon flip"></i>
         </div>
         <div className="user-con">
            <img src={avatar} alt="" />
            <div className="text">
               <h2>{username}</h2>
               <p>Informed investments</p>
            </div>
         </div>
         <ul className="menu-items">
            {menuItems.map((item) => {
               return <li
                  key={item.id}
                  onClick={() => changePage(item.id)}
                  className={active === item.id ? 'active menu-item' : 'menu-item'}
               >
                  <NavLink
                     to={item.link}
                     onClick={() => setActive(item.id)}
                  >
                     {item.icon}
                     <span>{item.title}</span>
                  </NavLink>
               </li>
            })}
         </ul>
         <div className="bottom-nav">
            <button className="signout-button" onClick={logout}>
               {signout} &nbsp; Sign Out
            </button>
         </div>
      </NavStyled>
   )
}

const NavStyled = styled.nav`
   padding: 2rem 1.5rem;
   width: 374px;
   height: 100%;
   background: rgba(252, 246, 249, 0.78);
   border: 3px solid #FFFFFF;
   backdrop-filter: blur(4.5px);
   border-radius: 32px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   gap: 2rem;
   .user-con{
      height: 100px;
      margin-top: 40px;
      display: flex;
      align-items: center;
      gap: 1rem;
      img{
         width: 80px;
         height: 80px;
         border-radius: 50%;
         object-fit: cover;
         background: #fcf6f9;
         border: 4px solid var(--primary-color);
         padding: .2rem;
         box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
      }
      h2{
         color: rgba(34, 34, 96, 1);
      }
      p{
         color: rgba(34, 34, 96, .6);
      }
   }

   .menu-items{
      flex: 1;
      display: flex;
      flex-direction: column;

      .menu-item {
         .active span {
            color: rgba(34, 34, 96, 1);
         }
         a { 
            display: flex;
            align-items: center;
            text-decoration: none;

            i {
               padding-right: 10px;
            }

            span {
               font-weight: 600;
               font-size: 19px;
               color: rgba(34, 34, 96, 0.6);
            }
         }
      }
      li{
         display: inline-flex;
         grid-template-columns: 40px auto;
         align-items: center;
         margin: .6rem 0;
         font-weight: 500;
         cursor: pointer;
         transition: all .4s ease-in-out;
         color: rgba(34, 34, 96, .6);
         padding-left: 1rem;
         position: relative;
         i{
               color: rgba(34, 34, 96, 0.6);
               font-size: 1.6rem;
               transition: all .4s ease-in-out;
         }
      }
   }

   .active{
      color: rgba(34, 34, 96, 1) !important;
      i{
         color: rgba(34, 34, 96, 1) !important;
      }
      &::before{
         content: "";
         position: absolute;
         left: 0;
         top: 0;
         width: 4px;
         height: 100%;
         background: #222260;
         border-radius: 0 10px 10px 0;
      }
   }

   .signout-button {
      grid-template-columns: 40px auto;
      font-family: 'Nunito', sans-serif;
      align-items: center;
      font-weight: 500;
      cursor: pointer;
      transition: all .4s ease-in-out;
      color: rgba(34, 34, 96, .6);
      position: relative;
      border: none;
      justify-content: center;
      display: flex;
      background: initial;
      font-size: 20px;
      background: var(--primary-color);
      color: white;
      border-radius: 20px;
      padding: 8px 15px;
   }
   .signout-button:hover {
      background: var(--color-green);
   }
`;

export default Navigation