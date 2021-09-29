import React from "react";
import { useForm } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";

import {
  Box,
  Button,
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

function isValidUrl(url) {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
}

export function WordPressChannel({ data, onSave }) {
  // TODO test url before saving it.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: data.name || "",
      publicationUrl: data.publicationUrl || "",
    },
  });

  return (
    <Box mt="6">
      <Box as="form" onSubmit={handleSubmit(onSave)}>
        <FormControl mb="4" id="wpsite">
          <FormLabel>Name of the wordpress site</FormLabel>
          <Input
            required
            {...register("name", { required: "true" })}
            readOnly={isSubmitting}
          />
          <FormHelperText>Will appear to members of the team.</FormHelperText>
        </FormControl>
        <FormControl id="wpurl" isInvalid={errors.publicationUrl}>
          <FormLabel>Publication url</FormLabel>
          <Input
            required
            {...register("publicationUrl", {
              validate: (value) =>
                isValidUrl(value) || "You must enter a valid URL.",
            })}
            readOnly={isSubmitting}
          />
          <FormHelperText>Articles will be sent to that url.</FormHelperText>
          {errors.publicationUrl && (
            <FormErrorMessage>{errors.publicationUrl.message}</FormErrorMessage>
          )}
        </FormControl>
        <Box mt="6" mb="4" width="50%">
          <Button
            type="submit"
            colorScheme="green"
            isFullWidth
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
