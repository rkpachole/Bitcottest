import React, { useState, useEffect } from "react";
import "../../assets/style.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  CardText,
  Table,
} from "reactstrap";
function Index(props) {
  const [userInfo, setuserInfo] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });
  const [viewDetailModal, setviewDetailModal] = useState(false);

  const closeViewDetailModal = () => {
    props.handleViewDetails();
  };

  useEffect(() => {
    setuserInfo(props.viewDetails[0]);
  }, [props.viewDetails]);

  useEffect(() => {
    setviewDetailModal(props.viewModal);
  }, [props.viewModal]);

  return (
    <>
      <Modal isOpen={viewDetailModal} toggle={closeViewDetailModal}>
        <ModalHeader toggle={closeViewDetailModal}>
          View Contact Details
        </ModalHeader>
        <ModalBody className="d-flex justify-content-center">
          <Card
            style={{
              width: "22rem",
            }}
          >
            <CardBody>
              <div className="">
                <CardText>Name : - {userInfo?.name}</CardText>
                <CardText>Email : - {userInfo?.email}</CardText>
                <CardText>Mobile : - {userInfo?.mobile}</CardText>
                <CardText>Address : - {userInfo?.address}</CardText>
              </div>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Index;
