import type { Meta, StoryObj } from "@storybook/react";

import FormField from "./FormField";

const meta = {
  title: "UiElements/FormField",
  component: FormField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered"
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"]
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    variant: "default",
    label: "FormField",
    placeholder: "FormField"
  }
};

export const ErrorMessage: Story = {
  args: {
    variant: "default",
    label: "FormField",
    placeholder: "FormField",
    error: "Invalid value"
  }
};
