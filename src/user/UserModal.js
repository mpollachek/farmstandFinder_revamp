import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button as RSButton } from "reactstrap";
import { Link } from "react-router-dom";
import UserLoginForm from "../forms/UserLoginForm";
import { UserContext } from "../App";
import axios from "axios";
import { selectUserOwned } from "./UserFns";

const UserModal = () => {
  const { userId, setUserId, userName, setUserName, userOwned, setUserOwned } = useContext(UserContext);

  const [runGetOwner, setRunGetOwner] = useState(false);

  const logout = () => {
    //localStorage.removeItem("token");
    let keysToRemove = ["token", "google", "facebook", "userId", "userName"]
    for (const key of keysToRemove) {
      localStorage.removeItem(key)
    }
    for (const key of keysToRemove) {
      document.cookie = `${key}=; path=/; Expires=Sun, 20 Apr 1969 00:00:00 UTC;`;
    }
    setUserId("");
    setUserName("");
  };

  console.log("userId: ", userId);

  /* Owner functions - replaced by farmstandOwner.includes(userId)  */
  // const getIsOwner = async () => {
  //   console.log("runGetOwner: ", runGetOwner);
  //   if (runGetOwner) {
  //     let ownedArray = await selectUserOwned();
  //     console.log("owner response: ", ownedArray.data);
  //     console.log("ownedArray:", ownedArray);
  //     setUserOwned(ownedArray.data);
  //     setRunGetOwner(false);
  //     console.log("userOwned: ", userOwned);
  //   }
  // };
      
  //   useEffect(() => {
  //     if (userName) {
  //       setRunGetOwner(true);
  //     }
  //   }, [userName]);
  
  //   useEffect(() => {
  //     getIsOwner();
  //   }, [runGetOwner]);
    /* End Owner Functions */

  const Protected = () => {
    return (
      // components: favorites, logout
      <Container className="text-center">
        <Row>
          <Col>
            <Link to={`/favorites`}>
              <h3>Favorites</h3>
            </Link>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <Link to={`/mycomments`}>
              <h3>My Comments</h3>
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-center my-3">
          <Col md="4">
            <RSButton type="submit" onClick={logout} color="primary">
              logout
            </RSButton>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Container>
      <Row>
        {/* need to check login status via token */}
        {userId ? <Protected /> : <UserLoginForm />}
      </Row>
    </Container>
  );
};

export default UserModal;
