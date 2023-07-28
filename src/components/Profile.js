import React from "react";
import { UseSelector,useDispatch, useSelector } from "react-redux";
import { DCRNumber, incNumber } from "../Actions";

const Profile = ()=>{
    const myState = useSelector(stete => stete.changeTheNumber);
    const dispatch = useDispatch();
    return(
        <div>
            <h1>Profile</h1>
            <div>
                <a onClick={() => dispatch(incNumber())}>+</a>
                <input type="test" value={myState}/>
                <a onClick={() => dispatch(DCRNumber())}>-</a>
            </div>
        </div>
    )
}
export default Profile;