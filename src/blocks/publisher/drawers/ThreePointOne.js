import React, { useState, useEffect } from "react";
import { DrawerBody, Textarea } from "@chakra-ui/react";

import { getGpt3Text, scrapeArticlePage } from "@Libs/api-gpt";
import {
  CustomizeHeader,
  Line,
  ImageSection,
  TitleSection,
  ContentSection,
  FooterVariant3,
} from "./Generic";

// USED FOR WORDPRESS BLOG EDIT
export function ThreePointOne({ article, onCancel, ctaClick }) {
  // NOTE blog editor
  const [content, setContent] = useState(article.content);
  const [title, setTitle] = useState(article.title);

  useEffect(async () => {
    const articleSource = article?.source?.id;
    const articleUrl = article?.url;

    const { isError, result } = await scrapeArticlePage(articleUrl, articleSource);

    if (!isError) {
      const longContent = result.article;
      setContent(longContent);
    }

  }, []);

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
      <CustomizeHeader drawerTitle="Blog Post" onCancel={onCancel} />
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
            rows={10}
            placeholder="Here is a sample placeholder"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </ContentSection>
        <Line />
        <FooterVariant3
          timeText="Next Available (12:16pm)"
          ctaText="Next: Facebook"
          ctaClick={ctaClick}
        />
      </DrawerBody>
    </>
  );
}
