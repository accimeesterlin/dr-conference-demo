import React, { useState } from "react";
import {
  Box,
  Drawer,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
} from "@chakra-ui/react";

import { Item } from "./Preview";

import {
  TwoPointOne,
  TwoPointTwo,
  ThreePointOne,
  ThreePointTwo,
  ThreePointThree,
} from "./drawers";

export function PreviewList({
  data = [],
  onSchedule,
  onPublish,
  onEdit,
  onDelete,
}) {
  const [info, setInfo] = useState({});
  const [socialMedia, setSocialMedia] = useState({ fb: false, twitter: false });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const _onEdit = (id) => {
    const d = data.filter((el) => el.id === id)[0];
    setInfo({ case: "edit", variant: "2.1", data: d });
    onOpen();
  };

  const _onClose = () => {
    setInfo({});
    onClose();
  };
  const toggleVariant = () => {
    const table = {
      2.1: "2.2",
      2.2: "3.1",
      3.1: "3.2",
      3.2: "3.3",
      3.3: "2.1",
    };
    setInfo({
      ...info,
      variant: table[info.variant],
    });
  };

  const nextAction = () => {
    console.log("we need to dynamically determine the next action to take");
    toggleVariant();
  };

  const finalAction = () => {
    console.log("we need to dynamically determine the next action to take");
    onClose();
    toggleVariant();
  };

  return (
    <>
      <Box>
        {data.map((el) => (
          <Item
            key={el.id + el.updateAt}
            data={el}
            onEdit={_onEdit}
            onSchedule={onSchedule}
            onPublish={onPublish}
            onDelete={onDelete}
            id={el.id}
          />
        ))}
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          {info.variant === "2.1" ? (
            <TwoPointOne
              article={info.data.content}
              onCancel={_onClose}
              ctaClick={nextAction}
            />
          ) : null}

          {info.variant === "2.2" ? (
            <TwoPointTwo
              onCancel={_onClose}
              ctaClick={nextAction}
              socialMedia={socialMedia}
              setSocialMedia={setSocialMedia}
            />
          ) : null}

          {info.variant === "3.1" ? (
            <ThreePointOne
              article={info.data.content}
              onCancel={_onClose}
              ctaClick={nextAction}
            />
          ) : null}

          {info.variant === "3.2" ? (
            <ThreePointTwo
              article={info.data.content}
              onCancel={_onClose}
              ctaClick={nextAction}
            />
          ) : null}

          {info.variant === "3.3" ? (
            <ThreePointThree
              article={info.data.content}
              onCancel={_onClose}
              ctaClick={finalAction}
            />
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
}
