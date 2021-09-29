import React, { useRef, useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Storage } from "aws-amplify";
import {
  Flex,
  Box,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Input,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { TriangleDownIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { CustomDrawerHeader } from "@Blocks/DrawerBlock";
import { formatUsernameFromEmail } from "@Utils/format";
import { useCognitoUser } from "@Data/user";
import { getUserProfile, updateUserProfile } from "@Libs/api-user";
import { getTeamById } from "@Libs/api-team";

export function LeftPanelProfile() {
  const {
    query: { id: teamId },
  } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [file, setFile] = useState(null);
  const btnRef = useRef();
  const toast = useToast();
  const [profile, setProfile] = useState({});
  const [team, setTeam] = useState({});

  const {
    data: {
      attributes: { sub, email, phone_number },
    },
  } = useCognitoUser();
  const { data: avatarUrl, mutate: mutateAvatarUrl } = useSWR(
    sub ? `@user/${sub}/avatarUrl` : null,
    () => Storage.get(sub, { expires: 3600 * 24 })
  );

  useEffect(() => {
    if (email) {
      getUserProfile(email)
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => {
          console.error("we  could not get user");
          console.error(error);
        });
    }
  }, [email]);

  useEffect(() => {
    if (teamId) {
      getTeamById(teamId)
        .then((d) => {
          setTeam(d);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [teamId]);

  const getPhoto = (e) => {
    const _file = e.target.files[0];
    if (!_file) return;
    setFile(_file);
  };

  const upLoadPhoto = async () => {
    toast({
      description: "Please wait before closing modal",
      status: "info",
      duration: 500,
    });
    try {
      await Storage.put(sub, file, {
        contentType: file.type,
      });

      // update user to add photo in profile
      toast({
        description: "The photo was updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      mutateAvatarUrl();
      setFile(null);
    } catch (error) {
      console.error(error);
      toast({
        description: "We could not update the photo.Try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data) => {
    if (!data.fullName) return;

    try {
      const r = await updateUserProfile({
        id: email,
        fullName: data.fullName,
      });

      setProfile({
        ...profile,
        fullName: data.fullName,
      });

      toast({
        title: "Profile updated",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error("we could not update user profile");
      console.error(error);

      toast({
        title: "Profile failed",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const teamName = team?.name;
  const userRole = team?.ownerEmail === email ? "Owner" : "Editor";

  const username = formatUsernameFromEmail(email);

  const watchFullName = watch("fullName");

  return (
    <>
      <Flex direction="row" height="96px" alignItems="center">
        <Image
          objectFit="cover"
          borderRadius="full"
          boxSize="56px"
          src={file ? URL.createObjectURL(file) : avatarUrl}
          alt="Profile picture"
          fallbackSrc="/assets/fall.png"
        />

        <Flex
          marginLeft="2"
          onClick={onOpen}
          ref={btnRef}
          _hover={{ cursor: "pointer" }}
        >
          <Box>
            <Text fontWeight="medium">{profile.fullName || username}</Text>
            {teamName ? (
              <Text fontSize={14}>
                {userRole}, {teamName}
              </Text>
            ) : null}
          </Box>
          <TriangleDownIcon mt="2" ml="3" w={3} h={3} color="brand.green" />
        </Flex>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerHeader>Create your account</DrawerHeader> */}
          <CustomDrawerHeader
            as={Flex}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* <Text fontSize={22}>{username}</Text> */}
            <Text fontSize={22}>Profile</Text>
            <IconButton
              onClick={onClose}
              border="none"
              variant="outline"
              aria-label="Cancel and close"
              icon={<CloseIcon w={4} h={4} />}
            />
          </CustomDrawerHeader>

          <DrawerBody padding="8">
            <Text mb="2">Avatar</Text>
            <Flex>
              <Box>
                <Image
                  objectFit="cover"
                  boxSize="200px"
                  src={file ? URL.createObjectURL(file) : avatarUrl}
                  fallbackSrc="/assets/fall.png"
                />
                <input
                  id="input-user-avatar"
                  variant="outline"
                  type="file"
                  hidden
                  onChange={getPhoto}
                  placeholder="Upload New Photo"
                  accept="image/*"
                />
                {file ? (
                  <Flex direction="column">
                    <Button
                      colorScheme="teal"
                      mt="3"
                      borderRadius="full"
                      variant="outline"
                      color="brand.green"
                      onClick={upLoadPhoto}
                      fontWeight="normal"
                    >
                      Upload
                    </Button>

                    <Button
                      colorScheme="teal"
                      mt="3"
                      borderRadius="full"
                      variant="outline"
                      color="brand.green"
                      onClick={() => {
                        setFile(null);
                      }}
                      fontWeight="normal"
                    >
                      Cancel
                    </Button>
                  </Flex>
                ) : (
                  <Box>
                    <Button
                      colorScheme="teal"
                      mt="3"
                      borderRadius="full"
                      variant="outline"
                      color="brand.green"
                      onClick={() => {
                        document.getElementById("input-user-avatar").click();
                      }}
                      fontWeight="normal"
                    >
                      Change Photo
                    </Button>
                  </Box>
                )}
              </Box>
              <Box as="form" padding="0 18px" onSubmit={handleSubmit(onSubmit)}>
                <Text as="em" color="brand.green">
                  Email:
                </Text>
                <Text>{email || ""}</Text>
                <Box my="4" />
                <Text as="em" color="brand.green">
                  Phone number:
                </Text>
                <Text>{phone_number || ""}</Text>
                <Box my="4" />
                <Text as="em" color="brand.green">
                  Full Name:
                </Text>

                <Input
                  mt="2"
                  defaultValue={profile.fullName || ""}
                  backgroundColor="rgba(134, 134, 159, 0.1)"
                  placeholder="Enter your full name"
                  required
                  {...register("fullName", { required: true })}
                />
                {errors.fullName ? (
                  <Text as="span" color="red.600" fontSize="sm">
                    This field cannot be empty.
                  </Text>
                ) : null}

                {watchFullName && watchFullName !== profile.fullName ? (
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    width="100px"
                    border="2px"
                    borderColor="green.500"
                    mt="2"
                  >
                    Save
                  </Button>
                ) : null}
              </Box>

              {/* <Box padding="0 18px">
                <Input
                  mb="4"
                  type="email"
                  defaultValue={email || ""}
                  backgroundColor="rgba(134, 134, 159, 0.1)"
                  placeholder="Email"
                />
                <Input
                  mb="4"
                  type="tel"
                  defaultValue={phone_number}
                  backgroundColor="rgba(134, 134, 159, 0.1)"
                  placeholder="Phone number"
                />
              </Box> */}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
