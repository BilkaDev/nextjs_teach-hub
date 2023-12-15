"use client";

import { FC, useState } from "react";
import axios, { isAxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/lib/uiElements/button";
import { addStudentValidator } from "@/lib/validations/add-student";
import { Typography } from "@/lib/uiElements/typography";
import { FormField } from "@/lib/uiElements/formField";

interface AddStudentButtonProps {}

type FormData = z.infer<typeof addStudentValidator>;

const AddStudentButton: FC<AddStudentButtonProps> = () => {
  const [showSuccessState, setShowSuccessState] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(addStudentValidator)
  });

  const addStudent = async (email: string) => {
    try {
      const validateEmail = addStudentValidator.parse({ email });
      await axios.post("/api/students", {
        email: validateEmail
      });
      setShowSuccessState(true);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError("email", { message: e.message });
        return;
      }
      if (isAxiosError(e)) {
        setError("email", { message: e.response?.data });
        return;
      }
      setError("email", { message: "Something went wrong" });
    }
  };

  const onSubmit = async (data: FormData) => {
    await addStudent(data.email);
  };

  return (
    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        className="flex gap-4 justify-between"
        {...register("email")}
        label="Add student by E-mail"
        placeholder="Email"
        error={errors.email?.message}
      >
        <Button className="self-end" type="submit">
          Add
        </Button>
      </FormField>
      {showSuccessState ? (
        <Typography variant="sm" status="success">
          Student request sent!
        </Typography>
      ) : null}
    </form>
  );
};

export default AddStudentButton;
