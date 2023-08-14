import React from 'react';
import { Header } from '../../components';
import { useState } from 'react';
import HttpClient from '../../components/HttpClient';
import toast from "react-hot-toast"

const AddUnit = () => {
    const [unitName , setUnitName] = useState('');

    const addUnit = async(e) => {
        let data = {
            name:unitName
        }
        e.preventDefault();
        if(unitName){
            let result = await HttpClient.requestData("add-Unit" , "POST" ,data );
            console.log("UnitResult", result);
            if(result && result.status){
                toast.success(result?.message);
                setUnitName('');

            }else{
                toast.error(result?.message);
            }
        }else{
            toast.error("Unit Name is Required");
        }

    }

  return (
    <>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="Add Unit"/>
            <form>
<div class="form-group" style={{ marginBottom:'21px'}}>
    <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Unit Name :</label>
    <input type="text" value={unitName} onChange={(e) => setUnitName(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Unit Name"/>
  </div>


  <button  class="btn btn-primary" style={{backgroundColor:'rgb(3, 201, 215)'}} onClick={addUnit}>Add Unit</button>
  </form>

        </div>
    </>
  )
}

export default AddUnit