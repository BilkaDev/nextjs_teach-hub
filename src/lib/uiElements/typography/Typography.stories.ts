import type { Meta, StoryObj } from "@storybook/react";

import Typography from "./Typography";

const meta = {
  title: "UiElements/Typography",
  component: Typography,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered"
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"]
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    variant: "p",
    children: "Typography"
  }
};

export const StatusError: Story = {
  args: {
    variant: "sm",
    children: "Typography",
    status: "error"
  }
};

export const StatusSuccess: Story = {
  args: {
    variant: "sm",
    children: "Typography",
    status: "success"
  }
};
