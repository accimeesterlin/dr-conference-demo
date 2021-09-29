import React, { useState } from "react";
import { DrawerBody, Textarea } from "@chakra-ui/react";

import { getGpt3Text } from "@Libs/api-gpt";
import {
  CustomizeHeader,
  Line,
  ImageSection,
  TitleSection,
  ContentSection,
  FooterVariant3,
  TwitterHashtags,
} from "./Generic";

// USED FOR FACEBOOK BLOG EDIT
export function ThreePointThree({ article, onCancel, ctaClick }) {
  // NOTE blog editor
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);

  const addTwitterHashTag = (hashTag) => {
    let mainContent = content;
    mainContent += '\n';
    mainContent += `#${hashTag}`;
    setContent(mainContent);
  };

  const generateWithGPT3 = async (textValue) => {
    try {
      const { choices } = await getGpt3Text(textValue);
      if (Array.isArray(choices) && choices.length) {
        const { text } = choices[0];
        return text;
      }
    } catch (error) {
      console.log(error);
    }

    return "";
  };

  const generateNewTitle = () => {
    generateWithGPT3(title).then((r) => {
      if (r) {
        setTitle(r.substr(0, 100));
      }
    });
  };

  const generateNewContent = () => {
    generateWithGPT3(title).then((r) => {
      if (r) {
        setContent(r);
      }
    });
  };

  return (
    <>
      <CustomizeHeader drawerTitle="Twitter" onCancel={onCancel} />
      <DrawerBody padding={0}>
        <ImageSection />
        <Line />
        <TitleSection
          toneValue="NEUTRAL"
          lengthValue="Medium (10 - 15 words)"
          generateNewTitle={generateNewTitle}
          title={title}
        />
        <Line />
        <ContentSection
          toneValue="NEUTRAL"
          lengthValue="350 - 475 words"
          generateNewContent={generateNewContent}
        >
          <Textarea
            rows={5}
            placeholder="Here is a sample placeholder"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </ContentSection>
        <Line />
        <TwitterHashtags addTwitterHashTag={addTwitterHashTag} />
        <Line />
        <FooterVariant3
          timeText="Next Available (12:16pm)"
          ctaText="Publish To Channels"
          ctaClick={ctaClick}
        />
      </DrawerBody>
    </>
  );
}
