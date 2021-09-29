import React, { useEffect } from "react";
import styled from "@emotion/styled";
import NextLink from "next/link";

import { Row, Col } from "react-bootstrap";

export const MenuLink = ({ href, label }) => (
  <NextLink href={href}>
    <a>{label}</a>
  </NextLink>
);

// Match design can be better
const Container = styled.div`
  margin-bottom: 250px;
  width: 254px;

  hr,
  .profile-container {
    margin-bottom: 20px;
  }

  .profile-container span {
    color: #16d898;
  }

  .profile-button {
    align-items: center;
    margin-bottom: 15px;
  }

  .active {
    background: rgba(22, 216, 152, 0.1);
    box-shadow: inset 3px 0px 0px #16d898;
    padding: 10px 0px;
  }
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
`;

const Text = styled.p`
  font-family: IBM Plex Sans;
  font-style: normal;
  letter-spacing: 0.4px;
`;

const Name = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #414155;
`;

const Title = styled(Text)`
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #86869f;
`;

const MenuItem = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.342857px;
  color: #86869f;
`;

export const Profile = ({ teamId }) => {
  useEffect(() => {
    console.log(teamId);
  });

  return (
    <Container>
      <Row className="profile-container">
        <Col lg={4}>
          <ProfileImage src="/david-profile.svg" alt="" />
        </Col>

        <Col lg={6} className="profile-content">
          <Name>David Grasso </Name>
          <Title>Editor, Bold!</Title>
        </Col>

        <Col lg={2}>
          <span>&#9660;</span>
        </Col>
      </Row>

      <hr />

      <Row className="profile-button active">
        <Col lg={3}>
          <img src="/search-articles.svg" alt="" />
        </Col>
        <Col lg={9}>
          <MenuItem>
            <MenuLink
              href={`/team/${teamId}/search`}
              label="Search & Articles"
            />
          </MenuItem>
        </Col>
      </Row>

      <Row className="profile-button">
        <Col lg={3}>
          <img src="/saved-searches.svg" alt="" />
        </Col>
        <Col lg={9}>
          <MenuItem>
            <MenuLink href={`/team/${teamId}/queue`} label="Saved Searches" />
          </MenuItem>
        </Col>
      </Row>

      <Row className="profile-button">
        <Col lg={3}>
          <img src="/letra-publisher.svg" alt="" />
        </Col>
        <Col lg={7}>
          <MenuItem>
            <MenuLink href="/publisher" label="LetraPublisher&trade;" />
          </MenuItem>
        </Col>
        <Col lg={2}>
          <MenuItem>5</MenuItem>
        </Col>
      </Row>

      <Row className="profile-button">
        <Col lg={3}>
          <img src="/your-team.svg" alt="" />
        </Col>
        <Col lg={9}>
          <MenuItem>
            <MenuLink href={`/team/${teamId}`} label="Your Team" />
          </MenuItem>
        </Col>
      </Row>

      <Row className="profile-button">
        <Col lg={3}>
          <img src="/your-team.svg" alt="" />
        </Col>
        <Col lg={9}>
          <MenuItem>
            <MenuLink href="/settings" label="Settings" />
          </MenuItem>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
