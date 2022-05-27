import React from "react";
import apiService from "../services/auth";
// import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import profileLamp from "../../assets/profileLamp.png";
import lamp2 from "../../assets/lamp2.png"
import "../../css/editProfile.css";

export const UpdateUserForm = (props) => {
  // const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const id = props.loggedInUser._id
  const onSubmit = async (data) => {

    const res = await apiService.update(data.username, data.password, id)
    props.setLoggedInUser(res)
  };

  return (
    <container>
      <div className="img-container">
        <img className="prof-img" src ={profileLamp} alt="lamp-setting" />
      <img className="prof-img-2" src ={lamp2} alt="lamp-setting" />
      </div>
        <form className="edit-credentials" onSubmit={handleSubmit(onSubmit)}>
          <label className="label" for="profileEdit">Edit your username:</label>
          <input
            // defaultValues={props.loggedInUser.username}
            defaultValue={props.loggedInUser?.username}
            {...register("username", {
              // required: "Please enter a valid username",
            })}
            placeholder="Username"
            name="username"
          />
          <p>{errors.username?.message}</p>

          <label className="label" for="profileEdit">Change your password:</label>
          <input type="password"
            defaultValue={props.loggedInUser?.password}
            {...register("password", {
              // required: "This is required",
              minLength: {
                value: 8,
                message: "Password must be over 8 characters",
              },
            })}
            placeholder="enter a password"
            name="password"
          />
          <p>{errors.password?.message}</p>
          <button className="btn" type="submit">Save changes</button>
        </form>
 
    </container>
  );
};
