import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { getDrop } from '../../utils/getDrop';
import UserModalPopUp from './ListItemModal';

function ListItem({
  id, data, index, moveCard, deleteUser
}) {
  const [showModal, SetShowModal] = useState(false);

  function itemDragSettings() {
    const ref = useRef(null);
    const [, drop] = getDrop(ref, index, moveCard, 'User');
    const [{ isDragging }, drag] = useDrag({
      item: { type: 'User', id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return { ref, opacity };
  }
  const { ref, opacity } = itemDragSettings();

  const itemOnClick = () => {
    SetShowModal(!showModal);
  };
  const picture = data.picture_id ? data.picture_id.pictures[128] : null;
  return (
    <div
      className="row user-item"
      ref={ref}
      style={{ opacity }}
      onClick={itemOnClick}
      onKeyDown={itemOnClick}
      role="presentation"
      data-test="user-item"
    >
      <div className="col-xs-5 col-sm-10 col-lg-10 col-xl-11 user-item-col-1">
        <h4 data-test="user-name">{data.name}</h4>
        <h6 data-test="user-org"><span><i className="fa fa-building-o" /></span> {data.org_name}</h6>
      </div>
      <div className="col-xs-3 col-sm-2 col-lg-2 col-xl-1" data-test="user-photo">
        <Avatar src={picture} round="50px" size="100" fgColor="#357edd" name={data.name} color="#d1dff0" />
      </div>
      <UserModalPopUp
        data={{ ...data, user_photo: picture }}
        showModal={showModal}
        deleteUser={deleteUser}
        toggleModal={(value) => SetShowModal(value)}
      />
    </div>
  );
}

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  moveCard: PropTypes.func,
  deleteUser: PropTypes.func,
};
export default ListItem;
