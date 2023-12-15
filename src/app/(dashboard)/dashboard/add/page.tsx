import { FC } from "react";

import AddStudentButton from "@/app/components/AddStudentButton";
import { Typography } from "@/lib/uiElements/typography";

const Page: FC = () => {
  return (
    <main className="pt-8">
      <Typography variant="h1" className="mb-8">
        Add a student
      </Typography>
      <AddStudentButton />
    </main>
  );
};

export default Page;
