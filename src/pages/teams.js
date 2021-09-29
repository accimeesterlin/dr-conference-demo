import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { mutate } from "swr";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { useToasts } from "react-toast-notifications";
import {
  Text,
  ListItem,
  UnorderedList,
  Box,
  Button,
  Heading,
  Center,
  Link as CKLink,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { Spinner } from "@Blocks/Spinner";
import { Mutations } from "@Graphql";
import { getMyTeams } from "@Libs/api-team";
import { useCognitoUser } from "@Data/user";
import { PageTopMenu } from "@Blocks/PageTopMenu";
import { EditTeamName } from "@Blocks/team/EditTeamName";

import { Protector } from "@Blocks/protector";

import { MainLayout } from "@Blocks";

const isNumber = (n) => !Number.isNaN(parseFloat(n)) && !Number.isNaN(n - 0);

export default function TeamPage() {
  const [isLoading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [teamToken, setTeamToken] = useState(null);
  const [show, setShow] = useState(false);
  const { addToast } = useToasts();
  const cognitoUser = useCognitoUser();

  const username = cognitoUser?.data?.username;

  const toggleTeamCreationModal = () => setShow(!show);

  const loadTeams = async () => {
    try {
      const { items, nextToken } = await getMyTeams(teamToken);
      setTeams(items);
      setTeamToken(nextToken);
      setLoading(false);
    } catch (error) {
      addToast("we could not load the teams - Try again", {
        appearance: "error",
        autoDismiss: true,
      });
      console.error(error);
    }
  };

  const createNewTeam = async ({ name, slug }) => {
    let suffix = uuidv4().split("-")[1];
    while (isNumber(suffix)) {
      // eslint-disable-next-line
      suffix = uuidv4().split("-")[1];
    }
    const values = {
      name,
      id: `${slug}-${suffix}`,
      ownerEmail: cognitoUser.data.attributes.email,
    };

    try {
      const {
        data: { createTeam },
      } = await API.graphql(
        graphqlOperation(Mutations.createTeam, { input: values })
      );
      setTeams([createTeam, ...teams]);
      setShow(false);
    } catch (error) {
      console.error("We could not create the new team", error);
      addToast("Operation failed - Try again", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <Protector>
      <Head>
        <title>Teams</title>
      </Head>
      <MainLayout page="/teams">
        {isLoading ? (
          <>
            <PageTopMenu>
              <Heading as="h1" size="lg" mr="10px">
                Team Board
              </Heading>
              <Button
                size="xs"
                colorScheme="teal"
                variant="outline"
                onClick={toggleTeamCreationModal}
              >
                Create a new team
              </Button>
            </PageTopMenu>
            <Spinner />
          </>
        ) : (
          <>
            <PageTopMenu>
              <Heading as="h1" size="lg" mr="10px">
                Team Board
              </Heading>
              <Button
                size="xs"
                colorScheme="teal"
                variant="outline"
                onClick={toggleTeamCreationModal}
              >
                Create a new team
              </Button>
            </PageTopMenu>
            {teams.length === 0 ? (
              <Center h="100px" bg="white" mt="4">
                <Text fontSize="2xl">You are not part of any team yet.</Text>
              </Center>
            ) : (
              <>
                <Text size="xs" mb="5" fontSize="12px">
                  Team you have created or being part of
                </Text>
                <UnorderedList listStyleType="none" ml="0">
                  {teams.map((team) => {
                    let isOwner = false;
                    let isEditor = false;

                    if (team.owner === username) {
                      isOwner = true;
                    } else if (
                      team.editors &&
                      team.editors.includes(username)
                    ) {
                      isEditor = true;
                    }

                    return (
                      <ListItem key={team.id} mb="5" fontSize="2xl">
                        <Link href={`/team/${team.id}`} passHref>
                          <CKLink
                            onClick={() => {
                              const t = teams.filter(
                                (el) => el.id === team.id
                              )[0];
                              mutate(`@team/${t.id}`, t);
                            }}
                          >
                            {team.name}
                          </CKLink>
                        </Link>
                        <Box as="span" ml="2" fontSize="sm">
                          {isOwner ? "(Owner)" : null}
                          {isEditor ? "(Editor)" : null}
                        </Box>
                      </ListItem>
                    );
                  })}
                </UnorderedList>
                <Modal
                  isOpen={show}
                  onClose={toggleTeamCreationModal}
                  returnFocusOnClose={false}
                  size="lg"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Create a new team</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box>
                        <EditTeamName onSave={createNewTeam} />
                      </Box>
                    </ModalBody>

                    <ModalFooter>
                      <Button variant="ghost" onClick={toggleTeamCreationModal}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            )}
          </>
        )}
      </MainLayout>
    </Protector>
  );
}
