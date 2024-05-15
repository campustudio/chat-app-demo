import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  InputGroupButtonDropdown,
  Spinner,
  InputGroup,
} from 'reactstrap';
import { getItemFromStorage } from '../utils/helper';
import { getCreateRoom } from '../services/api';
import { DEFAULT_ROOM_TYPE, ROOM_TYPE } from '../utils/constants';
import { toastError, toastSuccess } from '../components/notifications';

const CreateRoom = () => {
  const user = getItemFromStorage('user');
  const [roomId, setRoomId] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roomType, setRoomType] = useState(DEFAULT_ROOM_TYPE);
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();
  const handleOnJoinRoom = () => {
    if (roomId.trim().length > 0) {
      history.push(`/${roomId}`);
    }
  };

  const onLoginClick = (e) => {
    e.preventDefault();
    if (roomType === ROOM_TYPE.createRoom) {
      setLoading(true);
      getCreateRoom()
        .then((res) => {
          setLoading(false);
          toastSuccess('创建房间成功!!');
          if (res && res.roomUrl) {
            history.push(`/${res.roomUrl}`);
          }
        })
        .catch((err) => {
          setLoading(false);
          toastError(err);
        });
    } else {
      handleOnJoinRoom();
    }
  };
  const toggle = () => setDropdownOpen(!dropdownOpen);

  if (user && user.name)
    return (
      <Container>
        <Row className="justify-content-center align-items-center h-100vh">
          <Col sm="12" md={6}>
            <Card>
              <CardBody>
                <CardTitle tag="h3" className="text-center mb-5">
                  聊天应用Demo
                </CardTitle>
                <Form onSubmit={onLoginClick}>
                  <h5>{`Welcome, ${user.name}`}</h5>
                  <>
                    {roomType === ROOM_TYPE.joinRoom ? (
                      <FormGroup>
                        <Label for="roomId">房间号</Label>
                        <Input
                          type="text"
                          name="roomId"
                          id="roomId"
                          placeholder="输入房间号"
                          value={roomId}
                          onChange={(e) => setRoomId(e.target.value)}
                          required
                        />
                      </FormGroup>
                    ) : null}
                  </>
                  <InputGroup>
                    <InputGroupButtonDropdown
                      addonType="prepend"
                      isOpen={dropdownOpen}
                      toggle={toggle}
                    >
                      <Button color="secondary" outline disabled={isLoading}>
                        {isLoading ? (
                          <Spinner className="mr-2" size="sm" />
                        ) : null}
                        {roomType === ROOM_TYPE.joinRoom
                          ? '加入房间'
                          : '创建房间'}
                      </Button>
                      <DropdownToggle
                        outline
                        disabled={isLoading}
                        split
                        color="secondary"
                      />
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => setRoomType(ROOM_TYPE.createRoom)}
                        >
                          创建房间
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => setRoomType(ROOM_TYPE.joinRoom)}
                        >
                          加入房间
                        </DropdownItem>
                      </DropdownMenu>
                    </InputGroupButtonDropdown>
                  </InputGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  return null;
};

export default CreateRoom;
