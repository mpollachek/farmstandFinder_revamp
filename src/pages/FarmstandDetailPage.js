import { Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { selectFarmstandById } from '../farmstands/farmstandFilter';
import FarmstandDetail from '../farmstands/FarmstandDetail';
import CommentsList from '../features/comments/CommentList';
import SubHeader from '../components/SubHeader';
import Error from '../components/Error';
import Loading from '../components/Loading';

const FarmstandDetailPage = () => {

  const [runGet, setRunGet] = useState(false);
  const [farmstand, setFarmstand] = useState({products: [], images: []})


  const { farmstandId } = useParams();
  console.log("farmstandId: ", farmstandId)

  const getFarmstand = async () => {
    console.log('run getFarmstand')
  if (runGet) {
    console.log('run getFarmstand2')
    const farm = await selectFarmstandById(farmstandId);
    console.log('farm:', farm);
    setFarmstand(farm);
    setRunGet(false);
  }}

  useEffect(() => {
    let timer = setTimeout(() => {
    console.log('setrunget true')
    setRunGet(true)
  }, 0);
  return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    getFarmstand()
}, [runGet])




  // const isLoading = useSelector((state) => state.farmstands.isLoading);
  // const errMsg = useSelector((state) => state.farmstands.errMsg);
  let content = null;

  // if (farmstand.isLoading) {
  //   content = <Loading />;
  // } else if (farmstand.errMsg) {
  //   content = <Error errMsg={errMsg} />;
  // } else {
  if (farmstand.farmstandName) {
    content = (
        <>
            <FarmstandDetail farmstand={farmstand} />
            <CommentsList farmstandId={farmstandId} />
        </>
    );
  }

  return (
    <Container>
      <SubHeader current={farmstand.farmstandName} detail={true} /> 
      <Row>
        <FarmstandDetail farmstand={farmstand} />
        <CommentsList farmstandId={farmstandId} />
      </Row> 
    </Container>
  );
};

export default FarmstandDetailPage;