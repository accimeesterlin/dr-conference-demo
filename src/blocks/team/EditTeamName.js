import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
} from "@chakra-ui/react";

export function EditTeamName({ onSave }) {
  const { register, handleSubmit, formState } = useForm();

  const submit = async (values) =>
    onSave({
      name: values.newOrgName,
      slug: slugify(values.newOrgName, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      }),
    });

  const { errors, isSubmitting } = formState;

  return (
    <Box>
      <form onSubmit={handleSubmit(submit)}>
        <FormControl id="newOrgName" isInvalid={errors.newOrgName} mb="2">
          <FormLabel>Name of the team.</FormLabel>
          <Input
            readOnly={isSubmitting}
            {...register("newOrgName", { required: true })}
            required
          />
          <FormHelperText>
            How the team will be known by its members.
          </FormHelperText>
          {errors.newOrgName && (
            <FormErrorMessage>The name is required</FormErrorMessage>
          )}
        </FormControl>

        <Button
          type="submit"
          bg="brand.green"
          color="white"
          mr={3}
          disabled={isSubmitting}
        >
          Create new team
        </Button>
      </form>
    </Box>
  );
}
