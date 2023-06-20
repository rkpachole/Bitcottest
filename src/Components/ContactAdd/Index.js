import React, { useState, useEffect } from "react";
import "../../assets/style.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function Index(props) {
  console.log("props", props);
  const [userInfo, setuserInfo] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [editUserInfo, setEditUserInfo] = useState();
  const [error, setError] = useState({});
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleUserInfo = () => {
    if (userInfo?.name) {
      if (userInfo?.email) {
        if (userInfo?.mobile) {
          console.log(userInfo?.errPhone);
          props.contactAdd(userInfo);
        } else {
          setError({ errPhone: "Please Enter Phone Number" });
        }
      } else {
        setError({ errEmail: "Please Enter Email" });
      }
    } else {
      setError({ errName: "Please Enter Name" });
    }
  };

  const handleEditUserInfo = () => {
    props.contactEdit(editUserInfo);
  };

  const closeAddModal = () => {
    setuserInfo({});
    setError("");
    props.handleAddContact();
  };

  const closeEditModal = () => {
    props.handleEditContact();
  };

  useEffect(() => {}, [userInfo]);

  useEffect(() => {
    setOpenAddModal(props.addModal);
  }, [props.addModal]);

  useEffect(() => {
    setOpenEditModal(props.editModal);
  }, [props.editModal]);

  useEffect(() => {
    setEditUserInfo(props.editData[0]);
  }, [props.editData]);

  return (
    <>
      <Modal isOpen={openAddModal} toggle={closeAddModal}>
        <ModalHeader toggle={closeAddModal}>Add Contact</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input
                value={userInfo?.name}
                name="name"
                placeholder="Enter Your Name"
                type="text"
                onChange={(e) =>
                  setuserInfo({ ...userInfo, name: e.target.value })
                }
              />
              {error && error?.errName && (
                <span className="text-danger">{error.errName}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                value={userInfo?.email}
                name="email"
                placeholder="Enter Your Email"
                type="email"
                onChange={(e) =>
                  setuserInfo({ ...userInfo, email: e.target.value })
                }
              />
              {error && error?.errEmail && (
                <span className="text-danger">{error.errEmail}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Phone Number</Label>
              <Input
                value={userInfo?.mobile}
                name="phone"
                placeholder="Enter Your Phone Number"
                type="number"
                onChange={(e) =>
                  setuserInfo({ ...userInfo, mobile: e.target.value })
                }
              />
              {error && error?.errPhone && (
                <span className="text-danger">{error.errPhone}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Address</Label>
              <Input
                value={userInfo?.address}
                name="address"
                placeholder="Enter Your Address"
                type="textarea"
                onChange={(e) =>
                  setuserInfo({ ...userInfo, address: e.target.value })
                }
              />
              {error && error?.errAddress && (
                <span className="text-danger">{error.errAddress}</span>
              )}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: "flex-start" }}>
          <Button color="primary" onClick={() => handleUserInfo()}>
            Submit
          </Button>
          <Button color="dark" onClick={closeAddModal}>
            Reset
          </Button>
        </ModalFooter>
      </Modal>

      {/* Edit Model */}
      <Modal isOpen={openEditModal} toggle={closeEditModal}>
        <ModalHeader toggle={closeEditModal}>Edit Contact</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input
                value={editUserInfo?.name}
                name="name"
                placeholder="Enter Your Name"
                type="text"
                onChange={(e) =>
                  setEditUserInfo({ ...editUserInfo, name: e.target.value })
                }
              />
              
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                value={editUserInfo?.email}
                name="email"
                placeholder="Enter Your Email"
                type="email"
                onChange={(e) =>
                  setEditUserInfo({ ...editUserInfo, email: e.target.value })
                }
              />
            
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Phone Number</Label>
              <Input
                value={editUserInfo?.mobile}
                name="phone"
                placeholder="Enter Your Phone Number"
                type="number"
                onChange={(e) =>
                  setEditUserInfo({ ...editUserInfo, mobile: e.target.value })
                }
              />
             
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Address</Label>
              <Input
                value={editUserInfo?.address}
                name="address"
                placeholder="Enter Your Address"
                type="textarea"
                onChange={(e) =>
                  setEditUserInfo({ ...editUserInfo, address: e.target.value })
                }
              />
             
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: "flex-start" }}>
          <Button color="primary" onClick={() => handleEditUserInfo()}>
            Update
          </Button>
          <Button color="dark" onClick={closeEditModal}>
            Reset
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Index;
