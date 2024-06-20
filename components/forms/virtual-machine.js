"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loading-spinner";
import { extractErrorCode } from "@/lib/extractCodeFromError";

import { supportedLocations } from "@/utils";

const formSchema = z.object({
  resourceType: z.string(2, "Type is required"), //Windows or Linux
  resourceName: z
    .string()
    .min(3, "Name is required")
    .max(24, "Name cannot be more than 24 characters long")
    .regex(
      /^(?!^[0-9]+$)[a-zA-Z0-9](?!.*[_.])[a-zA-Z0-9-]*[a-zA-Z0-9]$/,
      "Name must only contain alphanumeric characters and dashes, cannot start with '_', '.', or '-', cannot end with '_', '.', or '-', and cannot contain special characters /\"[]:|<>+=;,?*@& or whitespace. Additionally, names may not contain '_' or '.', and cannot be composed solely of numbers."
    ),
  rgName: z.string().min(2, "Resource Group is required"),
  location: z.string().min(2, "Location is required"),
  availabilityZone: z.string(1, "Zone is required"), // 1,2,3
  size: z.string(2, "Valid size is required"),
  username: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name cannot be more than 20 characters long")
    .regex(
      /^[a-zA-Z0-9-]*(?<![.])$/,
      "Username must only contain alphanumeric characters and dashes, cannot contain special characters /\"[]:|<>+=;,?*@&, and cannot end with a period ('.')."
    ),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters long")
    .max(123, "Password cannot be more than 123 characters long")
    .refine((value) => {
      const checks = [
        /[a-z]/.test(value),
        /[A-Z]/.test(value),
        /[0-9]/.test(value),
        /[!@#$%^&*(),.?":{}|<>]/.test(value),
      ];
      return checks.filter(Boolean).length >= 3;
    }, "Password must have at least 3 of the following: 1 lowercase character, 1 uppercase character, 1 number, and 1 special character"),
  storageAccountType: z.string(2, "Account type is required"), // Standard_LRS, StandardSSD_LRS,    Premium_LRS, StandardSSD_ZRS, Premium_ZRS
  caching: z.string(2, "caching type is required"), //None, ReadOnly, ReadWrite
  sku: z.string(2, "SKU is required"),
  version: z.string(2, "version is required"),
});

export default function VirtualMachineForm({ type, sid }) {
  return <div>VM</div>;
}
