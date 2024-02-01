import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddKontrahenciMutation } from "../../features/kontrahenciApiSlice";
import Error from "../Notifications/Error";

export default function Addprzepisy() {
  const [shortName, setShortName] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [nip, setNip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [addKontrahenci, { isSuccess, isError, error, data }] =
    useAddKontrahenciMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setName("");
      navigate("/admin/kontrahenci", {
        state: {
          data,
        },
      });
    }
  }, [isSuccess, navigate, data]);

  const formHandler = async (e) => {
    e.preventDefault();
    const kontrahenci = {
      shortName,
      name,
      address,
      postCode,
      city,
      nip,
      phoneNumber,
      email,
      accountNumber,
    };
    await addKontrahenci({ kontrahenci });
  };

  const content = (
    <div className="d-flex justify-content-center flex-column align-items-center withSidebar">
      <h3>Dodaj kontrahenta</h3>
      <div className="d-flex justify-content-center flex-column align-items-center w-50">
        <form
          onSubmit={formHandler}
          className="justify-content-center flex-column align-items-center w-100"
        >
          <div className="d-flex flex-column form-group w-100 mx-2">
            <label htmlFor="shortName">Nazwa skrócona</label>
            <input
              className="form-control"
              type="text"
              placeholder="Nazwa skrócona"
              value={shortName}
              onChange={(e) => {
                setShortName(e.target.value);
              }}
            ></input>
            <label htmlFor="name">Nazwa producenta</label>
            <input
              className="form-control"
              type="text"
              placeholder="Nazwa producenta"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <label htmlFor="address">Adres</label>
            <input
              className="form-control"
              type="text"
              placeholder="Adres"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></input>
            <label htmlFor="postCode">Kod pocztowy</label>
            <input
              className="form-control"
              type="text"
              placeholder="Kod pocztowy"
              value={postCode}
              onChange={(e) => {
                setPostCode(e.target.value);
              }}
            ></input>
            <label htmlFor="city">Miejscowość</label>
            <input
              className="form-control"
              type="text"
              placeholder="Miejscowość"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            ></input>
            <label htmlFor="nip">NIP</label>
            <input
              className="form-control"
              type="number"
              placeholder="NIP"
              value={nip}
              onChange={(e) => {
                setNip(e.target.value);
              }}
            ></input>
            <label htmlFor="phoneNumber">Telefon</label>
            <input
              className="form-control"
              type="number"
              placeholder="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            ></input>
            <label htmlFor="email">E-mail</label>
            <input
              className="form-control"
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <label htmlFor="accountNumber">Numer konta</label>
            <input
              className="form-control"
              type="number"
              placeholder="Numer konta"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
              }}
            ></input>
          </div>
          <button type="submit">Dodaj kontrahenta</button>
        </form>
        {isError ? <Error error={error?.data.message} /> : ""}
      </div>
    </div>
  );
  return content;
}
