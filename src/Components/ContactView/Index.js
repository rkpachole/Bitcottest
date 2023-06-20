import React, { useState, useEffect } from "react";
import "../../assets/style.css";
import { Button, Input } from "reactstrap";
import Data from "../../db.json";
import ContactAddEdit from "../ContactAdd/Index";
import ContactViewDetails from "../ContactDetail/Index";

function Index() {
  const [contactData, setContactData] = useState(Data);
  const [allContacts, setAllContacts] = useState(Data);
  const [userInfo, setuserInfo] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    id: contactData.length + 1,
  });
  const [editData, setEditData] = useState({});
  const [viewDetails, setViewDetails] = useState({});
  const [addModal, setaddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [search, setsearch] = useState("");

  const handleAddContact = () => {
    setaddModal(!addModal);
  };

  const handleEditContact = () => {
    setEditModal(!editModal);
  };

  const handleViewDetails = (id) => {
    let data = contactData.filter((item) => item.id == id);
    setViewDetails(data);
    setViewModal(!viewModal);
  };

  const contactAdd = (data) => {
    let newContact = {
      id: contactData.length + 1,
      ...data,
    };
    setContactData([...contactData, newContact]);
    handleAddContact();
  };

  const contactEdit = (data) => {
    const newState = contactData.map((obj) => {
      if (obj.id === data.id) {
        return { ...obj, ...data };
      }

      return obj;
    });
    setContactData(newState);
    setAllContacts(newState);
    setEditModal(false);
  };

  const handleEdit = (id) => {
    let data = contactData.filter((item) => item.id == id);
    setEditData(data);
    handleEditContact();
  };

  const handleDeleteContact = (id) => {
    let data = contactData.filter((item) => item.id !== id);
    setContactData(data);
  };

  useEffect(() => {
    if (search != "") {
      const data = contactData.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.mobile.includes(search)
      );
      setContactData(data);
    } else {
      setContactData(allContacts);
    }
  }, [search]);

  useEffect(() => {
    console.log("contactData", contactData);
  }, [contactData]);

  return (
    <>
      <div className="parent">
        <Button color="primary" onClick={handleAddContact}>
          Add Contact &nbsp; <i className="ri-add-circle-line" />
        </Button>
        <div className="searchbar">
          <Input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            type="text"
            placeholder="search contact"
          />
        </div>
        <div className="contact_list">
          {contactData.length > 0 ? (
            contactData.map((item, index) => (
              <div className="contact">
                <div className="numbering">
                  <p>{index + 1}.</p>
                </div>
                <div className="user_detail">
                  <i className="ri-user-line" />
                  <div>
                    <p>{item.name}</p>
                    <p>{item.mobile}</p>
                  </div>
                </div>
                <div className="icons">
                  <i
                    onClick={(id) => handleViewDetails(item.id)}
                    className="ri-eye-line"
                  />
                  <i
                    onClick={(id) => handleEdit(item.id)}
                    className="ri-pencil-line"
                  />
                  <i
                    onClick={(id) => handleDeleteContact(item.id)}
                    className="ri-delete-bin-line"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="contact text-center">No Data</div>
          )}
        </div>
      </div>
      <ContactAddEdit
        addModal={addModal}
        editModal={editModal}
        editData={editData}
        handleAddContact={handleAddContact}
        handleEditContact={handleEditContact}
        contactAdd={(data) => contactAdd(data)}
        contactEdit={(data) => contactEdit(data)}
      />
      <ContactViewDetails
        viewDetails={viewDetails}
        viewModal={viewModal}
        handleViewDetails={handleViewDetails}
      />
    </>
  );
}

export default Index;
