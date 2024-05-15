import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Button,
  UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import {
  getItemFromStorage,
  removeItemFromStorage,
} from '../../../utils/helper';
import { useAuth } from '../../../hooks/useAuth';
import { toastError, toastSuccess } from '../../notifications';

const Header = ({ roomId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userFromStorage = getItemFromStorage('user');

  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();
  const user = useAuth();
  const onLogout = () => {
    user.logout();
    removeItemFromStorage('user');
    history.push('/');
  };

  return (
    <Navbar className="bg-success" ligth dark expand="md">
      <NavbarBrand
        className="text-white font-weight-bolder d-flex align-items-center"
        href="/"
      >
        聊天应用Demo
      </NavbarBrand>
      <div className="d-flex align-items-center mt-2">
        <Label className="text-white align-items-center">
          房间号:
          {` ${roomId}`}
        </Label>
        <Button
          color="link"
          className="text-white align-items-center mb-2"
          onClick={() => {
            navigator.clipboard.writeText(roomId).then(
              () => {
                toastSuccess('房间号复制成功');
              },
              () => {
                toastError('发生了某些错误');
              },
            );
          }}
        >
          <FontAwesomeIcon icon={faCopy} id="copy-room-id" />
          <UncontrolledTooltip placement="right" target="copy-room-id">
            Copy Room-Id
          </UncontrolledTooltip>
        </Button>
      </div>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {userFromStorage && userFromStorage.name
                ? userFromStorage.name
                : 'user'}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={onLogout}>退出</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default Header;
