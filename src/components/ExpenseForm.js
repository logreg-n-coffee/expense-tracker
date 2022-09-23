import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "./Button";
import { Field } from "./Field";


export const ExpenseForm = () => {

  return (
    <form
      onSubmit={() => {}}
      className="flex flex-col gap-10 h-full"
    >
      <div className="flex flex-col gap-4">
        <Field label="Amount" required>
          <input
            className="text-black py-4"
            type="number"
            placeholder="$1.23"
          />
        </Field>
        <Field label="Date">
          <input
            className="text-black py-4"
            type="date"
          />
        </Field>

        <Field label="Category">
          <select className="text-black py-4">
          </select>
        </Field>
        <Field label="Description">
          <input
            className="text-black py-4"
            type="text"
            placeholder="A cupcake"
          />
        </Field>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-3">
          <Button className="py-4 w-full">
            Add
          </Button>
        </div>
        <Button onClick={() =>{}} variant="secondary">
          Reset
        </Button>
      </div>
    </form>
  );
};
