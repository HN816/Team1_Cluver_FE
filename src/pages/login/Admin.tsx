import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import Card from "../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { tokenValidate } from "../../util/api";
import { useRecoilValue } from "recoil";
import { manager } from "../../util/atoms";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  //background-color: ${(props) => props.theme.bgColor};
`;
const Wrap = styled.div`
  width: 360px;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.bgColor};
`;

const Container = styled.div`
  width: 100%;
  height: 77%;
  transform: translateY(12%);
  //background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UserName = styled.span`
  font-size: 15px;
  font-weight: 600;
  font-family: ${(props) => props.theme.textFont};
  background: ${(props) => props.theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;
const Title = styled.span`
  font-size: 15px;
  font-weight: 400;
  font-family: ${(props) => props.theme.textFont};
  color: ${(props) => props.theme.iconColor};
`;

const AddButton = styled.div`
  font-size: 12px;
  font-weight: 400;
  font-family: ${(props) => props.theme.textFont};
  background: ${(props) => props.theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-top: 5px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    transition: all ease 0.3s;
    cursor: pointer;
  }
`;
const TextWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & {
    color: ${(props) => props.theme.iconColor};
    font-size: 10px;
  }
`;
const Text = styled.div`
  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: all ease 0.3s;
    cursor: pointer;
  }
`;

function Login() {
  const navigate = useNavigate();
  const data = useRecoilValue(manager);

  const onAddClub = async () => {
    const response = await tokenValidate(localStorage.getItem("token"));
    if (response) {
      navigate("/addclub");
    } else {
      navigate("/login");
      console.log(response);
    }
  };
  const onDeleteClub = async () => {
    const response = await tokenValidate(localStorage.getItem("token"));
    if (response) {
      navigate("/delete");
    } else {
      navigate("/login");
      console.log(response);
    }
  };
  return (
    <Background>
      <Wrap>
        <Navbar></Navbar>
        <Container>
          <div style={{ marginBottom: "10px" }}>
            <UserName>{data.name}</UserName>
            {data.clubs.length == 0 ? (
              <Title> 님이 관리 중인 동아리가 없습니다.</Title>
            ) : (
              <Title> 님이 관리 중인 동아리입니다.</Title>
            )}
          </div>

          {data.clubs.map((club: any) => {
            if (club)
              return (
                <Card
                  key={club.id}
                  id={club.id}
                  name={club.name.toUpperCase()}
                  desc={club.description}
                  img={club.img}
                  isPrivate={club.status == "PRIVATE" ? true : false}
                />
              );
          })}
          <AddButton onClick={onAddClub}>관리 중인 동아리 추가하기 +</AddButton>
          {data.clubs.length == 0 ? (
            <></>
          ) : (
            <TextWrapper style={{ position: "absolute", bottom: "20px" }}>
              <Text onClick={onDeleteClub}>동아리 삭제하기</Text>
            </TextWrapper>
          )}
        </Container>
        <Bottombar
          first={false}
          second={false}
          third={false}
          fourth={true}
          fifth={false}
        />
      </Wrap>
    </Background>
  );
}

export default Login;
