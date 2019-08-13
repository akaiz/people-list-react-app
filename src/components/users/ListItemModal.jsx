import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';

function ListItemModal({
  data, showModal, toggleModal, deleteUser
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (showModal !== show) {
      setShow(true);
    }
  }, [showModal]);

  const handleClose = () => { setShow(false); toggleModal(false); };
  const assistant = data.e80927bf538ab0f90854b97d28a677a12639d62a;
  const groups = data.cbc8ad54003239431c1cde5c2d79378b8c4c5211;
  const location = data['783dafde54ea51ce69139af515955b60df27219a'];
  const fields = {
    Email: data.email ? data.email[0].value : '',
    Organization: data.org_name ? data.org_name : '',
    Assistant: assistant || '',
    Groups: groups || '',
    Location: location || '',
  };
  const phoneNumber = _.find(data.phone, { primary: true });
  const onDeleteUser = () => { deleteUser(data); setShow(false); toggleModal(false); };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-80w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h5 className="modal-header-content">Person Information</h5>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="text-center  modal-user-row-1">
              <Avatar src={data.user_photo} round="50px" name={data.name} color="#d1dff0" fgColor="#357edd" />
              <h4 className="modal-user-name">{data.name}</h4>
              <h5 className="modal-user-phone">{phoneNumber ? phoneNumber.value : ''}</h5>
            </div>
            <div className="modal-user-separator"></div>
            <div className="modal-user-row-2">
              {
                Object.keys(fields).map((key) => (
                  <div className="row py-2" key={key}>
                    <h6 className="col-xs-3 col-sm-6 col-md-4 modal-user-field">{key}</h6>
                    <h6 className="col-xs-7 col-sm-6  col-md-8 modal-user-value">{fields[key]}</h6>
                  </div>
                ))
              }
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn modal-delete-button mr-auto" onClick={onDeleteUser}>
            Delete
          </button>
          <button className="btn modal-back-button col-sm-3" onClick={handleClose}>
            Back
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ListItemModal.propTypes = {
  data: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
export default ListItemModal;
