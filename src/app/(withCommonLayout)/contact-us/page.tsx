"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button, Textarea } from "@nextui-org/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ContactUs = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "We have accepted your request. Our team will contact you soon."
    );
    router.push("/");
  };

  return (
    <section className="flex flex-col items-center justify-center py-12 px-4 md:px-8 lg:px-16 text-center">
      <h1 className="text-4xl font-bold text-default-900 mb-6">Contact Us</h1>
      <p className="text-lg text-default-700 max-w-2xl mb-8">
        Have any questions or need support? Feel free to reach out to us through
        the form below.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
        <Input
          label="Your Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full text-default"
        />
        <Input
          label="Your Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full text-default"
        />
        <Textarea
          label="Your Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full text-default"
        />
        <Button type="submit" color="primary" className="w-full">
          Send Message
        </Button>
      </form>
    </section>
  );
};

export default ContactUs;
