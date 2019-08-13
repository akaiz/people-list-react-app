import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import Pagination from '../Pagination';
import Item from './ListItem';
import logo from '../../assets/logo.svg';

function Listing({
  users: intialUsers, userPerpage, deleteUser,
}) {
  const [allUsers, setAllUsers] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searched, setSearch] = useState('');

  const getPaginatedUsers = (page, users) => {
    const indexOfLastUser = page * usersPerPage;
    const indexOfFirstPost = indexOfLastUser - usersPerPage;
    return users.slice(indexOfFirstPost, indexOfLastUser);
  };
  useEffect(() => {
    setAllUsers(intialUsers);
    setUsersPerPage(userPerpage || 10);
    setListUsers(getPaginatedUsers(1, intialUsers));
  }, [intialUsers]);

  const paginateUsers = (pageNumber) => {
    setActivePage(pageNumber);
    setListUsers(getPaginatedUsers(pageNumber, allUsers));
  };

  const filterUsers = (event) => {
    const data = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter((user) => user.name.toLowerCase()
      .includes(data));
    setSearch(data);
    setListUsers(getPaginatedUsers(1, filteredUsers));
    setActivePage(1);
  };
  // This callback is called when user item has been dragged
  const dragUserItemCallBack = useCallback((dragIndex, hoverIndex) => {
    const draggedUser = listUsers[dragIndex];
    setListUsers(update(listUsers, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, draggedUser]],
    }));
    const startingPosition = ((activePage * usersPerPage) - usersPerPage);
    setAllUsers(update(allUsers, {
      $splice: [[startingPosition + dragIndex, 1], [startingPosition + hoverIndex, 0, draggedUser]],
    }));
  }, [listUsers, allUsers]);

  const renderItem = (row, index) => (
    <Item
      key={row.id}
      data={row}
      index={index}
      id={row.id}
      moveCard={dragUserItemCallBack}
      deleteUser={deleteUser}
    />
  );
  const renderPaginator = () => {
    if (listUsers.length > 0) {
      return (
        <Pagination
          itemsPerPage={usersPerPage}
          totalItems={allUsers.length}
          paginate={paginateUsers}
          activePage={activePage}
        />
      );
    }
    return null;
  };
  return (
    <div className="container-fluid">
      <div className="row sticky-header">
        <img src={logo} alt="logo" />
      </div>

      <div className="row">
        <div className="col-xs-6 col-md-7 col-lg-9 people-list">
          <h3>People&apos;s List</h3>
        </div>

        <div className="col-xs-6  col-md-5 col-lg-3 user-search">
          <input
            className="form-control"
            type="text"
            onChange={filterUsers}
            placeholder="Search name"
          />
        </div>
      </div>
      <div className="user-list-separator"></div>

      <DndProvider backend={HTML5Backend}>
        <div data-test="user-listing" className="user-listing">
          {listUsers.map((user, i) => renderItem(user, i))}

          {(searched.length > 0 && listUsers.length === 0)
            ? (
              <h4 className="text-center">
                Search Result Not Found!
              </h4>
            ) : null}
        </div>
        {renderPaginator()}
      </DndProvider>
      <ToastsContainer lightBackground store={ToastsStore} />
    </div>
  );
}
Listing.propTypes = {
  users: PropTypes.array.isRequired,
  userPerpage: PropTypes.number,
  deleteUser: PropTypes.func.isRequired,
};
export default Listing;
