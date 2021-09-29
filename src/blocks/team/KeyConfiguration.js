import React from "react";
import { useForm } from "react-hook-form";
import { Box, FormControl, Input } from "@chakra-ui/react";
import { LabelView, FormView } from "@Blocks/team/Form";

export function KeyConfiguration({ team: { newsapiKey }, updateTeam }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      newsapiKey: newsapiKey || "",
    },
  });

  return (
    <Box>
      <FormView
        titleText="News API Key"
        helperText="Enter the key that will be used only by your team."
        onSubmit={handleSubmit(updateTeam)}
        isSubmitting={isSubmitting}
      >
        <FormControl id="newsapiKey">
          <LabelView text="The News API Key that will be shared by your team." />
          <Input
            defaultValue={newsapiKey || ""}
            {...register("newsapiKey", { required: true })}
            required
            readOnly={isSubmitting}
          />
        </FormControl>
      </FormView>
    </Box>
  );
}
