import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

function Settings() {

   return (
         <div className="container">
            <div className="row">
               <h1> Choose your preferences! 🎨 </h1>
            </div>
            <br></br>
            <div className="row content-row"> 
               <h2> Pick your interests ✍️</h2>
               <br></br>
               <div className="input-control" style={{ width: '30rem' }}>
                  <input
                     type="text"
                     
                     name={'title'}
                     placeholder="Add your interest"
                  
                  />
               </div>
               <div className="selects input-control">
                  <select required name="category" id="category">
                     <option value="" disabled >Select Option</option>
                     <option value="salary">Salary</option>
                     <option value="freelancing">Freelancing</option>
                     <option value="investments">Investments</option>
                     <option value="stocks">Stocks</option>
                     <option value="bitcoin">Bitcoin</option>
                     <option value="bank">Bank Transfer</option>
                     <option value="youtube">Youtube</option>
                     <option value="other">Other</option>
                  </select>
               </div>
            </div>  
         </div>

   )
}

const SettingsStyled = styled.form`
   display: flex;
   flex-direction: column;
`;

export default Settings

// cum trebuie sa modific stilul ca sa adaug spatiu intre fiecare div fara sa pun br