import styled from "@emotion/styled";
import { Button as CKButton, Link as CKLink, Heading } from "@chakra-ui/react";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #ffffff;
  background-size: cover;
  background-image: url("https://cdn.shrm.org/image/upload/c_crop%2Ch_476%2Cw_848%2Cx_0%2Cy_32/c_fit%2Cf_auto%2Cq_auto%2Cw_767/v1/Legal%20and%20Compliance/New_York_Skyline_m80j3z?databtoa=eyIxNng5Ijp7IngiOjAsInkiOjMyLCJ4MiI6ODQ4LCJ5MiI6NTA4LCJ3Ijo4NDgsImgiOjQ3Nn19");
`;

export const Login = styled.div`
  position: absolute;
  padding: 50px;
  width: 424px;
  height: 608px;
  left: 60%;
  top: 10%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 3px 16px 40px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

export const Title = () => (
  <Heading as="h1" mb="8" color="#16D898">
    LETRA.AI
  </Heading>
);

export const Input = styled.input`
  outline: none;
  height: 64px;
  width: 344px;
  margin-bottom: 10px;
  background: rgba(134, 134, 159, 0.1);
  border-radius: 8px;
  padding-left: 20px;
`;

export const Button = ({ text, ...rest }) => (
  <CKButton
    type="submit"
    variant="outline"
    size="lg"
    isFullWidth
    borderRadius="24px"
    border="1.5px solid #16D898"
    borderColor="#16D898"
    color="#16D898"
    fontWeight="500"
    fontSize="17px"
    mt="2"
    mb="3"
    {...rest}
  >
    {text}
  </CKButton>
);

export const Text = styled.p`
  margin-bottom: 1rem;
`;

export const ForgotPassword = styled.a`
  color: #16d898;
  margin: 10px 0;
`;

export const Link = ({ text, ...rest }) => (
  <CKLink fontSize="14px" color="brand.green" size="sm" {...rest}>
    {text}
  </CKLink>
);

export const Form = styled.form``;
